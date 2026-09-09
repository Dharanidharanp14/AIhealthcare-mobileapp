import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";


import COLORS from "../constants/colors";
import Logo from "../components/logo";
import CustomButton from "../components/Custombutton";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />

      <View style={styles.content}>


        <View style={styles.logoContainer}>
          <Logo />
        </View>

        {/* Bottom Content */}
        <View style={styles.bottomContainer}>

          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>

        <CustomButton
  title="Log In"
  onPress={() => navigation.navigate("SignIn")}
  buttonColor={COLORS.white}
  textColor={COLORS.primary}
/>

<CustomButton
  title="Sign Up"
  variant="secondary"
  onPress={() => navigation.navigate("SignUp")}
  buttonColor={COLORS.white}
  textColor={COLORS.primary}
/>

        </View>

      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.welcomescreen
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 35,
  },

  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",  
    marginTop: -10,
  },

  bottomContainer: {
    width: "100%",
  },

  description: {
    textAlign: "center",
    color: COLORS.welcomedescription,
    fontSize: 10,
    lineHeight: 16,
    marginBottom: 22,
    paddingHorizontal: 10,
  },
});