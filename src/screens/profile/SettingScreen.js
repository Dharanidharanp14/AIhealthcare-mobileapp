import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import COLORS from "../../constants/colors";

const SettingsScreen = ({ navigation }) => {

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

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Settings
        </Text>

        <View style={styles.headerSpace} />

      </View>


      {/* ================= SETTINGS LIST ================= */}

      <View style={styles.settingsContainer}>

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

    color: COLORS.black,

    fontSize: 18,

    fontWeight: "400",
  },

});