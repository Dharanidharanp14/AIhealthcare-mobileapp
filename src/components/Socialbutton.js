import React from "react";

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const SocialButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.google}>G</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.apple}>●</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.facebook}>f</Text>
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
    borderColor: "#E2E7F0",
    justifyContent: "center",
    alignItems: "center",
  },

  google: {
    color: "#4285F4",
    fontSize: 18,
    fontWeight: "700",
  },

  apple: {
    color: "#111",
    fontSize: 18,
  },

  facebook: {
    color: "#1877F2",
    fontSize: 23,
    fontWeight: "700",
  },
});