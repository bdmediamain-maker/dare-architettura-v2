export interface Award {
  anno: number;
  nome: string;
  desc: string;
  risultato: string;
}

export const awards: Award[] = [
  { anno: 2020, nome: "Concorso LIDO BAGNI", desc: "Porto turistico + lido Bagni, Torri del Benaco VR", risultato: "1° PREMIO" },
  { anno: 2020, nome: "Concorso CIMITERO DI ZEVIO", desc: "Ampliamento cimitero comunale, Zevio VR", risultato: "1° PREMIO" },
  { anno: 2020, nome: "Concorso MUNICIPIO CODIGORO", desc: "Rifacimento facciata Municipio, Codigoro FE", risultato: "1° PREMIO" },
  { anno: 2016, nome: "MOVEMENT KINDERGARTEN", desc: "Concorso asilo a Schorndorf, Germania", risultato: "2° PREMIO" },
  { anno: 2015, nome: "Premio BARBARA CAPPOCHIN", desc: "Premio nazionale miglior architettura regione Veneto", risultato: "TOP 10" },
  { anno: 2014, nome: "LA CERAMICA E IL PROGETTO", desc: "Premio nazionale (giuria Cino Zucchi) — categoria istituzionale", risultato: "MENZIONE" },
  { anno: 2013, nome: "Concorso MEME", desc: "Premio nazionale design autoproduzione, Ferrara", risultato: "3° PREMIO" },
  { anno: 2013, nome: "LEXUS DESIGN AWARD", desc: "Concorso internazionale design — lampada Klava", risultato: "VINCITORE" },
  { anno: 2010, nome: "BEEH DESIGN CONTEST", desc: "Concorso nazionale design sull'uso della lana — lampada Pilastro", risultato: "3° PREMIO" },
  { anno: 2008, nome: "EUROPAN 9", desc: "Concorso internazionale architettura, Groningen NL", risultato: "PRESELEZIONE" }
];
