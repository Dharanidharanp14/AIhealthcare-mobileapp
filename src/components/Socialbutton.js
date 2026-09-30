import React from "react";

import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

const SocialButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Continue with Google"
      >
        <Ionicons name="logo-google" size={18} color={COLORS.google} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Continue with Apple"
      >
        <Ionicons name="logo-apple" size={21} color={COLORS.apple} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Continue with Facebook"
      >
        <Ionicons name="logo-facebook" size={20} color={COLORS.facebook} />
      </TouchableOpacity>
    </View>
  );
};

export default SocialButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },

  button: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.socialbutton,
    justifyContent: "center",
    alignItems: "center",
  },
});