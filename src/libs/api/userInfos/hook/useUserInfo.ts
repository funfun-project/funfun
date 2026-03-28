import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../getUserInfo';

export function useUserInfo() {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
}
