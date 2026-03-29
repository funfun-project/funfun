'use client';
import { Sparkle } from 'lucide-react';

type Props = { onClick: () => void };

export default function AiRecommendFloatingButton({ onClick }: Props) {
  return (
    <div className="relative w-11.5">
      {/* SVG 설정*/}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF46E6" />
          <stop offset="100%" stopColor="#FF5126" />
        </linearGradient>
      </svg>

      <div className="group relative z-50 cursor-pointer">
        {/* 말풍선 컨테이너*/}
        <div className="pointer-events-none absolute -top-11 left-1/2 flex -translate-x-1/2 flex-col items-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="text-body4 relative rounded-full bg-linear-to-r from-[#FF46E6] to-[#FF5126] px-3 py-1.5 font-bold whitespace-nowrap text-white shadow-lg">
            Ai 빠른 추천
            {/* 말풍선 꼬리*/}
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#FF5126]" />
          </div>
        </div>

        <button
          onClick={onClick}
          className="flex h-11.5 w-11.5 items-center justify-center rounded-full border border-gray-100 bg-white shadow-[0_0_2px_rgba(0,0,0,0.4)] transition-all duration-300 active:scale-90"
        >
          <Sparkle size={32} stroke="url(#ai-gradient)" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
