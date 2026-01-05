import { UserInfo } from './types/userInfos';
import { userInfosFetch } from './userInfosFetch';

export async function getUserInfo(): Promise<UserInfo> {
  return userInfosFetch<UserInfo>('/api/userInfos');
}
