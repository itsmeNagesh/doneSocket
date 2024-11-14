import { PlusIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

export default function Sidebar({ show, chatHistory, onNewChat, onSelectChat, currentChatId }) {
  if (!show) return null;

  return (
    <div className="w-64 bg-[#9F60B9] p-4 text-white">
      <button
        onClick={onNewChat}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-white hover:bg-white/10"
      >
        <PlusIcon className="h-5 w-5" />
        New Chat
      </button>
      
      <div className="space-y-2">
        {chatHistory.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex w-full items-center gap-2 rounded-lg p-3 text-left transition-colors ${
              currentChatId === chat.id
                ? 'bg-white/20'
                : 'hover:bg-white/10'
            }`}
          >
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <span className="truncate">{chat.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}