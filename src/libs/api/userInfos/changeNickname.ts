import { client } from '../client';

export async function changeNickname(nickname: string): Promise<void> {
  await client.patch('/api/users/change/nickname', { nickname });
}
