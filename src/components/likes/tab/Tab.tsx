import styles from './Tab.module.css';

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
    <nav className={styles.nav}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
