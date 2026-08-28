import React from "react";

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import COLORS from "../constants/colors";

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
    borderColor: COLORS.socialbutton,
    justifyContent: "center",
    alignItems: "center",
  },

  google: {
    color:COLORS.google ,
    fontSize: 18,
    fontWeight: "700",
  },

  apple: {
    color:COLORS.apple ,
    fontSize: 18,
  },

  facebook: {
    color:COLORS.facebook ,
    fontSize: 23,
    fontWeight: "700",
  },
});