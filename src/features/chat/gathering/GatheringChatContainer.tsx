'use client';

import { ChevronLeft, MoreVertical, Send } from 'lucide-react';
import { useState } from 'react';

export default function GatheringChatContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen justify-center bg-[#121212] font-sans text-white">
      <div className="relative flex w-full max-w-[750px] flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4">
          <button>
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-body1">베이스 치는 사람들</h1>
          <button onClick={() => setIsModalOpen(true)}>
            <MoreVertical size={20} />
          </button>
        </header>

        {isModalOpen && (
          <div
            className="absolute inset-0 z-50 flex items-start justify-end pt-16 pr-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="rounded-lg bg-[#393939] shadow-lg" onClick={(e) => e.stopPropagation()}>
              <button
                className="text-text-default block w-full px-5 py-2"
                onClick={() => setIsModalOpen(false)}
              >
                팔로잉
              </button>
              <button
                className="text-text-default block w-full px-5 py-2"
                onClick={() => setIsModalOpen(false)}
              >
                나가기
              </button>
            </div>
          </div>
        )}

        {/* Chat Area */}

        <main className="flex-grow space-y-6 overflow-y-auto p-4">
          {messages.map((msg) =>
            msg.type === 'incoming' ? (
              <IncomingMessage key={msg.id} msg={msg} />
            ) : (
              <OutgoingMessage key={msg.id} msg={msg} />
            ),
          )}
        </main>

        {/* Message Input Footer */}
        <footer className="p-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="메시지를 입력하세요"
              className="focus:border-text-active text-text-default placeholder:text-text-disabled text-body3 border-border w-full rounded-full border bg-transparent py-5 pr-12 pl-5 transition focus:outline-none"
            />
            <button className="hover:text-icon-active text-text-disabled absolute right-4">
              <Send size={22} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

// 채팅 메시지 목업 데이터
interface Message {
  id: number;
  type: 'incoming' | 'outgoing';
  sender?: string;
  avatar?: string;
  text: string;
  timestamp: string;
}

const messages: Message[] = [
  {
    id: 1,
    type: 'outgoing',
    text: '안녕하세요',
    timestamp: '오후 2시 30분',
  },
  {
    id: 2,
    type: 'incoming',
    sender: '배민녀',
    avatar:
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: '안녕하세요',
    timestamp: '오후 2시 31분',
  },
];

// 받은 메시지 컴포넌트

const IncomingMessage = ({ msg }: { msg: Message }) => (
  <div className="flex items-center space-x-3">
    <img src={msg.avatar} alt={msg.sender} className="h-10 w-10 rounded-full" />
    <div>
      <span className="text-text-default text-body3">{msg.sender}</span>
      <div className="flex items-end space-x-2">
        <div className="rounded-[10px] rounded-tl-none bg-[#393939] px-4 py-2">
          <p>{msg.text}</p>
        </div>
        <span className="text-text-disabled text-body4">{msg.timestamp}</span>
      </div>
    </div>
  </div>
);

// 보낸 메시지 컴포넌트
const OutgoingMessage = ({ msg }: { msg: Message }) => (
  <div className="flex justify-end">
    <div className="flex items-end space-x-2">
      <span className="text-body4 text-text-disabled">{msg.timestamp}</span>
      <div className="bg-text-active rounded-[10px] rounded-tr-none px-4 py-2 text-white">
        <p>{msg.text}</p>
      </div>
    </div>
  </div>
);
