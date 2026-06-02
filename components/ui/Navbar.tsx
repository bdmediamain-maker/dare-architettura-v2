'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);

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
          padding: '20px 40px',
          background: menuOpen ? '#e0e0e0' : '#fff',
          borderBottom: menuOpen ? '1px solid #ddd' : '1px solid #eee',
          // Smooth color shift, same curve as the dropdown panel below
          transition: 'background-color 400ms cubic-bezier(0.16, 1, 0.3, 1), border-bottom-color 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="lg:px-10 px-5"
      >
        {/* Left: logo */}
        <Link
          href={`/${locale}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <Image
            src="/logo-full.png"
            alt="dare-architettura"
            width={220}
            height={50}
            priority
            className="h-12 lg:h-14 w-auto"
            style={{
              objectFit: 'contain',
              // Multiply makes the white background of the PNG blend with the
              // navbar bg — white → bg color, black logo stays black.
              mixBlendMode: 'multiply',
            }}
          />
        </Link>

        {/* Desktop center: page links — absolutely centered. Hidden when hamburger is open. */}
        <div
          className="hidden lg:flex"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            alignItems: 'center',
            gap: '32px',
            opacity: menuOpen ? 0 : 1,
            visibility: menuOpen ? 'hidden' : 'visible',
            transition: 'opacity 280ms ease, visibility 280ms ease',
            pointerEvents: menuOpen ? 'none' : 'auto',
          }}
        >
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  position: 'relative',
                  fontSize: '14px',
                  fontWeight: active ? 500 : 400,
                  color: active ? '#000' : '#666',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                }}
                className="nav-link hover:!text-black"
              >
                <span>{item.label}</span>
                <span
                  className="nav-link-underline"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: '#000',
                    transformOrigin: 'left',
                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </Link>
            );
          })}
        </div>

        {/* Right: lang switcher (desktop) + hamburger (all sizes) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            className="hidden lg:flex"
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              alignItems: 'center',
              gap: '4px',
              opacity: menuOpen ? 0 : 1,
              visibility: menuOpen ? 'hidden' : 'visible',
              transition: 'opacity 280ms ease, visibility 280ms ease',
              pointerEvents: menuOpen ? 'none' : 'auto',
            }}
          >
            <Link
              href={locale === 'it' ? pathname : otherLocalePath}
              style={{
                color: locale === 'it' ? '#000' : '#888',
                fontWeight: locale === 'it' ? 500 : 400,
              }}
            >
              IT
            </Link>
            <span style={{ color: '#888' }}>/</span>
            <Link
              href={locale === 'en' ? pathname : otherLocalePath}
              style={{
                color: locale === 'en' ? '#000' : '#888',
                fontWeight: locale === 'en' ? 500 : 400,
              }}
            >
              EN
            </Link>
          </div>

          <button
            aria-label="menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              gap: '5px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#000',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#000',
                transition: 'opacity 0.3s',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#000',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.1)',
              zIndex: 48,
            }}
          />
        )}
      </AnimatePresence>

      {/* Dropdown menu panel — light gray */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              background: '#e0e0e0',
              zIndex: 49,
              padding: '40px',
              borderBottom: '1px solid #ddd',
            }}
            className="max-md:!p-6"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                maxWidth: '400px',
              }}
            >
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:!text-gray-500"
                  style={{
                    fontSize: '24px',
                    fontWeight: 500,
                    color: '#000',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid #ddd',
                  display: 'flex',
                  gap: '16px',
                  fontFamily: 'monospace',
                }}
              >
                <Link
                  href={locale === 'it' ? pathname : otherLocalePath}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: '14px',
                    fontWeight: locale === 'it' ? 500 : 400,
                    color: locale === 'it' ? '#000' : '#888',
                  }}
                >
                  IT
                </Link>
                <span style={{ color: '#ccc' }}>/</span>
                <Link
                  href={locale === 'en' ? pathname : otherLocalePath}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: '14px',
                    fontWeight: locale === 'en' ? 500 : 400,
                    color: locale === 'en' ? '#000' : '#888',
                  }}
                >
                  EN
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
