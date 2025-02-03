import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    setData: React.Dispatch<React.SetStateAction<T | null>>;
}

const useFetch = <T>(url: string | null, options?: RequestInit): UseFetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
     if(!url) {
         setData(null);
         setLoading(false);
          return;
      }
       const fetchData = async () => {
        setLoading(true);
            setError(null);
            try {
                const headers = new Headers(options?.headers);
                headers.append('Accept', 'application/json');

                const response = await fetch(url, { ...options, headers });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            }
            finally {
                setLoading(false);
            }
       };
        fetchData();
    }, [url, options]);

    return { data, loading, error, setData };
};

export default useFetch;