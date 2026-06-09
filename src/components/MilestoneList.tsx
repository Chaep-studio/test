import type { Milestone } from '../data/entrepreneurs';

interface MilestoneListProps {
  milestones: Milestone[];
  color: string;
}

export default function MilestoneList({ milestones, color }: MilestoneListProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color }}>
          公司发展纪事
        </div>
        <div className="flex-1 h-px" style={{ background: 'var(--ink-4)' }} />
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
          Milestones
        </div>
      </div>

      <div className="relative">
        {/* 中轴线 */}
        <div
          className="absolute top-0 bottom-0 left-0 md:left-1/2 w-px md:-translate-x-1/2"
          style={{ background: `linear-gradient(180deg, transparent, ${color}40 10%, ${color}40 90%, transparent)` }}
        />

        <div className="space-y-8">
          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                {/* 节点 */}
                <div
                  className="absolute left-0 md:left-1/2 top-2 w-3 h-3 -translate-x-1.5 md:-translate-x-1/2 rounded-full"
                  style={{ background: color, boxShadow: `0 0 0 4px var(--ink-0), 0 0 12px ${color}80` }}
                />

                {/* 左/右 卡片 */}
                <div
                  className={`pl-8 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'}`}
                >
                  <div
                    className="card-ink card-hover-lift p-5 inline-block text-left"
                    style={{ borderColor: 'var(--ink-3)' }}
                  >
                    <div className="flex items-center gap-3 mb-3" style={{ justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
                      <div
                        className="font-display text-3xl italic"
                        style={{ color }}
                      >
                        {m.year}
                      </div>
                      <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
                        YEAR
                      </div>
                    </div>
                    <div className="font-serif text-lg font-semibold mb-2" style={{ color: 'var(--text-1)' }}>
                      {m.title}
                    </div>
                    <div className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                      {m.desc}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
