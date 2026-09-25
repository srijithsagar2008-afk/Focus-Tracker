import React from 'react';
import { TabType } from '../types';

interface TopAppBarProps {
  currentTab: TabType;
  onOpenCalendar: () => void;
  isLofiActive?: boolean;
  onToggleLofi?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentTab,
  onOpenCalendar,
  isLofiActive,
  onToggleLofi,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-4 sm:px-5 h-16 w-full max-w-md mx-auto bg-[#0d0e15]/85 backdrop-blur-md shadow-sm border-b border-[#464556]/30">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-[#5b4dff]/20 border border-[#5b4dff]/40 flex items-center justify-center text-[#c4c0ff]">
          <span
            className="material-symbols-outlined text-[#c4c0ff] text-xl"
            data-icon="local_fire_department"
            data-weight="fill"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
        </div>
        <span className="text-[20px] font-bold text-[#c4c0ff] tracking-tight font-display">
          FocusTrack
        </span>
      </div>

      <div className="flex items-center gap-2">
        {currentTab === 'timer' && onToggleLofi && (
          <button
            onClick={onToggleLofi}
            aria-label="Toggle Lo-fi Audio"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all active:scale-95 ${
              isLofiActive
                ? 'bg-[#5b4dff] text-white border-[#c4c0ff]/50 shadow-[0_0_12px_rgba(91,77,255,0.4)]'
                : 'bg-[#1a1b22] text-[#c7c4d9] border-[#464556]/40 hover:text-[#c4c0ff]'
            }`}
          >
            <span className="material-symbols-outlined text-sm" data-icon="headphones">
              headphones
            </span>
            <span>Lo-fi</span>
            {isLofiActive && <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>}
          </button>
        )}

        <button
          onClick={onOpenCalendar}
          aria-label="Study Calendar"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#c7c4d9] hover:text-[#c4c0ff] hover:bg-white/5 transition-colors duration-150 active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]" data-icon="calendar_today">
            calendar_today
          </span>
        </button>
      </div>
    </header>
  );
};
