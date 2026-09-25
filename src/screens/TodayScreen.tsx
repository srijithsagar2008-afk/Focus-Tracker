import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { DayProgress, Habit } from '../types';

interface TodayScreenProps {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
  onOpenCreateHabit: () => void;
  onStartTimerForHabit: (habit: Habit) => void;
  onOpenAnki: () => void;
  weekDays: DayProgress[];
  onSelectDay: (dayNumber: number) => void;
  selectedDayNumber: number;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({
  habits,
  onToggleHabit,
  onOpenCreateHabit,
  onStartTimerForHabit,
  onOpenAnki,
  weekDays,
  onSelectDay,
  selectedDayNumber,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Filter habits
  const filteredHabits = habits.filter((habit) => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'study') return habit.category === 'study';
    if (activeCategoryFilter === 'morning') return habit.timeOfDay === 'morning';
    if (activeCategoryFilter === 'fitness') return habit.category === 'fitness' || habit.category === 'health';
    if (activeCategoryFilter === 'night') return habit.timeOfDay === 'night' || habit.category === 'sleep';
    return true;
  });

  const totalHabits = habits.length;
  const completedHabits = habits.filter((h) => h.completed).length;
  const completionPercentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;
  const remainingCount = totalHabits - completedHabits;

  // Circumference for 30 radius: 2 * PI * 30 = 188.495
  const circleCircumference = 188.495;
  const strokeDashoffset = circleCircumference - (circleCircumference * (completionPercentage / 100));

  const handleToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const habit = habits.find((h) => h.id === id);
    if (habit && !habit.completed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
    onToggleHabit(id);
  };

  return (
    <div className="w-full max-w-md mx-auto pt-20 pb-28 px-4 sm:px-5 flex flex-col gap-6">
      {/* Student Greeting & Exam Counter Banner */}
      <section className="flex flex-col gap-1 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#c7c4d9] tracking-wider uppercase">
              THURSDAY, OCT 24
            </span>
            <h1 className="text-2xl font-bold text-[#e3e1ec] font-display tracking-tight">
              Hey Alex 👋
            </h1>
          </div>
          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#975f00]/30 border border-[#ffb95f]/40 glow-streak">
            <span
              className="material-symbols-outlined text-[#ffb95f] text-lg"
              data-icon="local_fire_department"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="text-xs font-bold text-[#ffb95f]">14 Days Streak</span>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-[#5b4dff] animate-pulse"></span>
          <p className="text-sm text-[#c4c0ff] font-medium">Midterm exams begin in 12 days</p>
        </div>
      </section>

      {/* Horizontal Weekly Calendar Strip */}
      <section className="bg-[#1a1b22] border border-[#464556]/30 rounded-2xl p-2 shadow-sm">
        <div className="grid grid-cols-7 gap-1 text-center items-center">
          {weekDays.map((day) => {
            const isSelected = day.dayNumber === selectedDayNumber;
            const isToday = day.isToday;

            return (
              <button
                key={`weekday-${day.dayNumber}`}
                onClick={() => onSelectDay(day.dayNumber)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-150 ${
                  isToday
                    ? 'bg-[#5b4dff] text-white shadow-md relative'
                    : isSelected
                    ? 'bg-[#292931] text-white border border-[#5b4dff]/40'
                    : 'text-[#c7c4d9] hover:bg-white/5'
                }`}
              >
                <span className={`text-[10px] uppercase ${isToday ? 'text-white font-bold' : 'opacity-70'}`}>
                  {day.dayName}
                </span>
                <span className={`text-sm font-semibold mt-0.5 ${isToday ? 'font-bold' : ''}`}>
                  {day.dayNumber}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                    isToday
                      ? 'bg-[#6ffbbe]'
                      : day.completed
                      ? 'bg-[#4edea3] glow-complete'
                      : 'bg-[#464556]'
                  }`}
                ></span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Summary Daily Progress Ring & XP Card */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#292931]/90 to-[#1a1b22] border border-[#464556]/40 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          {/* Text and status info */}
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#4edea3]/15 border border-[#4edea3]/30 text-[10px] text-[#4edea3] font-bold tracking-wide uppercase">
                ON TRACK
              </span>
              <span className="text-[10px] text-[#ffb95f] font-bold tracking-wider">+250 XP EARNED</span>
            </div>
            <h2 className="text-xl font-bold text-[#e3e1ec] font-display">
              {completionPercentage}% Completed
            </h2>
            <p className="text-xs text-[#c7c4d9]">
              {completedHabits} of {totalHabits} daily rituals logged. {remainingCount} tasks remain for total daily mastery.
            </p>
          </div>
          {/* Circular Progress Ring */}
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 72 72">
              <circle
                className="text-[#34343c]"
                cx="36"
                cy="36"
                fill="none"
                r="30"
                stroke="currentColor"
                strokeWidth="6"
              />
              <circle
                className="text-[#5b4dff] transition-all duration-500 ease-out"
                cx="36"
                cy="36"
                fill="none"
                r="30"
                stroke="currentColor"
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="6"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-bold text-[#e3e1ec] font-display">
                {completedHabits}/{totalHabits}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Encouragement Banner Bar */}
        <div className="mt-4 pt-3 border-t border-[#464556]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-base" data-icon="auto_awesome">
              auto_awesome
            </span>
            <span className="text-xs text-[#c7c4d9] font-medium">
              Complete Organic Chem to unlock Night Focus tier!
            </span>
          </div>
          <span className="material-symbols-outlined text-[#c7c4d9] text-base" data-icon="chevron_right">
            chevron_right
          </span>
        </div>
      </section>

      {/* Category Filter Pills (Horizontal Scroll) */}
      <section className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4 sm:-mx-5 sm:px-5">
        {[
          { id: 'all', label: 'All Habits' },
          { id: 'study', label: 'Study & Homework' },
          { id: 'morning', label: 'Morning Routine' },
          { id: 'fitness', label: 'Health & Fitness' },
          { id: 'night', label: 'Night Routine' },
        ].map((filter) => {
          const isActive = activeCategoryFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveCategoryFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'bg-[#5b4dff] text-[#efebff] shadow-sm'
                  : 'bg-[#292931]/80 border border-[#464556]/40 text-[#c7c4d9] hover:text-[#c4c0ff]'
              }`}
              type="button"
            >
              {filter.label}
            </button>
          );
        })}
      </section>

      {/* Habit Cards Section */}
      <section className="flex flex-col gap-3 pb-6">
        {filteredHabits.map((habit) => {
          const isDone = habit.completed;

          return (
            <div
              key={habit.id}
              className={`p-4 rounded-2xl bg-[#1a1b22] border transition-all duration-200 flex flex-col gap-3 ${
                isDone
                  ? 'border-[#4edea3]/40 glow-complete'
                  : habit.category === 'study' && !isDone
                  ? 'border-[#5b4dff]/30 glow-primary'
                  : 'border-[#464556]/30 hover:border-[#464556]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold tracking-wide uppercase ${
                        habit.category === 'study'
                          ? 'bg-[#5b4dff]/20 border-[#5b4dff]/40 text-[#c4c0ff]'
                          : habit.category === 'health' || habit.category === 'fitness'
                          ? 'bg-[#00a572]/20 border-[#4edea3]/30 text-[#4edea3]'
                          : habit.category === 'mindset'
                          ? 'bg-[#975f00]/30 border-[#ffb95f]/40 text-[#ffb95f]'
                          : 'bg-[#ffdad6]/10 border-[#ffb4ab]/30 text-[#ffb4ab]'
                      }`}
                    >
                      {habit.categoryLabel}
                    </span>

                    {isDone ? (
                      <span className="text-[#4edea3] text-[11px] font-semibold flex items-center gap-0.5">
                        <span
                          className="material-symbols-outlined text-xs"
                          data-icon="check_circle"
                          data-weight="fill"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        Done
                      </span>
                    ) : habit.streak > 0 ? (
                      <span className="flex items-center gap-0.5 text-[#ffb95f] text-[11px] font-semibold">
                        <span
                          className="material-symbols-outlined text-xs"
                          data-icon="local_fire_department"
                          data-weight="fill"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          local_fire_department
                        </span>
                        {habit.streakMax ? `${habit.streak}/${habit.streakMax}` : habit.streak} Streak
                      </span>
                    ) : habit.dueText ? (
                      <span className="text-[11px] text-[#c7c4d9]">{habit.dueText}</span>
                    ) : null}
                  </div>

                  <h3
                    className={`text-base font-semibold text-[#e3e1ec] font-display ${
                      isDone ? 'line-through opacity-80 text-[#918fa2]' : ''
                    }`}
                  >
                    {habit.name}
                  </h3>
                  <p className="text-xs text-[#c7c4d9] mt-0.5">{habit.details}</p>
                </div>

                {/* Complete / Checkbox Ring */}
                <button
                  onClick={(e) => handleToggle(habit.id, e)}
                  aria-label={isDone ? `Mark ${habit.name} incomplete` : `Mark ${habit.name} complete`}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 flex-shrink-0 ${
                    isDone
                      ? 'bg-[#4edea3] text-[#003824] shadow-md'
                      : 'border-2 border-[#c4c0ff]/40 hover:border-[#4edea3] text-transparent hover:text-[#4edea3]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg font-bold" data-icon="check">
                    check
                  </span>
                </button>
              </div>

              {/* Action Buttons & Time Target footer */}
              {!isDone && (habit.actionButtonText || habit.targetMinutes) && (
                <div className="flex items-center justify-between pt-2 border-t border-[#464556]/20">
                  <div className="flex items-center gap-1.5 text-[#c7c4d9] text-xs font-medium">
                    <span className="material-symbols-outlined text-sm text-[#c4c0ff]" data-icon="timer">
                      timer
                    </span>
                    <span>{habit.targetMinutes}m Target</span>
                  </div>

                  {habit.actionButtonText === 'Start Timer' && (
                    <button
                      onClick={() => onStartTimerForHabit(habit)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5b4dff] text-white text-xs font-semibold hover:bg-[#5b4dff]/90 active:scale-95 transition-all shadow-sm"
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-sm"
                        data-icon="play_arrow"
                        data-weight="fill"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                      <span>Start Timer</span>
                    </button>
                  )}

                  {habit.actionButtonText === 'Start 15m Anki' && (
                    <button
                      onClick={onOpenAnki}
                      className="px-3.5 py-1.5 rounded-full bg-[#292931] border border-[#464556]/50 text-[#e3e1ec] hover:text-[#c4c0ff] hover:border-[#5b4dff]/50 text-xs font-semibold active:scale-95 transition-all flex items-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm text-[#c4c0ff]" data-icon="bolt">
                        bolt
                      </span>
                      <span>Start 15m Anki</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Contextual Quick Action Floating Button (Add Habit) */}
      <div className="fixed bottom-20 right-4 z-30 max-w-md mx-auto">
        <button
          onClick={onOpenCreateHabit}
          aria-label="Add Habit"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#5b4dff] text-white text-sm font-bold shadow-xl border border-white/20 glow-primary active:scale-95 transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-xl" data-icon="add">
            add
          </span>
          <span>New Habit</span>
        </button>
      </div>
    </div>
  );
};
