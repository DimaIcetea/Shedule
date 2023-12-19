import { useEffect, useState } from "react";

export function useQuery<T>(
  queryFunction: () => Promise<T>,
  queryKeys: (string | number)[]
) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(undefined);
    setIsLoading(true);
    queryFunction().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, [JSON.stringify(queryKeys)]);

  return { data, isLoading };
}
