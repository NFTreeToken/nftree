import axios from 'axios';
import { useEffect, useState } from 'react';

export function useSuperrareProfile(address) {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const result = await axios.get(`https://superrare.co/sr-json/v0/users?user_address=${address}`);
      setProfile(result.data?.[0]);
      setIsLoading(false);
    })();
  }, [address]);

  return [profile, isLoading];
}
