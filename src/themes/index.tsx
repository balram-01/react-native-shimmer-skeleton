import React from 'react';
import type { SkeletonTheme } from '../types';

// ─── Built-in Themes ─────────────────────────────────────────────────────────

export const themes = {
  light: {
    baseColor: '#E2E8F0',
    highlightColor: '#F8FAFC',
  } as SkeletonTheme,

  dark: {
    baseColor: '#2A2A2A',
    highlightColor: '#3D3D3D',
  } as SkeletonTheme,

  blue: {
    baseColor: '#C8D8E8',
    highlightColor: '#E8F0F8',
  } as SkeletonTheme,

  purple: {
    baseColor: '#D8C8E8',
    highlightColor: '#EDE8F8',
  } as SkeletonTheme,

  warm: {
    baseColor: '#E8DDD0',
    highlightColor: '#F5EFE8',
  } as SkeletonTheme,
} as const;

export type ThemeName = keyof typeof themes;

// ─── Context ─────────────────────────────────────────────────────────────────

export const SkeletonThemeContext = React.createContext<SkeletonTheme>(
  themes.light
);

// ─── Provider ────────────────────────────────────────────────────────────────

export interface SkeletonThemeProviderProps {
  /** Pass a ThemeName string or a custom SkeletonTheme object. */
  theme?: ThemeName | SkeletonTheme;
  children: React.ReactNode;
}

/**
 * Wrap your app (or a section of it) in SkeletonThemeProvider to apply a
 * consistent color scheme to all Skeleton components underneath.
 *
 * @example
 * <SkeletonThemeProvider theme="dark">
 *   <MyScreen />
 * </SkeletonThemeProvider>
 *
 * @example
 * <SkeletonThemeProvider theme={{ baseColor: '#1a1a2e', highlightColor: '#16213e' }}>
 *   <MyScreen />
 * </SkeletonThemeProvider>
 */
export function SkeletonThemeProvider({
  theme = 'light',
  children,
}: SkeletonThemeProviderProps): React.ReactElement {
  const resolvedTheme: SkeletonTheme =
    typeof theme === 'string' ? themes[theme] : theme;

  return (
    <SkeletonThemeContext.Provider value={resolvedTheme}>
      {children}
    </SkeletonThemeContext.Provider>
  );
}

/**
 * Returns the current skeleton theme from context.
 */
export function useSkeletonTheme(): SkeletonTheme {
  return React.useContext(SkeletonThemeContext);
}
