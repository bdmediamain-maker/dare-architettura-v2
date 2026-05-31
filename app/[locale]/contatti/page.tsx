import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/pages/ContactForm';

export default async function ContattiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contatti' });

  const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#aaa',
    marginBottom: '2px',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 400,
    color: '#000',
    lineHeight: 1.5,
  };

  const emailStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 400,
    color: '#000',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationThickness: '1px',
    textDecorationColor: '#000',
    textUnderlineOffset: '4px',
  };

  return (
    <div className="min-h-screen">
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          color: '#000',
          marginBottom: '64px',
        }}
      >
        {t('titolo')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: contact info */}
        <div style={{ maxWidth: '400px' }}>
          <div style={{ marginBottom: '20px' }}>
            <p style={labelStyle}>{locale === 'it' ? 'Indirizzo' : 'Address'}</p>
            <address style={{ ...valueStyle, fontStyle: 'normal' }}>
              Via Saraceno, 74<br />
              44121 Ferrara (FE)<br />
              Italia
            </address>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p style={labelStyle}>{locale === 'it' ? 'Telefono' : 'Phone'}</p>
            <a href="tel:+390532472979" style={valueStyle} className="hover:underline underline-offset-4">
              +39 0532 472979
            </a>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p style={labelStyle}>Email</p>
            <a href="mailto:studio@dare-architettura.net" style={emailStyle}>
              studio@dare-architettura.net
            </a>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p style={labelStyle}>P.IVA</p>
            <p style={valueStyle}>01725130387</p>
          </div>
        </div>

        {/* Right: form */}
        <div>
          <ContactForm locale={locale} />
        </div>
      </div>

      {/* Map */}
      <div style={{ marginTop: '80px' }}>
        <div style={{ height: '400px', filter: 'grayscale(1)' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2851.6!2d11.621!3d44.836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDUwJzA5LjYiTiAxMcKwMzcnMTUuNiJF!5e0!3m2!1sit!2sit!4v1000000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mappa studio"
          />
        </div>
      </div>
    </div>
  );
}
