interface SectionLabelProps {
  number?: string;
  label: string;
  className?: string;
}

export default function SectionLabel({
  number,
  label,
  className = "",
}: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-[#C8A75A] ${className}`}
    >
      {number && <span>{number}</span>}
      {number && <span className="opacity-40">—</span>}
      <span className="font-semibold text-[#D7BC76]">{label}</span>
    </div>
  );
}
