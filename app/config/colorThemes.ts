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
  example4: {
    // Tema alternativo - Verde, Azul, Rojo
    background: '#0a1f1a',
    backgroundSecondary: '#1a2f2a',
    backgroundTertiary: '#2a3f3a',
    primary: '#10b981',      // Emerald
    secondary: '#3b82f6',    // Blue
    accent: '#ef4444',    // Red
  },
  example5: {
    // Tema alternativo - Rojo, Verde, Azul
    background: '#1a0a0a',
    backgroundSecondary: '#2a1a1a',
    backgroundTertiary: '#3a2a2a',
    primary: '#ef4444',    // Red
    secondary: '#10b981',  // Emerald
    accent: '#3b82f6',    // Blue
  },
  example6: {
    // Tema alternativo - Amarillo, Rojo, Verde
    background: '#1a1a0a',
    backgroundSecondary: '#2a2a1a',
    backgroundTertiary: '#3a3a2a',
    primary: '#f59e0b',    // Amber
    secondary: '#ef4444',  // Red
  },
  example7: {
    // Tema alternativo - Cyan, Verde, Rojo
    background: '#0a1f1a',
    backgroundSecondary: '#1a2f2a',
    backgroundTertiary: '#2a3f3a',
    primary: '#06b6d4',    // Cyan
    secondary: '#10b981',  // Emerald
    accent: '#ef4444',    // Red
  },
  example8: {
    // Tema alternativo - Blanco, Gris, Negro
    background: '#C5D0D9',
    backgroundSecondary: '#A3B2BF',
    backgroundTertiary: '#EBEFF2',
    primary: '#3b82f6',      // Blue
    secondary: '#f59e0b',    // Cyan
    accent: '#f59e0b',       // Amber
    tertiary: '#8b5cf6',     // Purple
    quaternary: '#f59e0b',   // Amber
    text: '#000000', // Black
    textSecondary: '#808080', // Gray
    textTertiary: '#ffffff', // White
  }
};

export const getCurrentTheme = () => {
  return colorThemes[currentTheme as keyof typeof colorThemes] || colorThemes.example1;
};

export const getCurrentThemeNavbar = () => {
  return colorThemes[currentThemeNavbar as keyof typeof colorThemes] || colorThemes.example1;
};

