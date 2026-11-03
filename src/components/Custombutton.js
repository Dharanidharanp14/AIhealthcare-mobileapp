import { useTheme } from "../context/ThemeContext.js";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const CustomButton = ({
  title,
  onPress,
  variant = "primary",
  buttonColor,
  textColor,
}) => {
  const { colors: COLORS } = useTheme();
  const styles = createStyles(COLORS);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        variant === "secondary" && styles.secondaryButton,
        buttonColor && { backgroundColor: buttonColor },
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "secondary" && styles.secondaryText,
          textColor && { color: textColor },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const createStyles = (COLORS) => StyleSheet.create({
  button: {
    width: "100%",
    height: 48,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButton: {
    backgroundColor: COLORS.primary,
    marginTop: 12,
  },

  text: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
  },

  secondaryText: {
    color: COLORS.white,
  },
});