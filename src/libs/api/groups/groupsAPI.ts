import { client } from '../client';
import type { GroupSearchParams, GetGroupsSearchResponse, GroupsPage } from './groups.types';

export interface Group {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  // Add other fields as needed based on actual response
}

export const groupsAPI = {
  getMyGroups: async () => {
    const response = await client.get<Group[]>('/api/groups/getMy');
    return response.data;
  },
  getMyLeaderGroups: async () => {
    const response = await client.get<Group[]>('/api/groups/getLeaderMy');
    return response.data;
  },
  leaveGroup: async (groupId: number) => {
    const response = await client.post<void>(`/api/participants/${groupId}/leave`);
    return response.data;
  },
  searchGroups: async (params: GroupSearchParams = {}): Promise<GroupsPage> => {
    const res = await client.get<GetGroupsSearchResponse>('/api/groups/search', {
      params: {
        category: params.category ?? undefined,
        keyword: params.keyword?.trim() || undefined,
        sortBy: params.sortBy ?? 'distance',
        page: params.page ?? 0,
        size: params.size ?? 20,
      },
    });

    if (res.data.code !== '0000') {
      throw new Error(res.data.reason || res.data.message);
    }
    return res.data.data;
  },
};
