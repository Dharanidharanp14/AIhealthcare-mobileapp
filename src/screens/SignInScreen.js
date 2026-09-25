import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "../constants/colors";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/Custombutton";
import SocialButtons from "../components/Socialbutton";


const SignInScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (route?.params?.resetEmail) {
      setEmail(route.params.resetEmail);
    }
    if (route?.params?.resetPassword) {
      setPassword(route.params.resetPassword);
    }

  }, [route?.params]);

  const handleLogin = () => {

    if (!email || !password) {

      alert("Please enter email and password");

      return;
    }


    Alert.alert(
      "Success",
      "Login successful",
      [
        {
          text: "OK",

         onPress: () => {
  navigation.navigate("Main", {
    currentPassword: password,
  });
},
        },
      ]
    );
  };


  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.statusbar}
      />


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >

            <Text style={styles.back}>
              ‹
            </Text>

          </TouchableOpacity>


          <Text style={styles.headerTitle}>
            Log In
          </Text>


          <View style={styles.headerSpacer} />

        </View>

        <View style={styles.content}>


          <Text style={styles.title}>
            Welcome
          </Text>

          <Text style={styles.description}>
            Login to your account to continue using
            our healthcare services.
          </Text>

          <CustomInput
            label="Email or Mobile Number"
            placeholder="example@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.forgot}
            onPress={() =>
              navigation.navigate("ForgotPassword")
            }
          >

            <Text style={styles.forgotText}>
              Forgot Password
            </Text>

          </TouchableOpacity>

          <CustomButton
            title="Log In"
            onPress={handleLogin}
          />

          <Text style={styles.or}>
            or
          </Text>

          <SocialButtons />

          <View style={styles.accountRow}>
            <Text style={styles.accountText}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SignUp")
              }
            >
              <Text style={styles.link}>
                {" "}Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scroll: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    marginTop: 24,
  },

  backButton: {
    width: 40,
    justifyContent: "center",
  },

  back: {
    color: COLORS.primary,
    fontSize: 36,
    fontWeight: "300",
  },

  headerTitle: {
    flex: 1,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  headerSpacer: {
    width: 40,
  },

  content: {
    paddingHorizontal: 25,
    paddingTop: 15,
  },

  title: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "700",
  },

  description: {
    color: COLORS.gray,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 7,
    marginBottom: 25,
  },

  forgot: {
    alignSelf: "flex-end",
    marginTop: -5,
    marginBottom: 18,
  },

  forgotText: {
    color: COLORS.primary,
    fontSize: 10,
  },

  or: {
    textAlign: "center",
    color: COLORS.gray,
    fontSize: 11,
    marginVertical: 15,
  },

  accountRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  accountText: {
    color: COLORS.gray,
    fontSize: 10,
  },
  link: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "600",
  },
});