import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const HomeHeader = () => {
  return (
    <View style={styles.container}>

      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/1.jpg",
          }}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.greeting}>
            Hi, WelcomeBack
          </Text>

          <Text style={styles.name}>
            John Doe
          </Text>
        </View>
      </View>

      <View style={styles.actions}>

        <TouchableOpacity style={styles.circle}>
          <Ionicons
            name="notifications-outline"
            size={23}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circle}>
          <Ionicons
            name="settings-outline"
            size={23}
            color={COLORS.black}
          />
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 15,
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },

  greeting: {
    color: "#5F83E8",
    fontSize: 12,
  },

  name: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
  },
});