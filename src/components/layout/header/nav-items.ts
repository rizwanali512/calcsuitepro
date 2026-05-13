export type NavItem =
  | { type: 'link'; href: string; label: string }
  | { type: 'dropdown'; label: string; items: { href: string; label: string }[] };

export const navItems: NavItem[] = [
  {
    type: 'link',
    href: '/',
    label: 'Home',
  },
  {
    type: 'link',
    label: 'Finance Calculators',
    href: '/finance-calculators',
  },
  {
    type: 'link',
    label: 'Math Calculators',
    href: '/math-calculators',
  },
  {
    type: 'link',
    label: 'Physics Calculators',
    href: '/physics-calculators',
  },
  {
    type: 'link',
    label: 'Health Calculators',
    href: '/health-calculators',
  },
  {
    type: 'link',
    label: 'All Calculators',
    href: '/all-calculators',
  },
  {
    type: 'link',
    label: 'GPA Calculator',
    href: '/gpa-calculator',
  },
  {
    type: 'link',
    label: 'Blog',
    href: '/blog',
  },
];
