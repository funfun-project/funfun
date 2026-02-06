import Map from '@/views/map/Map';
import Script from 'next/script';
import type { Metadata } from 'next';

//메타 데이터 사용하기

// type Props = {
//   params: { id: string };
// };

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }): Promise<Metadata> {
//   const post = await fetch(`https://api.example.com/posts/${params.id}`).then((res) => res.json());
//   return {
//     title: post.title,
//     description: post.summary,
//     openGraph: {
//       title: post.title,
//       description: post.summary,
//     },
//   };
// }

// 안전하게 데이터 패칭하기 generateMetadata에 쓰인 getPost는 두번 패칭 되지 않는다.
//기본적으로는 “두 번 패칭하지 않습니다.” generateMetadata와 page에서 같은 fetch를 쓰면, Next.js가 자동으로 요청을 deduplication(중복 제거) 합니다.
// async function getPost(id: string) {
//   return fetch(`https://api.example.com/posts/${id}`, {
//     cache: 'force-cache', // 기본값
//   }).then(res => res.json());
// }

// export async function generateMetadata({ params }) {
//   const post = await getPost(params.id);
//   return { title: post.title };
// }

// export default async function Page({ params }) {
//   const post = await getPost(params.id);
//   return <div>{post.title}</div>;
// }

// 동적 라우트   세그먼트 가져오기
// export default async function Page({ params }: { params: Promise<{ gatheringId: string }> }) {
//   const { gatheringId } = await params;
export default function page() {
  return (
    <>
      <Script
        id="naver-maps-sdk"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        strategy="afterInteractive"
      />
      {/* <MapClient /> */}
      <Map />
      {/* <DatetimePicker /> */}
      {/* <LocationSelect /> */}
    </>
  );
}
