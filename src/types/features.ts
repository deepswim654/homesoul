export interface NavItem {
  href?: string;
  label: string;
  children?: NavItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
