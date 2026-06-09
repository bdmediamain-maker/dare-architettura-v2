'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const categories = [
  { key: 'professionisti', label: { it: 'Professionisti', en: 'Professionals' } },
  { key: 'imprese',        label: { it: 'Imprese / Artigiani', en: 'Companies / Craftsmen' } },
  { key: 'stazioni',       label: { it: 'Stazioni Appaltanti', en: 'Clients' } },
] as const;

type CategoryKey = (typeof categories)[number]['key'];

interface Collab {
  nome: string;
  settore: { it: string; en: string };
  citta: { it: string; en: string };
  url?: string;
}

const collaboratori: Record<CategoryKey, Collab[]> = {
  professionisti: [
    { nome: 'Dokarchitecten',     settore: { it: 'Architettura',            en: 'Architecture' },           citta: { it: 'Amsterdam', en: 'Amsterdam' }, url: 'http://www.dokarchitecten.nl' },
    { nome: 'Moke architecten',   settore: { it: 'Architettura',            en: 'Architecture' },           citta: { it: 'Amsterdam', en: 'Amsterdam' }, url: 'http://www.mokearchitecten.nl' },
    { nome: 'Mezzadringegneria',  settore: { it: 'Ingegneria strutturale',  en: 'Structural engineering' }, citta: { it: 'Ferrara',   en: 'Ferrara' },   url: 'http://www.mezzadringegneria.it' },
    { nome: 'on_office architettura', settore: { it: 'Architettura',        en: 'Architecture' },           citta: { it: 'Vicenza',   en: 'Vicenza' },   url: 'http://www.onoffice.net' },
    { nome: 'Lifelab',            settore: { it: 'Diagnostica',             en: 'Diagnostics' },            citta: { it: 'Ferrara',   en: 'Ferrara' } },
    { nome: 'Fabio Calamosca',    settore: { it: 'Comunicazione',           en: 'Communication' },          citta: { it: 'Milano',    en: 'Milan' } },
    { nome: 'Stefano Babboni',    settore: { it: 'Arte',                    en: 'Art' },                    citta: { it: 'Ferrara',   en: 'Ferrara' } },
    { nome: 'Sheila Davi',        settore: { it: 'Legale',                  en: 'Legal' },                  citta: { it: 'Ferrara',   en: 'Ferrara' } },
    { nome: 'Tecnopolis',         settore: { it: 'Ingegneria',              en: 'Engineering' },            citta: { it: 'Bologna',   en: 'Bologna' } },
    { nome: 'Andrea Maresti',     settore: { it: 'Impianti',                en: 'MEP systems' },            citta: { it: 'Ferrara',   en: 'Ferrara' } },
  ],
  imprese: [
    { nome: 'Govoni costruzioni s.n.c.', settore: { it: 'Impresa edile',      en: 'Construction company' }, citta: { it: 'Ferrara', en: 'Ferrara' } },
    { nome: 'Edil.Ar.Va',                settore: { it: 'Impresa edile',      en: 'Construction company' }, citta: { it: 'Ferrara', en: 'Ferrara' } },
    { nome: 'Zucchini & Boccafogli',     settore: { it: 'Impresa edile',      en: 'Construction company' }, citta: { it: 'Ferrara', en: 'Ferrara' } },
    { nome: 'Melfer',                    settore: { it: 'Carpenteria',        en: 'Steelwork' },             citta: { it: 'Rovigo',  en: 'Rovigo' } },
    { nome: 'Roberto Chierici',          settore: { it: 'Carpenteria leggera', en: 'Light steelwork' },      citta: { it: 'Ferrara', en: 'Ferrara' } },
    { nome: 'O.M.B.',                    settore: { it: 'Infissi',            en: 'Window fixtures' },       citta: { it: 'Rovigo',  en: 'Rovigo' } },
    { nome: 'Bragante',                  settore: { it: 'Infissi',            en: 'Window fixtures' },       citta: { it: 'Rovigo',  en: 'Rovigo' } },
    { nome: 'Pacchiella s.r.l.',         settore: { it: 'Cartongesso',        en: 'Drywall' },               citta: { it: 'Ferrara', en: 'Ferrara' } },
    { nome: 'Termoidraulica Peverati',   settore: { it: 'Impianti idraulici', en: 'Plumbing systems' },      citta: { it: 'Ferrara', en: 'Ferrara' } },
    { nome: 'Zeta-enne',                 settore: { it: 'Resine',             en: 'Resin flooring' },        citta: { it: 'Cento',   en: 'Cento' } },
    { nome: 'Cinzia Bucchi',             settore: { it: 'Restauri',           en: 'Restoration' },           citta: { it: 'Ferrara', en: 'Ferrara' } },
  ],
  stazioni: [
    { nome: 'Comune di Zevio',     settore: { it: 'Ente pubblico', en: 'Public body' },     citta: { it: 'Zevio, VR',          en: 'Zevio, VR' } },
    { nome: 'Comune di Codigoro',  settore: { it: 'Ente pubblico', en: 'Public body' },     citta: { it: 'Codigoro, FE',       en: 'Codigoro, FE' } },
    { nome: 'Comune di Ravenna',   settore: { it: 'Ente pubblico', en: 'Public body' },     citta: { it: 'Ravenna',            en: 'Ravenna' } },
    { nome: 'Comune di Comacchio', settore: { it: 'Ente pubblico', en: 'Public body' },     citta: { it: 'Comacchio, FE',      en: 'Comacchio, FE' } },
    { nome: 'Comune di Cervia',    settore: { it: 'Ente pubblico', en: 'Public body' },     citta: { it: 'Cervia',             en: 'Cervia' } },
    { nome: 'Comune di Mesola',    settore: { it: 'Ente pubblico', en: 'Public body' },     citta: { it: 'Mesola, FE',         en: 'Mesola, FE' } },
    { nome: 'Titan Italia spa',    settore: { it: 'Privato',       en: 'Private' },          citta: { it: 'Finale Emilia, MO', en: 'Finale Emilia, MO' } },
    { nome: 'CAI',                 settore: { it: 'Associazione',  en: 'Association' },      citta: { it: 'Italia',             en: 'Italy' } },
    { nome: 'Europan',             settore: { it: 'Organizzazione', en: 'Organization' },    citta: { it: 'Europa',             en: 'Europe' } },
  ],
};

const countLabels: Record<CategoryKey, { it: string; en: string }> = {
  professionisti: { it: 'professionisti',        en: 'professionals' },
  imprese:        { it: 'imprese e artigiani',   en: 'companies and craftsmen' },
  stazioni:       { it: 'stazioni appaltanti',   en: 'clients' },
};

interface CollaboratoriListProps {
  locale: string;
}

export function CollaboratoriList({ locale }: CollaboratoriListProps) {
  const lang: 'it' | 'en' = locale === 'en' ? 'en' : 'it';
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('professionisti');
  const [hovered, setHovered] = useState<string | null>(null);

  const items = collaboratori[activeCategory];

  return (
    <div>
      {/* Category tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          paddingBottom: '12px',
          borderBottom: '1px solid #000',
          marginBottom: '32px',
        }}
      >
        {categories.map((cat) => {
          const active = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                fontSize: '14px',
                fontWeight: active ? 500 : 400,
                color: active ? '#000' : '#888',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                paddingBottom: '4px',
                borderBottom: active ? '2px solid #000' : '2px solid transparent',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                marginBottom: '-12px',
              }}
            >
              {cat.label[lang]}
            </button>
          );
        })}
      </div>

      {/* Count */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <span
          style={{
            fontSize: '32px',
            fontWeight: 600,
            color: '#000',
            fontFamily: 'monospace',
            lineHeight: 1,
          }}
        >
          {items.length}
        </span>
        <span style={{ fontSize: '13px', color: '#888' }}>
          {countLabels[activeCategory][lang]}
        </span>
      </div>

      {/* Two-column outer grid on desktop, single column on mobile */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: '0 48px' }}
      >
        {items.map((collab, i) => {
          const rowKey = `${activeCategory}-${i}`;
          const isHovered = hovered === rowKey;
          return (
            <motion.div
              key={rowKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              onMouseEnter={() => setHovered(rowKey)}
              onMouseLeave={() => setHovered((h) => (h === rowKey ? null : h))}
              style={{
                padding: '14px 12px',
                margin: '0 -12px',
                borderBottom: '1px solid #eee',
                background: isHovered ? '#f8f8f8' : 'transparent',
                transition: 'background 200ms',
              }}
            >
              {/* Desktop: 3-column aligned grid. Mobile: stacked. */}
              <div
                className="md:grid md:items-baseline"
                style={{ gridTemplateColumns: '1fr 140px 120px', gap: '16px' }}
              >
                {/* Name */}
                <div>
                  {collab.url ? (
                    <a
                      href={collab.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#000',
                        textDecorationLine: 'underline',
                        textDecorationThickness: '1px',
                        textUnderlineOffset: '3px',
                        textDecorationColor: '#ddd',
                      }}
                    >
                      {collab.nome}
                    </a>
                  ) : (
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#000' }}>
                      {collab.nome}
                    </span>
                  )}
                </div>

                {/* Sector */}
                <span
                  className="md:text-left"
                  style={{
                    fontSize: '13px',
                    color: '#888',
                    display: 'block',
                  }}
                >
                  {collab.settore[lang]}
                </span>

                {/* City */}
                <span
                  className="md:text-right"
                  style={{
                    fontSize: '13px',
                    color: '#aaa',
                    fontFamily: 'monospace',
                    display: 'block',
                  }}
                >
                  {collab.citta[lang]}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
