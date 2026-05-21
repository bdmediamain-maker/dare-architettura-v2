export interface Collaborator {
  nome: string;
  settore: string;
  citta: string;
  url?: string;
}

export const collaborators: Collaborator[] = [
  { nome: "Dokarchitecten", settore: "architettura", citta: "Amsterdam", url: "http://www.dokarchitecten.nl" },
  { nome: "Moke architecten", settore: "architettura", citta: "Amsterdam", url: "http://www.mokearchitecten.nl" },
  { nome: "Mezzadringegneria", settore: "ingegneria strutturale", citta: "Ferrara", url: "http://www.mezzadringegneria.it" },
  { nome: "on_office architettura", settore: "architettura", citta: "Vicenza", url: "http://www.onoffice.net" },
  { nome: "Lifelab", settore: "diagnostica", citta: "Ferrara" },
  { nome: "Fabio Calamosca", settore: "comunicazione", citta: "Milano" },
  { nome: "Stefano Babboni", settore: "arte", citta: "Ferrara" },
  { nome: "Sheila Davi", settore: "legale", citta: "Ferrara" },
  { nome: "Tecnopolis", settore: "ingegneria", citta: "Bologna" },
  { nome: "Andrea Maresti", settore: "impianti", citta: "Ferrara" },
  { nome: "Govoni costruzioni s.n.c.", settore: "impresa edile", citta: "Ferrara" },
  { nome: "Edil.Ar.Va", settore: "impresa edile", citta: "Ferrara" },
  { nome: "Zucchini & Boccafogli", settore: "impresa edile", citta: "Ferrara" },
  { nome: "Cinzia Bucchi", settore: "restauri", citta: "Ferrara" },
  { nome: "Termoidraulica Peverati", settore: "impianti idraulici", citta: "Ferrara" },
  { nome: "Melfer", settore: "carpenteria", citta: "Rovigo" },
  { nome: "O.M.B.", settore: "infissi", citta: "Rovigo" },
  { nome: "Zeta-enne", settore: "resine", citta: "Cento" }
];
