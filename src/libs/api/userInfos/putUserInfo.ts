import { client } from '../client';
import { UpdateUserInfoPayload, UserInfo } from './types/userInfos';

export async function putUserInfo(data: UpdateUserInfoPayload): Promise<UserInfo> {
  const formData = new FormData();

  if (data.nickname) formData.append('nickname', data.nickname);
  if (data.image) formData.append('image', data.image);
  if (data.imageChanged !== undefined) formData.append('imageChanged', String(data.imageChanged));
  if (data.introduction) formData.append('introduction', data.introduction);
  if (data.phoneNumber) formData.append('phoneNumber', data.phoneNumber);

  const response = await client.put<UserInfo>('/api/userInfos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
