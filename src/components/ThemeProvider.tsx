import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    
    // Then check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  // Keep track of media query listener cleanup
  const mediaQueryCleanup = useRef<() => void>();

  useEffect(() => {
    try {
      const root = window.document.documentElement;
      
      // Remove the old theme class and add the new one
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      
      // Store the preference
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      };

      // Modern API
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        mediaQueryCleanup.current = () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
        mediaQueryCleanup.current = () => mediaQuery.removeListener(handleChange);
      }

      return () => {
        if (mediaQueryCleanup.current) {
          mediaQueryCleanup.current();
        }
      };
    } catch (error) {
      console.error('Error setting up media query listener:', error);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}

export const useTheme = () => useContext(ThemeContext);