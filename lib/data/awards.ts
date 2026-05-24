export interface Award {
  anno: number;
  nome: string;
  desc: string;
  risultato: string;
  image?: string;
}

export const awards: Award[] = [
  {
    anno: 2020,
    nome: "Concorso LIDO BAGNI",
    desc: "Porto turistico + lido Bagni, Torri del Benaco VR",
    risultato: "1° PREMIO",
  },
  {
    anno: 2020,
    nome: "Concorso CIMITERO DI ZEVIO",
    desc: "Ampliamento cimitero comunale, Zevio VR",
    risultato: "1° PREMIO",
    image: "/images/projects/ampliamento-cimitero-zevio/01.jpg",
  },
  {
    anno: 2020,
    nome: "Concorso MUNICIPIO CODIGORO",
    desc: "Rifacimento facciata Municipio, Codigoro FE",
    risultato: "1° PREMIO",
    image: "/images/projects/codigoro/01.jpg",
  },
  {
    anno: 2016,
    nome: "MOVEMENT KINDERGARTEN",
    desc: "Concorso asilo a Schorndorf, Germania",
    risultato: "2° PREMIO",
    image: "/images/projects/it-brunico-bz-asilo/01.jpg",
  },
  {
    anno: 2015,
    nome: "Premio BARBARA CAPPOCHIN",
    desc: "Premio nazionale miglior architettura regione Veneto",
    risultato: "TOP 10",
  },
  {
    anno: 2014,
    nome: "LA CERAMICA E IL PROGETTO",
    desc: "Premio nazionale (giuria Cino Zucchi) — categoria istituzionale",
    risultato: "MENZIONE",
  },
  {
    anno: 2013,
    nome: "Concorso MEME",
    desc: "Premio nazionale design autoproduzione, Ferrara",
    risultato: "3° PREMIO",
  },
  {
    anno: 2013,
    nome: "LEXUS DESIGN AWARD",
    desc: "Concorso internazionale design — lampada Klava",
    risultato: "VINCITORE",
    image: "/images/projects/klava/01.jpg",
  },
  {
    anno: 2010,
    nome: "BEEH DESIGN CONTEST",
    desc: "Concorso nazionale design sull'uso della lana — lampada Pilastro",
    risultato: "3° PREMIO",
    image: "/images/projects/pilastro-lamp/01.jpg",
  },
  {
    anno: 2008,
    nome: "EUROPAN 9",
    desc: "Concorso internazionale architettura, Groningen NL",
    risultato: "PRESELEZIONE",
    image: "/images/projects/nl-groningen-europan-9/01.jpg",
  },
];
