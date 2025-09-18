export type TabType = 'event' | 'gathering' | 'place';

interface TabProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string }[] = [
  { id: 'event', label: '행사' },
  { id: 'gathering', label: '모임' },
  { id: 'place', label: '장소' },
];

export default function Tab({ activeTab, onTabChange }: TabProps) {
  return (
    <nav className="flex border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`relative flex-1 cursor-pointer border-none bg-transparent py-3.5 text-base font-medium text-gray-500 transition-colors ease-in-out hover:text-white ${
            activeTab === tab.id ? 'font-bold text-white' : ''
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="bg-icon-active absolute right-0 bottom-[-1px] left-0 h-0.5" />
          )}
        </button>
      ))}
    </nav>
  );
}
