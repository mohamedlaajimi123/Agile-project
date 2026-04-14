import { useState, useEffect, useCallback } from 'react';

/**
 * useFetch - A universal hook for handling async API calls
 * @param {Function} apiFunction - The service function to execute
 */
export const useFetch = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    let isMounted = true;
    
    // Reset states for new fetch
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction();
      if (isMounted) {
        setData(result);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message || 'An unexpected error occurred');
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [apiFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};