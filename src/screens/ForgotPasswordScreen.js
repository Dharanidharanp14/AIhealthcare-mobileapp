import React, { useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "../constants/colors";
import CommonHeader from "../components/CommonHeader";
import { useCustomAlert } from "../components/CustomAlertProvider";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/Custombutton";


const ForgotPasswordScreen = ({ navigation }) => {
  const { showAlert } = useCustomAlert();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const otpRefs = useRef([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOtp = () => {

    if (!email.trim()) {

      showAlert("Email required", "Please enter your email address.", [], "error");

      return;
    }


    showAlert(
      "Verification code sent",
      "For this demo, enter 123456 to continue.",
      [],
      "success"
    );


    setStep(2);
  };



  const handleOtpChange = (value, index) => {

    const numbers = value.replace(
      /[^0-9]/g,
      ""
    );



    if (numbers.length > 1) {

      const pastedOtp = numbers.slice(0, 6);

      setOtp(pastedOtp);

      setOtpError(false);


      const lastIndex = Math.min(
        pastedOtp.length - 1,
        5
      );


      otpRefs.current[lastIndex]?.focus();

      return;
    }



    const otpArray = otp.split("");

    otpArray[index] = numbers;


    const newOtp = otpArray
      .join("")
      .slice(0, 6);


    setOtp(newOtp);

    setOtpError(false);


    if (
      numbers &&
      index < 5
    ) {

      otpRefs.current[index + 1]?.focus();

    }
  };


  const handleOtpKeyPress = (
    event,
    index
  ) => {

    if (
      event.nativeEvent.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {

      otpRefs.current[
        index - 1
      ]?.focus();

    }
  };


  const handleVerifyOtp = () => {

    if (otp.length !== 6) {

      setOtpError(true);

      showAlert("Incomplete code", "Please enter the complete 6-digit OTP.", [], "error");

      return;
    }


    if (otp !== "123456") {

      setOtpError(true);

      showAlert("Incorrect code", "That code is not valid. Please try again.", [], "error");

      return;
    }


    setOtpError(false);

    setStep(3);
  };


  const handleResetPassword = () => {

    if (
      !newPassword ||
      !confirmPassword
    ) {

      showAlert("Password required", "Please enter and confirm your new password.", [], "error");

      return;
    }


    if (newPassword.length < 6) {

      showAlert("Password too short", "Use at least 6 characters for your password.", [], "error");

      return;
    }


    if (
      newPassword !==
      confirmPassword
    ) {

      showAlert("Passwords do not match", "Check both fields and try again.", [], "error");

      return;
    }


    showAlert(
      "Password reset successful",
      "Your new password is ready. Continue to sign in.",
      [
        {
          text: "Continue",
          onPress: () => navigation.navigate("SignIn", {
            resetEmail: email,
            resetPassword: newPassword,
          }),
        },
      ],
      "success"
    );
  };


  // ==================================================
  // BACK
  // ==================================================

  const handleBack = () => {

    if (step === 1) {

      navigation.goBack();

      return;
    }


    setStep(step - 1);
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

        <CommonHeader
          title="Forgot Password"
          onBackPress={handleBack}
        />


        {step === 1 && (

          <View style={styles.content}>

            <Text style={styles.title}>
              Forgot Password?
            </Text>


            <Text style={styles.description}>
              Enter your registered email address.
              {"\n"}
              We will send an OTP to verify your account.
            </Text>


            <CustomInput
              label="Email Address"
              placeholder="example@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />


            <CustomButton
              title="Send OTP"
              onPress={handleSendOtp}
            />

          </View>

        )}



        {/* ========================================= */}
        {/* STEP 2 - OTP */}
        {/* ========================================= */}

        {step === 2 && (

          <View style={styles.content}>

            <Text style={styles.title}>
              Verify OTP
            </Text>


            <Text style={styles.description}>
              Enter the 6-digit OTP sent to your
              registered email address.
            </Text>


            {/* OTP BOXES */}

            <View style={styles.otpContainer}>

              {[0, 1, 2, 3, 4, 5].map(
                (index) => (

                  <TextInput

                    key={index}

                    ref={(ref) => {
                      otpRefs.current[index] = ref;
                    }}


                    style={[
                      styles.otpBox,

                      otpError &&
                      !otp[index] &&
                      styles.otpBoxError,
                    ]}


                    value={
                      otp[index] || ""
                    }


                    onChangeText={(value) =>
                      handleOtpChange(
                        value,
                        index
                      )
                    }


                    onKeyPress={(event) =>
                      handleOtpKeyPress(
                        event,
                        index
                      )
                    }


                    keyboardType="number-pad"

                    maxLength={6}

                    textAlign="center"

                    selectTextOnFocus

                    autoComplete="one-time-code"

                    textContentType="oneTimeCode"

                  />

                )
              )}

            </View>

            {otpError && (

              <Text style={styles.errorText}>
                Please enter a valid 6-digit OTP
              </Text>

            )}


            <CustomButton
              title="Verify OTP"
              onPress={handleVerifyOtp}
            />

          </View>

        )}
{/* STEP 3 - RESET PASSWORD */}
        {step === 3 && (

          <View style={styles.content}>

            <Text style={styles.title}>
              Reset Password
            </Text>


            <Text style={styles.description}>
              Create a new password for your account.
            </Text>


            <CustomInput
              label="New Password"
              placeholder="••••••••"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />


            <CustomInput
              label="Confirm Password"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />


            <CustomButton
              title="Reset Password"
              onPress={handleResetPassword}
            />

          </View>

        )}

      </ScrollView>

    </SafeAreaView>
  );
};


export default ForgotPasswordScreen;


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

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    borderRadius: 10,
    fontSize: 20,
    color: COLORS.primary,
    backgroundColor: COLORS.white,
  },


  otpBoxError: {
    borderColor: "red",
    borderWidth: 1.5,
  },

  errorText: {
    color: "red",
     fontSize: 11,
     marginBottom: 20,
  },

});