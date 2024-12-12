export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  {
    label: 'Features',
    children: [
      { href: '/academy', label: 'Academy' },
      { href: '/consulting', label: 'Consulting' },
      { href: '/development-and-construction', label: 'Development and Construction' },
      { href: '/building-material-supplier', label: 'Building Material Supplier' },
      { href: '/finance', label: 'Finance' },
      { href: '/the-dreamers-hub', label: 'The Dreamers Hub' },
      { href: '/wellbeing', label: 'Wellbeing' },
    ],
  },
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
