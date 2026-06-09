import { useState } from 'react';
import type { FundingRound } from '../data/entrepreneurs';

interface FundingTimelineProps {
  rounds: FundingRound[];
  color: string;
  name: string;
}

export default function FundingTimeline({ rounds, color, name }: FundingTimelineProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color }}>
          融资时间线
        </div>
        <div className="flex-1 h-px" style={{ background: 'var(--ink-4)' }} />
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
          Funding Rounds
        </div>
      </div>

      {/* 横向时间线 */}
      <div className="relative overflow-x-auto pb-6 -mx-2 px-2 timeline-track" style={{ minHeight: '220px' }}>
        <div className="flex items-center gap-12 min-w-max relative">
          {rounds.map((r, i) => {
            const isIPO = r.round === 'IPO' || r.round.includes('IPO');
            const isActive = active === i;
            return (
              <div
                key={i}
                className="relative flex flex-col items-center"
                style={{ minWidth: '140px' }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {/* 节点 */}
                <div className="relative z-10">
                  <div
                    className={`timeline-node ${isIPO ? 'is-ipo' : ''}`}
                    style={!isIPO ? { background: color, boxShadow: `0 0 0 4px var(--ink-0), 0 0 20px ${color}` } : {}}
                  />
                </div>
                {/* 上方年份 + 轮次 */}
                <div className="absolute -top-12 text-center w-32">
                  <div className="font-mono text-[10px] tracking-[0.2em] mb-1" style={{ color: 'var(--text-4)' }}>
                    {r.year}
                  </div>
                  <div
                    className="font-serif text-sm font-semibold"
                    style={{ color: isIPO ? 'var(--vermil)' : color }}
                  >
                    {r.round}
                  </div>
                </div>
                {/* 下方金额 */}
                <div className="absolute top-12 text-center w-32">
                  <div className="font-mono text-xs" style={{ color: 'var(--text-1)' }}>
                    {r.amount}
                  </div>
                  {r.valuation && (
                    <div className="font-mono text-[10px] mt-1" style={{ color: 'var(--text-4)' }}>
                      估值 {r.valuation}
                    </div>
                  )}
                </div>

                {/* 悬停详情卡 */}
                {isActive && (
                  <div
                    className="absolute top-24 z-20 w-72 p-5 card-ink"
                    style={{
                      borderColor: color,
                      boxShadow: `0 0 30px ${color}30`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color }}>
                        {r.round} · {r.year}
                      </div>
                      <div className="font-mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--text-4)' }}>
                        {r.amount}
                      </div>
                    </div>
                    <div className="font-serif text-sm font-semibold mb-2" style={{ color: 'var(--text-1)' }}>
                      {name} · {r.round}
                    </div>
                    <div className="space-y-1.5">
                      {r.investors.map((inv, j) => (
                        <div key={j} className="font-sans text-xs flex items-center gap-2" style={{ color: 'var(--text-2)' }}>
                          <span className="inline-block w-1 h-1" style={{ background: color }} />
                          {inv}
                        </div>
                      ))}
                    </div>
                    {r.note && (
                      <div className="mt-3 pt-3 border-t font-cursive text-sm" style={{ borderColor: 'var(--ink-3)', color: 'var(--text-3)' }}>
                        {r.note}
                      </div>
                    )}
                    {r.valuation && (
                      <div className="mt-3 font-mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--text-4)' }}>
                        估值 · {r.valuation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 移动端竖向列表 */}
      <div className="md:hidden mt-8 space-y-3">
        {rounds.map((r, i) => {
          const isIPO = r.round.includes('IPO');
          return (
            <div
              key={i}
              className="card-ink p-4"
              style={{ borderColor: isIPO ? 'var(--vermil)' : 'var(--ink-3)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-serif font-semibold" style={{ color: isIPO ? 'var(--vermil)' : color }}>
                  {r.round} · {r.year}
                </div>
                <div className="font-mono text-xs" style={{ color: 'var(--text-2)' }}>{r.amount}</div>
              </div>
              <div className="font-sans text-xs" style={{ color: 'var(--text-3)' }}>
                {r.investors.join(' · ')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
