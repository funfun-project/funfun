import { client } from '../client';
import { UserInfo } from './types/userInfos';

export async function getUserInfo(): Promise<UserInfo> {
  const response = await client.get<UserInfo>('/api/userInfos');
  return response.data;
}
