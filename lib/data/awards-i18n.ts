// English overrides for awards. Index = position in the IT array (stable ordering).

export interface AwardI18n {
  nome?: string;
  desc?: string;
  risultato?: string;
}

export const awardsI18n: AwardI18n[] = [
  {
    nome: 'LIDO BAGNI Competition',
    desc: 'Marina + Lido Bagni, Torri del Benaco VR',
    risultato: '1st PRIZE',
  },
  {
    nome: 'ZEVIO CEMETERY Competition',
    desc: 'Extension of the municipal cemetery, Zevio VR',
    risultato: '1st PRIZE',
  },
  {
    nome: 'CODIGORO TOWN HALL Competition',
    desc: 'Town Hall façade refurbishment, Codigoro FE',
    risultato: '1st PRIZE',
  },
  {
    nome: 'MOVEMENT KINDERGARTEN',
    desc: 'Kindergarten competition in Schorndorf, Germany',
    risultato: '2nd PRIZE',
  },
  {
    nome: 'BARBARA CAPPOCHIN Prize',
    desc: 'National prize for best architecture, Veneto region',
    risultato: 'TOP 10',
  },
  {
    nome: 'LA CERAMICA E IL PROGETTO',
    desc: 'National prize (jury: Cino Zucchi) — institutional category',
    risultato: 'MENTION',
  },
  {
    nome: 'MEME Competition',
    desc: 'National self-production design prize, Ferrara',
    risultato: '3rd PRIZE',
  },
  {
    nome: 'LEXUS DESIGN AWARD',
    desc: 'International design competition — Klava lamp',
    risultato: 'WINNER',
  },
  {
    nome: 'BEEH DESIGN CONTEST',
    desc: 'National design competition on the use of wool — Pilastro lamp',
    risultato: '3rd PRIZE',
  },
  {
    nome: 'EUROPAN 9',
    desc: 'International architecture competition, Groningen NL',
    risultato: 'SHORTLISTED',
  },
];
