export interface CommissionRule {
  id: string;
  name: string;
  type: 'percentage' | 'fixed' | 'tiered';
  value: number;
  minSaleAmount?: number;
  maxSaleAmount?: number;
  teamBonus?: number;
}

export interface CommissionTier {
  id: string;
  ruleId: string;
  minAmount: number;
  maxAmount?: number;
  percentage: number;
}

export interface SalesCommission {
  id: string;
  salesId: string;
  userId: string;
  amount: number;
  ruleId: string;
  status: 'pending' | 'approved' | 'paid';
  paidAt?: Date;
  createdAt: Date;
}