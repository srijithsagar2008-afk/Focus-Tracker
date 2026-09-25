import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Habit } from '../types';
import { soundscapes } from '../utils/audio';

interface TimerScreenProps {
  currentHabit?: Habit;
  onSessionComplete?: () => void;
  isLofiActive?: boolean;
}

export const TimerScreen: React.FC<TimerScreenProps> = ({
  currentHabit,
  onSessionComplete,
  isLofiActive,
}) => {
  // Timer state (starting at 24:18 as in the image or 25:00 target)
  const [secondsLeft, setSecondsLeft] = useState<number>(24 * 60 + 18);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [intervalStep, setIntervalStep] = useState<number>(2); // Interval 2 of 4
  const [currentSubject, setCurrentSubject] = useState<string>('Chemistry');
  const [subjects, setSubjects] = useState<string[]>(['Chemistry', 'Calculus', 'History']);
  const [flipToFocus, setFlipToFocus] = useState<boolean>(true);
  const [strictShield, setStrictShield] = useState<boolean>(true);
  const [activeAtmosphere, setActiveAtmosphere] = useState<'rain' | 'library' | 'binaural' | 'none'>('rain');
  const [newTagPrompt, setNewTagPrompt] = useState<boolean>(false);
  const [newTagText, setNewTagText] = useState<string>('');

  const totalSeconds = 25 * 60; // 25:00 target

  // Timer interval effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 },
            });
            onSessionComplete?.();
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft, onSessionComplete]);

  // Audio atmosphere controller
  const handleToggleAtmosphere = (type: 'rain' | 'library' | 'binaural') => {
    if (activeAtmosphere === type) {
      soundscapes.stop();
      setActiveAtmosphere('none');
    } else {
      soundscapes.play(type);
      setActiveAtmosphere(type);
    }
  };

  const handleRewind10 = () => {
    setSecondsLeft((prev) => Math.min(totalSeconds, prev + 10));
  };

  const handleSkipNext = () => {
    if (intervalStep < 4) {
      setIntervalStep((prev) => prev + 1);
      setSecondsLeft(totalSeconds);
      setIsRunning(true);
    } else {
      setIntervalStep(1);
      setSecondsLeft(totalSeconds);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressFraction = (totalSeconds - secondsLeft) / totalSeconds;
  // Circumference for r=88 is 2 * PI * 88 = 552.92
  const circumference = 552.92;
  const strokeDashoffset = circumference - (circumference * progressFraction);

  const handleAddTag = () => {
    if (newTagText.trim() && !subjects.includes(newTagText.trim())) {
      setSubjects([...subjects, newTagText.trim()]);
      setCurrentSubject(newTagText.trim());
      setNewTagText('');
      setNewTagPrompt(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto pt-20 pb-28 px-4 sm:px-5 flex flex-col gap-5">
      {/* Subheader & Screen Title */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#c4c0ff] tracking-widest uppercase">
            NOCTURNAL STUDY COCKPIT
          </span>
          <h1 className="text-2xl font-bold text-[#e3e1ec] font-display tracking-tight">
            Focus Room
          </h1>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a1b22] border border-[#4edea3]/40">
          <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
          <span className="text-xs font-semibold text-[#4edea3]">Active Flow</span>
        </div>
      </div>

      {/* Habit in Progress Banner */}
      <div className="p-3.5 rounded-2xl bg-[#1a1b22] border border-white/[0.08] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#5b4dff]/20 border border-[#5b4dff]/30 flex items-center justify-center text-[#c4c0ff]">
            <span className="material-symbols-outlined text-xl" data-icon="menu_book">
              menu_book
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#918fa2]">Habit in progress</span>
            <span className="text-sm font-bold text-[#e3e1ec]">
              {currentHabit ? currentHabit.name : 'Deep Work'}
            </span>
            <span className="text-xs text-[#918fa2]">
              {currentHabit ? currentHabit.details : 'Organic Chemistry Study • Reaction Mechanisms'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#975f00]/30 border border-[#ffb95f]/40 glow-streak">
          <span
            className="material-symbols-outlined text-xs text-[#ffb95f]"
            data-icon="local_fire_department"
            data-weight="fill"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <span className="text-[11px] font-bold text-[#ffb95f]">
            {currentHabit ? `${currentHabit.streak} Days` : '14 Days'}
          </span>
        </div>
      </div>

      {/* Main Pomodoro Cockpit Tile */}
      <div className="relative p-6 rounded-3xl bg-[#1a1b22] border border-white/[0.08] flex flex-col items-center gap-5 shadow-xl">
        {/* Interval Header */}
        <div className="w-full flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#c7c4d9] font-medium">Interval {intervalStep} of 4</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((step) => (
                <span
                  key={`dot-${step}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    step <= intervalStep ? 'bg-[#4edea3]' : 'bg-[#34343c]'
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#292931] text-[#918fa2] border border-white/5 font-medium">
            5m break next
          </span>
        </div>

        {/* Circular Glowing Gauge */}
        <div className="relative w-56 h-56 flex items-center justify-center my-2">
          {/* Ambient Glow backing */}
          <div className="absolute inset-4 rounded-full bg-[#5b4dff]/20 blur-xl pointer-events-none"></div>

          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
            {/* Background Track */}
            <circle
              className="text-[#292931]"
              cx="100"
              cy="100"
              fill="none"
              r="88"
              stroke="currentColor"
              strokeWidth="6"
            />
            {/* Active Arc */}
            <circle
              className="text-[#5b4dff] transition-all duration-300 drop-shadow-[0_0_12px_rgba(91,77,255,0.8)]"
              cx="100"
              cy="100"
              fill="none"
              r="88"
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#4edea3]">
              POMODORO
            </span>
            <span className="text-5xl font-bold text-white font-display tracking-tight my-0.5 tabular-nums">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-xs text-[#918fa2]">25:00 Target</span>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-center gap-5 w-full pt-1">
          {/* Rewind 10s */}
          <button
            onClick={handleRewind10}
            aria-label="Rewind 10 seconds"
            className="w-12 h-12 rounded-full bg-[#292931] border border-white/10 flex items-center justify-center text-[#c7c4d9] hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-xl" data-icon="replay_10">
              replay_10
            </span>
          </button>

          {/* Pause / Resume Focus Button */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1 max-w-[180px] h-12 rounded-full bg-[#5b4dff] text-white font-semibold text-sm shadow-[0_0_20px_rgba(91,77,255,0.4)] hover:bg-[#5b4dff]/90 active:scale-95 transition-all flex items-center justify-center gap-2"
            type="button"
          >
            <span
              className="material-symbols-outlined text-xl"
              data-icon={isRunning ? 'pause' : 'play_arrow'}
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isRunning ? 'pause' : 'play_arrow'}
            </span>
            <span>{isRunning ? 'Pause Focus' : 'Resume Focus'}</span>
          </button>

          {/* Skip Forward */}
          <button
            onClick={handleSkipNext}
            aria-label="Skip to Next Interval"
            className="w-12 h-12 rounded-full bg-[#292931] border border-white/10 flex items-center justify-center text-[#c7c4d9] hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-xl" data-icon="skip_next">
              skip_next
            </span>
          </button>
        </div>
      </div>

      {/* Current Focus Subject Tags */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#c7c4d9]">
            CURRENT FOCUS SUBJECT
          </span>
          <button
            onClick={() => setNewTagPrompt(true)}
            className="text-xs text-[#c4c0ff] hover:underline font-semibold"
          >
            + New Tag
          </button>
        </div>

        {newTagPrompt && (
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1a1b22] border border-[#5b4dff]/40">
            <input
              type="text"
              placeholder="Tag name (e.g. Physics, Biology)"
              value={newTagText}
              onChange={(e) => setNewTagText(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white outline-none px-2 py-1"
            />
            <button
              onClick={handleAddTag}
              className="px-3 py-1 bg-[#5b4dff] text-white text-xs font-semibold rounded-lg"
            >
              Add
            </button>
            <button
              onClick={() => setNewTagPrompt(false)}
              className="px-2 py-1 text-xs text-[#918fa2]"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {subjects.map((sub) => {
            const isSelected = currentSubject === sub;
            const emoji =
              sub.toLowerCase().includes('chem')
                ? '🧪'
                : sub.toLowerCase().includes('calc') || sub.toLowerCase().includes('math')
                ? '📐'
                : '📚';

            return (
              <button
                key={sub}
                onClick={() => setCurrentSubject(sub)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#5b4dff]/20 text-[#c4c0ff] border border-[#5b4dff] shadow-[0_0_12px_rgba(91,77,255,0.25)]'
                    : 'bg-[#1a1b22] text-[#c7c4d9] border border-white/10 hover:border-white/20'
                }`}
                type="button"
              >
                <span>{sub}</span>
                <span>{emoji}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Switches Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Flip to Focus */}
        <div className="p-3.5 rounded-2xl bg-[#1a1b22] border border-white/[0.08] flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="material-symbols-outlined text-lg text-[#c4c0ff]" data-icon="screen_rotation">
              screen_rotation
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={flipToFocus}
                onChange={() => setFlipToFocus(!flipToFocus)}
                className="sr-only peer"
              />
              <div className="w-10 h-5.5 bg-[#34343c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#00a572]"></div>
            </label>
          </div>
          <div>
            <span className="block text-xs font-semibold text-[#e3e1ec]">Flip to Focus</span>
            <span className="block text-[11px] text-[#918fa2] leading-tight mt-0.5">
              Pause timer if screen is picked up
            </span>
          </div>
        </div>

        {/* Strict Shield */}
        <div className="p-3.5 rounded-2xl bg-[#1a1b22] border border-white/[0.08] flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="material-symbols-outlined text-lg text-[#4edea3]" data-icon="shield">
              shield
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={strictShield}
                onChange={() => setStrictShield(!strictShield)}
                className="sr-only peer"
              />
              <div className="w-10 h-5.5 bg-[#34343c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#00a572]"></div>
            </label>
          </div>
          <div>
            <span className="block text-xs font-semibold text-[#e3e1ec]">Strict Shield</span>
            <span className="block text-[11px] text-[#918fa2] leading-tight mt-0.5">
              38 distracting apps blocked
            </span>
          </div>
        </div>
      </div>

      {/* Background Atmosphere Soundscapes */}
      <div className="p-4 rounded-2xl bg-[#1a1b22] border border-white/[0.08] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb95f] text-lg" data-icon="graphic_eq">
              graphic_eq
            </span>
            <span className="text-sm font-semibold text-[#e3e1ec]">Background Atmosphere</span>
          </div>
          <span
            className={`text-xs font-semibold ${
              activeAtmosphere !== 'none' || isLofiActive ? 'text-[#4edea3]' : 'text-[#918fa2]'
            }`}
          >
            {activeAtmosphere !== 'none' || isLofiActive ? 'Playing' : 'Paused'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Cozy Rain */}
          <button
            onClick={() => handleToggleAtmosphere('rain')}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 ${
              activeAtmosphere === 'rain'
                ? 'bg-[#5b4dff]/20 border-[#5b4dff] text-[#c4c0ff] shadow-[0_0_12px_rgba(91,77,255,0.3)]'
                : 'bg-[#292931]/60 border-white/5 text-[#c7c4d9] hover:border-white/20'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-xl" data-icon="rainy">
              rainy
            </span>
            <span className="text-[11px] font-semibold">Cozy Rain</span>
          </button>

          {/* Library Ambience */}
          <button
            onClick={() => handleToggleAtmosphere('library')}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 ${
              activeAtmosphere === 'library'
                ? 'bg-[#5b4dff]/20 border-[#5b4dff] text-[#c4c0ff] shadow-[0_0_12px_rgba(91,77,255,0.3)]'
                : 'bg-[#292931]/60 border-white/5 text-[#c7c4d9] hover:border-white/20'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-xl" data-icon="local_library">
              local_library
            </span>
            <span className="text-[11px] font-semibold text-center leading-tight">
              Library Ambience
            </span>
          </button>

          {/* Binaural 40Hz */}
          <button
            onClick={() => handleToggleAtmosphere('binaural')}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 ${
              activeAtmosphere === 'binaural'
                ? 'bg-[#5b4dff]/20 border-[#5b4dff] text-[#c4c0ff] shadow-[0_0_12px_rgba(91,77,255,0.3)]'
                : 'bg-[#292931]/60 border-white/5 text-[#c7c4d9] hover:border-white/20'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-xl" data-icon="waves">
              waves
            </span>
            <span className="text-[11px] font-semibold text-center leading-tight">
              Binaural 40Hz
            </span>
          </button>
        </div>
      </div>

      {/* Inspiring Quote Card */}
      <div className="p-4 rounded-2xl bg-[#1a1b22] border border-white/[0.08] flex items-start gap-3">
        <span className="text-2xl text-[#ffb95f] font-serif leading-none mt-1">“</span>
        <div className="flex flex-col">
          <p className="text-xs italic text-[#e3e1ec] leading-relaxed">
            "Small daily disciplines compound into massive academic breakthroughs."
          </p>
          <span className="text-[11px] text-[#918fa2] mt-1 font-medium">
            — Discipline Protocol #04
          </span>
        </div>
      </div>
    </div>
  );
};
