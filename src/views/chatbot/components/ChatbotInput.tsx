'use client';

import { useSendChatbot } from '@/libs/hook/use-chatbot/useSendChatbot';
import { useChatStore } from '@/stores/useChatbotStore';
import { useState } from 'react';
import { LuSend } from 'react-icons/lu';

export default function ChatbotInput() {
  const [value, setValue] = useState('');
  const addMessage = useChatStore((state) => state.addMessage);
  const sendMutation = useSendChatbot();

  const isActive = value.trim().length > 0;

  const handleSend = () => {
    if (!value.trim()) return;
    addMessage({
      id: crypto.randomUUID(),
      role: 'user',
      content: value,
    });

    sendMutation.mutate(value);

    setValue('');
  };

  return (
    <div className="flex items-center gap-2 border-t border-neutral-800 bg-neutral-900 p-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
        className="flex-1 rounded-md bg-neutral-800 px-3 py-2 text-white outline-none"
        placeholder="질문을 입력하세요"
      />
      <button
        onClick={handleSend}
        disabled={!isActive}
        className={`flex items-center justify-center rounded-full p-3 transition-all duration-200 ${isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#565656]'} `}
      >
        <LuSend size={20} className={`${isActive ? 'text-white' : 'text-gray-400'}`} />
      </button>
    </div>
  );
}
