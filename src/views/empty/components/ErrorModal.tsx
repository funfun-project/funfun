import { ChatMessage } from '@/types/chatbot.types';
import { SetStateAction, Dispatch } from 'react';

type Props = {
  onRetry: (message: ChatMessage) => Promise<void>;
  onRemove: (id: string) => void;
  message: ChatMessage | null;
  setOnModal: Dispatch<SetStateAction<boolean>>;
};

export default function ErrorModal({ onRetry, onRemove, message, setOnModal }: Props) {
  return (
    <>
      <div
        onClick={() => setOnModal(false)}
        className="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,.4)]"
      >
        <div className="flex w-[260px] flex-col gap-6.25 rounded-[10px] bg-[#3a3a3a] p-[15px]">
          <h2 className="text-body3 text-[#FF0404]">전송 실패</h2>
          <div className="text-text-default text-body3 flex flex-col gap-3.75">
            <button
              className="text-start"
              onClick={() => {
                if (!message) return;
                onRemove(message.id);
                setOnModal(false);
              }}
            >
              메세지 삭제
            </button>
            <button
              className="text-start"
              onClick={() => {
                if (!message) return;
                void onRetry(message);
                setOnModal(false);
              }}
            >
              다시 보내기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
