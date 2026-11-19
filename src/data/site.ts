/** All site copy lives here, so text changes never touch the layout. */
export const site = {
  name: 'Morrow',
  legalName: 'Studio Morrow',
  tagline: 'Brand & content studio',
  description:
    'Studio Morrow is a small brand and content studio. We build identities, campaigns and films for brands that would rather be remembered than seen everywhere.',
  url: 'https://studio-morrow.vercel.app',
  email: 'hello@studiomorrow.co',
  city: 'Lisbon & London',
  announcement: ['Now booking spring 2027 commissions', 'Considered work for considered brands', 'Two new projects a season'],
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Studio', href: '#studio' },
    { label: 'Approach', href: '#approach' },
    { label: 'Contact', href: '#contact' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'Vimeo', href: 'https://vimeo.com/' },
  ],
};

export const hero = {
  eyebrow: 'Brand & content studio',
  title: 'Made to be remembered',
  cta: { label: 'View the work', href: '#work' },
};

export const intro = {
  title: 'The studio',
  body: 'We are a team of six. We take on a handful of projects each season and give each one our full attention: identity, art direction, campaign film and the digital work that ties it together. No templates, no trend chasing. Just work that holds up in ten years.',
};

export interface Project {
  client: string;
  title: string;
  discipline: string;
  year: string;
  image: string;
}

export const projects: Project[] = [
  { client: 'Maison Aubrac', title: 'An identity for a fourth-generation tannery', discipline: 'Identity', year: '2026', image: '/images/work-1.webp' },
  { client: 'Oro Lab', title: 'Launch film for a skincare line', discipline: 'Campaign film', year: '2026', image: '/images/work-2.webp' },
  { client: 'Halden Hotels', title: 'Art direction across five houses', discipline: 'Art direction', year: '2025', image: '/images/work-3.webp' },
  { client: 'Vessel & Co', title: 'Packaging for a ceramics collection', discipline: 'Packaging', year: '2025', image: '/images/work-4.webp' },
  { client: 'Sable Records', title: 'A visual language for a label', discipline: 'Identity', year: '2025', image: '/images/work-5.webp' },
  { client: 'Fenn Atelier', title: 'Ecommerce and editorial site', discipline: 'Digital', year: '2024', image: '/images/work-6.webp' },
];

export const feature = {
  eyebrow: 'Featured',
  title: 'Oro Lab',
  body: 'A ninety-second launch film shot over two days in an empty Lisbon theatre. One product, one light, no voiceover. It ran for a season and it is still the brand’s most watched piece.',
  cta: { label: 'See the project', href: '#work' },
};

export const services = [
  { title: 'Brand identity', body: 'Naming, strategy, logo, type and the rules that keep it all consistent.' },
  { title: 'Art direction', body: 'Shoots, sets and styling, so every image feels like it came from the same place.' },
  { title: 'Campaign film', body: 'Short films and social cuts, from treatment to final grade.' },
  { title: 'Digital design', body: 'Websites and ecommerce that carry the brand instead of flattening it.' },
];

export const approach = [
  { step: 'Listen', body: 'Two weeks with your team, your customers and your archive before we draw anything.' },
  { step: 'Distil', body: 'One clear idea, written down and agreed, that every decision answers to.' },
  { step: 'Make', body: 'A small senior team does the work. The people you meet are the people who make it.' },
];

export const commission = {
  title: 'Commissions',
  body: 'We open a small number of commissions each season. If you have a launch, a rebrand or a story that deserves care, tell us about it and we will reply within two working days.',
  cta: { label: 'Start a project', href: '#contact' },
};

export const testimonial = {
  quote: 'They understood the brand better than we did, and then they made it quieter. Sales followed.',
  name: 'Inês Carvalho',
  role: 'Founder, Maison Aubrac',
};

export const contact = {
  title: 'Tell us about your project',
  body: 'A few lines is plenty: what you make, what you need and when. We read everything ourselves.',
};
