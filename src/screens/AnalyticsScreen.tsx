import React, { useState } from 'react';
import { Habit } from '../types';

interface AnalyticsScreenProps {
  habits: Habit[];
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ habits }) => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedCellInfo, setSelectedCellInfo] = useState<string | null>(null);

  // Heatmap data: 4 weeks x 7 days
  const heatmapData = [
    // W-3
    [
      { day: 'Mon', hours: '2.5h', level: 2 },
      { day: 'Tue', hours: '4.0h', level: 3 },
      { day: 'Wed', hours: '5.5h', level: 4 },
      { day: 'Thu', hours: '1.5h', level: 1 },
      { day: 'Fri', hours: '4.5h', level: 3 },
      { day: 'Sat', hours: 'Rest', level: 0 },
      { day: 'Sun', hours: '3.0h', level: 2 },
    ],
    // W-2
    [
      { day: 'Mon', hours: '3.5h', level: 2 },
      { day: 'Tue', hours: '5.0h', level: 4 },
      { day: 'Wed', hours: '5.0h', level: 4 },
      { day: 'Thu', hours: '4.5h', level: 3 },
      { day: 'Fri', hours: '3.0h', level: 2 },
      { day: 'Sat', hours: '2.0h', level: 1 },
      { day: 'Sun', hours: '5.0h', level: 4 },
    ],
    // W-1
    [
      { day: 'Mon', hours: '6.0h', level: 4 },
      { day: 'Tue', hours: '5.5h', level: 4 },
      { day: 'Wed', hours: '4.0h', level: 3 },
      { day: 'Thu', hours: 'Peak 7.0h', level: 5 },
      { day: 'Fri', hours: '5.0h', level: 4 },
      { day: 'Sat', hours: '2.5h', level: 2 },
      { day: 'Sun', hours: 'Peak 6.0h', level: 5 },
    ],
    // Current Week (Active)
    [
      { day: 'Mon', hours: '6.0h', level: 5 },
      { day: 'Tue', hours: '5.0h', level: 4 },
      { day: 'Wed', hours: '6.5h', level: 5 },
      { day: 'Thu', hours: '4.0h', level: 4 },
      { day: 'Fri Today', hours: 'Active Flow', level: 5 },
      { day: 'Sat', hours: 'Upcoming', level: 0 },
      { day: 'Sun', hours: 'Upcoming', level: 0 },
    ],
  ];

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-[#34343c]';
      case 1:
        return 'bg-[#5b4dff]/30';
      case 2:
        return 'bg-[#5b4dff]/50';
      case 3:
        return 'bg-[#5b4dff]/70';
      case 4:
        return 'bg-[#5b4dff]';
      case 5:
        return 'bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.4)]';
      default:
        return 'bg-[#34343c]';
    }
  };

  // Find Organic Chem habit or default
  const organicChemHabit = habits.find((h) => h.name.includes('Organic Chemistry'));
  const flashcardsHabit = habits.find((h) => h.name.includes('Flashcards'));
  const sleepHabit = habits.find((h) => h.name.includes('Sleep'));

  return (
    <div className="w-full max-w-md mx-auto pt-20 pb-28 px-4 sm:px-5 flex flex-col gap-6">
      {/* Screen Title & Weekly/Monthly Toggle */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#c4c0ff] tracking-widest uppercase">
              Performance Hub
            </span>
            <h1 className="text-2xl font-bold text-[#e3e1ec] font-display tracking-tight">
              Analytics & Insights
            </h1>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#292931] border border-[#464556]/30 flex items-center justify-center text-[#4edea3]">
            <span
              className="material-symbols-outlined text-[#4edea3] text-xl"
              data-icon="insights"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              insights
            </span>
          </div>
        </div>

        {/* Segmented Pill Toggle */}
        <div className="flex p-1 bg-[#0d0e15] rounded-full border border-[#464556]/20 shadow-inner">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`flex-1 py-1.5 rounded-full text-center text-xs font-semibold transition-all duration-200 ${
              timeframe === 'weekly'
                ? 'bg-[#5b4dff] text-white shadow-sm'
                : 'text-[#c7c4d9] hover:text-[#c4c0ff]'
            }`}
            type="button"
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`flex-1 py-1.5 rounded-full text-center text-xs font-semibold transition-all duration-200 ${
              timeframe === 'monthly'
                ? 'bg-[#5b4dff] text-white shadow-sm'
                : 'text-[#c7c4d9] hover:text-[#c4c0ff]'
            }`}
            type="button"
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Hero Metrics Bento Tiles */}
      <section className="grid grid-cols-2 gap-3">
        {/* Card 1: Overall Completion Rate */}
        <div className="col-span-2 bg-[#1a1b22] rounded-2xl p-4 border border-white/[0.08] relative overflow-hidden shadow-sm">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#5b4dff]/15 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-[#c7c4d9]">Overall Completion Rate</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-bold text-[#e3e1ec] font-display">
                  {timeframe === 'weekly' ? '84%' : '88%'}
                </span>
                <span className="inline-flex items-center gap-0.5 text-xs font-bold text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded-full border border-[#4edea3]/20">
                  <span className="material-symbols-outlined text-xs" data-icon="trending_up">
                    trending_up
                  </span>
                  {timeframe === 'weekly' ? '+6%' : '+11%'}
                </span>
              </div>
              <span className="text-xs text-[#918fa2] mt-0.5">
                {timeframe === 'weekly'
                  ? 'vs. last week across 6 core study routines'
                  : 'vs. last month across 6 core study routines'}
              </span>
            </div>

            {/* Gauge Radial Simulation */}
            <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#34343c]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                ></path>
                <path
                  className="text-[#5b4dff]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="84, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
              <span className="material-symbols-outlined text-[#c4c0ff] text-lg absolute" data-icon="school">
                school
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#464556]/20 flex items-center justify-between text-xs">
            <span className="text-[#c7c4d9]">Daily Consistency Index</span>
            <span className="text-[#4edea3] font-semibold">Optimal Flow</span>
          </div>
        </div>

        {/* Card 2: Current Streak */}
        <div className="bg-[#1a1b22] rounded-2xl p-4 border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#c7c4d9]">Active Streak</span>
            <span
              className="text-[#ffb95f] material-symbols-outlined text-xl"
              data-icon="local_fire_department"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-[#e3e1ec] font-display">14</span>
              <span className="text-xs font-bold text-[#ffb95f]">Days</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#918fa2]">
              <span className="material-symbols-outlined text-xs" data-icon="emoji_events">
                emoji_events
              </span>
              <span>Record: 28d</span>
            </div>
          </div>
        </div>

        {/* Card 3: Total Study Focus Hours */}
        <div className="bg-[#1a1b22] rounded-2xl p-4 border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#c7c4d9]">Study Focus</span>
            <span className="text-[#c4c0ff] material-symbols-outlined text-xl" data-icon="timelapse">
              timelapse
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-[#e3e1ec] font-display">
                {timeframe === 'weekly' ? '18.5' : '74.2'}
              </span>
              <span className="text-xs font-bold text-[#c4c0ff]">hrs</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#4edea3]">
              <span
                className="material-symbols-outlined text-xs"
                data-icon="check_circle"
                data-weight="fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span>Target reached</span>
            </div>
          </div>
        </div>
      </section>

      {/* Consistency Matrix Heatmap (Past 28 Days) */}
      <section className="bg-[#1a1b22] rounded-2xl p-4 border border-white/[0.08] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c4c0ff] text-lg" data-icon="grid_view">
              grid_view
            </span>
            <h2 className="text-base font-semibold text-[#e3e1ec] font-display">Consistency Matrix</h2>
          </div>
          <span className="text-[10px] font-semibold text-[#c7c4d9] bg-[#292931] px-2 py-0.5 rounded-full border border-[#464556]/30">
            Past 28 Days
          </span>
        </div>
        <p className="text-xs text-[#918fa2]">Visual heatmap of academic effort & late-night study cycles.</p>

        {selectedCellInfo && (
          <div className="p-2 rounded-lg bg-[#5b4dff]/20 border border-[#5b4dff]/40 text-xs text-[#c4c0ff] animate-in fade-in">
            {selectedCellInfo}
          </div>
        )}

        {/* Heatmap Table Matrix */}
        <div className="mt-2 pt-2 border-t border-[#464556]/20 flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-[#918fa2] px-1">
            <span>W-3</span>
            <span>W-2</span>
            <span>W-1</span>
            <span className="text-[#c4c0ff]">Current Week</span>
          </div>

          {/* 7 Days Grid rows x 4 Weeks columns */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {heatmapData.map((col, colIdx) => {
              const isCurrent = colIdx === 3;
              return (
                <div
                  key={`col-${colIdx}`}
                  className={`flex flex-col gap-1.5 items-center ${
                    isCurrent
                      ? 'p-1 rounded-lg bg-[#292931]/60 border border-[#5b4dff]/30'
                      : ''
                  }`}
                >
                  {col.map((item, rowIdx) => (
                    <button
                      key={`cell-${colIdx}-${rowIdx}`}
                      onClick={() =>
                        setSelectedCellInfo(
                          `${item.day} (Week ${colIdx + 1}): ${item.hours} logged focus time`
                        )
                      }
                      className={`w-full ${
                        isCurrent ? 'h-3' : 'h-3.5'
                      } rounded-sm transition-all hover:scale-110 active:scale-95 ${getHeatmapColor(
                        item.level
                      )}`}
                      title={`${item.day}: ${item.hours}`}
                      type="button"
                    />
                  ))}
                </div>
              );
            })}
          </div>

          {/* Legend scale */}
          <div className="flex items-center justify-between pt-2 text-[10px] font-semibold text-[#918fa2]">
            <span>Less dense</span>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#34343c]"></span>
              <span className="w-2.5 h-2.5 rounded-sm bg-[#5b4dff]/30"></span>
              <span className="w-2.5 h-2.5 rounded-sm bg-[#5b4dff]/70"></span>
              <span className="w-2.5 h-2.5 rounded-sm bg-[#5b4dff]"></span>
              <span className="w-2.5 h-2.5 rounded-sm bg-[#4edea3]"></span>
            </div>
            <span className="text-[#4edea3] font-medium">Deep Flow</span>
          </div>
        </div>
      </section>

      {/* Category Distribution Breakdown */}
      <section className="bg-[#1a1b22] rounded-2xl p-4 border border-white/[0.08] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#e3e1ec] font-display">Category Breakdown</h2>
          <span className="text-xs font-semibold text-[#c4c0ff]">100% Balanced</span>
        </div>

        {/* Segmented Multi-color Progress Bar */}
        <div className="w-full h-3 rounded-full bg-[#34343c] flex overflow-hidden p-0.5 border border-[#464556]/20">
          <div className="h-full bg-[#5b4dff] rounded-l-full" style={{ width: '45%' }} title="Study 45%"></div>
          <div className="h-full bg-[#4edea3] ml-0.5" style={{ width: '25%' }} title="Wellness 25%"></div>
          <div className="h-full bg-[#ffb95f] ml-0.5" style={{ width: '20%' }} title="Fitness 20%"></div>
          <div className="h-full bg-[#918fa2] ml-0.5 rounded-r-full" style={{ width: '10%' }} title="Sleep 10%"></div>
        </div>

        {/* Category Badges Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#292931]/60 border border-[#464556]/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5b4dff]"></span>
              <span className="text-xs text-[#e3e1ec] font-medium">Study</span>
            </div>
            <span className="text-xs font-bold text-[#c4c0ff]">45%</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#292931]/60 border border-[#464556]/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
              <span className="text-xs text-[#e3e1ec] font-medium">Wellness</span>
            </div>
            <span className="text-xs font-bold text-[#4edea3]">25%</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#292931]/60 border border-[#464556]/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f]"></span>
              <span className="text-xs text-[#e3e1ec] font-medium">Fitness</span>
            </div>
            <span className="text-xs font-bold text-[#ffb95f]">20%</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#292931]/60 border border-[#464556]/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#918fa2]"></span>
              <span className="text-xs text-[#e3e1ec] font-medium">Sleep</span>
            </div>
            <span className="text-xs font-bold text-[#918fa2]">10%</span>
          </div>
        </div>
      </section>

      {/* Habit Adherence */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#e3e1ec] font-display">Habit Adherence</h2>
          <span className="text-xs text-[#918fa2]">Sorted by priority</span>
        </div>

        {/* Habit 1: Organic Chemistry (Elite High Adherence) */}
        <div className="bg-[#1a1b22] rounded-2xl p-4 border border-white/[0.08] hover:border-[#4edea3]/40 transition-colors flex flex-col gap-2.5">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#e3e1ec]">
                {organicChemHabit?.name || 'Deep Work: Organic Chemistry'}
              </span>
              <span className="text-xs text-[#918fa2]">Target: 90m Pomodoro block daily</span>
            </div>
            <span className="inline-flex items-center gap-1 bg-[#975f00]/20 text-[#ffb95f] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#ffb95f]/30">
              <span
                className="material-symbols-outlined text-xs"
                data-icon="local_fire_department"
                data-weight="fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              +4 streak
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex-1 mr-4">
              <div className="w-full bg-[#34343c] h-2 rounded-full overflow-hidden">
                <div className="bg-[#4edea3] h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#4edea3]">92%</span>
          </div>
        </div>

        {/* Habit 2: Flashcards (Solid Adherence) */}
        <div className="bg-[#1a1b22] rounded-2xl p-4 border border-white/[0.08] hover:border-[#5b4dff]/40 transition-colors flex flex-col gap-2.5">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#e3e1ec]">
                {flashcardsHabit?.name || 'Review Flashcards'}
              </span>
              <span className="text-xs text-[#918fa2]">Target: 50 Anki cards before 6:00 PM</span>
            </div>
            <span className="inline-flex items-center gap-1 bg-[#5b4dff]/15 text-[#c4c0ff] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#5b4dff]/30">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex-1 mr-4">
              <div className="w-full bg-[#34343c] h-2 rounded-full overflow-hidden">
                <div className="bg-[#5b4dff] h-full rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#c4c0ff]">78%</span>
          </div>
        </div>

        {/* Habit 3: Sleep Schedule (Needs Attention / Critical Warning) */}
        <div className="bg-[#1a1b22] rounded-2xl p-4 border border-[#ffb4ab]/40 relative overflow-hidden flex flex-col gap-2.5 bg-gradient-to-r from-[#1a1b22] to-[#93000a]/10">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#e3e1ec]">
                {sleepHabit?.name || 'Sleep Before 11:30 PM'}
              </span>
              <span className="text-xs text-[#918fa2]">Target: 7.5 hrs cognitive recovery</span>
            </div>
            <span className="inline-flex items-center gap-1 bg-[#93000a] text-[#ffdad6] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#ffb4ab]/30">
              At Risk
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="w-full bg-[#34343c] h-2 rounded-full overflow-hidden">
                <div className="bg-[#ffb4ab] h-full rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#ffb4ab]">60%</span>
          </div>
          {/* Alert Banner Callout */}
          <div className="mt-1 flex items-center gap-2 p-2 bg-[#93000a]/40 rounded-xl border border-[#ffb4ab]/20 text-xs text-[#ffdad6]">
            <span
              className="material-symbols-outlined text-[#ffb4ab] text-base flex-shrink-0"
              data-icon="warning"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
            <span className="font-medium text-xs leading-tight">Needs Attention before exam week</span>
          </div>
        </div>
      </section>

      {/* Study Streak Milestones & Mastery */}
      <section className="bg-[#1a1b22] rounded-2xl p-4 border border-white/[0.08] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#ffb95f] text-xl"
              data-icon="workspace_premium"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            <h2 className="text-base font-semibold text-[#e3e1ec] font-display">Milestones & Mastery</h2>
          </div>
          <span className="text-xs font-bold text-[#c4c0ff]">Level 4 Scholar</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {/* Unlocked Badge Card */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#292931]/60 border border-[#4edea3]/30 relative">
            <div className="w-12 h-12 rounded-full bg-[#4edea3]/15 border border-[#4edea3]/40 flex items-center justify-center text-2xl flex-shrink-0 shadow-[0_0_12px_rgba(78,222,163,0.25)]">
              🦉
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#4edea3]">Unlocked</span>
                <span className="text-[11px] text-[#918fa2]">• 2 days ago</span>
              </div>
              <span className="text-sm font-semibold text-[#e3e1ec]">Night Owl Master badge</span>
              <span className="text-xs text-[#918fa2]">Logged 10 deep work sessions past 9 PM</span>
            </div>
          </div>

          {/* Next Goal Card */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#292931]/30 border border-[#464556]/30 opacity-90">
            <div className="w-12 h-12 rounded-full bg-[#34343c] border border-[#464556]/40 flex items-center justify-center text-2xl flex-shrink-0">
              🏆
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#ffb95f]">Next Milestone</span>
                <span className="text-xs text-[#918fa2]">14 / 21 Days</span>
              </div>
              <span className="text-sm font-semibold text-[#e3e1ec]">21-Day Titan</span>
              {/* Progress Bar */}
              <div className="w-full bg-[#34343c] h-1.5 rounded-full overflow-hidden mt-2">
                <div className="bg-[#ffb95f] h-full rounded-full" style={{ width: '66%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
