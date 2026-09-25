import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Habit, HabitCategory } from '../types';

interface CreateHabitScreenProps {
  onCancel: () => void;
  onSave: (habit: Habit) => void;
}

export const CreateHabitScreen: React.FC<CreateHabitScreenProps> = ({ onCancel, onSave }) => {
  const [habitName, setHabitName] = useState<string>('Solve 5 Calculus Problems');
  const [category, setCategory] = useState<HabitCategory>('study');
  const [targetDays, setTargetDays] = useState<'daily' | 'weekdays' | 'custom'>('daily');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'night'>('night');
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [afterI, setAfterI] = useState<string>('Finish evening dinner & clear desk');
  const [iWill, setIWill] = useState<string>('Solve 5 calculus problems with active recall');
  const [reward, setReward] = useState<string>('15 mins of lo-fi music relaxation');
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(true);
  const [reminderTime, setReminderTime] = useState<string>('08:30 PM');
  const [selectedColor, setSelectedColor] = useState<string>('#5b4dff');
  const [selectedEmblem, setSelectedEmblem] = useState<string>('functions');

  const categoriesList: { id: HabitCategory; label: string; icon: string }[] = [
    { id: 'study', label: 'Study & Academics', icon: 'school' },
    { id: 'health', label: 'Health & Body', icon: 'nutrition' },
    { id: 'sleep', label: 'Sleep & Rest', icon: 'bedtime' },
    { id: 'mindfulness', label: 'Mindfulness', icon: 'self_improvement' },
    { id: 'reading', label: 'Reading', icon: 'menu_book' },
  ];

  const colorsList = [
    { id: 'violet', hex: '#5b4dff', label: 'Electric Violet' },
    { id: 'emerald', hex: '#00a572', label: 'Emerald Discipline' },
    { id: 'amber', hex: '#ffb95f', label: 'Amber Spark' },
    { id: 'cyan', hex: '#00bcd4', label: 'Cyan Laser' },
    { id: 'coral', hex: '#ff5722', label: 'Coral Pulse' },
    { id: 'lavender', hex: '#9c27b0', label: 'Lavender Dusk' },
  ];

  const emblemsList = [
    { id: 'functions', icon: 'functions' },
    { id: 'calculate', icon: 'calculate' },
    { id: 'biotech', icon: 'biotech' },
    { id: 'draw', icon: 'draw' },
    { id: 'psychology', icon: 'psychology' },
    { id: 'code', icon: 'code' },
  ];

  const handleSave = () => {
    if (!habitName.trim()) return;

    const newHabit: Habit = {
      id: `habit-${Date.now()}`,
      name: habitName.trim(),
      category,
      categoryLabel: category.toUpperCase(),
      details: `${durationMinutes} min ${timeOfDay} block`,
      streak: 0,
      targetMinutes: durationMinutes,
      completed: false,
      color: selectedColor,
      emblem: selectedEmblem,
      actionButtonText: 'Start Timer',
      adherenceRate: 100,
      timeOfDay,
      frequency: targetDays,
      atomicFormula: {
        afterI,
        iWill,
        reward,
      },
      reminderEnabled,
      reminderTime,
    };

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 },
    });

    onSave(newHabit);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative flex flex-col bg-[#0d0e15] pb-32">
      {/* Top Modal Header */}
      <header className="sticky top-0 z-40 bg-[#0d0e15]/90 backdrop-blur-md px-4 sm:px-5 h-16 flex items-center justify-between border-b border-white/5 shadow-sm">
        <button
          onClick={onCancel}
          className="text-[#c7c4d9] hover:text-[#c4c0ff] text-sm font-semibold transition-colors active:scale-95 flex items-center gap-1"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]" data-icon="close">
            close
          </span>
          <span>Cancel</span>
        </button>

        <h1 className="text-base font-semibold text-[#e3e1ec] font-display tracking-tight text-center">
          Create New Habit
        </h1>

        <button
          onClick={handleSave}
          className="bg-[#5b4dff]/20 text-[#c4c0ff] border border-[#5b4dff]/40 hover:bg-[#5b4dff] hover:text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all active:scale-95 duration-150"
          type="button"
        >
          Save Habit
        </button>
      </header>

      {/* Main Content Form */}
      <main className="flex-1 px-4 sm:px-5 pt-4 space-y-6">
        {/* Habit Name Input */}
        <section className="space-y-2">
          <label
            className="block text-xs font-semibold text-[#c7c4d9] uppercase tracking-wider"
            htmlFor="habit-name"
          >
            Habit Name
          </label>
          <div className="relative">
            <input
              id="habit-name"
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="e.g., Solve 5 Calculus Problems or Morning Stretch"
              className="w-full bg-[#12141F] text-[#e3e1ec] placeholder:text-[#918fa2]/60 text-sm rounded-full px-4 py-3.5 border border-white/10 focus:border-[#5b4dff] focus:ring-2 focus:ring-[#5b4dff]/30 transition-all outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#292931] border border-white/5">
              <span
                className="material-symbols-outlined text-[#ffb95f] text-[16px]"
                data-icon="local_fire_department"
                data-weight="fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className="text-[#ffb95f] text-[10px] font-bold">Day 1</span>
            </div>
          </div>
        </section>

        {/* Category Selector Chips */}
        <section className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#c7c4d9] uppercase tracking-wider">
              Category
            </span>
            <span className="text-xs text-[#c4c0ff] font-medium">Academic Focus</span>
          </div>
          <div className="flex gap-2 overflow-x-auto py-1 no-scrollbar -mx-4 px-4 sm:-mx-5 sm:px-5">
            {categoriesList.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#5b4dff]/20 border border-[#5b4dff] text-[#c4c0ff] shadow-sm'
                      : 'bg-[#1a1b22] border border-white/10 text-[#c7c4d9] hover:text-white'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]" data-icon={cat.icon}>
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Frequency & Cadence Bento Module */}
        <section className="bg-[#1a1b22] p-4 rounded-2xl border border-white/10 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c4c0ff] text-[20px]" data-icon="tune">
              tune
            </span>
            <h2 className="text-base font-semibold text-[#e3e1ec] font-display">
              Frequency & Cadence
            </h2>
          </div>

          {/* Target Days */}
          <div className="space-y-1.5">
            <span className="text-xs text-[#c7c4d9] font-medium">Target Days</span>
            <div className="grid grid-cols-3 gap-1.5 bg-[#12141F] p-1 rounded-full border border-white/10 text-center">
              {[
                { id: 'daily', label: 'Daily' },
                { id: 'weekdays', label: 'Weekdays only' },
                { id: 'custom', label: 'Custom (3x)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTargetDays(opt.id as 'daily' | 'weekdays' | 'custom')}
                  className={`py-2 rounded-full text-xs font-semibold transition-all ${
                    targetDays === opt.id
                      ? 'bg-[#5b4dff] text-white shadow-sm'
                      : 'text-[#c7c4d9] hover:text-white'
                  }`}
                  type="button"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optimal Time of Day */}
          <div className="space-y-1.5">
            <span className="text-xs text-[#c7c4d9] font-medium">Optimal Time of Day</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTimeOfDay('morning')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                  timeOfDay === 'morning'
                    ? 'bg-[#1C1F30] border-[#5b4dff] text-[#c4c0ff] shadow-[0_4px_16px_rgba(91,77,255,0.25)]'
                    : 'bg-[#1e1f27] border-white/5 text-[#c7c4d9] hover:border-white/20'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] text-[#ffb95f] mb-1" data-icon="wb_twilight">
                  wb_twilight
                </span>
                <span className="text-xs font-semibold">Morning</span>
              </button>

              <button
                onClick={() => setTimeOfDay('afternoon')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                  timeOfDay === 'afternoon'
                    ? 'bg-[#1C1F30] border-[#5b4dff] text-[#c4c0ff] shadow-[0_4px_16px_rgba(91,77,255,0.25)]'
                    : 'bg-[#1e1f27] border-white/5 text-[#c7c4d9] hover:border-white/20'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] text-[#ffddb8] mb-1" data-icon="light_mode">
                  light_mode
                </span>
                <span className="text-xs font-semibold">Afternoon</span>
              </button>

              <button
                onClick={() => setTimeOfDay('night')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                  timeOfDay === 'night'
                    ? 'bg-[#1C1F30] border-[#5b4dff] text-[#c4c0ff] shadow-[0_4px_16px_rgba(91,77,255,0.25)]'
                    : 'bg-[#1e1f27] border-white/5 text-[#c7c4d9] hover:border-white/20'
                }`}
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[20px] text-[#c4c0ff] mb-1"
                  data-icon="dark_mode"
                  data-weight="fill"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  dark_mode
                </span>
                <span className="text-xs font-semibold">Night Study</span>
              </button>
            </div>
          </div>

          {/* Session Duration Stepper */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="block text-sm font-semibold text-[#e3e1ec]">Session Duration</span>
              <span className="block text-xs text-[#918fa2]">Focus timer block allocation</span>
            </div>
            <div className="flex items-center gap-3 bg-[#12141F] px-2 py-1 rounded-full border border-white/10">
              <button
                onClick={() => setDurationMinutes((prev) => Math.max(5, prev - 5))}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1e1f27] hover:bg-[#292931] text-white transition-all active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]" data-icon="remove">
                  remove
                </span>
              </button>
              <span className="text-base font-bold text-[#c4c0ff] min-w-[56px] text-center font-display">
                {durationMinutes} <span className="text-[10px] font-normal text-[#918fa2]">min</span>
              </span>
              <button
                onClick={() => setDurationMinutes((prev) => Math.min(180, prev + 5))}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1e1f27] hover:bg-[#292931] text-white transition-all active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]" data-icon="add">
                  add
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Atomic Stacking Formula (Habit Loop) */}
        <section className="bg-[#1a1b22] p-4 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px]" data-icon="psychology">
                psychology
              </span>
              <h2 className="text-base font-semibold text-[#e3e1ec] font-display">
                Atomic Stacking Formula
              </h2>
            </div>
            <span className="text-[10px] font-bold text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded-full border border-[#4edea3]/20">
              Habit Loop
            </span>
          </div>

          {/* Stacking Block 1: Cue Trigger */}
          <div className="relative pl-6 border-l-2 border-[#5b4dff]/40 space-y-1.5">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#5b4dff] border-2 border-[#12131a] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </div>
            <label className="block text-xs font-bold text-[#c4c0ff] tracking-wide">
              1. AFTER I... (Anchor Trigger)
            </label>
            <input
              type="text"
              value={afterI}
              onChange={(e) => setAfterI(e.target.value)}
              className="w-full bg-[#12141F] text-[#e3e1ec] text-xs rounded-full px-4 py-2.5 border border-white/10 focus:border-[#5b4dff] outline-none"
            />
          </div>

          {/* Stacking Block 2: Routine Action */}
          <div className="relative pl-6 border-l-2 border-[#4edea3]/40 space-y-1.5">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#4edea3] border-2 border-[#12131a] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d0e15]"></span>
            </div>
            <label className="block text-xs font-bold text-[#4edea3] tracking-wide">
              2. I WILL... (Micro Habit)
            </label>
            <input
              type="text"
              value={iWill}
              onChange={(e) => setIWill(e.target.value)}
              className="w-full bg-[#12141F] text-[#e3e1ec] text-xs rounded-full px-4 py-2.5 border border-white/10 focus:border-[#4edea3] outline-none"
            />
          </div>

          {/* Stacking Block 3: Reward Reinforcement */}
          <div className="relative pl-6 space-y-1.5">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#ffb95f] border-2 border-[#12131a] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d0e15]"></span>
            </div>
            <label className="block text-xs font-bold text-[#ffb95f] tracking-wide">
              3. CELEBRATION & REWARD
            </label>
            <input
              type="text"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              placeholder="e.g., 10 mins of sci-fi podcast or herbal tea"
              className="w-full bg-[#12141F] text-[#e3e1ec] text-xs rounded-full px-4 py-2.5 border border-white/10 focus:border-[#ffb95f] outline-none"
            />
          </div>
        </section>

        {/* Reminder & Notification Module */}
        <section className="bg-[#1a1b22] p-4 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5b4dff]/15 flex items-center justify-center text-[#c4c0ff] border border-[#5b4dff]/20">
                <span className="material-symbols-outlined text-[20px]" data-icon="notifications_active">
                  notifications_active
                </span>
              </div>
              <div>
                <span className="block text-sm font-semibold text-[#e3e1ec]">Focus Reminder</span>
                <span className="block text-xs text-[#918fa2]">Nightly study prompt</span>
              </div>
            </div>

            {/* Pill Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={() => setReminderEnabled(!reminderEnabled)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#34343c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a572]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between bg-[#12141F] px-4 py-3 rounded-full border border-white/10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#918fa2] text-[18px]" data-icon="alarm">
                alarm
              </span>
              <span className="text-xs font-medium text-[#e3e1ec]">Prompt Schedule</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1F30] border border-white/10 text-[#c4c0ff] text-xs font-semibold">
              <input
                type="text"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="bg-transparent w-16 text-center outline-none"
              />
              <span className="text-[10px] text-[#918fa2]">Daily</span>
            </div>
          </div>
        </section>

        {/* Color & Icon Customizer Palette */}
        <section className="bg-[#1a1b22] p-4 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#c7c4d9] uppercase tracking-wider">
              Appearance Styling
            </span>
            <span className="text-xs text-[#c4c0ff] font-medium">Custom Glow</span>
          </div>

          {/* Color Palette Dots */}
          <div className="space-y-1.5">
            <span className="text-xs text-[#918fa2]">Accent Aura</span>
            <div className="flex items-center justify-between">
              {colorsList.map((col) => {
                const isSelected = selectedColor === col.hex;
                return (
                  <button
                    key={col.id}
                    onClick={() => setSelectedColor(col.hex)}
                    style={{ backgroundColor: col.hex }}
                    className={`rounded-full transition-all active:scale-95 flex items-center justify-center ${
                      isSelected
                        ? 'w-10 h-10 ring-4 ring-white/20 border-2 border-white shadow-lg'
                        : 'w-9 h-9 hover:scale-105 opacity-85'
                    }`}
                    type="button"
                    title={col.label}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-white text-[18px]" data-icon="check">
                        check
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Icon Customizer Grid */}
          <div className="space-y-1.5 pt-2">
            <span className="text-xs text-[#918fa2]">Habit Emblem</span>
            <div className="grid grid-cols-6 gap-2">
              {emblemsList.map((item) => {
                const isSelected = selectedEmblem === item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedEmblem(item.icon)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#5b4dff] text-white border border-[#c4c0ff] electric-glow shadow-md'
                        : 'bg-[#1e1f27] border border-white/5 text-[#c7c4d9] hover:text-white'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]" data-icon={item.icon}>
                      {item.icon}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Live Preview Tile */}
        <div className="p-4 rounded-2xl bg-[#1C1F30] border border-white/12 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.45)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              style={{
                backgroundColor: `${selectedColor}25`,
                borderColor: `${selectedColor}60`,
                color: selectedColor,
              }}
              className="w-11 h-11 rounded-full border flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[22px]" data-icon={selectedEmblem}>
                {selectedEmblem}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#e3e1ec] font-display">
                {habitName || 'Your Habit Title'}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[#ffb95f] text-[11px] font-semibold flex items-center gap-0.5">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    data-icon="local_fire_department"
                    data-weight="fill"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_fire_department
                  </span>
                  0 days
                </span>
                <span className="text-[#464556]">•</span>
                <span className="text-[#c7c4d9] text-[11px]">
                  {durationMinutes} min {timeOfDay} block
                </span>
              </div>
            </div>
          </div>
          {/* Incomplete Check-ring */}
          <div className="w-7 h-7 rounded-full border-2 border-white/20 flex items-center justify-center"></div>
        </div>
      </main>

      {/* Ergonomic Bottom Action Dock (Sticky Above Edge) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto p-4 bg-gradient-to-t from-[#0d0e15] via-[#0d0e15]/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <button
            onClick={handleSave}
            className="w-full h-14 rounded-full bg-[#5b4dff] hover:bg-[#5b4dff]/90 text-white font-bold text-base tracking-tight shadow-[0_12px_32px_-6px_rgba(91,77,255,0.45)] flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] duration-150"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]" data-icon="rocket_launch">
              rocket_launch
            </span>
            <span>Start Building Habit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
