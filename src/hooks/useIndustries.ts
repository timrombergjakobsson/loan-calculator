import { useEffect, useState } from 'react';
import { fetchIndustries } from '../services/api';
import type { Industry } from '../types/loan';

export const useIndustries = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIndustries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchIndustries();
        setIndustries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load industries');
      } finally {
        setLoading(false);
      }
    };

    loadIndustries();
  }, []);

  return { industries, loading, error };
};
