import { getUserInfo } from './getUserInfo';
import { putUserInfo } from './putUserInfo';
import { changeNickname } from './changeNickname';
import { UpdateUserInfoPayload } from './types/userInfos';
import { client } from '../client';

export const userInfosAPI = {
  getUserInfo: () => getUserInfo(),
  updateProfile: (data: UpdateUserInfoPayload) => putUserInfo(data),
  changeNickname: (nickname: string) => changeNickname(nickname),

  // Account settings
  withdraw: async () => {
    const response = await client.patch<void>('/api/users');
    return response.data;
  },
  changePassword: async (email: string) => {
    const response = await client.patch<void>(`/api/users/change/password/${email}`);
    return response.data;
  },
};
