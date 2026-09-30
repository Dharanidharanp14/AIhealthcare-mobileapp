import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import CommonHeader from "../../components/CommonHeader";
import { useCustomAlert } from "../../components/CustomAlertProvider";

const BLUE = COLORS.blue;

const PasswordManagerScreen = ({
  navigation,
  route,
}) => {
  const { showAlert } = useCustomAlert();


  const loginPassword =
    route?.params?.currentPassword || "";

  const [currentPassword, setCurrentPassword] =
    useState(loginPassword);

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ================= CHANGE PASSWORD =================

  const handleChangePassword = () => {

    if (!currentPassword) {
      showAlert("Current password required", "Please enter your current password.", [], "error");
      return;
    }

    if (!newPassword) {
      showAlert("New password required", "Please enter your new password.", [], "error");
      return;
    }

    if (newPassword.length < 6) {
      showAlert("Password too short", "New password must be at least 6 characters.", [], "error");
      return;
    }

    if (!confirmPassword) {
      showAlert("Confirmation required", "Please confirm your new password.", [], "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert("Passwords do not match", "Check both fields and try again.", [], "error");
      return;
    }

    showAlert(
      "Success",
      "Password changed successfully",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      "success"
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}

      <CommonHeader
        title="Password Manager"
        navigation={navigation}
        backIconColor={BLUE}
      />


      {/* ================= FORM ================= */}

      <View style={styles.form}>

        {/* CURRENT PASSWORD */}

        <View style={styles.fieldContainer}>

          <Text style={styles.label}>
            Current Password
          </Text>

          <View style={styles.passwordContainer}>

            <TextInput
              style={styles.passwordInput}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              placeholder="*************"
              placeholderTextColor={BLUE}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() =>
                setShowCurrentPassword(
                  !showCurrentPassword
                )
              }
            >
              <Ionicons
                name={
                  showCurrentPassword
                    ? "eye-outline"
                    : "eye-off-outline"
                }
                size={21}
                color={COLORS.darkText}
              />
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() =>
              navigation.navigate("ForgotPassword")
            }
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

        </View>


        {/* NEW PASSWORD */}

        <View style={styles.fieldContainer}>

          <Text style={styles.label}>
            New Password
          </Text>

          <View style={styles.passwordContainer}>

            <TextInput
              style={styles.passwordInput}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              placeholder="*************"
              placeholderTextColor={BLUE}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() =>
                setShowNewPassword(
                  !showNewPassword
                )
              }
            >
              <Ionicons
                name={
                  showNewPassword
                    ? "eye-outline"
                    : "eye-off-outline"
                }
                size={21}
                color={COLORS.darkText}
              />
            </TouchableOpacity>

          </View>

        </View>


        {/* CONFIRM NEW PASSWORD */}

        <View style={styles.fieldContainer}>

          <Text style={styles.label}>
            Confirm New Password
          </Text>

          <View style={styles.passwordContainer}>

            <TextInput
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="*************"
              placeholderTextColor={BLUE}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              <Ionicons
                name={
                  showConfirmPassword
                    ? "eye-outline"
                    : "eye-off-outline"
                }
                size={21}
                color={COLORS.darkText}
              />
            </TouchableOpacity>

          </View>

        </View>

      </View>


      {/* ================= CHANGE BUTTON ================= */}

      <View style={styles.bottom}>

        <TouchableOpacity
          style={styles.changeButton}
          onPress={handleChangePassword}
          activeOpacity={0.8}
        >
          <Text style={styles.changeButtonText}>
            Change Password
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default PasswordManagerScreen;


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // ================= HEADER =================

  header: {
    height: 65,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 28,

    marginTop: 8,
  },

  backButton: {
    width: 50,

    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,

    textAlign: "center",

    color: BLUE,

    fontSize: 22,

    fontWeight: "700",
  },

  headerSpace: {
    width: 50,
  },

  // ================= FORM =================

  form: {
    paddingHorizontal: 30,

    paddingTop: 28,
  },

  fieldContainer: {
    marginBottom: 24,
  },

  label: {
    fontSize: 18,

    fontWeight: "500",

    color: COLORS.darkText,

    marginBottom: 9,
  },

  passwordContainer: {
    height: 45,

    borderRadius: 12,

    backgroundColor: COLORS.QUESTION_BG,

    flexDirection: "row",

    alignItems: "center",
  },

  passwordInput: {
    flex: 1,

    height: 45,

    paddingHorizontal: 20,

    fontSize: 16,

    color: BLUE,
  },

  eyeButton: {
    width: 45,

    height: 45,

    justifyContent: "center",

    alignItems: "center",
  },

  forgotButton: {
    alignSelf: "flex-end",

    marginTop: 12,
  },

  forgotText: {
    color: BLUE,

    fontSize: 13,

    textDecorationLine: "underline",
  },

  // ================= BOTTOM =================

  bottom: {
    flex: 1,

    justifyContent: "flex-end",

    alignItems: "center",

    paddingBottom: 65,
  },

  changeButton: {
    width: "85%",

    height: 48,

    borderRadius: 25,

    backgroundColor: BLUE,

    justifyContent: "center",

    alignItems: "center",
  },

  changeButtonText: {
    color: COLORS.white,

    fontSize: 19,

    fontWeight: "500",
  },

});