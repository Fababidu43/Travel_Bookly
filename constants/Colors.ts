export const Colors = {
  // Couleurs principales basées sur les spécifications exactes
  background: '#FEF7E3',        // Fond principal - crème très doux
  surface: '#FFE9C2',           // Surface/Cartes - arrière-plan des cartes
  primary: '#E79E4F',           // Accent primaire - boutons, pins visités
  secondary: '#FFD69B',         // Accent secondaire - gradients légers
  
  // Couleurs spécifiques aux pins
  visited: '#E79E4F',           // Pin "Visité" - ocre
  toVisit: '#8DA88B',           // Pin "À visiter" - vert
  favorite: '#FFD700',          // Pin "Favori" - étoile dorée
  
  // Couleurs de texte
  text: '#3E2A1A',             // Texte principal - titres, libellés
  textSecondary: '#7F5C3E',    // Texte secondaire - sous-titres, dates
  textTertiary: '#B3A08A',     // Icônes inactives
  
  // Couleurs utilitaires
  border: '#E0C7A5',           // Séparateurs & lignes
  surfaceVariant: '#F5E6D3',   // Variante de surface
  
  // Couleurs système
  success: '#8DA88B',
  warning: '#E79E4F',
  error: '#B22222',
  info: '#4682B4',
  
  // Couleurs inverses
  textInverse: '#FFFFFF',
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