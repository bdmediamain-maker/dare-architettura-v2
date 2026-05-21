export interface NewsItem {
  slug: string;
  titolo: string;
  data: string;
  anno: number;
  testo: string;
  progetto_collegato?: string;
}

export const news: NewsItem[] = [
  {
    slug: "tabia-2025",
    titolo: "Tabià",
    data: "22 Ottobre 2025",
    anno: 2025,
    testo: "dare-architettura ha partecipato al concorso di progettazione in due fasi per la realizzazione del nuovo rifugio Spruggi Tonini in provincia di Trento."
  },
  {
    slug: "clod-2025",
    titolo: "Clod",
    data: "12 Settembre 2025",
    anno: 2025,
    testo: "dare-architettura ha avuto l'incarico per la progettazione della nuova palazzina uffici di circa 1100 mq per l'azienda Le Due Valli di Ostellato FE."
  },
  {
    slug: "torri-del-benaco-2025",
    titolo: "Torri del Benaco",
    data: "28 Aprile 2025",
    anno: 2025,
    testo: "Sono iniziati i lavori per la riqualificazione della passerella pedonale del porto storico di Torri del Benaco sul lago di Garda."
  },
  {
    slug: "red-diamond-2024",
    titolo: "Red Diamond",
    data: "25 Settembre 2024",
    anno: 2024,
    testo: "dare-architettura ha terminato i lavori per la ristrutturazione completa di un fabbricato posto all'interno della cinta muraria di Ferrara.",
    progetto_collegato: "casa-bagaro"
  },
  {
    slug: "gorgonzola-2024",
    titolo: "Piazza Papa Giovanni XXIII — Gorgonzola",
    data: "26 Agosto 2024",
    anno: 2024,
    testo: "dare-architettura ha partecipato al concorso di idee per la riqualificazione della piazza Papa Giovanni XXIII a Gorgonzola MI."
  },
  {
    slug: "cqap-comacchio-2024",
    titolo: "CQAP — Comune di Comacchio",
    data: "05 Luglio 2024",
    anno: 2024,
    testo: "Rudy Davi è stato nominato componente della nuova commissione qualità architettonica per il Comune di Comacchio per il triennio 2024-2026."
  },
  {
    slug: "cqap-ravenna-2024",
    titolo: "CQAP — Comune di Ravenna",
    data: "22 Gennaio 2024",
    anno: 2024,
    testo: "Rudy Davi è stato nominato componente della nuova commissione qualità per il Comune di Ravenna per il quinquennio 2024-2028."
  }
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find(n => n.slug === slug);
}

export function getNewsByYear(year: number): NewsItem[] {
  return news.filter(n => n.anno === year);
}

export const newsYears = [...new Set(news.map(n => n.anno))].sort((a, b) => b - a);
