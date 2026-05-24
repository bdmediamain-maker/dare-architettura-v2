'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);

  const projectsPath = locale === 'it' ? 'progetti' : 'projects';
  const contactsPath = locale === 'it' ? 'contatti' : 'contact';

  const items = [
    { href: `/${locale}`, label: tNav('home') },
    { href: `/${locale}/news`, label: tNav('news') },
    { href: `/${locale}/${projectsPath}`, label: tNav('progetti') },
    { href: `/${locale}/studio`, label: tNav('studio') },
    { href: `/${locale}/${contactsPath}`, label: tNav('contatti') },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const otherLocale = locale === 'it' ? 'en' : 'it';
  const otherLocalePath = `/${otherLocale}${pathname.replace(/^\/[a-z]{2}/, '')}`;

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 40px',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid #eee',
        }}
        className="lg:px-10 px-5"
      >
        {/* Left: single full logo image */}
        <Link href={`/${locale}`} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image
            src="/logo-full.png"
            alt="dare-architettura"
            width={220}
            height={50}
            priority
            className="h-14 lg:h-16 w-auto"
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop right: links + lang */}
        <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '32px' }}>
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: '14px',
                  fontWeight: active ? 500 : 400,
                  color: active ? '#000' : '#666',
                  letterSpacing: '0.05em',
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
          <div style={{ fontFamily: 'monospace', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Link
              href={locale === 'it' ? pathname : otherLocalePath}
              style={{ color: locale === 'it' ? '#000' : '#888', fontWeight: locale === 'it' ? 500 : 400 }}
            >
              IT
            </Link>
            <span style={{ color: '#888' }}>/</span>
            <Link
              href={locale === 'en' ? pathname : otherLocalePath}
              style={{ color: locale === 'en' ? '#000' : '#888', fontWeight: locale === 'en' ? 500 : 400 }}
            >
              EN
            </Link>
          </div>
        </div>

        {/* Mobile: hamburger */}
        <button
          aria-label="menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{ display: 'block', width: '24px', height: '1.5px', background: '#000', transition: 'transform 200ms', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '1.5px', background: '#000', opacity: mobileOpen ? 0 : 1, transition: 'opacity 200ms' }} />
          <span style={{ display: 'block', width: '24px', height: '1.5px', background: '#000', transition: 'transform 200ms', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{
            position: 'fixed',
            top: '104px',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 49,
            background: '#fff',
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: '22px',
                  fontWeight: active ? 500 : 400,
                  color: active ? '#000' : '#888',
                  textDecorationLine: active ? 'underline' : 'none',
                  textDecorationStyle: 'solid',
                  textDecorationThickness: '1px',
                  textDecorationColor: '#000',
                  textUnderlineOffset: '6px',
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <div style={{ marginTop: '24px', fontFamily: 'monospace', fontSize: '14px', display: 'flex', gap: '8px' }}>
            <Link href={locale === 'it' ? pathname : otherLocalePath} onClick={() => setMobileOpen(false)} style={{ color: locale === 'it' ? '#000' : '#888', fontWeight: locale === 'it' ? 500 : 400 }}>IT</Link>
            <span style={{ color: '#888' }}>/</span>
            <Link href={locale === 'en' ? pathname : otherLocalePath} onClick={() => setMobileOpen(false)} style={{ color: locale === 'en' ? '#000' : '#888', fontWeight: locale === 'en' ? 500 : 400 }}>EN</Link>
          </div>
        </div>
      )}
    </>
  );
}
