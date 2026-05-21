'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface StudioNavProps {
  locale: string;
}

export function StudioNav({ locale }: StudioNavProps) {
  const pathname = usePathname();
  const t = useTranslations('studio');

  const links = [
    { href: `/${locale}/studio`, label: t('profilo') },
    { href: `/${locale}/studio/curriculum`, label: t('curriculum') },
    { href: `/${locale}/studio/premi`, label: t('premi') },
    { href: `/${locale}/studio/team`, label: t('team') },
    { href: `/${locale}/studio/collaboratori`, label: t('collaboratori') },
    { href: `/${locale}/studio/lavoro`, label: t('lavoro') },
  ];

  return (
    <nav style={{ borderBottom: '1px solid #000', marginBottom: '64px' }}>
      <div className="flex flex-wrap gap-8 overflow-x-auto">
        {links.map(link => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
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
