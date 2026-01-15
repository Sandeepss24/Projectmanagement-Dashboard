import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize from localStorage, default to light mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      console.log('Initial theme from localStorage:', savedTheme);

      // Only return true if explicitly set to "dark"
      const isDark = savedTheme === "dark";
      console.log('Setting initial isDarkMode to:', isDark);
      return isDark;
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;

    console.log('Theme effect running. isDarkMode:', isDarkMode);

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log('Applied dark mode. Classes:', root.className);
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log('Applied light mode. Classes:', root.className);
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    console.log('toggleTheme called. Current isDarkMode:', isDarkMode);
    setIsDarkMode(prevMode => {
      console.log('Setting isDarkMode from', prevMode, 'to', !prevMode);
      return !prevMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
