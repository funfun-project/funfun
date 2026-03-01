'use client';

import { useChatStore } from '@/stores/useChatbotStore';
import { useEffect, useRef } from 'react';

export default function ChatMessages() {
  const messages = useChatStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
      <div className="flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[80%] rounded-lg px-4 py-3 ${
              msg.role === 'assistant'
                ? 'self-start bg-neutral-700'
                : 'self-end bg-orange-500 text-white'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <button className="from-main w-full rounded-[5px] bg-gradient-to-r to-[#7F74FF] py-3 font-semibold">
          현재 대화 내용 기반으로 추천 받기
        </button>
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
