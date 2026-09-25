import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import COLORS from "../../constants/colors";

const BLUE = "#2864FF";

const PasswordManagerScreen = ({
  navigation,
  route,
}) => {


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
      Alert.alert(
        "Error",
        "Please enter your current password"
      );
      return;
    }

    if (!newPassword) {
      Alert.alert(
        "Error",
        "Please enter your new password"
      );
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert(
        "Error",
        "New password must be at least 6 characters"
      );
      return;
    }

    if (!confirmPassword) {
      Alert.alert(
        "Error",
        "Please confirm your new password"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Error",
        "New password and confirm password do not match"
      );
      return;
    }

    Alert.alert(
      "Success",
      "Password changed successfully",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={BLUE}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Password Manager
        </Text>

        <View style={styles.headerSpace} />

      </View>


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
                color="#111"
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
                color="#111"
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
                color="#111"
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

    color: "#111",

    marginBottom: 9,
  },

  passwordContainer: {
    height: 45,

    borderRadius: 12,

    backgroundColor: "#E8EDFF",

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