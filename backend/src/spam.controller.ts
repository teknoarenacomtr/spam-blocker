import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpamRule } from './spam-rule.entity';

class CreateSpamRuleDto {
  type: 'PHONE' | 'KEYWORD';
  value: string;
  category: 'SCAM' | 'GAMBLING' | 'ADS';
  isActive: boolean;
}

@ApiTags('Spam Rules')
@Controller('api/v1/rules')
export class SpamRulesController {
  constructor(
    @InjectRepository(SpamRule)
    private rulesRepository: Repository<SpamRule>,
  ) { }

  @Get('sync')
  @ApiOperation({ summary: 'Mobil uygulama için aktif kuralları getirir' })
  @ApiResponse({ status: 200, description: 'JSON formatında kurallar listesi.' })
  async getRulesForSync(@Query('lastSyncTimestamp') lastSync: string) {
    // Veritabanından aktif kuralları çek
    const rules = await this.rulesRepository.find({ where: { isActive: true } });

    const phones = rules.filter(r => r.type === 'PHONE').map(r => r.value);
    const keywords = rules.filter(r => r.type === 'KEYWORD').map(r => r.value);

    return {
      version: '1.0.6',
      timestamp: new Date().toISOString(),
      phones: phones,
      keywords: keywords
    };
  }

  @Post()
  async addRule(@Body() createRuleDto: CreateSpamRuleDto) {
    console.log('Yeni kural eklendi:', createRuleDto);

    // Varsa ekleme (Duplicate kontrolü)
    const existing = await this.rulesRepository.findOne({
      where: { type: createRuleDto.type, value: createRuleDto.value }
    });

    if (existing) {
      return { success: false, message: 'Already exists' };
    }

    const newRule = this.rulesRepository.create(createRuleDto);
    await this.rulesRepository.save(newRule);

    return { success: true };
  }
}
