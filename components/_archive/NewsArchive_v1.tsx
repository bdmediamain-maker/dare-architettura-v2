'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { news } from '@/lib/data/news';

interface NewsArchiveProps {
  locale: string;
}

// Build year list 2008..2025 descending
const allYears: number[] = [];
for (let y = 2025; y >= 2008; y--) allYears.push(y);

export function NewsArchive({ locale }: NewsArchiveProps) {
  const yearsWithNews = new Set(news.map(n => n.anno));
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleYearClick = (year: number) => {
    if (!yearsWithNews.has(year)) return;
    const firstItem = news.find(n => n.anno === year);
    if (firstItem) {
      const el = itemRefs.current[firstItem.slug];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveYear(year);
    }
  };

  // Update active year on scroll
  useEffect(() => {
    const handleScroll = () => {
      const positions = news.map(n => {
        const el = itemRefs.current[n.slug];
        if (!el) return { slug: n.slug, anno: n.anno, top: Infinity };
        return { slug: n.slug, anno: n.anno, top: el.getBoundingClientRect().top };
      });
      const visible = positions.filter(p => p.top <= 200).sort((a, b) => b.top - a.top)[0];
      if (visible) setActiveYear(visible.anno);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkLabel = locale === 'it' ? 'vai al progetto →' : 'view project →';

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Year rail */}
      <aside className="lg:w-[80px] flex-shrink-0">
        <div className="lg:sticky lg:top-24 flex lg:flex-col gap-4 lg:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
          {allYears.map(year => {
            const hasNews = yearsWithNews.has(year);
            const isActive = activeYear === year;
            return (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                disabled={!hasNews}
                style={{
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  fontWeight: isActive ? 500 : 400,
                  color: !hasNews ? '#CCCCCC' : isActive ? '#000' : '#888888',
                  cursor: hasNews ? 'pointer' : 'default',
                  textAlign: 'left',
                  transition: 'color 200ms ease',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                }}
                className={hasNews ? 'hover:!text-black' : ''}
              >
                {year}
              </button>
            );
          })}
        </div>
      </aside>

      {/* News items */}
      <div className="flex-1 max-w-[720px]">
        {news.map((item, i) => (
          <div
            key={item.slug}
            ref={(el) => { itemRefs.current[item.slug] = el; }}
            id={`news-${item.slug}`}
            style={{
              paddingTop: i === 0 ? '0' : '80px',
              paddingBottom: '80px',
              borderTop: i === 0 ? 'none' : '1px solid #000',
            }}
          >
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#888888',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '24px',
              }}
            >
              {item.data}
            </p>
            <h2 style={{ fontSize: '28px', fontWeight: 500, color: '#000', lineHeight: 1.3, marginBottom: '24px' }}>
              {item.titolo}
            </h2>
            <p style={{ fontSize: '18px', fontWeight: 400, color: '#000', lineHeight: 1.7 }}>
              {item.testo}
            </p>
            {item.progetto_collegato && (
              <Link
                href={`/${locale}/${locale === 'it' ? 'progetti' : 'projects'}/${item.progetto_collegato}`}
                style={{
                  display: 'inline-block',
                  marginTop: '24px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#000',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
                className="hover:!text-black"
              >
                {linkLabel}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
