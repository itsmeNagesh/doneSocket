const prompts = [
  { id: 1, icon: '💼', text: 'Study vocabulary' },
  { id: 2, icon: '💡', text: 'Write a story in my favorite genre' },
  { id: 3, icon: '👔', text: 'Pick outfit to look good on camera' },
  { id: 4, icon: '✍️', text: 'Thank my interviewer' },
];

export default function SuggestedPrompts({ onSelectPrompt }) {
  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="grid grid-cols-2 gap-4">
        {prompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => onSelectPrompt(prompt.text)}
            className="flex items-center gap-3 rounded-xl bg-gray-200/80 p-4 text-left hover:bg-gray-200"
          >
            <span className="text-2xl">{prompt.icon}</span>
            <span className="text-sm font-medium text-gray-700">{prompt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}