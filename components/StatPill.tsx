import type { ReactNode } from "react";

type Props = {
  value?: ReactNode;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function StatPill({
  value = "80",
  label = "engagements per decade",
  size = "md",
  className = "",
}: Props) {
  const dimensions = {
    sm: { box: "w-12 h-12 text-xl", pill: "h-12 text-xs px-4" },
    md: { box: "w-14 h-14 text-2xl", pill: "h-14 text-sm px-5" },
    lg: { box: "w-20 h-20 text-4xl", pill: "h-20 text-base px-7" },
  };
  const d = dimensions[size] || dimensions.md;

  return (
    <div className={`inline-flex items-stretch shadow-soft ${className}`}>
      <span
        className={`flex-none inline-flex items-center justify-center bg-ink text-accent display-tight ${d.box} rounded-l-md`}
      >
        {value}
      </span>
      <span
        className={`inline-flex items-center bg-paper text-ink font-medium ${d.pill} rounded-r-md ring-1 ring-hairline`}
      >
        {label}
      </span>
    </div>
  );
}
