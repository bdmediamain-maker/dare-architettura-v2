// Featured projects shown as the rotating background on the homepage.
// Client can add more entries over time — each entry references an image
// already present under /public/images/projects/<slug>/.

export interface FeaturedItem {
  src: string;
  title: string;
  slug: string;
}

export const featuredProjects: FeaturedItem[] = [
  { src: '/images/projects/it-ferrara-casa-bagaro/01.jpg', title: 'Casa Bagaro', slug: 'it-ferrara-casa-bagaro' },
  { src: '/images/projects/it-ferrara-scala-montecatino/01.jpg', title: 'Scala Montecatino', slug: 'it-ferrara-scala-montecatino' },
  { src: '/images/projects/it-ferrara-casa-vignolo/01.jpg', title: 'Casa Vignolo', slug: 'it-ferrara-casa-vignolo' },
  { src: '/images/projects/it-ferrara-casa-anselmo/01.jpg', title: 'Casa Anselmo', slug: 'it-ferrara-casa-anselmo' },
  { src: '/images/projects/ampliamento-cimitero-zevio/01.jpg', title: 'Cimitero Zevio', slug: 'ampliamento-cimitero-zevio' },
  { src: '/images/projects/codigoro/01.jpg', title: 'Municipio Codigoro', slug: 'codigoro' },
  { src: '/images/projects/it-auronzo-bivacco-fanton/01.jpg', title: 'Bivacco Fanton', slug: 'it-auronzo-bivacco-fanton' },
  { src: '/images/projects/it-finale-emilia-mo-titan/01.jpg', title: 'Titan', slug: 'it-finale-emilia-mo-titan' },
];
