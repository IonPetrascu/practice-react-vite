import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    if (!debouncedValue) return;
    // eslint-disable-next-line no-console
    console.log('search!!!!');
  }, [debouncedValue]);

  return <input onChange={(e) => setValue(e.target.value)} placeholder="search" />;
};

export default SearchInput;
