import { useChatStore } from '@/stores/useChatbotStore';
import { useMutation } from '@tanstack/react-query';

interface ChatResponse {
  reply: string;
}

export const useSendChatbot = () => {
  const { addMessage } = useChatStore();

  return useMutation<string, Error, string>({
    mutationFn: async (message: string): Promise<string> => {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error('챗봇 요청 실패');
      }

      const raw: unknown = await res.json();
      const data = raw as ChatResponse;

      return data.reply;
    },

    onSuccess: (reply) => {
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
      });
    },
  });
};
