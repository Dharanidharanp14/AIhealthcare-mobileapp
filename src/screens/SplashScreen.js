import { useTheme } from "../context/ThemeContext.js";
import React, { useEffect } from "react";

import {
  View,
  StyleSheet,
  StatusBar,
} from "react-native";

import Logo from "../components/logo";

const SplashScreen = ({ navigation }) => {
  const { colors: COLORS } = useTheme();
  const styles = createStyles(COLORS);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />

      <View style={styles.logoWrapper}>
        <Logo />
      </View>
    </View>
  );
};

export default SplashScreen;

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -5,
  },
});