import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteSession: () => void;
}

const SAMPLE_CARDS = [
  {
    q: 'Organic Chemistry: SN2 Reaction Mechanism',
    hint: 'Bimolecular nucleophilic substitution',
    a: 'One-step concerted mechanism with backside attack causing inversion of stereocenter (Walden inversion). Rate = k[substrate][nucleophile]. Favors primary > secondary > tertiary substrates.',
  },
  {
    q: 'Biochemistry: Michaelis Constant (Km)',
    hint: 'Enzyme kinetics definition',
    a: 'The substrate concentration at which the reaction velocity is half of Vmax. A lower Km indicates higher substrate affinity for the enzyme.',
  },
  {
    q: 'Thermodynamics: Gibbs Free Energy (ΔG)',
    hint: 'Spontaneity equation',
    a: 'ΔG = ΔH - TΔS. When ΔG < 0, the reaction is exergonic and spontaneous under standard conditions. If ΔG > 0, endergonic and non-spontaneous.',
  },
  {
    q: 'Cell Biology: Sodium-Potassium Pump (Na+/K+-ATPase)',
    hint: 'Primary active transport stoichiometry',
    a: 'Pumps 3 Na+ ions out of the cell and 2 K+ ions into the cell per ATP molecule hydrolyzed, maintaining resting membrane potential.',
  },
  {
    q: 'Calculus: Fundamental Theorem of Calculus (Part 1)',
    hint: 'Connection between differentiation & integration',
    a: 'If f is continuous on [a, b], then g(x) = ∫[a to x] f(t) dt is continuous on [a, b], differentiable on (a, b), and g\'(x) = f(x).',
  },
];

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  isOpen,
  onClose,
  onCompleteSession,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  if (!isOpen) return null;

  const currentCard = SAMPLE_CARDS[currentIndex % SAMPLE_CARDS.length];

  const handleNext = () => {
    setIsFlipped(false);
    const nextCount = reviewedCount + 1;
    setReviewedCount(nextCount);

    if (nextCount >= SAMPLE_CARDS.length) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onCompleteSession();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#1a1b22] border border-[#5b4dff]/40 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c4c0ff]" data-icon="bolt">
              bolt
            </span>
            <div>
              <h2 className="text-base font-bold text-white font-display">Anki Flashcard Deck</h2>
              <span className="text-[11px] text-[#918fa2]">Active Recall • Spaced Repetition</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#c7c4d9] hover:text-white hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-lg" data-icon="close">
              close
            </span>
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center justify-between text-xs text-[#c7c4d9]">
          <span>Card {Math.min(reviewedCount + 1, SAMPLE_CARDS.length)} of {SAMPLE_CARDS.length}</span>
          <span className="text-[#4edea3] font-semibold">
            {Math.round((reviewedCount / SAMPLE_CARDS.length) * 100)}% Finished
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#34343c] overflow-hidden">
          <div
            className="h-full bg-[#5b4dff] transition-all duration-300"
            style={{ width: `${(reviewedCount / SAMPLE_CARDS.length) * 100}%` }}
          ></div>
        </div>

        {/* Flashcard Item */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`min-h-[190px] p-4 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between select-none ${
            isFlipped
              ? 'bg-[#1e1f27] border-[#4edea3]/50 shadow-[0_0_16px_rgba(78,222,163,0.15)]'
              : 'bg-[#292931]/80 border-white/10 hover:border-[#5b4dff]/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c4c0ff]">
                {isFlipped ? 'Answer & Explanation' : 'Prompt / Concept'}
              </span>
              <span className="text-[10px] text-[#918fa2] flex items-center gap-1">
                <span className="material-symbols-outlined text-xs" data-icon="flip">
                  flip
                </span>
                Tap to flip
              </span>
            </div>

            <p className="text-sm font-semibold text-[#e3e1ec] leading-relaxed">
              {isFlipped ? currentCard.a : currentCard.q}
            </p>
          </div>

          {!isFlipped && (
            <p className="text-xs text-[#918fa2] italic mt-3">
              Hint: {currentCard.hint}
            </p>
          )}
        </div>

        {/* Buttons */}
        {isFlipped ? (
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={handleNext}
              className="py-2 rounded-lg bg-[#93000a]/50 border border-[#ffb4ab]/30 text-[#ffb4ab] text-xs font-semibold hover:bg-[#93000a] active:scale-95"
            >
              Again (1m)
            </button>
            <button
              onClick={handleNext}
              className="py-2 rounded-lg bg-[#5b4dff]/30 border border-[#5b4dff]/40 text-[#c4c0ff] text-xs font-semibold hover:bg-[#5b4dff] hover:text-white active:scale-95"
            >
              Good (1d)
            </button>
            <button
              onClick={handleNext}
              className="py-2 rounded-lg bg-[#00a572]/40 border border-[#4edea3]/40 text-[#4edea3] text-xs font-semibold hover:bg-[#00a572] hover:text-white active:scale-95"
            >
              Easy (4d)
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsFlipped(true)}
            className="w-full py-2.5 rounded-xl bg-[#5b4dff] text-white font-semibold text-sm hover:bg-[#5b4dff]/90 active:scale-[0.98] transition-all"
          >
            Show Answer
          </button>
        )}
      </div>
    </div>
  );
};
