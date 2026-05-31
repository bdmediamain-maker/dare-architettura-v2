import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroBackground } from '@/components/home/HeroBackground';
import { HomeContent } from '@/components/home/HomeContent';
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
  const t = await getTranslations({ locale, namespace: 'home' });

  const manifestoLead = locale === 'it'
    ? "uno studio di architettura basato sul binomio osare-dare."
    : "an architecture studio built on the dare-give duality.";
  const manifestoBody = locale === 'it'
    ? "L'osare mantiene viva la persona. Il dare soddisfa le esigenze del committente."
    : "Daring keeps the person alive. Giving meets the client's needs.";

  const labels = locale === 'it'
    ? { fondato: 'FONDATO', sede: 'SEDE', contatto: 'CONTATTO' }
    : { fondato: 'FOUNDED', sede: 'BASED IN', contatto: 'CONTACT' };

  const sedeValue = locale === 'it' ? 'Ferrara, Italia' : 'Ferrara, Italy';
  const tagline = t('hero_pre');

  return (
    <>
      <LockBodyScroll />
      <HeroBackground />
      <HomeContent
        tagline={tagline}
        manifestoLead={manifestoLead}
        manifestoBody={manifestoBody}
        labels={labels}
        sedeValue={sedeValue}
      />
    </>
  );
}
