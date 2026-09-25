import React from 'react';
import { TabType } from '../types';

interface BottomNavBarProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onChangeTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'today', label: 'Today', icon: 'check_circle' },
    { id: 'analytics', label: 'Analytics', icon: 'insights' },
    { id: 'timer', label: 'Timer', icon: 'timer' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center px-4 py-2 h-[72px] w-full max-w-md mx-auto bg-[#1e1f27]/90 backdrop-blur-xl shadow-lg border-t border-[#464556]/30">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            aria-label={tab.label}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-[#5b4dff] text-[#efebff] rounded-full px-4 py-1.5 shadow-md shadow-[#5b4dff]/25 font-semibold'
                : 'text-[#c7c4d9] hover:text-[#c4c0ff] px-3 py-1.5'
            }`}
          >
            <span
              className="material-symbols-outlined text-xl"
              data-icon={tab.icon}
              data-weight={isActive ? 'fill' : '0'}
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {tab.icon}
            </span>
            <span className="text-[11px] font-medium tracking-tight mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
