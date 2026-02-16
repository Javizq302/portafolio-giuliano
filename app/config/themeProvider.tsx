'use client';

import { useEffect } from 'react';
import { getCurrentTheme } from './colorThemes';

// Función para convertir hex a RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '139, 92, 246'; // fallback
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

export function ThemeProvider() {
  useEffect(() => {
    // Función para aplicar el tema
    const applyTheme = () => {
      const theme = getCurrentTheme();
      
      // Aplicar variables CSS al root
      const root = document.documentElement;
      
      // Colores base
      root.style.setProperty('--color-background', theme.background);
      root.style.setProperty('--color-background-secondary', theme.backgroundSecondary);
      root.style.setProperty('--color-background-tertiary', theme.backgroundTertiary);
      root.style.setProperty('--color-primary', theme.primary);
      root.style.setProperty('--color-secondary', theme.secondary);
      root.style.setProperty('--color-accent', theme.accent);
      root.style.setProperty('--color-tertiary', theme.tertiary);
      root.style.setProperty('--color-quaternary', theme.quaternary);
      root.style.setProperty('--color-text', theme.text);
      root.style.setProperty('--color-text-secondary', theme.secondary);
      root.style.setProperty('--color-text-tertiary', theme.textTertiary);
      // Valores RGB para usar en rgba()
      root.style.setProperty('--color-primary-rgb', hexToRgb(theme.primary));
      root.style.setProperty('--color-secondary-rgb', hexToRgb(theme.secondary));
      root.style.setProperty('--color-accent-rgb', hexToRgb(theme.accent));
      root.style.setProperty('--color-tertiary-rgb', hexToRgb(theme.tertiary));
      root.style.setProperty('--color-quaternary-rgb', hexToRgb(theme.quaternary));
      
      // Actualizar también las variables de compatibilidad
      root.style.setProperty('--purple', theme.primary);
      root.style.setProperty('--pink', theme.secondary);
      root.style.setProperty('--amber', theme.accent);
      root.style.setProperty('--emerald', theme.tertiary);
      root.style.setProperty('--blue', theme.quaternary);
    };

    // Aplicar inmediatamente
    applyTheme();
    
    // También aplicar en el siguiente tick para asegurar que se ejecute
    setTimeout(applyTheme, 0);
  }, []);

  return null;
}

// Hook para obtener el tema actual en componentes
export function useTheme() {
  return getCurrentTheme();
}

