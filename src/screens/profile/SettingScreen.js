import { useTheme } from "../../context/ThemeContext.js";
import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import CommonHeader from "../../components/CommonHeader";

const SettingsScreen = ({ navigation }) => {
  const { colors: COLORS, mode, themeMode, setThemeMode } = useTheme();
  const styles = createStyles(COLORS);

  const settingsItems = [
    {
      title: "Notification Setting",
      icon: "bulb-outline",
    },
    {
      title: "Password Manager",
      icon: "key-outline",
    },
  ];

  const handleSettingPress = (title) => {

    if (title === "Notification Setting") {
      navigation.navigate("NotificationSetting");
      return;
    }

    if (title === "Password Manager") {
      navigation.navigate("PasswordManager");
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}

      <CommonHeader
        title="Settings"
        navigation={navigation}
      />


      {/* ================= SETTINGS LIST ================= */}

      <View style={styles.settingsContainer}>
        <View style={styles.themeSetting}>
          <View style={styles.themeDescription}>
            <Text style={styles.settingTitle}>Dark mode</Text>
            <Text style={styles.settingDescription}>
              Match your device or choose a theme
            </Text>
          </View>
          <Switch
            accessibilityLabel="Dark mode"
            value={mode === "dark"}
            onValueChange={(enabled) =>
              setThemeMode(enabled ? "dark" : "light")
            }
            trackColor={{
              false: COLORS.border,
              true: COLORS.primary,
            }}
            thumbColor={COLORS.white}
          />
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Use device theme"
          onPress={() => setThemeMode("system")}
          style={styles.systemThemeButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name="phone-portrait-outline"
            size={18}
            color={COLORS.primary}
          />
          <Text style={styles.systemThemeText}>
            Use device theme{themeMode === "system" ? " (active)" : ""}
          </Text>
        </TouchableOpacity>

        {settingsItems.map((item, index) => (

          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={() =>
              handleSettingPress(item.title)
            }
            activeOpacity={0.7}
          >

            {/* Icon */}

            <View style={styles.iconContainer}>

              <Ionicons
                name={item.icon}
                size={27}
                color={COLORS.primary}
              />

            </View>


            {/* Title */}

            <Text style={styles.settingTitle}>
              {item.title}
            </Text>


            {/* Arrow */}

            <Ionicons
              name="chevron-forward"
              size={25}
              color={COLORS.primary}
            />

          </TouchableOpacity>

        ))}

      </View>

    </SafeAreaView>
  );
};

export default SettingsScreen;


const createStyles = (COLORS) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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

    color: COLORS.primary,

    fontSize: 22,

    fontWeight: "700",
  },

  headerSpace: {
    width: 50,
  },

  // ================= SETTINGS =================

  settingsContainer: {
    paddingHorizontal: 30,

    marginTop: 22,
  },

  settingItem: {
    height: 60,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 2,
  },

  iconContainer: {
    width: 35,

    alignItems: "flex-start",

    justifyContent: "center",

    marginRight: 13,
  },

  settingTitle: {
    flex: 1,

    color: COLORS.darkText,

    fontSize: 18,

    fontWeight: "400",
  },

  themeSetting: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  themeDescription: {
    flex: 1,
  },

  settingDescription: {
    marginTop: 4,
    color: COLORS.gray,
    fontSize: 13,
  },

  systemThemeButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },

  systemThemeText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },

});