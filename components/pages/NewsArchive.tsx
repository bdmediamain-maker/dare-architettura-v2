'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { news as rawNews } from '@/lib/data/news';
import { translateNewsList } from '@/lib/i18n/translateNewsAwards';

interface NewsArchiveProps {
  locale: string;
}

// Build year list 2008..2025 descending
const allYears: number[] = [];
for (let y = 2025; y >= 2008; y--) allYears.push(y);

export function NewsArchive({ locale }: NewsArchiveProps) {
  const news = translateNewsList(rawNews, locale);
  const yearsWithNews = new Set(news.map(n => n.anno));
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [hoveredNews, setHoveredNews] = useState<number | null>(null);
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
      {/* Year rail — sticky on desktop. */}
      <aside className="lg:w-[80px] flex-shrink-0">
        <div
          className="flex lg:flex-col gap-4 lg:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:sticky"
          style={{
            top: '100px',
          }}
        >
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

      {/* News items — full width now that hover image is inline */}
      <div className="flex-1 max-w-[900px]">
        {news.map((item, i) => (
          <div key={item.slug}>
            {/* News item */}
            <div
              ref={(el) => { itemRefs.current[item.slug] = el; }}
              id={`news-${item.slug}`}
              onMouseEnter={() => setHoveredNews(i)}
              onMouseLeave={() => setHoveredNews((h) => (h === i ? null : h))}
              style={{
                padding: '24px 16px 24px 16px',
                borderBottom: '1px solid #eee',
                position: 'relative',
                transition: 'background 200ms',
                background: hoveredNews === i ? '#f8f8f8' : 'transparent',
                cursor: 'default',
              }}
            >
              {/* Animated left border line on hover */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: '#000',
                  transform: hoveredNews === i ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'top',
                  transition: 'transform 0.3s ease',
                }}
              />
              {/* Date */}
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: '#aaa',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '4px',
                }}
              >
                {item.data}
              </p>
              {/* Title */}
              <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#000', lineHeight: 1.15, marginBottom: '8px' }}>
                {item.titolo}
              </h2>
              {/* Short hairline accent */}
              <div style={{ width: '40px', height: '1px', background: '#000', marginBottom: '12px' }} />
              {/* Body */}
              <p style={{ fontSize: '15px', fontWeight: 400, color: '#555', lineHeight: 1.65 }}>
                {item.testo}
              </p>
              {item.progetto_collegato && (
                <Link
                  href={`/${locale}/${locale === 'it' ? 'progetti' : 'projects'}/${item.progetto_collegato}`}
                  style={{
                    display: 'inline-block',
                    marginTop: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#000',
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'solid',
                    textDecorationThickness: '1px',
                    textDecorationColor: '#000',
                    textUnderlineOffset: '4px',
                  }}
                  className="hover:!text-black"
                >
                  {linkLabel}
                </Link>
              )}
            </div>

            {/* Inline image strip — appears between this news item and the next,
                pushing content down with a smooth height animation. */}
            <AnimatePresence initial={false}>
              {hoveredNews === i && item.immagini && item.immagini.length > 0 && (
                <motion.div
                  key={`img-${item.slug}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredNews(i)}
                  onMouseLeave={() => setHoveredNews((h) => (h === i ? null : h))}
                  style={{
                    overflow: 'hidden',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <div
                    style={{
                      padding: '16px 16px',
                      display: 'flex',
                      gap: '8px',
                    }}
                  >
                    {item.immagini.slice(0, 3).map((src, j) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={j}
                        src={src}
                        alt={`${item.titolo} ${j + 1}`}
                        style={{
                          height: '200px',
                          flex: 1,
                          minWidth: 0,
                          objectFit: 'cover',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
