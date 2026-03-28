export type MessageRole = 'user' | 'assistant';

export type MessageStatus = 'sending' | 'sent' | 'loading' | 'done' | 'error';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  status: MessageStatus;
  error: string | null;
  createdAt: number;
  retryOf?: string;
};

export type ChatState = {
  input: string;
  messages: ChatMessage[];
};

export type ChatAction =
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'ADD_USER_MESSAGE_OPTIMISTIC'; payload: ChatMessage }
  | { type: 'MARK_USER_MESSAGE_SENT'; payload: { id: string } }
  | { type: 'MARK_USER_MESSAGE_ERROR'; payload: { id: string; error: string } }
  | { type: 'ADD_ASSISTANT_LOADING'; payload: ChatMessage }
  | {
      type: 'SET_ASSISTANT_MESSAGE';
      payload: { id: string; content: string };
    }
  | { type: 'MARK_ASSISTANT_ERROR'; payload: { id: string; error: string } }
  | { type: 'RESET_CHAT' }
  | { type: 'REMOVE_MESSAGE'; payload: { id: string } };
