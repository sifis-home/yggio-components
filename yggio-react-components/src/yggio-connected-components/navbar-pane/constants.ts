const DEFAULTS = {
  centered: false,
  contentWidth: 800,
  title: 'Yggio',
};

const COLORS = {
  yellow: '#FFDB5A',
  red: '#FF7B7B',
};

const LINKS = [
  {name: 'Dashboard', url: '/'},
  {name: 'Devices', url: '/devices'},
  {name: 'Logs', url: '/logs'},
  {name: 'Organizations', url: '/organizations'},
  {name: 'Apps', url: '/apps'},
];

const DROPDOWN_NAMES = {
  menu: 'menu',
  language: 'language',
  docs: 'docs',
  user: 'user',
} as const;

export {
  DEFAULTS,
  COLORS,
  LINKS,
  DROPDOWN_NAMES,
};
