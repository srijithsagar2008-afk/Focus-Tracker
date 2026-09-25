/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Habit, DayProgress } from './types';
import { INITIAL_HABITS, INITIAL_WEEK_DAYS } from './data/initialData';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { CalendarModal } from './components/CalendarModal';
import { FlashcardsModal } from './components/FlashcardsModal';
import { TodayScreen } from './screens/TodayScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { TimerScreen } from './screens/TimerScreen';
import { CreateHabitScreen } from './screens/CreateHabitScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { soundscapes } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('today');
  const [isCreatingHabit, setIsCreatingHabit] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isAnkiOpen, setIsAnkiOpen] = useState<boolean>(false);
  const [isLofiActive, setIsLofiActive] = useState<boolean>(false);

  // Habits state with localStorage persistence
  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const saved = localStorage.getItem('focustrack_habits');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to initial
    }
    return INITIAL_HABITS;
  });

  // Weekdays tracking
  const [weekDays, setWeekDays] = useState<DayProgress[]>(INITIAL_WEEK_DAYS);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(24);

  // Active focus habit for Timer screen
  const [currentTimerHabit, setCurrentTimerHabit] = useState<Habit | undefined>(() => {
    return habits.find((h) => h.name.includes('Organic Chemistry')) || habits[0];
  });

  // Save habits to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('focustrack_habits', JSON.stringify(habits));
    } catch {
      // ignore storage errors
    }
  }, [habits]);

  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const nextCompleted = !habit.completed;
          return {
            ...habit,
            completed: nextCompleted,
            streak: nextCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1),
          };
        }
        return habit;
      })
    );
  };

  const handleStartTimerForHabit = (habit: Habit) => {
    setCurrentTimerHabit(habit);
    setCurrentTab('timer');
  };

  const handleSaveNewHabit = (newHabit: Habit) => {
    setHabits((prev) => [newHabit, ...prev]);
    setIsCreatingHabit(false);
    setCurrentTab('today');
  };

  const handleResetData = () => {
    setHabits(INITIAL_HABITS);
    localStorage.removeItem('focustrack_habits');
  };

  const handleToggleLofi = () => {
    if (isLofiActive) {
      soundscapes.stop();
      setIsLofiActive(false);
    } else {
      soundscapes.play('binaural');
      setIsLofiActive(true);
    }
  };

  const handleAnkiSessionComplete = () => {
    // Mark Anki habit as completed
    const ankiHabit = habits.find((h) => h.name.includes('Flashcards'));
    if (ankiHabit && !ankiHabit.completed) {
      handleToggleHabit(ankiHabit.id);
    }
    setIsAnkiOpen(false);
  };

  // If in create habit mode, render full CreateHabitScreen
  if (isCreatingHabit) {
    return (
      <div className="min-h-screen bg-[#0d0e15] text-[#e3e1ec]">
        <CreateHabitScreen
          onCancel={() => setIsCreatingHabit(false)}
          onSave={handleSaveNewHabit}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen bg-[#12131a] text-[#e3e1ec] flex flex-col shadow-2xl">
      {/* Top Application Bar */}
      <TopAppBar
        currentTab={currentTab}
        onOpenCalendar={() => setIsCalendarOpen(true)}
        isLofiActive={isLofiActive}
        onToggleLofi={handleToggleLofi}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {currentTab === 'today' && (
          <TodayScreen
            habits={habits}
            onToggleHabit={handleToggleHabit}
            onOpenCreateHabit={() => setIsCreatingHabit(true)}
            onStartTimerForHabit={handleStartTimerForHabit}
            onOpenAnki={() => setIsAnkiOpen(true)}
            weekDays={weekDays}
            onSelectDay={setSelectedDayNumber}
            selectedDayNumber={selectedDayNumber}
          />
        )}

        {currentTab === 'analytics' && <AnalyticsScreen habits={habits} />}

        {currentTab === 'timer' && (
          <TimerScreen
            currentHabit={currentTimerHabit}
            onSessionComplete={() => {
              if (currentTimerHabit) {
                handleToggleHabit(currentTimerHabit.id);
              }
            }}
            isLofiActive={isLofiActive}
          />
        )}

        {currentTab === 'profile' && <ProfileScreen onResetData={handleResetData} />}
      </main>

      {/* Bottom Navigation Anchor */}
      <BottomNavBar currentTab={currentTab} onChangeTab={setCurrentTab} />

      {/* Study Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        streakDays={14}
      />

      {/* Flashcards Review Modal */}
      <FlashcardsModal
        isOpen={isAnkiOpen}
        onClose={() => setIsAnkiOpen(false)}
        onCompleteSession={handleAnkiSessionComplete}
      />
    </div>
  );
}
