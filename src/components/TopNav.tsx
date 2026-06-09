import { useEffect, useState } from 'react';
import { entrepreneurs } from '../data/entrepreneurs';

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('cover');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      // 找到当前激活的 section
      const ids = ['cover', ...entrepreneurs.map((e) => e.id), 'compare', 'ending'];
      let current = 'cover';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 backdrop-blur-md' : 'py-5'
      }`}
      style={{
        background: scrolled ? 'rgba(10, 10, 12, 0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--ink-3)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between">
        <a href="#cover" className="flex items-center gap-3 group">
          <div className="w-8 h-8 flex items-center justify-center border" style={{ borderColor: 'var(--gold)' }}>
            <span className="font-serif text-base" style={{ color: 'var(--gold)' }}>破</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-base" style={{ color: 'var(--text-1)' }}>破土</span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
              Six Founders · One Story
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {entrepreneurs.map((e) => (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="relative font-sans transition-colors duration-300"
              style={{
                color: active === e.id ? 'var(--gold)' : 'var(--text-3)',
              }}
            >
              <span className="font-mono text-[10px] mr-1.5" style={{ opacity: 0.6 }}>{e.order}</span>
              {e.name}
              {active === e.id && (
                <span
                  className="absolute -bottom-1.5 left-0 right-0 h-px"
                  style={{ background: 'var(--gold)' }}
                />
              )}
            </a>
          ))}
        </nav>

        <a
          href="#compare"
          className="hidden lg:flex items-center gap-2 font-sans text-xs tracking-[0.3em] uppercase transition-colors"
          style={{ color: 'var(--text-3)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
        >
          对比 <span style={{ color: 'var(--gold)' }}>→</span>
        </a>
      </div>
    </header>
  );
}
