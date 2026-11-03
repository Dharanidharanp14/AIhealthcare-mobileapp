import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DARK_COLORS, LIGHT_COLORS } from "../constants/colors";

const ThemeContext = createContext(null);
const THEME_STORAGE_KEY = "app-theme-mode";

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState("system");
  const [isThemePreferenceLoaded, setIsThemePreferenceLoaded] = useState(false);

  React.useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((storedMode) => {
        if (storedMode === "system" || storedMode === "light" || storedMode === "dark") {
          setThemeMode(storedMode);
        } else if (storedMode !== null) {
          console.warn("Ignoring invalid saved theme preference.");
        }
      })
      .catch((error) => {
        console.error("Unable to load the saved theme preference:", error);
      })
      .finally(() => {
        if (isMounted) {
          setIsThemePreferenceLoaded(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (!isThemePreferenceLoaded) return;

    AsyncStorage.setItem(THEME_STORAGE_KEY, themeMode).catch((error) => {
      console.error("Unable to save the theme preference:", error);
    });
  }, [isThemePreferenceLoaded, themeMode]);

  const mode =
    themeMode === "system"
      ? systemColorScheme === "dark"
        ? "dark"
        : "light"
      : themeMode;
  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;

  const value = useMemo(
    () => ({
      colors,
      mode,
      themeMode,
      setThemeMode,
    }),
    [colors, mode, themeMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
