import { useState } from 'react'

const useFetchData = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return {data, isLoading, fetchData};
}

export default useFetchData