interface SectionLabelProps {
  order: string; // "01" "02"
  category: string;
  color?: string;
}

export default function SectionLabel({ order, category, color = 'var(--gold)' }: SectionLabelProps) {
  return (
    <div className="flex items-end gap-6">
      <div className="chapter-num" style={{ color: 'transparent', WebkitTextStroke: `1px ${color}` }}>
        {order}
      </div>
      <div className="flex-1 pb-4">
        <div className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color }}>
          {category}
        </div>
        <div className="mt-2 h-px w-24" style={{ background: color }} />
      </div>
    </div>
  );
}
