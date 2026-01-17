"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpamRulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
class CreateSpamRuleDto {
}
const IN_MEMORY_DB = {
    phones: ['+905550000000', '+1234567890'],
    keywords: ['kazandınız', 'bet', 'bonus', 'tebrikler']
};
let SpamRulesController = class SpamRulesController {
    async getRulesForSync(lastSync) {
        return {
            version: '1.0.6',
            timestamp: new Date().toISOString(),
            phones: IN_MEMORY_DB.phones,
            keywords: IN_MEMORY_DB.keywords
        };
    }
    async addRule(createRuleDto) {
        console.log('Yeni kural eklendi:', createRuleDto);
        if (createRuleDto.type === 'PHONE') {
            if (!IN_MEMORY_DB.phones.includes(createRuleDto.value)) {
                IN_MEMORY_DB.phones.push(createRuleDto.value);
            }
        }
        else if (createRuleDto.type === 'KEYWORD') {
            if (!IN_MEMORY_DB.keywords.includes(createRuleDto.value)) {
                IN_MEMORY_DB.keywords.push(createRuleDto.value);
            }
        }
        return { success: true, currentDb: IN_MEMORY_DB };
    }
};
exports.SpamRulesController = SpamRulesController;
__decorate([
    (0, common_1.Get)('sync'),
    (0, swagger_1.ApiOperation)({ summary: 'Mobil uygulama için aktif kuralları getirir' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'JSON formatında kurallar listesi.' }),
    __param(0, (0, common_1.Query)('lastSyncTimestamp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpamRulesController.prototype, "getRulesForSync", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSpamRuleDto]),
    __metadata("design:returntype", Promise)
], SpamRulesController.prototype, "addRule", null);
exports.SpamRulesController = SpamRulesController = __decorate([
    (0, swagger_1.ApiTags)('Spam Rules'),
    (0, common_1.Controller)('api/v1/rules')
], SpamRulesController);
//# sourceMappingURL=spam.controller.js.map