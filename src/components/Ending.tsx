import Reveal from './Reveal';

export default function Ending() {
  return (
    <section
      id="ending"
      className="relative px-6 lg:px-10 py-32 lg:py-48 overflow-hidden"
      style={{ borderTop: '1px solid var(--ink-3)' }}
    >
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-px" style={{ background: 'var(--vermil)' }} />
            <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--vermil)' }}>
              第 八 章 · Ending
            </div>
            <div className="w-12 h-px" style={{ background: 'var(--vermil)' }} />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2
            className="font-serif font-black leading-[1.05] tracking-[-0.01em] mb-16"
            style={{
              fontSize: 'clamp(48px, 8vw, 120px)',
              color: 'var(--text-1)',
            }}
          >
            给迷茫创业者的
            <br />
            <span className="font-cursive" style={{ color: 'var(--gold)' }}>
              三句话
            </span>
          </h2>
        </Reveal>

        <div className="space-y-16 lg:space-y-24 text-left">
          {[
            {
              num: '壹',
              en: 'On Yourself',
              line: '你过去所有的失败与不甘,都会在某一笔投资、某一次产品发布、某一个凌晨三点,变成你唯一的护城河。',
              tag: '关于自己',
            },
            {
              num: '贰',
              en: 'On Money',
              line: '第一笔钱不在于多,而在于「那个投你的人,真的相信你」。估值高一点,不如人靠谱一点;名气大一点,不如眼光对一点。',
              tag: '关于钱',
            },
            {
              num: '叁',
              en: 'On Time',
              line: '把三年当成十年去思考,把一天当成三年去执行。你不需要现在就赢,只需要还在牌桌上。',
              tag: '关于时间',
            },
          ].map((s, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <div className="flex items-baseline gap-3">
                    <div className="font-serif text-6xl" style={{ color: 'var(--gold)' }}>{s.num}</div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
                        {s.en}
                      </div>
                      <div className="font-cursive text-sm mt-1" style={{ color: 'var(--text-3)' }}>{s.tag}</div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-9">
                  <p
                    className="font-cursive leading-[1.6]"
                    style={{ fontSize: 'clamp(24px, 3.4vw, 42px)', color: 'var(--text-1)' }}
                  >
                    {s.line}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={4}>
          <div className="mt-32 flex flex-col items-center">
            <div className="stamp-seal">破土</div>
            <div className="mt-8 font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--text-4)' }}>
              End of File · 破土编辑部 · 2026
            </div>
          </div>
        </Reveal>

        <Reveal delay={5}>
          <div className="mt-20 max-w-2xl mx-auto font-sans text-xs leading-loose" style={{ color: 'var(--text-4)' }}>
            本文所有数据综合自公开资料(招股书、36氪、虎嗅、晚点 LatePost、第一财经、公开访谈与新闻报道),叙事为编辑综合梳理,非传记。
            <br />
            如有错漏,欢迎指正。
            <br />
            <br />
            <span style={{ color: 'var(--gold-soft)' }}>献给所有正在路上的人。</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
