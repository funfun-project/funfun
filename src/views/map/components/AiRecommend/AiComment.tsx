import AiAnotherRecommend from './AiAnotherRecommend';

export default function AiComment() {
  return (
    <>
      <div className="from-main/10 to-gradient/10 border-main/25 -mt-3.5 mb-3.5 rounded-[5px] border-1 bg-linear-to-r px-3.75 py-4 text-white">
        <p className="text-body3 mb-2.5 text-justify break-all">
          홍대 앞은 서울에서 가장 트렌디하고 활기찬 구역 중 하나로, 낮과 밤 모두 다채로운 매력을
          지닌 ‘핫플’의 보고입니다. 산책, 카페, 쇼핑, 공연, 먹거리까지 모두 즐길 수 있죠.
        </p>
        <AiAnotherRecommend />
      </div>
    </>
  );
}
