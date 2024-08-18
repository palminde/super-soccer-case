import { useEffect, useState } from 'react';

type UseGetDataProps = {
  endpoint: string;
  lazy?: boolean;
};

type UseGetData<T> = {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  getData: () => void;
};

export function useGetData<T>({
  endpoint,
  lazy = false,
}: UseGetDataProps): UseGetData<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(!lazy);

  const getData = async () => {
    try {
      setLoading(true);
      setError(undefined);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch data', await response.json());
      }
      const data = (await response.json()) as T;

      setData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(
          new Error(`An unknown error occurred: ${JSON.stringify(error)}`),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!lazy) {
      getData();
    }
  }, []);

  return { data, error, loading, getData };
}
