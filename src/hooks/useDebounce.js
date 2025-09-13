import { useEffect, useState } from "react";

export const useDebounce = (inputValue, delay) => {
  
  const [value, setValue] = useState(inputValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue(inputValue);
    }, delay);

    return()=>clearTimeout(timeoutId);
  }, [inputValue,delay]);

  return value;
};
