import type { Industry, LoanCalculateRequest, LoanCalculateResponse } from '../types/loan';

const API_BASE_URL = 'https://loancalculator-ivory.vercel.app/api';

/**
 * Fetch all available industries
 */
export const fetchIndustries = async (): Promise<Industry[]> => {
  const response = await fetch(`${API_BASE_URL}/industries`);
  if (!response.ok) {
    throw new Error(`Failed to fetch industries: ${response.status}`);
  }
  
  const result = await response.json();
  if (result.success && Array.isArray(result.data)) {
    return result.data;
  }
  
  throw new Error('Invalid response format');
};

/**
 * Calculate loan with approval status
 */
export const calculateLoan = async (
  request: LoanCalculateRequest
): Promise<LoanCalculateResponse> => {
  const response = await fetch(`${API_BASE_URL}/loans/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      industryId: request.industry,
      monthlyRevenue: request.monthlyRevenue,
      loanAmount: request.loanAmount,
      loanTermMonths: request.durationMonths,
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorData = JSON.parse(errorText);
      if (errorData.messages?.length) {
        throw new Error(errorData.messages.join('. '));
      }
      if (errorData.error) {
        throw new Error(errorData.error);
      }
    } catch {
      throw new Error(`Failed to calculate loan: ${response.status}`);
    }
  }
  
  const result = await response.json();
  if (!result.success || !result.data) {
    throw new Error('Invalid API response format');
  }
  
  const apiData = result.data;
  const isApproved = apiData.approval.status === 'approved';
  
  return {
    approval: {
      approved: isApproved,
      maxLoanAmount: apiData.approval.maxLoanAmount,
    },
    ...(isApproved && apiData.loanDetails && {
      loanDetails: {
        interestRate: apiData.loanDetails.annualInterestRate,
        totalInterest: apiData.loanDetails.totalPayment - apiData.loanDetails.loanAmount,
        totalRepayment: apiData.loanDetails.totalPayment,
      },
    }),
  };
};
