export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#showcase', label: 'Showcase' },
  { href: '/about', label: 'About' },
] as const;

export const FOOTER_LINKS = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
] as const;
