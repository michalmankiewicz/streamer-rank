import { useState, useCallback } from 'react';

const useHttp = <T, B = {}>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState<T>();

  const sendRequest = useCallback(async (url: string, method: string = 'GET', body?: B) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const options: RequestInit = {
        method,
      };

      if (body) {
        options.body = JSON.stringify(body);
        options.headers = {
          'Content-Type': 'application/json',
        };
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      setValue(data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    value,
    isLoading,
    isError,
    sendRequest,
  };
};

export default useHttp;
