export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  introduction?: string;
  phoneNumber?: string;
  followerCount?: number;
  followingCount?: number;
}

export interface UpdateUserInfoPayload {
  nickname?: string;
  image?: File | null;
  imageChanged?: boolean;
  introduction?: string;
  phoneNumber?: string;
}
