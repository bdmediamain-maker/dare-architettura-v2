import type { NewsItem } from '@/lib/data/news';
import type { Award } from '@/lib/data/awards';
import { newsI18n } from '@/lib/data/news-i18n';
import { awardsI18n } from '@/lib/data/awards-i18n';

/** Localise a news item. Falls back to Italian if no EN override exists. */
export function translateNews(item: NewsItem, locale: string): NewsItem {
  if (locale === 'it') return item;
  const ov = newsI18n[item.slug];
  if (!ov) return item;
  return {
    ...item,
    titolo: ov.titolo ?? item.titolo,
    testo: ov.testo ?? item.testo,
    data: ov.data ?? item.data,
  };
}

export function translateNewsList(list: NewsItem[], locale: string): NewsItem[] {
  return list.map((n) => translateNews(n, locale));
}

/** Localise an award. We key by index since the IT array is stable. */
export function translateAward(award: Award, idx: number, locale: string): Award {
  if (locale === 'it') return award;
  const ov = awardsI18n[idx];
  if (!ov) return award;
  return {
    ...award,
    nome: ov.nome ?? award.nome,
    desc: ov.desc ?? award.desc,
    risultato: ov.risultato ?? award.risultato,
  };
}

export function translateAwardsList(list: Award[], locale: string): Award[] {
  return list.map((a, i) => translateAward(a, i, locale));
}
