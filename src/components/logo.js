import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/skinfirtlogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={styles.brandText}>Skin</Text>
            <Text style={styles.brandSubText}>Firts</Text>

      <Text style={styles.subtitle}>
        Dermatology Center
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 180,
    height: 270,
  },

   brandText: {
    color: "#FFFFFF",
    fontSize: 34,
    letterSpacing: 3,
    lineHeight: 34,
    marginTop:-28
  },

  brandSubText: {
    color: "#FFFFFF",
    fontSize: 34,
    letterSpacing: 3,
    lineHeight: 34,
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "600",
  },
});