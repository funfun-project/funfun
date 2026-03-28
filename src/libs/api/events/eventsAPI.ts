import { client } from '../client';
import type { GetContentsResponse, ContentsPage } from './events.types';

export const eventsAPI = {
  getEvent: async (
    params?: Record<string, string | number | undefined | null>,
  ): Promise<ContentsPage> => {
    const res = await client.get<GetContentsResponse>('/api/contents', { params });
    if (res.data.code !== '0000') {
      throw new Error(res.data.reason || res.data.message);
    }
    return res.data.data;
  },
};
