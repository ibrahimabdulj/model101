import type { ClassificationResponse } from "../types/prediction";

type ResultCardProps = {
  result: ClassificationResponse | null;
  visible: boolean;
};

const ResultCard = ({ result, visible }: ResultCardProps) => {
  if (!result) return null;

  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <div
      className={`mt-10 w-full max-w-md mx-auto transform transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm shadow-xl shadow-slate-900/50 p-6">
        <h3 className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          Classification Result
        </h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Prediction</span>
            <span className="text-sm font-semibold text-slate-50">
              {result.animal === "cat" ? "Cat 🐱" : "Dog 🐶"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Breed</span>
            <span className="text-sm font-medium text-slate-100">
              {result.breed}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Confidence</span>
            <span className="text-sm font-medium text-emerald-400">
              {confidencePercent}%
            </span>
          </div>
        </div>

        <div className="mt-5">
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;

