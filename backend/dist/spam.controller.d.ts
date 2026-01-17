declare class CreateSpamRuleDto {
    type: 'PHONE' | 'KEYWORD';
    value: string;
    category: 'SCAM' | 'GAMBLING' | 'ADS';
    isActive: boolean;
}
export declare class SpamRulesController {
    getRulesForSync(lastSync: string): Promise<{
        version: string;
        timestamp: string;
        phones: string[];
        keywords: string[];
    }>;
    addRule(createRuleDto: CreateSpamRuleDto): Promise<{
        success: boolean;
        currentDb: {
            phones: string[];
            keywords: string[];
        };
    }>;
}
export {};
