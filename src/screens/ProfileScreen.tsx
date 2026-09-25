import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface ProfileScreenProps {
  onResetData?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onResetData }) => {
  const [userName, setUserName] = useState('Alex');
  const [major, setMajor] = useState('Pre-Med & Chemistry Major');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [haptics, setHaptics] = useState(true);

  const handleLevelUpCheer = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto pt-20 pb-28 px-4 sm:px-5 flex flex-col gap-6">
      {/* Profile Header Card */}
      <section className="bg-[#1a1b22] p-5 rounded-2xl border border-white/10 flex items-center gap-4 relative overflow-hidden shadow-sm">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#5b4dff]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#5b4dff] to-[#4edea3] p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-[#12131a] flex items-center justify-center text-2xl font-bold text-white font-display">
              A
            </div>
          </div>
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#4edea3] border-2 border-[#12131a]"></span>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white font-display">{userName}</h1>
            <button
              onClick={handleLevelUpCheer}
              className="px-2 py-0.5 rounded-full bg-[#5b4dff]/20 border border-[#5b4dff]/40 text-[#c4c0ff] text-[10px] font-bold"
            >
              LVL 4 SCHOLAR
            </button>
          </div>
          <p className="text-xs text-[#918fa2] mt-0.5">{major}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-[#c7c4d9]">
            <span className="flex items-center gap-1 text-[#ffb95f] font-semibold">
              <span className="material-symbols-outlined text-sm" data-icon="local_fire_department" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
              14d Streak
            </span>
            <span>•</span>
            <span className="text-[#4edea3] font-semibold">14,850 XP</span>
          </div>
        </div>
      </section>

      {/* Academic Bento Stats */}
      <section className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-[#1a1b22] border border-white/5 flex flex-col justify-between">
          <span className="text-xs text-[#918fa2]">Weekly Study Time</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-white font-display">18.5h</span>
            <span className="block text-[11px] text-[#4edea3] mt-0.5">Target reached (18h)</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#1a1b22] border border-white/5 flex flex-col justify-between">
          <span className="text-xs text-[#918fa2]">Focus Quality</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-white font-display">94%</span>
            <span className="block text-[11px] text-[#c4c0ff] mt-0.5">Optimal cognitive state</span>
          </div>
        </div>
      </section>

      {/* Badges Collection */}
      <section className="bg-[#1a1b22] p-4 rounded-2xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white font-display">Earned Accolades</h2>
          <span className="text-xs text-[#c4c0ff]">4 Unlocked</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-[#292931]/60 border border-[#4edea3]/30 flex flex-col items-center">
            <span className="text-2xl">🦉</span>
            <span className="text-[10px] font-semibold text-[#e3e1ec] mt-1 line-clamp-1">Night Owl</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#292931]/60 border border-[#ffb95f]/30 flex flex-col items-center">
            <span className="text-2xl">⚡</span>
            <span className="text-[10px] font-semibold text-[#e3e1ec] mt-1 line-clamp-1">Anki Sprint</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#292931]/60 border border-[#5b4dff]/30 flex flex-col items-center">
            <span className="text-2xl">🧪</span>
            <span className="text-[10px] font-semibold text-[#e3e1ec] mt-1 line-clamp-1">Orgo Master</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#292931]/30 border border-white/5 opacity-60 flex flex-col items-center">
            <span className="text-2xl">🏆</span>
            <span className="text-[10px] font-semibold text-[#918fa2] mt-1 line-clamp-1">21-Day Titan</span>
          </div>
        </div>
      </section>

      {/* App & Focus Settings */}
      <section className="bg-[#1a1b22] p-4 rounded-2xl border border-white/10 space-y-3">
        <h2 className="text-sm font-semibold text-white font-display">Study Cockpit Preferences</h2>

        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#c4c0ff] text-lg" data-icon="volume_up">
              volume_up
            </span>
            <span className="text-xs font-medium text-[#e3e1ec]">Background Soundscapes</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={() => setSoundEnabled(!soundEnabled)}
              className="sr-only peer"
            />
            <div className="w-10 h-5.5 bg-[#34343c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#00a572]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ffb95f] text-lg" data-icon="notifications">
              notifications
            </span>
            <span className="text-xs font-medium text-[#e3e1ec]">Evening Study Reminders</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="sr-only peer"
            />
            <div className="w-10 h-5.5 bg-[#34343c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#00a572]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#4edea3] text-lg" data-icon="vibration">
              vibration
            </span>
            <span className="text-xs font-medium text-[#e3e1ec]">Haptic & Completion Celebrations</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={haptics}
              onChange={() => setHaptics(!haptics)}
              className="sr-only peer"
            />
            <div className="w-10 h-5.5 bg-[#34343c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#00a572]"></div>
          </label>
        </div>
      </section>

      {/* Reset & Demo Utilities */}
      {onResetData && (
        <div className="text-center pt-2">
          <button
            onClick={onResetData}
            className="text-xs text-[#918fa2] hover:text-[#ffb4ab] transition-colors"
          >
            Reset Routine to Default Mock Data
          </button>
        </div>
      )}
    </div>
  );
};
