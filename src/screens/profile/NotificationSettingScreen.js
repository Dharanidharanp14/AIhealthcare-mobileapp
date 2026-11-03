import { useTheme } from "../../context/ThemeContext.js";
import React, { useState } from "react";

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

import CommonHeader from "../../components/CommonHeader";


const NotificationSettingScreen = ({
  navigation,
}) => {
  const { colors: COLORS } = useTheme();
  const styles = createStyles(COLORS);

  const [settings, setSettings] = useState({
    general: true,
    sound: true,
    soundCall: true,
    vibrate: false,
    specialOffers: false,
    payments: true,
    promo: false,
    cashback: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "general",
      title: "General Notification",
    },
    {
      key: "sound",
      title: "Sound",
    },
    {
      key: "soundCall",
      title: "Sound Call",
    },
    {
      key: "vibrate",
      title: "Vibrate",
    },
    {
      key: "specialOffers",
      title: "Special Offers",
    },
    {
      key: "payments",
      title: "Payments",
    },
    {
      key: "promo",
      title: "Promo And Discount",
    },
    {
      key: "cashback",
      title: "Cashback",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}

      <CommonHeader
        title="Notification Setting"
        navigation={navigation}
        backIconColor={COLORS.blue}
      />


      {/* Settings */}

      <View style={styles.list}>

        {items.map((item) => (

          <View
            key={item.key}
            style={styles.item}
          >

            <Text style={styles.itemText}>
              {item.title}
            </Text>

            <TouchableOpacity
              style={[
                styles.switch,
                settings[item.key]
                  ? styles.switchOn
                  : styles.switchOff,
              ]}
              onPress={() =>
                toggleSetting(item.key)
              }
              activeOpacity={0.8}
            >

              <View
                style={[
                  styles.switchCircle,
                  settings[item.key]
                    ? styles.circleOn
                    : styles.circleOff,
                ]}
              />

            </TouchableOpacity>

          </View>

        ))}

      </View>

    </SafeAreaView>
  );
};

export default NotificationSettingScreen;

const createStyles = (COLORS) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

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

    color: COLORS.blue,

    fontSize: 22,

    fontWeight: "700",
  },

  headerSpace: {
    width: 50,
  },

  list: {
    paddingHorizontal: 30,

    paddingTop: 22,
  },

  item: {
    height: 56,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  itemText: {
    color: COLORS.darkText,

    fontSize: 18,

    fontWeight: "400",
  },

  switch: {
    width: 52,

    height: 27,

    borderRadius: 20,

    justifyContent: "center",

    paddingHorizontal: 3,
  },

  switchOn: {
    backgroundColor: COLORS.blue,
  },

  switchOff: {
    backgroundColor: COLORS.paleBlue,
  },

  switchCircle: {
    width: 21,

    height: 21,

    borderRadius: 11,

    backgroundColor: COLORS.background,
  },

  circleOn: {
    alignSelf: "flex-start",
  },

  circleOff: {
    alignSelf: "flex-end",
  },

});