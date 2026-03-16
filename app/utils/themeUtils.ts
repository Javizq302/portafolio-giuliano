// Utilidades para usar el tema en componentes
import { getCurrentTheme, getCurrentThemeNavbar } from '../config/colorThemes';

export const getThemeColors = () => {
  const theme = getCurrentTheme();

  return {
    // Colores directos
    primary: theme.primary,
    secondary: theme.secondary,
    accent: theme.accent,
    tertiary: theme.tertiary,
    quaternary: theme.quaternary,

    // Para usar en gradientes
    gradientPrimary: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 50%, ${theme.accent} 100%)`,
    gradientNavbar: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.secondary} 25%, ${theme.accent} 50%, ${theme.tertiary} 75%, ${theme.quaternary} 100%)`,

    // Para usar en rgba con opacidad
    primaryRgba: (opacity: number) => {
      const rgb = hexToRgb(theme.primary);
      return `rgba(${rgb}, ${opacity})`;
    },
    secondaryRgba: (opacity: number) => {
      const rgb = hexToRgb(theme.secondary);
      return `rgba(${rgb}, ${opacity})`;
    },
    accentRgba: (opacity: number) => {
      const rgb = hexToRgb(theme.accent);
      return `rgba(${rgb}, ${opacity})`;
    },
    tertiaryRgba: (opacity: number) => {
      const rgb = hexToRgb(theme.tertiary);
      return `rgba(${rgb}, ${opacity})`;
    },
    quaternaryRgba: (opacity: number) => {
      const rgb = hexToRgb(theme.quaternary);
      return `rgba(${rgb}, ${opacity})`;
    },
  };
};

export const getThemeColorsNavbar = () => {
  const theme = getCurrentThemeNavbar();

  return {
    // Colores de fondo
    background: theme.background,
    backgroundSecondary: theme.backgroundSecondary,
    backgroundTertiary: theme.backgroundTertiary,

    // Colores de texto
    text: theme.text,
    textSecondary: theme.textSecondary,
    textTertiary: theme.textTertiary,

    // Colores directos
    primary: theme.primary,
    secondary: theme.secondary,
    accent: theme.accent,
    tertiary: theme.tertiary,
    quaternary: theme.quaternary,

    // Para usar en gradientes
    gradientPrimary: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 50%, ${theme.accent} 100%)`,
    gradientNavbar: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.secondary} 25%, ${theme.accent} 50%, ${theme.tertiary} 75%, ${theme.quaternary} 100%)`,

    // Para usar en rgba con opacidad
    primaryRgba: (opacity: number) => {
      const rgb = hexToRgb(theme.primary);
      return `rgba(${rgb}, ${opacity})`;
    },
    secondaryRgba: (opacity: number) => {
      const rgb = hexToRgb(theme.secondary);
      return `rgba(${rgb}, ${opacity})`;
    },
    accentRgba: (opacity: number) => {
      const rgb = hexToRgb(theme.accent);
      return `rgba(${rgb}, ${opacity})`;
    },
    tertiaryRgba: (opacity: number) => {
      const rgb = hexToRgb(theme.tertiary);
      return `rgba(${rgb}, ${opacity})`;
    },
    quaternaryRgba: (opacity: number) => {
      const rgb = hexToRgb(theme.quaternary);
      return `rgba(${rgb}, ${opacity})`;
    },
  };
};

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '139, 92, 246';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

