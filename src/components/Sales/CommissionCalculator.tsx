import React from 'react';
import { CommissionRule, SalesCommission } from '../../types/commission';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

interface CommissionCalculatorProps {
  saleAmount: number;
  rules: CommissionRule[];
  teamMembers?: string[];
}

const CommissionCalculator: React.FC<CommissionCalculatorProps> = ({
  saleAmount,
  rules,
  teamMembers,
}) => {
  const calculateCommission = (rule: CommissionRule): number => {
    switch (rule.type) {
      case 'fixed':
        return rule.value;
      case 'percentage':
        return (saleAmount * rule.value) / 100;
      case 'tiered':
        // Implementation for tiered commission calculation
        return calculateTieredCommission(rule);
      default:
        return 0;
    }
  };

  const calculateTieredCommission = (rule: CommissionRule): number => {
    // Add your tiered commission logic here
    return 0;
  };

  const getTeamBonus = (rule: CommissionRule): number => {
    if (teamMembers && teamMembers.length > 1 && rule.teamBonus) {
      return (calculateCommission(rule) * rule.teamBonus) / 100;
    }
    return 0;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Commission Calculator</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-600">Sale Amount</span>
          </div>
          <span className="font-semibold">${saleAmount.toFixed(2)}</span>
        </div>

        {rules.map((rule) => {
          const commission = calculateCommission(rule);
          const teamBonus = getTeamBonus(rule);

          return (
            <div key={rule.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{rule.name}</h3>
                <span className="text-sm text-gray-500">{rule.type}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Base Commission</span>
                <span className="font-medium">${commission.toFixed(2)}</span>
              </div>

              {teamBonus > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-gray-600">Team Bonus</span>
                  </div>
                  <span className="font-medium text-green-600">
                    +${teamBonus.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="font-medium">Total</span>
                <span className="font-semibold text-lg">
                  ${(commission + teamBonus).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommissionCalculator;