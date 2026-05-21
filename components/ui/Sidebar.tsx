'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface SidebarProps {
  locale: string;
}

export function Sidebar({ locale }: SidebarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const prefix = `/${locale}`;
  const otherLocale = locale === 'it' ? 'en' : 'it';

  const items = [
    { href: prefix, label: t('home') },
    { href: `${prefix}/news`, label: t('news') },
    { href: `${prefix}/progetti`, label: t('progetti') },
    { href: `${prefix}/studio`, label: t('studio') },
    { href: `${prefix}/contatti`, label: t('contatti') },
  ];

  const isActive = (href: string) => {
    if (href === prefix) return pathname === prefix || pathname === `${prefix}/`;
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex fixed top-0 left-0 h-screen w-[280px] bg-white border-r border-black flex-col z-40"
        style={{ padding: '48px 40px' }}
      >
        {/* Logo + wordmark */}
        <Link href={prefix} className="flex items-center gap-3 group">
          <Image src="/logo.png" alt="dare-architettura" width={40} height={40} priority />
          <div>
            <p
              style={{
                fontSize: '20px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#000',
                lineHeight: 1,
              }}
            >
              DARE
            </p>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#000',
                marginTop: '4px',
              }}
            >
              ARCHITETTURA
            </p>
          </div>
        </Link>

        {/* Menu */}
        <nav style={{ marginTop: '80px' }} className="flex flex-col gap-[14px]">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: '16px',
                  fontWeight: active ? 500 : 400,
                  color: active ? '#000' : '#CCCCCC',
                  textDecorationLine: active ? 'underline' : 'none',
                  textDecorationStyle: 'solid',
                  textDecorationThickness: '1px',
                  textDecorationColor: '#000',
                  textUnderlineOffset: '4px',
                  transition: 'color 200ms ease',
                }}
                className="hover:!text-black"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* IT/EN toggle at bottom */}
        <div className="mt-auto flex items-center gap-2" style={{ fontFamily: 'monospace', fontSize: '13px' }}>
          <Link
            href="/it"
            style={{ color: locale === 'it' ? '#000' : '#888888', textTransform: 'uppercase' }}
            className="hover:!text-black transition-colors"
          >
            IT
          </Link>
          <span style={{ color: '#CCCCCC' }}>/</span>
          <Link
            href="/en"
            style={{ color: locale === 'en' ? '#000' : '#888888', textTransform: 'uppercase' }}
            className="hover:!text-black transition-colors"
          >
            EN
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-white border-b border-black flex items-center justify-between px-6 z-40">
        <Link href={prefix} className="flex items-center gap-2">
          <Image src="/logo.png" alt="dare-architettura" width={32} height={32} priority />
          <div>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#000',
                lineHeight: 1,
              }}
            >
              DARE
            </p>
            <p
              style={{
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#000',
                marginTop: '3px',
              }}
            >
              ARCHITETTURA
            </p>
          </div>
        </Link>
        <button
          aria-label="Menu"
          onClick={() => setMobileOpen(true)}
          className="text-black"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
          <div className="h-20 flex items-center justify-between px-6 border-b border-black">
            <Link href={prefix} className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <Image src="/logo.png" alt="dare-architettura" width={32} height={32} />
              <div>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#000',
                    lineHeight: 1,
                  }}
                >
                  DARE
                </p>
                <p
                  style={{
                    fontSize: '9px',
                    fontWeight: 400,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#000',
                    marginTop: '3px',
                  }}
                >
                  ARCHITETTURA
                </p>
              </div>
            </Link>
            <button aria-label="Close" onClick={() => setMobileOpen(false)} className="text-black">
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col gap-6 px-8 pt-16">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: '24px',
                    fontWeight: active ? 500 : 400,
                    color: active ? '#000' : '#CCCCCC',
                    textDecoration: active ? 'underline' : 'none',
                    textUnderlineOffset: '6px',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="px-8 pb-8 flex items-center gap-2" style={{ fontFamily: 'monospace', fontSize: '13px' }}>
            <Link
              href="/it"
              onClick={() => setMobileOpen(false)}
              style={{ color: locale === 'it' ? '#000' : '#888888', textTransform: 'uppercase' }}
            >
              IT
            </Link>
            <span style={{ color: '#CCCCCC' }}>/</span>
            <Link
              href="/en"
              onClick={() => setMobileOpen(false)}
              style={{ color: locale === 'en' ? '#000' : '#888888', textTransform: 'uppercase' }}
            >
              EN
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
