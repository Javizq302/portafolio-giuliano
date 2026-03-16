// Sistema de temas de colores
// Cambia el valor de 'currentTheme' para probar diferentes esquemas

export const currentTheme = 'example2'; // Cambia a 'example2' o 'example3' para probar otros temas
export const currentThemeNavbar = 'example8'; // Tema independiente para el navbar

export const colorThemes = {
  example0: {
    // Tema actual - Púrpura, Rosa, Amber
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    backgroundTertiary: '#334155',
    primary: '#f59e0b',      // Cyan06b6d4
    secondary: '#3b82f6',    // Pink
    accent: '#06b6d4',       // Amberf59e0b
    tertiary: '#10b981',     // Emerald
    quaternary: '#3b82f6',   // Blue
    text: '#ffffff',
    textSecondary: '#e2e8f0',
    textTertiary: '#94a3b8',
  },
  example1: {
    // Tema actual - Púrpura, Rosa, Amber
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    backgroundTertiary: '#334155',
    primary: '#8b5cf6',      // Purple
    secondary: '#ec4899',    // Pink
    accent: '#f59e0b',       // Amber
    tertiary: '#10b981',     // Emerald
    quaternary: '#3b82f6',   // Blue
    text: '#ffffff',
    textSecondary: '#e2e8f0',
    textTertiary: '#94a3b8',
  },
  example2: {
    // Tema alternativo - Azul, Cyan, Verde
    background: '#0a0e27',
    backgroundSecondary: '#1a1f3a',
    backgroundTertiary: '#2a2f4a',
    primary: '#3b82f6',      // Blue
    secondary: '#06b6d4',    // Cyan
    accent: '#10b981',       // Emerald
    tertiary: '#8b5cf6',     // Purple
    quaternary: '#f59e0b',   // Amber
    text: '#ffffff',
    textSecondary: '#e0f2fe',
    textTertiary: '#bae6fd',
  },
  example3: {
    // Tema alternativo - Naranja, Rojo, Amarillo
    background: '#1a0f0a',
    backgroundSecondary: '#2a1f1a',
    backgroundTertiary: '#3a2f2a',
    primary: '#f97316',      // Orange
    secondary: '#ef4444',    // Red
    accent: '#eab308',       // Yellow
    tertiary: '#f59e0b',     // Amber
    quaternary: '#ec4899',   // Pink
    text: '#ffffff',
    textSecondary: '#fef3c7',
    textTertiary: '#fde68a',
  },
};

export const getCurrentTheme = () => {
  return colorThemes[currentTheme as keyof typeof colorThemes] || colorThemes.example1;
};

export const getCurrentThemeNavbar = () => {
  return colorThemes[currentThemeNavbar as keyof typeof colorThemes] || colorThemes.example1;
};

