import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // 0..5
  threshold?: number;
  as?: 'div' | 'section' | 'article' | 'span' | 'li' | 'p';
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.15,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const delayClass = delay > 0 ? `reveal-delay-${Math.min(5, delay)}` : '';
  return (
    // @ts-expect-error - dynamic ref
    <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${delayClass} ${className}`}>
      {children}
    </Tag>
  );
}
