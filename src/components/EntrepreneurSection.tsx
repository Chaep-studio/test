import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import FundingTimeline from './FundingTimeline';
import MilestoneList from './MilestoneList';
import LessonCard from './LessonCard';
import type { Entrepreneur } from '../data/entrepreneurs';

interface Props {
  e: Entrepreneur;
}

export default function EntrepreneurSection({ e }: Props) {
  return (
    <section
      id={e.id}
      className="relative px-6 lg:px-10 py-24 lg:py-32"
      style={{ borderTop: '1px solid var(--ink-3)' }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel order={e.order} category={e.industry} color={e.color} />
        </Reveal>

        {/* 扉页 */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Reveal delay={1} className="lg:col-span-7">
            <div className="flex items-baseline gap-6 flex-wrap">
              <h2
                className="font-serif font-black leading-[0.95]"
                style={{ fontSize: 'clamp(56px, 9vw, 140px)', color: 'var(--text-1)' }}
              >
                {e.name}
              </h2>
              <div className="font-display italic" style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: e.color, opacity: 0.6 }}>
                × {e.company}
              </div>
            </div>
            <h3
              className="mt-4 font-cursive leading-snug"
              style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', color: e.color }}
            >
              {e.headline}
            </h3>
            <p className="mt-6 max-w-2xl font-cursive text-xl leading-relaxed" style={{ color: 'var(--text-2)' }}>
              「{e.tagline}」
            </p>
          </Reveal>

          <Reveal delay={2} className="lg:col-span-5">
            <div className="card-ink p-6 space-y-4" style={{ borderColor: 'var(--ink-3)' }}>
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: e.color }}>
                  Basic Profile
                </div>
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
                  {e.birth}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-sans text-xs mb-1" style={{ color: 'var(--text-4)' }}>创立</div>
                  <div className="font-display text-2xl" style={{ color: 'var(--text-1)' }}>{e.founded}</div>
                </div>
                <div>
                  <div className="font-sans text-xs mb-1" style={{ color: 'var(--text-4)' }}>上市</div>
                  <div className="font-sans text-sm" style={{ color: 'var(--text-1)' }}>{e.listed}</div>
                </div>
              </div>
              <div className="pt-4 border-t" style={{ borderColor: 'var(--ink-3)' }}>
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: e.color }}>
                  Key Stats
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {e.stats.map((s, i) => (
                    <div key={i}>
                      <div className="font-display text-lg lg:text-xl" style={{ color: 'var(--text-1)' }}>{s.value}</div>
                      <div className="font-sans text-[10px] mt-1" style={{ color: 'var(--text-3)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 个人经历 */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: e.color }}>
                第一章
              </div>
              <h3 className="font-serif text-3xl lg:text-4xl font-semibold leading-tight" style={{ color: 'var(--text-1)' }}>
                个人经历
                <br />
                <span className="font-cursive text-2xl" style={{ color: 'var(--text-3)' }}>
                  The Founder
                </span>
              </h3>
              <div className="mt-6 w-12 h-px" style={{ background: e.color }} />
              <p className="mt-6 font-sans text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                童年、教育、第一次创业、性格特征——这些「不可量化」的东西,如何反作用在一家公司的命运里。
              </p>
            </div>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-9">
            <div className="newspaper-cols">
              {e.experience.map((p, i) => (
                <p
                  key={i}
                  className="font-serif text-lg leading-[1.9] mb-4"
                  style={{ color: 'var(--text-2)' }}
                >
                  <span className="font-display italic mr-2" style={{ color: e.color }}>
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* 首轮融资 */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: e.color }}>
                第二章
              </div>
              <h3 className="font-serif text-3xl lg:text-4xl font-semibold leading-tight" style={{ color: 'var(--text-1)' }}>
                第一笔投资
                <br />
                <span className="font-cursive text-2xl" style={{ color: 'var(--text-3)' }}>
                  First Bet
                </span>
              </h3>
              <div className="mt-6 w-12 h-px" style={{ background: e.color }} />
              <p className="mt-6 font-sans text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                第一笔钱,往往不是「估值最高」的那一笔,而是「最懂你」的那一笔。是谁,投了多少,为什么投?
              </p>
            </div>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-9">
            <div
              className="card-ink p-8 lg:p-12 relative overflow-hidden"
              style={{ borderColor: e.color }}
            >
              <div
                className="absolute -right-8 -top-12 font-display text-[280px] italic leading-none opacity-[0.06] pointer-events-none"
                style={{ color: e.color }}
              >
                1
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <div
                    className="font-display text-5xl lg:text-6xl italic"
                    style={{ color: e.color }}
                  >
                    {e.firstFunding.year}
                  </div>
                  <div className="font-mono text-sm tracking-[0.3em] uppercase" style={{ color: 'var(--text-3)' }}>
                    · 天使轮
                  </div>
                  <div className="font-serif text-2xl" style={{ color: 'var(--text-1)' }}>
                    {e.firstFunding.amount}
                  </div>
                </div>
                <div className="mb-6">
                  <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: e.color }}>
                    投资人 / Investors
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {e.firstFunding.investors.map((inv, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1.5 font-sans text-sm"
                        style={{
                          border: `1px solid ${e.color}60`,
                          color: e.color,
                          background: `${e.color}08`,
                        }}
                      >
                        {inv}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t" style={{ borderColor: 'var(--ink-3)' }}>
                  <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--vermil)' }}>
                    为什么投? / Why This Bet
                  </div>
                  <p
                    className="font-cursive text-xl lg:text-2xl leading-[1.7]"
                    style={{ color: 'var(--text-2)' }}
                  >
                    {e.firstFunding.reason}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 后续融资时间线 */}
        <div className="mt-24">
          <Reveal>
            <div className="flex items-end gap-6 mb-6">
              <div>
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: e.color }}>
                  第三章
                </div>
                <h3 className="font-serif text-3xl lg:text-4xl font-semibold leading-tight" style={{ color: 'var(--text-1)' }}>
                  后续融资
                  <br />
                  <span className="font-cursive text-2xl" style={{ color: 'var(--text-3)' }}>
                    Funding Rounds · A to IPO
                  </span>
                </h3>
              </div>
              <div className="flex-1 gold-line mb-3" />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <FundingTimeline rounds={e.fundingTimeline} color={e.color} name={e.name} />
          </Reveal>
        </div>

        {/* 公司发展纪事 */}
        <div className="mt-24">
          <Reveal>
            <div className="flex items-end gap-6 mb-10">
              <div>
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: e.color }}>
                  第四章
                </div>
                <h3 className="font-serif text-3xl lg:text-4xl font-semibold leading-tight" style={{ color: 'var(--text-1)' }}>
                  公司发展
                  <br />
                  <span className="font-cursive text-2xl" style={{ color: 'var(--text-3)' }}>
                    Company Milestones
                  </span>
                </h3>
              </div>
              <div className="flex-1 gold-line mb-3" />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <MilestoneList milestones={e.milestones} color={e.color} />
          </Reveal>
        </div>

        {/* 教训与启示 */}
        <div className="mt-24">
          <Reveal>
            <div className="flex items-end gap-6 mb-10">
              <div>
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: e.color }}>
                  第五章 · END
                </div>
                <h3 className="font-serif text-3xl lg:text-4xl font-semibold leading-tight" style={{ color: 'var(--text-1)' }}>
                  这件事教给我们
                  <br />
                  <span className="font-cursive text-2xl" style={{ color: 'var(--text-3)' }}>
                    Three Lessons
                  </span>
                </h3>
              </div>
              <div className="flex-1 gold-line mb-3" />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {e.lessons.map((l, i) => (
                <LessonCard key={i} index={i} text={l} color={e.color} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
