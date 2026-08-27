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
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        variant === "secondary" && styles.secondaryButton,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "secondary" && styles.secondaryText,
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
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButton: {
    backgroundColor: COLORS.lightBlue,
    marginTop: 12,
  },

  text: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },

  secondaryText: {
    color: COLORS.primary,
  },
});