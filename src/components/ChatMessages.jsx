export default function ChatMessages({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 flex ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`rounded-lg p-3 ${
              message.type === 'user'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
}