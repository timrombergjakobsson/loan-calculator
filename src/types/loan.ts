// API Types - to be filled in based on API documentation

export interface Industry {
  id: string;
  name: string;
}

export interface LoanCalculateRequest {
  industry: string;
  monthlyRevenue: number;
  loanAmount: number;
  durationMonths: number;
}

export interface LoanCalculateResponse {
  approval: {
    approved: boolean;
    maxLoanAmount?: number;
  };
  loanDetails?: {
    interestRate: number;
    totalInterest: number;
    totalRepayment: number;
  };
}
