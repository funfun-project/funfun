import { client } from '../client';

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
};
