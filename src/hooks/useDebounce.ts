import { useEffect, useState } from "react";

export function useDebounce<T>(val: T, delay: number): T {
    const [debouncedVal, setDebouncedVal] = useState(val);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedVal(val) , delay);;
        return () => clearTimeout(handler);
    }, [val, delay]);

    return debouncedVal;
}