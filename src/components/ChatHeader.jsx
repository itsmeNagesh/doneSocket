import { ArrowLeftIcon, Bars3Icon } from '@heroicons/react/24/solid';

export default function ChatHeader({ onBack, onToggleSidebar }) {
  return (
    <div className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onToggleSidebar} className="mr-2 text-gray-600 hover:text-purple-600">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <button onClick={onBack} className="text-purple-600 hover:text-purple-700">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-xl font-semibold">APEXIQ</h1>
        </div>
      </div>
    </div>
  );
}