
export interface InvestmentOption {
    name: string;
    type: 'fixed_deposit' | 'money_market' | 'bitcoin' | 'ethereum' | 'gold' | 'silver' | 'high_risk_betting' | 'land';
    description: string;
    risk: number; // 1 to 10
    liqudity: number; // liqudity of the investment option
    currentPrice: number; // current price of the investment option
    history: number[]; // price history of the investment option
 }
  
  export interface InvestmentScenario {
    amount: number;
    period: number; // in years
    option: InvestmentOption;
  }
  
  export interface InvestmentSimulationResult {
    finalAmount: number;
    totalInterest: number;
  }
  
  export interface UserInvestment {
    option: InvestmentOption;
    amount: number;
    investedAt: number; // timestamp when the investment was made
  }
  