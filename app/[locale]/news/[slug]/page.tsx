import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsBySlug, news } from '@/lib/data/news';

export async function generateStaticParams() {
  return news.map(n => ({ slug: n.slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const backLabel = locale === 'it' ? '← tutte le novità' : '← all news';
  const linkedLabel = locale === 'it' ? 'Progetto collegato' : 'Related project';
  const viewProjectLabel = locale === 'it' ? 'Vedi il progetto →' : 'View the project →';
  const projectsPath = locale === 'it' ? 'progetti' : 'projects';

  return (
    <article className="min-h-screen">
      <Link
        href={`/${locale}/news`}
        style={{
          fontFamily: 'monospace',
          fontSize: '13px',
          color: '#888888',
          textDecoration: 'underline',
          textUnderlineOffset: '4px',
          marginBottom: '64px',
          display: 'inline-block',
        }}
        className="hover:!text-black"
      >
        {backLabel}
      </Link>

      <div className="max-w-[720px]">
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#888888',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '24px',
            marginTop: '24px',
          }}
        >
          {item.data}
        </p>
        <h1 style={{ fontSize: '48px', fontWeight: 400, letterSpacing: '-0.01em', color: '#000', lineHeight: 1.2, marginBottom: '48px' }}>
          {item.titolo}
        </h1>
        <p style={{ fontSize: '18px', fontWeight: 400, color: '#000', lineHeight: 1.7 }}>{item.testo}</p>

        {item.progetto_collegato && (
          <div style={{ marginTop: '80px', borderTop: '1px solid #000', paddingTop: '32px' }}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#888888',
                marginBottom: '16px',
              }}
            >
              {linkedLabel}
            </p>
            <Link
              href={`/${locale}/${projectsPath}/${item.progetto_collegato}`}
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: '#000',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              {viewProjectLabel}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
