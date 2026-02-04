import type { LoanCalculateResponse } from '../types/loan';

interface LoanResultProps {
  result: LoanCalculateResponse;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

const LoanResult = ({ result }: LoanResultProps) => {
  const { approval, loanDetails } = result;

  if (approval.approved && loanDetails) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="bg-green-500 rounded-full p-2 mr-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-800">Loan Approved!</h2>
        </div>
        
        <div className="space-y-3 mt-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Interest Rate:</span>
            <span className="font-semibold">{formatPercentage(loanDetails.interestRate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Total Interest Cost:</span>
            <span className="font-semibold">{formatCurrency(loanDetails.totalInterest)}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-gray-700 font-semibold">Total Repayment Amount:</span>
            <span className="font-bold text-lg">{formatCurrency(loanDetails.totalRepayment)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="bg-red-500 rounded-full p-2 mr-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-red-800">Loan Rejected</h2>
      </div>
      
      {approval.maxLoanAmount !== undefined && approval.maxLoanAmount > 0 ? (
        <div className="mt-4 p-4">
          <p className="text-gray-800 font-semibold mb-2">Maximum loan amount available:</p>
          <p className="text-2xl font-bold text-red-700 mb-3">{formatCurrency(approval.maxLoanAmount)}</p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-gray-700">
            Unfortunately, no loan amount is available based on your current application criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default LoanResult;
