import Reveal from './Reveal';
import { entrepreneurs } from '../data/entrepreneurs';

export default function ComparisonTable() {
  return (
    <section
      id="compare"
      className="relative px-6 lg:px-10 py-24 lg:py-32"
      style={{ borderTop: '1px solid var(--ink-3)' }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-end gap-6">
            <div className="chapter-num" style={{ color: 'transparent', WebkitTextStroke: '1px var(--vermil)' }}>
              07
            </div>
            <div className="flex-1 pb-4">
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: 'var(--vermil)' }}>
                横向对比 · Cross Comparison
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{ color: 'var(--text-1)' }}>
                首笔融资的
                <br />
                <span className="font-cursive" style={{ color: 'var(--vermil)' }}>
                  六种打开方式
                </span>
              </h2>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <p className="mt-10 max-w-3xl font-cursive text-2xl leading-relaxed" style={{ color: 'var(--text-2)' }}>
            六个人,六条路,六种「拿到第一笔钱」的方式。把它并排放在一起,你会发现:第一笔钱的「成色」,往往决定了一家公司的底色。
          </p>
        </Reveal>

        {/* 6 列对照 */}
        <Reveal delay={2}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px" style={{ background: 'var(--ink-3)' }}>
            {entrepreneurs.map((e) => (
              <div
                key={e.id}
                className="p-5 lg:p-6 flex flex-col"
                style={{ background: 'var(--ink-0)', minHeight: '420px' }}
              >
                {/* 顶部色条 */}
                <div className="h-1 mb-4" style={{ background: e.color }} />
                <div className="font-mono text-[10px] tracking-[0.3em] mb-1" style={{ color: e.color }}>
                  {e.order}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
                  {e.name}
                </h3>
                <div className="font-sans text-xs mb-4" style={{ color: 'var(--text-3)' }}>
                  × {e.company}
                </div>

                <div className="space-y-3 text-xs font-sans" style={{ color: 'var(--text-3)' }}>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: e.color }}>
                      行业
                    </div>
                    <div style={{ color: 'var(--text-2)' }}>{e.industry}</div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: e.color }}>
                      首轮 · {e.firstFunding.year}
                    </div>
                    <div className="font-mono text-sm" style={{ color: 'var(--text-1)' }}>{e.firstFunding.amount}</div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: e.color }}>
                      投资人
                    </div>
                    <div className="space-y-0.5" style={{ color: 'var(--text-2)' }}>
                      {e.firstFunding.investors.map((inv, i) => (
                        <div key={i}>· {inv}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1" />

                <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--ink-3)' }}>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: e.color }}>
                    关键动机
                  </div>
                  <p className="font-cursive text-sm leading-relaxed line-clamp-4" style={{ color: 'var(--text-2)' }}>
                    {e.firstFunding.reason.slice(0, 60)}…
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 融资节奏条 */}
        <Reveal delay={2}>
          <div className="mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--gold)' }}>
                融资节奏条
              </div>
              <div className="flex-1 h-px" style={{ background: 'var(--ink-4)' }} />
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
                Funding Cadence · 2012—2025
              </div>
            </div>

            <div className="card-ink p-6 lg:p-8" style={{ borderColor: 'var(--ink-3)' }}>
              <div className="space-y-4">
                {entrepreneurs.map((e) => {
                  const years = e.fundingTimeline.map((r) => r.year);
                  const minYear = 2012;
                  const maxYear = 2025;
                  return (
                    <div key={e.id} className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 font-sans text-sm flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                        <span className="font-mono text-[10px]" style={{ color: 'var(--text-4)' }}>{e.order}</span>
                        {e.name}
                      </div>
                      <div className="col-span-9 relative h-8" style={{ background: 'var(--ink-1)' }}>
                        <div
                          className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none"
                          style={{
                            background: `repeating-linear-gradient(90deg, transparent 0, transparent calc(100% / 14 - 1px), var(--ink-3) calc(100% / 14 - 1px), var(--ink-3) calc(100% / 14))`,
                          }}
                        />
                        {years.map((y, i) => {
                          const pct = ((y - minYear) / (maxYear - minYear)) * 100;
                          const isIPO = e.fundingTimeline[i].round === 'IPO';
                          return (
                            <div
                              key={i}
                              className="absolute top-1/2 -translate-y-1/2 group"
                              style={{ left: `${pct}%` }}
                            >
                              <div
                                className="w-2.5 h-2.5 rounded-full -ml-1.5"
                                style={{
                                  background: isIPO ? 'var(--vermil)' : e.color,
                                  boxShadow: `0 0 8px ${isIPO ? 'var(--vermil)' : e.color}`,
                                }}
                              />
                              <div
                                className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                style={{ color: isIPO ? 'var(--vermil)' : e.color }}
                              >
                                {e.fundingTimeline[i].round} · {y}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="col-span-1 text-right">
                        <div className="font-display text-2xl italic" style={{ color: e.color }}>{e.fundingTimeline.length}</div>
                        <div className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-4)' }}>rounds</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center justify-between text-[10px] font-mono tracking-[0.2em]" style={{ color: 'var(--text-4)' }}>
                <span>2012</span>
                <span>2014</span>
                <span>2016</span>
                <span>2018</span>
                <span>2020</span>
                <span>2022</span>
                <span>2024</span>
                <span>2025</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 行业分布 */}
        <Reveal delay={2}>
          <div className="mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--gold)' }}>
                行业分布
              </div>
              <div className="flex-1 h-px" style={{ background: 'var(--ink-4)' }} />
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
                Six Tracks
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {entrepreneurs.map((e) => (
                <a
                  key={e.id}
                  href={`#${e.id}`}
                  className="group card-ink card-hover-lift p-6 flex flex-col"
                  style={{ borderColor: 'var(--ink-3)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center font-display text-xl italic"
                      style={{
                        background: e.color,
                        color: 'var(--ink-0)',
                      }}
                    >
                      {e.order}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: e.color }}>
                      {e.industry.split('×')[0].trim()}
                    </div>
                  </div>
                  <div className="font-serif text-2xl font-semibold" style={{ color: 'var(--text-1)' }}>
                    {e.company}
                  </div>
                  <div className="font-sans text-xs mt-1" style={{ color: 'var(--text-3)' }}>
                    {e.name} · 创立 {e.founded}
                  </div>
                  <div className="mt-4 flex-1" />
                  <p className="font-cursive text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
                    {e.headline}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 五大影响因素 */}
        <Reveal delay={2}>
          <div className="mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--gold)' }}>
                影响创业的五大因素
              </div>
              <div className="flex-1 h-px" style={{ background: 'var(--ink-4)' }} />
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
                Five Forces
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-px" style={{ background: 'var(--ink-3)' }}>
              {[
                { num: '壹', name: '时代', en: 'Era', desc: '程维赶上了移动支付,王宁赶上了 Z 世代,张俊杰赶上了新茶饮——所有成功,都是时代给的窗口。' },
                { num: '贰', name: '赛道', en: 'Track', desc: '工具、IP、保险、蓝领——选错赛道,再大的本事也白搭。' },
                { num: '叁', name: '团队', en: 'Team', desc: '沈鹏有美团系,程维有阿里系,周峰是工地长大的——基因决定打法。' },
                { num: '肆', name: '资本', en: 'Capital', desc: '王兴投沈鹏、雷军系投周峰、复星投张俊杰——第一笔钱的「成色」决定底色。' },
                { num: '伍', name: '运气', en: 'Luck', desc: '王宁差点破产、张俊杰差点没找到钱,吴欣鸿的高考休学——命运总在关键节点推一把。' },
              ].map((f, i) => (
                <div key={i} className="p-6 lg:p-8" style={{ background: 'var(--ink-0)' }}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <div className="font-serif text-3xl" style={{ color: 'var(--gold)' }}>{f.num}</div>
                    <div>
                      <div className="font-serif text-lg font-semibold" style={{ color: 'var(--text-1)' }}>{f.name}</div>
                      <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>{f.en}</div>
                    </div>
                  </div>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
