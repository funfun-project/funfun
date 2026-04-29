import ChatMessages from '@/components/chatbot/ChatbotMessages';
import ChatbotInput from './components/ChatbotInput';

export default function Chatbot() {
  return (
    <main className="flex h-screen w-full flex-col bg-black text-white">
      <div className="flex h-[56px] items-center border-b border-neutral-800 px-4">AI 큐큐</div>

      <ChatMessages />
      <ChatbotInput />
    </main>
  );
}
