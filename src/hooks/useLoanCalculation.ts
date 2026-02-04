import { useState } from 'react';
import { calculateLoan } from '../services/api';
import type { LoanCalculateRequest, LoanCalculateResponse } from '../types/loan';

export const useLoanCalculation = () => {
  const [result, setResult] = useState<LoanCalculateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async (request: LoanCalculateRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await calculateLoan(request);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate loan');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { result, loading, error, calculate, reset };
};
