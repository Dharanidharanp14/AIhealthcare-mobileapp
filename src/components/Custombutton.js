import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import COLORS from "../constants/colors";

const CustomButton = ({
  title,
  onPress,
  variant = "primary",
  buttonColor,
  textColor,
}) => {
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

const styles = StyleSheet.create({
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