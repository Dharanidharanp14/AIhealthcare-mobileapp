import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import COLORS from "../constants/colors";

const CustomInput = ({
  label,
  placeholder,
  value,
  type,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          keyboardType={keyboardType}
          secureTextEntry={
            secureTextEntry && !showPassword
          }
          autoCapitalize="none"
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() =>
              setShowPassword(!showPassword)
            }
            style={styles.eyeButton}
          >
            <Text style={styles.eye}>
              {showPassword ? "👁" : "👁️‍🗨️"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 7,
  },

  inputWrapper: {
    height: 48,
    borderRadius: 9,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 14,
    fontSize: 12,
    color: COLORS.text,
  },

  eyeButton: {
    paddingHorizontal: 14,
  },

  eye: {
    fontSize: 16,
  },
});