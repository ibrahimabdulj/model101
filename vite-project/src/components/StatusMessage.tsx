import type { StatusType } from "../types/prediction";

type StatusMessageProps = {
  message: string | null;
  type: StatusType;
};

const StatusMessage = ({ message, type }: StatusMessageProps) => {
  if (!message) return null;

  const base = "mt-6 w-full max-w-md mx-auto text-sm rounded-xl px-4 py-3";

  const stylesByType: Record<StatusType, string> = {
    error: "bg-rose-500/10 text-rose-300 border border-rose-400/40",
    info: "bg-slate-800/80 text-slate-200 border border-slate-700",
    success: "bg-emerald-500/10 text-emerald-300 border border-emerald-400/40",
  };

  return <div className={`${base} ${stylesByType[type]}`}>{message}</div>;
};

export default StatusMessage;

