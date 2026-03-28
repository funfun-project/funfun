import { ChatAction, ChatState } from '@/types/chatbot.types';

export const initialChatState: ChatState = {
  input: '',
  messages: [],
};

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        input: action.payload,
      };

    case 'ADD_USER_MESSAGE_OPTIMISTIC':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case 'MARK_USER_MESSAGE_SENT':
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === action.payload.id ? { ...message, status: 'sent', error: null } : message,
        ),
      };

    case 'MARK_USER_MESSAGE_ERROR':
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === action.payload.id
            ? {
                ...message,
                status: 'error',
                error: action.payload.error,
              }
            : message,
        ),
      };

    case 'ADD_ASSISTANT_LOADING':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case 'SET_ASSISTANT_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === action.payload.id
            ? {
                ...message,
                content: action.payload.content,
                status: 'done',
                error: null,
              }
            : message,
        ),
      };

    case 'MARK_ASSISTANT_ERROR':
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === action.payload.id
            ? {
                ...message,
                status: 'error',
                error: action.payload.error,
              }
            : message,
        ),
      };

    case 'RESET_CHAT':
      return initialChatState;

    case 'REMOVE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter((message) => message.id !== action.payload.id),
      };

    default:
      return state;
  }
}
