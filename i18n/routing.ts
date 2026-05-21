import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['it', 'en'],
  defaultLocale: 'it',
  pathnames: {
    '/': '/',
    '/progetti': { it: '/progetti', en: '/projects' },
    '/progetti/[slug]': { it: '/progetti/[slug]', en: '/projects/[slug]' },
    '/studio': '/studio',
    '/studio/curriculum': '/studio/curriculum',
    '/studio/premi': { it: '/studio/premi', en: '/studio/awards' },
    '/studio/team': '/studio/team',
    '/studio/collaboratori': { it: '/studio/collaboratori', en: '/studio/collaborators' },
    '/studio/lavoro': { it: '/studio/lavoro', en: '/studio/work' },
    '/news': '/news',
    '/news/[slug]': '/news/[slug]',
    '/contatti': { it: '/contatti', en: '/contact' },
    '/privacy': '/privacy',
  }
});
