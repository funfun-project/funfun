export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  bio?: string;
  phoneNumber?: string;
}

export interface UpdateUserInfoPayload {
  nickname?: string;
  image?: File | null;
  imageChanged?: boolean;
  introduction?: string;
  phoneNumber?: string;
}
