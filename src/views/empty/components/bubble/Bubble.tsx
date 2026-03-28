import { bubbleTime } from '@/libs/utils/chatting';
import { cn } from '@/libs/utils/twMerge';
import { ChatMessage } from '@/types/chatbot.types';
import { Info } from 'lucide-react';
import LoadingDots from '@/common/loadingDots/LoadingDots';
import { SetStateAction, Dispatch } from 'react';

type Props = {
  className?: string;
  message: ChatMessage;
  setOnModal: Dispatch<SetStateAction<boolean>>;
  setModalMessage: Dispatch<SetStateAction<ChatMessage | null>>;
};
export default function Bubble({ className, message, setOnModal, setModalMessage }: Props) {
  const isUser = message.role === 'user';
  const date = new Date(message.createdAt);

  return (
    <>
      <div className={cn('mb-5 flex', isUser ? 'justify-end' : 'justify-start')}>
        <div className={cn('flex flex-col gap-[5px]')}>
          <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'text-text-default relative w-fit max-w-[240px] rounded-[10px] border-2 border-transparent px-2 py-1.5',
                message.error && 'border-2 border-[#ff0000]',
                message.status === 'loading' && 'px-7.25 py-3.5',
                message.role === 'user'
                  ? 'rounded-tr-none bg-[rgba(255,81,38,.7)]'
                  : 'rounded-tl-none bg-[#3a3a3a]',
                className,
              )}
            >
              {message.status === 'loading' ? (
                <LoadingDots className="bg-[#f6f6f6]" />
              ) : (
                <span className="break-words whitespace-pre-wrap">{message.content}</span>
              )}
              {message.error && isUser && (
                <button
                  onClick={() => {
                    setOnModal(true);
                    setModalMessage(message);
                  }}
                  className="absolute bottom-0 -left-[25px]"
                >
                  <Info size={18} color="#ff0000" strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
          <p className="text-body4 text-text-disabled">{bubbleTime(date)}</p>
        </div>
      </div>
    </>
  );
}
