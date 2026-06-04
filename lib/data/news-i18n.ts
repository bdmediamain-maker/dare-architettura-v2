// English overrides for news items, keyed by slug. Italian months in the
// `data` field are mapped to English while preserving the day/year format.

export interface NewsI18n {
  titolo?: string;
  testo?: string;
  data?: string;
}

export const newsI18n: Record<string, NewsI18n> = {
  'tabia-2025': {
    titolo: 'Tabià',
    data: '22 October 2025',
    testo:
      'dare-architettura took part in the two-stage design competition for the new Spruggi Tonini mountain refuge in the province of Trento.',
  },
  'clod-2025': {
    titolo: 'Clod',
    data: '12 September 2025',
    testo:
      'dare-architettura has been commissioned to design the new office building of approximately 1,100 m² for the Le Due Valli company in Ostellato, FE.',
  },
  'torri-del-benaco-2025': {
    titolo: 'Torri del Benaco',
    data: '28 April 2025',
    testo:
      'Works have started for the redevelopment of the pedestrian footbridge of the historic harbour of Torri del Benaco on Lake Garda.',
  },
  'red-diamond-2024': {
    titolo: 'Red Diamond',
    data: '25 September 2024',
    testo:
      'dare-architettura has completed the full renovation of a building located within the city walls of Ferrara.',
  },
  'gorgonzola-2024': {
    titolo: 'Piazza Papa Giovanni XXIII — Gorgonzola',
    data: '26 August 2024',
    testo:
      'dare-architettura took part in the ideas competition for the redevelopment of Piazza Papa Giovanni XXIII in Gorgonzola, MI.',
  },
  'cqap-comacchio-2024': {
    titolo: 'CQAP — Municipality of Comacchio',
    data: '05 July 2024',
    testo:
      'Rudy Davi has been appointed a member of the new architectural quality committee for the Municipality of Comacchio for the 2024–2026 term.',
  },
  'cqap-ravenna-2024': {
    titolo: 'CQAP — Municipality of Ravenna',
    data: '22 January 2024',
    testo:
      'Rudy Davi has been appointed a member of the new quality committee for the Municipality of Ravenna for the 2024–2028 term.',
  },
};
