import { create } from 'zustand';

type TTheme = 'light' | 'dark';

type TThemeStore = {
  theme: TTheme;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = 'rick-morty-theme';

function readStoredTheme(): TTheme | null {
  try {
    const storedValue = localStorage.getItem(THEME_STORAGE_KEY);

    if (storedValue === 'light' || storedValue === 'dark') {
      return storedValue;
    }

    return null;
  } catch {
    return null;
  }
}

function resolveInitialTheme(): TTheme {
  const storedTheme = readStoredTheme();

  if (storedTheme) {
    return storedTheme;
  }

  const prefersDarkScheme = matchMedia('(prefers-color-scheme: dark)').matches;

  return prefersDarkScheme ? 'dark' : 'light';
}

const initialTheme = resolveInitialTheme();

document.documentElement.dataset.theme = initialTheme;

function persistTheme(theme: TTheme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    return;
  }
}

export const useThemeStore = create<TThemeStore>((set, get) => ({
  theme: initialTheme,
  toggleTheme: () => {
    const nextTheme: TTheme = get().theme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = nextTheme;
    persistTheme(nextTheme);
    set({ theme: nextTheme });
  }
}));
