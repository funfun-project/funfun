'use client';

import { FormEvent, useMemo, useReducer, useRef, useState } from 'react';
import { chatReducer, initialChatState } from '@/libs/utils/chatbot';
import { ChatMessage } from '@/types/chatbot.types';
import Bubble from './components/bubble/Bubble';
import ErrorModal from './components/ErrorModal';
import { cn } from '@/libs/utils/twMerge';
import { Send } from 'lucide-react';
import Header from '@/common/header/Header';

function createId() {
  return crypto.randomUUID();
}

async function fetchAssistantReply(params: { messages: ChatMessage[] }): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: params.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || '서버 요청에 실패했습니다.');
  }

  return await response.text();
}

export default function Chatbot() {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);
  const [onModal, setOnModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<ChatMessage | null>(null);
  const submittingRef = useRef(false);

  // 말풍선 보여주는 영역에 말풍선을 시간별로 정렬
  const sortedMessages = useMemo(
    () => [...state.messages].sort((a, b) => a.createdAt - b.createdAt),
    [state.messages],
  );

  // 사용자 메세지 상태
  const hasPending = state.messages.some(
    (message) => message.status === 'sending' || message.status === 'loading',
  );

  async function sendMessage(content: string, retryOf?: string) {
    const trimmed = content.trim();
    if (!trimmed || submittingRef.current) return;

    submittingRef.current = true;

    const userMessageId = createId();
    const assistantMessageId = createId();

    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: trimmed,
      status: 'sending',
      error: null,
      createdAt: Date.now(),
      retryOf,
    };

    const assistantLoadingMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      status: 'loading',
      error: null,
      createdAt: Date.now() + 1,
    };

    dispatch({ type: 'ADD_USER_MESSAGE_OPTIMISTIC', payload: userMessage });
    dispatch({
      type: 'ADD_ASSISTANT_LOADING',
      payload: assistantLoadingMessage,
    });
    dispatch({ type: 'SET_INPUT', payload: '' });

    try {
      dispatch({
        type: 'MARK_USER_MESSAGE_SENT',
        payload: { id: userMessageId },
      });

      const requestMessages = [...state.messages, userMessage];
      const answer = await fetchAssistantReply({
        messages: requestMessages,
      });

      dispatch({
        type: 'SET_ASSISTANT_MESSAGE',
        payload: {
          id: assistantMessageId,
          content: answer,
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

      dispatch({
        type: 'MARK_USER_MESSAGE_ERROR',
        payload: {
          id: userMessageId,
          error: errorMessage,
        },
      });

      dispatch({
        type: 'REMOVE_MESSAGE',
        payload: {
          id: assistantMessageId,
        },
      });

      dispatch({
        type: 'MARK_ASSISTANT_ERROR',
        payload: {
          id: assistantMessageId,
          error: '응답 생성 실패',
        },
      });
    } finally {
      submittingRef.current = false;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void sendMessage(state.input);
  }

  async function handleRetry(message: ChatMessage) {
    await sendMessage(message.content, message.id);
  }

  function handleRemove(id: string) {
    dispatch({
      type: 'REMOVE_MESSAGE',
      payload: {
        id,
      },
    });
  }

  return (
    <div className="relative flex h-screen flex-col pt-[66px]">
      {/* 헤더 */}
      <Header />
      {/* 말풍선 영역 */}
      <div className="flex h-[calc(100%-120px)] grow-1 flex-col px-3.75">
        <div className="scrollbar min-h-0 flex-1 overflow-y-auto">
          {sortedMessages.length === 0 ? (
            <div className="text-sm text-gray-500">메시지를 입력하면 대화가 시작됩니다.</div>
          ) : (
            sortedMessages.map((message) => (
              <Bubble
                key={message.id}
                message={message}
                setOnModal={setOnModal}
                setModalMessage={setModalMessage}
              />
            ))
          )}
        </div>
        <div className="py-3.75">
          <button className="text-text-default text-body3 from-main h-[40px] w-full rounded-[5px] bg-linear-65 to-[#7F74FF] font-semibold">
            현재 대화 내용 기반으로 추천 받기
          </button>
        </div>
      </div>
      {/* 인풋 */}
      <form onSubmit={(e) => handleSubmit(e)} className={cn('w-full')}>
        <div className="flex h-[54px] w-full items-center justify-between gap-[20px] bg-[#2d2d2d] px-[15px]">
          <input
            className="text-text-default placeholder-text-disabled caret-main grow bg-transparent outline-none disabled:cursor-not-allowed"
            value={state.input}
            onChange={(e) => dispatch({ type: 'SET_INPUT', payload: e.target.value })}
            placeholder="메시지를 입력하세요"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!hasPending && state.input.trim()) {
                  void sendMessage(state.input);
                }
              }
            }}
          />

          <button
            type="submit"
            disabled={hasPending || !state.input.trim()}
            aria-label="메시지 전송"
            className={cn(
              'flex h-[32px] w-[32px] rounded-full pt-[7px] pl-[5px] transition-colors',
              hasPending || !state.input.trim() ? 'bg-[rgba(86,86,86,.3)]' : 'bg-main',
            )}
          >
            <Send
              size={19}
              className={cn(
                'text-[16px]',
                hasPending || !state.input.trim() ? 'text-[#565656]' : 'text-white',
              )}
            />
          </button>
        </div>
      </form>
      {onModal && (
        <ErrorModal
          onRemove={handleRemove}
          onRetry={handleRetry}
          message={modalMessage}
          setOnModal={setOnModal}
        />
      )}
    </div>
  );
}
