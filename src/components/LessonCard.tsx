interface LessonCardProps {
  index: number;
  text: string;
  color: string;
}

export default function LessonCard({ index, text, color }: LessonCardProps) {
  const cn = ['壹', '贰', '叁', '肆'];
  return (
    <div
      className="card-ink card-hover-lift p-6 lg:p-8 relative overflow-hidden group"
      style={{ borderColor: 'var(--ink-3)' }}
    >
      <div
        className="absolute -right-4 -top-6 font-display text-[120px] italic opacity-10 group-hover:opacity-30 transition-opacity leading-none"
        style={{ color }}
      >
        {index + 1}
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 flex items-center justify-center font-serif text-lg"
            style={{
              border: `1px solid ${color}`,
              color,
            }}
          >
            {cn[index] || index + 1}
          </div>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
            Lesson No.0{index + 1}
          </div>
        </div>
        <p
          className="font-cursive text-xl lg:text-2xl leading-[1.6]"
          style={{ color: 'var(--text-1)' }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
