import React, { createContext, useContext, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

const CustomAlertContext = createContext(null);

export const useCustomAlert = () => {
  const context = useContext(CustomAlertContext);
  if (!context) {
    throw new Error("useCustomAlert must be used inside CustomAlertProvider");
  }
  return context;
};

const iconByVariant = {
  success: "checkmark",
  error: "close",
  info: "information",
};

const CustomAlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (title, message = "", buttons = [], variant = "info") => {
    setAlert({
      title,
      message,
      buttons: buttons.length ? buttons : [{ text: "OK" }],
      variant,
    });
  };

  const dismissAlert = () => setAlert(null);
  const iconName = iconByVariant[alert?.variant] || iconByVariant.info;
  const iconColor = alert?.variant === "error" ? COLORS.red : COLORS.primary;

  return (
    <CustomAlertContext.Provider value={{ showAlert }}>
      {children}
      <Modal
        visible={Boolean(alert)}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={dismissAlert}
      >
        <View style={styles.overlay}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dismiss alert"
            style={StyleSheet.absoluteFill}
            onPress={dismissAlert}
          />
          {alert && (
            <View
              accessibilityViewIsModal
              style={styles.dialog}
            >
              <View style={[styles.iconCircle, { borderColor: iconColor }]}>
                <Ionicons name={iconName} size={25} color={iconColor} />
              </View>
              <Text style={styles.title}>{alert.title}</Text>
              {!!alert.message && (
                <Text style={styles.message}>{alert.message}</Text>
              )}
              <View style={styles.actions}>
                {alert.buttons.map((button, index) => {
                  const isCancel = button.style === "cancel";
                  const isDestructive = button.style === "destructive";
                  const isSecondary = isCancel || (alert.buttons.length > 1 && index === 0);

                  return (
                    <TouchableOpacity
                      key={`${button.text || "action"}-${index}`}
                      accessibilityRole="button"
                      onPress={() => {
                        dismissAlert();
                        button.onPress?.();
                      }}
                      style={[
                        styles.actionButton,
                        isSecondary && styles.secondaryButton,
                        isDestructive && styles.destructiveButton,
                      ]}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.actionText,
                          isSecondary && styles.secondaryActionText,
                          isDestructive && styles.destructiveActionText,
                        ]}
                      >
                        {button.text || "OK"}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </Modal>
    </CustomAlertContext.Provider>
  );
};

export default CustomAlertProvider;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: COLORS.overlayBlue,
  },
  dialog: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 20,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    elevation: 12,
  },
  iconCircle: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 27,
  },
  title: {
    marginTop: 16,
    color: COLORS.darkText,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  message: {
    marginTop: 8,
    color: COLORS.softText,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },
  actionButton: {
    minHeight: 44,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.inputBackground,
  },
  destructiveButton: {
    backgroundColor: COLORS.red,
  },
  actionText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryActionText: {
    color: COLORS.darkText,
  },
  destructiveActionText: {
    color: COLORS.white,
  },
});
