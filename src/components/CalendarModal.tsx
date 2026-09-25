import React from 'react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakDays: number;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  streakDays,
}) => {
  if (!isOpen) return null;

  // Calendar for October 2026: Oct 1 is Thursday
  // 31 days in October
  const daysInMonth = 31;
  const startDayOffset = 3; // 0=Mon, 1=Tue, 2=Wed, 3=Thu

  const calendarDays = [];
  for (let i = 0; i < startDayOffset; i++) {
    calendarDays.push({ day: null, date: null });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isCompleted = d >= 10 && d <= 23;
    const isToday = d === 24;
    const isExam = d === 5; // November 5 is midterm, but we can also mark Oct 30 exam prep
    calendarDays.push({
      day: d,
      isCompleted,
      isToday,
      isExam,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#1a1b22] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5b4dff]" data-icon="calendar_month">
              calendar_month
            </span>
            <h2 className="text-lg font-bold text-[#e3e1ec] font-display">Study Calendar</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#c7c4d9] hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-lg" data-icon="close">
              close
            </span>
          </button>
        </div>

        {/* Exam Countdown Banner */}
        <div className="p-3 rounded-xl bg-[#5b4dff]/15 border border-[#5b4dff]/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#c4c0ff] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
              <span>Midterm Exams</span>
            </div>
            <p className="text-sm font-bold text-white mt-0.5">Organic Chem & Calculus</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-[#4edea3] font-display">12d</span>
            <span className="block text-[10px] text-[#c7c4d9]">remaining</span>
          </div>
        </div>

        {/* Month View */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[#e3e1ec]">October 2026</span>
            <span className="text-xs text-[#ffb95f] flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-sm" data-icon="local_fire_department" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
              {streakDays}d Streak Active
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#918fa2] mb-1">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.map((item, idx) => {
              if (!item.day) {
                return <div key={`empty-${idx}`} className="h-8"></div>;
              }
              const isToday = item.isToday;
              const isPastCompleted = item.isCompleted;

              return (
                <div
                  key={`day-${item.day}`}
                  className={`h-8 rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all ${
                    isToday
                      ? 'bg-[#5b4dff] text-white font-bold shadow-[0_0_10px_rgba(91,77,255,0.5)]'
                      : isPastCompleted
                      ? 'bg-[#4edea3]/15 text-[#4edea3] border border-[#4edea3]/30'
                      : 'text-[#c7c4d9] hover:bg-white/5'
                  }`}
                >
                  <span>{item.day}</span>
                  {isPastCompleted && (
                    <span className="w-1 h-1 rounded-full bg-[#4edea3] mt-0.5"></span>
                  )}
                  {isToday && (
                    <span className="w-1 h-1 rounded-full bg-[#6ffbbe] mt-0.5"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Academic Milestones */}
        <div className="space-y-2 border-t border-white/10 pt-3">
          <span className="text-xs font-bold text-[#c7c4d9] uppercase tracking-wider">
            Key Deadlines
          </span>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#292931]/60 border border-white/5">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#ffb95f]"></span>
              <div>
                <p className="text-xs font-semibold text-[#e3e1ec]">Problem Set #6 Submission</p>
                <p className="text-[11px] text-[#918fa2]">Calculus II • Oct 28</p>
              </div>
            </div>
            <span className="text-[11px] text-[#c4c0ff] bg-[#5b4dff]/20 px-2 py-0.5 rounded-full font-medium">
              4 days
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#292931]/60 border border-white/5">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
              <div>
                <p className="text-xs font-semibold text-[#e3e1ec]">Midterm Exam Block</p>
                <p className="text-[11px] text-[#918fa2]">Organic Chemistry • Nov 5</p>
              </div>
            </div>
            <span className="text-[11px] text-[#4edea3] bg-[#4edea3]/20 px-2 py-0.5 rounded-full font-medium">
              12 days
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#5b4dff] text-white font-semibold text-sm hover:bg-[#5b4dff]/90 transition-all active:scale-[0.98]"
        >
          Done
        </button>
      </div>
    </div>
  );
};
