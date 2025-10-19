import UserSettingHeader from './components/UserSettingHeader';
import MyPostCard, { Item } from './components/MyPostCard';

const myPosts: Item[] = [
  {
    id: 1,
    type: 'gathering',
    title: '베이스 치는 사람들 정기 모집',
    date: '2024.07.20',
    imageUrl: '/file.svg',
  },
  {
    id: 2,
    type: 'gathering',
    title: '베이스 치는 사람들 정기 모집',
    date: '2024.07.20',
    imageUrl: '/file.svg',
  },
  {
    id: 3,
    type: 'gathering',
    title: '베이스 치는 사람들 정기 모집',
    date: '2024.07.20',
    imageUrl: '/file.svg',
  },
  {
    id: 4,
    type: 'gathering',
    title: '재즈 페스티벌 같이 갈 사람',
    date: '2024.08.15',
    imageUrl: '/file.svg',
  },
];

export default function UserClubContainer() {
  return (
    <>
      <UserSettingHeader title="내 게시물" />
      <main className="p-4">
        {myPosts.map((post) => (
          <MyPostCard key={post.id} item={post} />
        ))}
      </main>
    </>
  );
}
