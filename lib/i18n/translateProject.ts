import type { Project } from '@/lib/data/projects';
import { projectsI18n } from '@/lib/data/projects-i18n';

// --- Dictionaries (closed sets in the IT data) ----------------------------

const CATEGORIA_LABEL: Record<string, string> = {
  Commerciale: 'Commercial',
  Design: 'Design',
  Pubblico: 'Public',
  Residenziale: 'Residential',
  'Urbano - Paesaggio': 'Urban - Landscape',
};

const STATO: Record<string, string> = {
  realizzato: 'built',
  'non realizzato': 'unbuilt',
  'in fase di sviluppo': 'in development',
};

const SOTTOTITOLO: Record<string, string> = {
  'Ampliamento del cimitero comunale di Zevio': 'Extension of the Zevio municipal cemetery',
  'Ampliamento del cimitero di Castelmassa': 'Extension of the Castelmassa cemetery',
  'Appartamenti in duplex': 'Duplex apartments',
  'Aree esterne Titan Italia spa': 'Titan Italia spa outdoor areas',
  'Bivacco Fanton': 'Fanton bivouac',
  'Case in linea': 'Row houses',
  'Case popolari': 'Social housing',
  'Cittadella del commiato a Ferrara': 'Funeral citadel in Ferrara',
  'Europan 10': 'Europan 10',
  'Europan 12': 'Europan 12',
  'Europan 9': 'Europan 9',
  'Fontanello per piazza del Carmine': 'Drinking fountain for Piazza del Carmine',
  'Info point e allestimento museale': 'Info point and museum setup',
  'Logo musei di qualità': 'Quality museums logo',
  'Municipio di Codigoro': 'Codigoro town hall',
  'Nuova scala ed ascensore': 'New staircase and lift',
  'Nuovi uffici direzionali Titan Italia spa': 'New Titan Italia spa headquarters',
  'Parco Massari': 'Parco Massari',
  'Parco colle Bellaria e landmark di Salerno': 'Colle Bellaria park and Salerno landmark',
  Profumeria: 'Perfume shop',
  'Punto panoramico sul fiume Po': 'Po river panoramic viewpoint',
  'Riqualificazione area laguna  del Lusenzo': 'Lusenzo lagoon area redevelopment',
  "Riqualificazione dell'ex mercato coperto di Castelmassa":
    'Redevelopment of the former Castelmassa indoor market',
  'Riqualificazione della fascia periurbana ad ovest delle mura':
    'Redevelopment of the peri-urban strip west of the walls',
  'Riqualificazione di piazza Buozzi': 'Piazza Buozzi redevelopment',
  'Riqualificazione di piazza Verdi': 'Piazza Verdi redevelopment',
  'Riqualificazione palazzina ex-Mof di Ferrara':
    'Redevelopment of the former Mof building in Ferrara',
  'Riqualificazione urbana di piazza Kennedy': 'Urban redevelopment of Piazza Kennedy',
  'Ristrutturazione appartamenti': 'Apartment renovation',
  'Ristrutturazione cassero': 'Cassero renovation',
  'Ristrutturazione di due appartamenti': 'Renovation of two apartments',
  'Ristrutturazione di un appartamento': 'Renovation of an apartment',
  'Ristrutturazione di un bagno': 'Bathroom renovation',
  "Ristrutturazione di un'ala di un appartamento": 'Renovation of an apartment wing',
  'Scala antincendio ospedale Ramazzini': 'Ramazzini hospital fire escape',
  'Scuola materna e asilo a San Giorgio di Brunico':
    'Kindergarten and nursery in San Giorgio di Brunico',
  'Studio di architettura': 'Architecture studio',
  'Uffici comunali a Tolentino': 'Municipal offices in Tolentino',
  'Uffici direzionali': 'Executive offices',
  'Università di architettura di Delft': 'TU Delft Faculty of Architecture',
  'Viale delle Terme': 'Viale delle Terme',
  Villa: 'Villa',
  'XXIII UIA World Congress of Architecture': 'XXIII UIA World Congress of Architecture',
};

// --- Location / area: pattern-based ---------------------------------------

function translateLuogo(luogo: string | null): string | null {
  if (!luogo) return luogo;
  return luogo
    .replace(/,\s*IT\b/g, ', Italy')
    .replace(/^IT\s*-\s*/, '')
    .replace(/,\s*NL\b/g, ', Netherlands')
    .replace(/^NL\s*-\s*/, '')
    .replace(/,\s*DK\b/g, ', Denmark')
    .replace(/^IR\s*-\s*/, 'Ireland — ')
    .replace(/\bFerrara IT\b/, 'Ferrara, Italy')
    .replace(/\bCarpi IT\b/, 'Carpi, Italy')
    .replace(/\bPomposa IT\b/, 'Pomposa, Italy')
    .replace(/\bCodigoro IT\b/, 'Codigoro, Italy');
}

function translateSuperficie(superficie: string | null): string | null {
  if (!superficie) return superficie;
  return superficie
    .replace(/\bmq\b/g, 'm²')
    .replace(/\bettari\b/g, 'hectares');
}

// --- Stato helper (IT version capitalises the label in some contexts) ------

function translateStato(stato: string | null): string | null {
  if (!stato) return stato;
  const lower = stato.toLowerCase();
  return STATO[lower] ?? stato;
}

// --- Public API -----------------------------------------------------------

/**
 * Returns a project clone with translatable string fields rewritten for the
 * given locale. For Italian, returns the original. For English, applies:
 *  - per-slug overrides from projects-i18n.ts (titolo + sottotitolo + descrizione)
 *  - dictionaries for categoria_label, stato, sottotitolo (fallback if no override)
 *  - pattern rewriting for luogo and superficie
 */
export function translateProject(project: Project, locale: string): Project {
  if (locale === 'it') return project;

  const override = projectsI18n[project.slug] ?? {};

  return {
    ...project,
    titolo: override.titolo ?? project.titolo,
    sottotitolo:
      override.sottotitolo ??
      (project.sottotitolo ? SOTTOTITOLO[project.sottotitolo] ?? project.sottotitolo : null),
    categoria_label: CATEGORIA_LABEL[project.categoria_label] ?? project.categoria_label,
    luogo: translateLuogo(project.luogo),
    superficie: translateSuperficie(project.superficie),
    stato: translateStato(project.stato),
    descrizione: override.descrizione ?? project.descrizione,
  };
}

/** Translate a whole list. */
export function translateProjects(list: Project[], locale: string): Project[] {
  return list.map((p) => translateProject(p, locale));
}
