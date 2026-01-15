import { client } from '../client';

export interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export const noticesAPI = {
  getNotices: async (page = 0, size = 10) => {
    const response = await client.get<Notice[]>('/api/admin/notices', {
      params: { page, size },
    });
    return response.data;
  },
  getNoticeDetail: async (id: number) => {
    const response = await client.get<Notice>(`/api/admin/notices/${id}`);
    return response.data;
  },
};
