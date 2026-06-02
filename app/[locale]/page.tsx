import { setRequestLocale } from 'next-intl/server';
import { HomeHero } from '@/components/home/HomeHero';
import { LockBodyScroll } from '@/components/ui/LockBodyScroll';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return locale === 'it'
    ? {
        title: 'dare-architettura — Studio di Architettura Ferrara',
        description: 'Studio di architettura basato sul binomio osare-dare. Ferrara, dal 2009.',
      }
    : {
        title: 'dare-architettura — Architecture Studio Ferrara',
        description: 'Architecture studio built on the dare-give duality. Ferrara, since 2009.',
      };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LockBodyScroll />
      <HomeHero />
    </>
  );
}
