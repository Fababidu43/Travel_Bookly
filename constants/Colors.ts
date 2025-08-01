export const Colors = {
  // Couleurs principales basées sur les maquettes
  background: '#F5E6D3',        // Fond principal - beige crème
  surface: '#FFFFFF',           // Surface/Cartes - blanc pur
  primary: '#D2691E',           // Accent primaire - orange/marron
  secondary: '#F4A460',         // Accent secondaire - orange clair
  
  // Couleurs spécifiques aux pins
  visited: '#D2691E',           // Pin "Visité" - orange
  toVisit: '#8FBC8F',           // Pin "À visiter" - vert sauge
  favorite: '#4682B4',          // Pin "Favori" - bleu avec étoile
  
  // Couleurs de texte
  text: '#5D4037',             // Texte principal - marron foncé
  textSecondary: '#8D6E63',    // Texte secondaire - marron moyen
  textTertiary: '#A1887F',     // Icônes inactives - marron clair
  
  // Couleurs utilitaires
  border: '#E0E0E0',           // Séparateurs & lignes
  surfaceVariant: '#FFF8E1',   // Variante de surface - crème très clair
  
  // Couleurs système
  success: '#8FBC8F',
  warning: '#D2691E',
  error: '#D32F2F',
  info: '#1976D2',
  
  // Couleurs inverses
  textInverse: '#FFFFFF',
  
  // Couleurs spécifiques aux boutons
  buttonPrimary: '#D2691E',
  buttonSecondary: '#F4A460',
  buttonText: '#FFFFFF',
  
  // Couleurs pour les icônes
  iconActive: '#D2691E',
  iconInactive: '#A1887F',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 50,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 38,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 30,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
};