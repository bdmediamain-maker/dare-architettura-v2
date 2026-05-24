import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  slug: string;
  titolo: string;
  sottotitolo: string | null;
  anno: number | null;
  pictogram: string | null;
  thumbnail: string | null;
  luogo: string | null;
  categoria_label: string;
  locale: string;
}

export function ProjectCard({
  slug,
  titolo,
  sottotitolo,
  anno,
  pictogram,
  thumbnail,
  luogo,
  categoria_label,
  locale,
}: ProjectCardProps) {
  const projectsPath = locale === 'it' ? 'progetti' : 'projects';

  return (
    <Link href={`/${locale}/${projectsPath}/${slug}`} className="block group">
      <div className="border border-black bg-white group-hover:bg-[#F8F8F8] group-hover:border-[2px] transition-all duration-200">
        {/* Pictogram area */}
        <div
          style={{
            aspectRatio: '4/3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: '#fff',
          }}
        >
          {pictogram ? (
            <div
              style={{
                position: 'relative',
                width: '70%',
                height: '100%',
              }}
            >
              <Image
                src={pictogram}
                alt={titolo}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
          ) : thumbnail ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={thumbnail}
                alt={titolo}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#F8F8F8' }} />
          )}
        </div>

        {/* Info area */}
        <div style={{ borderTop: '1px solid #000', padding: '12px 16px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#888' }}>
            {anno ?? '—'}
          </p>
          <p style={{ fontSize: '15px', fontWeight: 500, color: '#000', marginTop: '4px' }}>
            {titolo}
          </p>
          <p style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>
            {luogo || sottotitolo || categoria_label}
          </p>
        </div>
      </div>
    </Link>
  );
}
