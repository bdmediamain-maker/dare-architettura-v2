'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
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
      {/* Year rail — sticky on desktop. Parent uses default align-items:stretch so the
          aside is as tall as the news column, giving the sticky child a long scroll range. */}
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

      {/* News items */}
      <div className="flex-1 max-w-[720px]">
        {news.map((item, i) => (
          <div
            key={item.slug}
            ref={(el) => { itemRefs.current[item.slug] = el; }}
            id={`news-${item.slug}`}
            onMouseEnter={() => setHoveredNews(i)}
            onMouseLeave={() => setHoveredNews((h) => (h === i ? null : h))}
            style={{
              paddingTop: i === 0 ? '0' : '48px',
              paddingBottom: '48px',
              borderTop: i === 0 ? 'none' : '1px solid #eee',
            }}
          >
            {/* Date — SUSSURRA */}
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
            {/* Title — GRIDA */}
            <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#000', lineHeight: 1.15, marginBottom: '8px' }}>
              {item.titolo}
            </h2>
            {/* Short hairline accent */}
            <div style={{ width: '40px', height: '1px', background: '#000', marginBottom: '12px' }} />
            {/* Body — PARLA */}
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
        ))}
      </div>

      {/* Fixed hover preview — same pattern as awards page */}
      {hoveredNews !== null && news[hoveredNews]?.immagini?.[0] && (
        <div
          className="awards-hover-image"
          style={{
            position: 'fixed',
            right: 'calc((100vw - 900px) / 2)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '420px',
            zIndex: 10,
            pointerEvents: 'none',
            contain: 'layout paint',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredNews}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={news[hoveredNews].immagini![0]}
                alt={news[hoveredNews].titolo}
                width={420}
                height={300}
                sizes="420px"
                style={{ width: '100%', height: 'auto' }}
              />
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: '#888',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                }}
              >
                {news[hoveredNews].titolo}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
