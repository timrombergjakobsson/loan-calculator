import { useState, FormEvent } from 'react';
import type { LoanCalculateRequest } from '../types/loan';

interface LoanFormProps {
  industries: Array<{ id: string; name: string }>;
  industriesLoading: boolean;
  onSubmit: (data: LoanCalculateRequest) => void;
  isCalculating: boolean;
}

const LoanForm = ({ industries, industriesLoading, onSubmit, isCalculating }: LoanFormProps) => {
  const [industry, setIndustry] = useState('');
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [durationMonths, setDurationMonths] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const revenue = Number(monthlyRevenue);
    const amount = Number(loanAmount);
    const duration = Number(durationMonths);
    
    // Validate that numbers are positive
    if (revenue <= 0 || amount <= 0 || duration <= 0) {
      return;
    }
    
    onSubmit({
      industry,
      monthlyRevenue: revenue,
      loanAmount: amount,
      durationMonths: duration,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Industry Selection */}
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
          Industry
        </label>
        <select
          id="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          disabled={industriesLoading}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">
            {industriesLoading ? 'Loading industries...' : industries.length === 0 ? 'No industries available' : 'Select industry'}
          </option>
          {industries.map((ind) => (
            <option key={ind.id} value={ind.id}>
              {ind.name}
            </option>
          ))}
        </select>
      </div>

      {/* Monthly Revenue */}
      <div>
        <label htmlFor="monthlyRevenue" className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Revenue
        </label>
        <div className="relative">
          <input
            type="number"
            id="monthlyRevenue"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(e.target.value)}
            placeholder="0"
            required
            min="0"
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">kr</span>
        </div>
      </div>

      {/* Loan Amount */}
      <div>
        <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
          Desired Loan Amount
        </label>
        <div className="relative">
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="0"
            required
            min="0"
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">kr</span>
        </div>
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="durationMonths" className="block text-sm font-medium text-gray-700 mb-2">
          Repayment Duration
        </label>
        <div className="relative">
          <input
            type="number"
            id="durationMonths"
            value={durationMonths}
            onChange={(e) => setDurationMonths(e.target.value)}
            placeholder="0"
            required
            min="1"
            className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">months</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isCalculating || industriesLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isCalculating ? 'Calculating...' : 'Calculate Loan'}
      </button>
    </form>
  );
};

export default LoanForm;
