import { getUserInfo } from './getUserInfo';
import { putUserInfo } from './putUserInfo';
import { UpdateUserInfoPayload } from './types/userInfos';

export const userInfosAPI = {
  getUserInfo: () => getUserInfo(),
  updateProfile: (data: UpdateUserInfoPayload) => putUserInfo(data),
};
