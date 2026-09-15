import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#2864FF";
const LIGHT_BLUE = "#C9D6FF";

const NotificationScreen = ({ navigation }) => {
  const notifications = [
    {
      icon: "calendar-outline",
      title: "Scheduled Appointment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "2 M",
      unread: true,
    },
    {
      icon: "calendar-outline",
      title: "Scheduled Change",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "2 H",
      unread: true,
    },
    {
      icon: "document-text-outline",
      title: "Medical Notes",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "3 H",
      unread: false,
    },
    {
      icon: "calendar-outline",
      title: "Scheduled Appointment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "1 D",
      unread: false,
    },
    {
      icon: "chatbubble-outline",
      title: "Medical History Update",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "5 D",
      unread: false,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
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

        <Text style={styles.headerTitle}>Notification</Text>

        <View style={styles.newsContainer}>
          <Text style={styles.newsText}>News</Text>
          <View style={styles.newsDot} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Today */}
        <View style={styles.sectionHeader}>
          <View style={styles.datePill}>
            <Text style={styles.dateText}>Today</Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.markAll}>Mark all</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        {notifications.map((item, index) => (
          <NotificationItem
            key={index}
            item={item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const NotificationItem = ({ item }) => {
  return (
    <View
      style={[
        styles.notification,
        item.unread && styles.unreadNotification,
      ]}
    >
      <View style={styles.iconCircle}>
        <Ionicons
          name={item.icon}
          size={23}
          color="white"
        />
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.titleRow}>
          <Text style={styles.notificationTitle}>
            {item.title}
          </Text>

          <Text style={styles.time}>
            {item.time}
          </Text>
        </View>

        <Text
          style={styles.description}
          numberOfLines={3}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingTop: 20,
  },

  backButton: {
    width: 35,
    alignItems: "flex-start",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: BLUE,
  },

  newsContainer: {
    backgroundColor: "#CCD7FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  newsText: {
    color: BLUE,
    fontSize: 12,
    fontWeight: "500",
  },

  newsDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BLUE,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 15,
  },

  datePill: {
    backgroundColor: "#C9D6FF",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
  },

  dateText: {
    color: BLUE,
    fontSize: 17,
  },

  markAll: {
    color: BLUE,
    fontSize: 13,
    fontWeight: "500",
  },

  notification: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 12,
    minHeight: 88,
  },

  unreadNotification: {
    backgroundColor: "#C9D6FF",
  },

  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  notificationContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  notificationTitle: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
  },

  time: {
    color: "#444444",
    fontSize: 10,
    marginLeft: 5,
  },

  description: {
    color: "#555555",
    fontSize: 9,
    lineHeight: 12,
    marginTop: 2,
    paddingRight: 5,
  },
});