import Reveal from './Reveal';
import { entrepreneurs } from '../data/entrepreneurs';

interface CoverProps {
  onJump: (id: string) => void;
}

export default function Cover({ onJump }: CoverProps) {
  return (
    <section id="cover" className="relative min-h-screen flex flex-col justify-between overflow-hidden px-6 lg:px-10 pt-32 pb-20">
      {/* 装饰线 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 right-10 w-px h-32" style={{ background: 'var(--gold-soft)', opacity: 0.4 }} />
        <div className="absolute bottom-32 left-10 w-32 h-px" style={{ background: 'var(--gold-soft)', opacity: 0.4 }} />
      </div>

      <div className="mx-auto max-w-7xl w-full relative z-10">
        {/* 顶部 meta */}
        <Reveal>
          <div className="flex items-center justify-between mb-16 font-mono text-[11px] tracking-[0.4em] uppercase" style={{ color: 'var(--text-4)' }}>
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--vermil)' }} />
              Vol.01 — 2026
            </div>
            <div>长读 · A Panoramic Record</div>
            <div className="hidden md:block">献给迷茫中的创业者</div>
          </div>
        </Reveal>

        {/* 标题 */}
        <Reveal delay={1}>
          <div className="relative">
            <h1
              className="font-serif font-black leading-[0.85] tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(120px, 22vw, 360px)',
                color: 'var(--text-1)',
                textShadow: '0 0 80px rgba(201, 169, 97, 0.15)',
              }}
            >
              <span className="block">破</span>
              <span className="block -mt-[0.1em]">土</span>
            </h1>
            <div
              className="absolute top-[10%] right-0 font-mono text-xs tracking-[0.3em] hidden md:block"
              style={{ color: 'var(--gold-soft)' }}
            >
              <div>POTU</div>
              <div style={{ opacity: 0.5 }}>· · ·</div>
            </div>
          </div>
        </Reveal>

        {/* 副标题 */}
        <Reveal delay={2}>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p
                className="font-cursive text-2xl md:text-3xl leading-[1.5]"
                style={{ color: 'var(--text-2)' }}
              >
                中国新消费与互联网创业者<em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>全景志</em>
                <br />
                ——六位创始人的「个人经历、首轮投资、融资时间线与公司发展」四象限长读。
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: 'var(--text-4)' }}>
                Why this
              </div>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                为什么有些公司能成为大厂,有些甚至失败?
                <br />
                拆开这六个样本,把答案摆在台面上。
              </p>
            </div>
          </div>
        </Reveal>

        {/* 引言金句 */}
        <Reveal delay={3}>
          <div className="mt-20 max-w-4xl">
            <div className="quote-block">
              「创业不是从一份 BP 开始的,是从一个人童年的饥饿感、青年的孤注一掷、第一笔投资背后那个相信你的人的眼睛里开始的。」
            </div>
            <div className="mt-3 font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
              — 编者按 · 破土编辑部
            </div>
          </div>
        </Reveal>

        {/* 六人画廊 */}
        <Reveal delay={4}>
          <div className="mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--gold)' }}>
                The Six Founders
              </div>
              <div className="flex-1 h-px" style={{ background: 'var(--ink-4)' }} />
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
                06 / Founders
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px" style={{ background: 'var(--ink-3)' }}>
              {entrepreneurs.map((e, i) => (
                <button
                  key={e.id}
                  onClick={() => onJump(e.id)}
                  className="group relative text-left p-6 lg:p-8 transition-all duration-700"
                  style={{
                    background: 'var(--ink-0)',
                    minHeight: '220px',
                  }}
                >
                  <div
                    className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                    style={{ background: `linear-gradient(180deg, transparent, ${e.color}10)` }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: 'var(--text-4)' }}>
                        {e.order}
                      </span>
                      <span
                        className="font-mono text-[9px] tracking-[0.3em] uppercase"
                        style={{ color: e.color }}
                      >
                        {e.industry.split('×')[0].trim()}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
                      {e.name}
                    </h3>
                    <div className="font-sans text-xs mb-6" style={{ color: 'var(--text-3)' }}>
                      × {e.company}
                    </div>
                    <div className="font-cursive text-base leading-snug" style={{ color: 'var(--text-2)' }}>
                      {e.tagline}
                    </div>
                    <div
                      className="absolute bottom-6 right-6 font-display text-3xl italic opacity-30 group-hover:opacity-100 transition-opacity"
                      style={{ color: e.color }}
                    >
                      0{i + 1}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 底部目录 */}
        <Reveal delay={5}>
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
                目录 · Index
              </div>
              <ul className="space-y-3">
                {entrepreneurs.map((e) => (
                  <li key={e.id}>
                    <a
                      href={`#${e.id}`}
                      onClick={(ev) => {
                        ev.preventDefault();
                        onJump(e.id);
                      }}
                      className="group flex items-baseline gap-4 transition-colors"
                    >
                      <span className="font-mono text-xs" style={{ color: 'var(--text-4)' }}>{e.order}</span>
                      <span className="font-serif text-lg group-hover:underline" style={{ color: 'var(--text-1)' }}>
                        {e.name} × {e.company}
                      </span>
                      <span className="flex-1 border-b border-dotted" style={{ borderColor: 'var(--ink-4)' }} />
                      <span className="font-cursive text-sm" style={{ color: 'var(--text-3)' }}>{e.headline}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--vermil)' }}>
                  横向对比
                </div>
                <a
                  href="#compare"
                  onClick={(ev) => {
                    ev.preventDefault();
                    onJump('compare');
                  }}
                  className="group block"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs" style={{ color: 'var(--text-4)' }}>07</span>
                    <span className="font-serif text-lg group-hover:underline" style={{ color: 'var(--text-1)' }}>
                      首笔融资的六种打开方式
                    </span>
                    <span className="flex-1 border-b border-dotted" style={{ borderColor: 'var(--ink-4)' }} />
                    <span style={{ color: 'var(--vermil)' }}>→</span>
                  </div>
                </a>
              </div>
              <div>
                <a
                  href="#ending"
                  onClick={(ev) => {
                    ev.preventDefault();
                    onJump('ending');
                  }}
                  className="group block"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs" style={{ color: 'var(--text-4)' }}>08</span>
                    <span className="font-serif text-lg group-hover:underline" style={{ color: 'var(--text-1)' }}>
                      给迷茫创业者的三句话
                    </span>
                    <span className="flex-1 border-b border-dotted" style={{ borderColor: 'var(--ink-4)' }} />
                    <span style={{ color: 'var(--gold)' }}>终</span>
                  </div>
                </a>
              </div>
              <div className="pt-6 border-t" style={{ borderColor: 'var(--ink-3)' }}>
                <p className="font-sans text-xs leading-loose" style={{ color: 'var(--text-4)' }}>
                  本文所有数据综合自招股书、36氪、虎嗅、晚点 LatePost、公开访谈与新闻报道。叙事为编辑综合梳理,非传记。
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
