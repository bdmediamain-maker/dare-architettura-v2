'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface StudioNavProps {
  locale: string;
}

// Per-locale path segments (must mirror i18n/routing.ts pathnames mapping).
// When routing.ts changes the localized URL, update here too.
const SEGMENTS: Record<string, { it: string; en: string }> = {
  profilo:        { it: '/studio',                en: '/studio' },
  curriculum:     { it: '/studio/curriculum',    en: '/studio/curriculum' },
  premi:          { it: '/studio/premi',         en: '/studio/awards' },
  team:           { it: '/studio/team',          en: '/studio/team' },
  collaboratori:  { it: '/studio/collaboratori', en: '/studio/collaborators' },
  lavoro:         { it: '/studio/lavoro',        en: '/studio/work' },
};

export function StudioNav({ locale }: StudioNavProps) {
  const pathname = usePathname();
  const t = useTranslations('studio');

  const lang = (locale === 'en' ? 'en' : 'it') as 'it' | 'en';

  const links = (Object.keys(SEGMENTS) as Array<keyof typeof SEGMENTS>).map((key) => ({
    key,
    href: `/${locale}${SEGMENTS[key][lang]}`,
    label: t(key as 'profilo' | 'curriculum' | 'premi' | 'team' | 'collaboratori' | 'lavoro'),
  }));

  return (
    <nav style={{ borderBottom: '1px solid #000', marginBottom: '64px' }}>
      <div className="flex flex-wrap gap-8 overflow-x-auto">
        {links.map(link => {
          // Active match: exact path, OR pathname starts with href + '/' (defensive)
          const active = pathname === link.href || pathname === `${link.href}/`;
          return (
            <Link
              key={link.key}
              href={link.href}
              style={{
                fontSize: '15px',
                fontWeight: active ? 500 : 400,
                color: active ? '#000' : '#888888',
                paddingBottom: '12px',
                borderBottom: active ? '1px solid #000' : '1px solid transparent',
                marginBottom: '-1px',
                whiteSpace: 'nowrap',
                transition: 'color 200ms ease',
              }}
              className="hover:!text-black"
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
