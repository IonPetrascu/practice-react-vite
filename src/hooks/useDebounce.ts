import { useEffect, useState } from 'react';

const TIME_DEBOUNCE = 400;

export function useDebounce<T>(value: T, delay: number = TIME_DEBOUNCE): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
