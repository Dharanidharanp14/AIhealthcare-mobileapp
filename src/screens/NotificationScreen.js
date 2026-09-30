import React, { useRef, useState } from "react";

import {
  Animated,
  PanResponder,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "../constants/colors";
import CommonHeader from "../components/CommonHeader";


const BLUE = COLORS.primary;

const notificationSeed = [
  {
    id: 1,
    title: "Appointment Confirmed",
    message: "Your appointment has been successfully confirmed.",
    time: "10 min ago",
    icon: "calendar-outline",
  },
  {
    id: 2,
    title: "Appointment Reminder",
    message: "You have an upcoming appointment with your doctor.",
    time: "1 hour ago",
    icon: "notifications-outline",
  },
  {
    id: 3,
    title: "New Message",
    message: "You have received a new message from your doctor.",
    time: "2 hours ago",
    icon: "chatbubble-outline",
  },
  {
    id: 4,
    title: "Health Update",
    message: "Your health information has been updated successfully.",
    time: "Yesterday",
    icon: "heart-outline",
  },
];

let notificationCache;


const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(() => {
    notificationCache ||= notificationSeed;
    return notificationCache;
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const selectionMode = selectedIds.length > 0;

  const updateNotifications = (update) => {
    setNotifications((current) => {
      notificationCache = update(current);
      return notificationCache;
    });
  };

  const toggleSelected = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    );
  };

  const deleteNotification = (id) => {
    updateNotifications((current) => current.filter((item) => item.id !== id));
    setSelectedIds((current) => current.filter((selectedId) => selectedId !== id));
  };

  const deleteSelected = () => {
    updateNotifications((current) =>
      current.filter((item) => !selectedIds.includes(item.id))
    );
    setSelectedIds([]);
  };


  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right"]}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <CommonHeader
        title="Notifications"
        navigation={navigation}
        backIconColor={BLUE}
        style={styles.header}
        titleStyle={styles.headerTitle}
      />


      {/* =================================================
          CONTENT
      ================================================= */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* PAGE TITLE */}

        <View style={styles.titleContainer}>

          <Text style={styles.sectionTitle}>
            Notifications
          </Text>

          <Text style={styles.sectionSubtitle}>
            Stay updated with your latest activities
          </Text>

        </View>

        {selectionMode && (
          <View style={styles.selectionToolbar}>
            <Text style={styles.selectedCount}>
              {selectedIds.length} selected
            </Text>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setSelectedIds([])}
            >
              <Text style={styles.cancelSelection}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`Delete ${selectedIds.length} selected notifications`}
              onPress={deleteSelected}
              style={styles.deleteSelectedButton}
            >
              <Ionicons name="trash-outline" size={16} color={COLORS.white} />
              <Text style={styles.deleteSelectedText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* =================================================
            NOTIFICATION LIST
        ================================================= */}

        <View style={styles.notificationContainer}>
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <NotificationRow
                key={item.id}
                item={item}
                selected={selectedIds.includes(item.id)}
                selectionMode={selectionMode}
                onPress={() => {
                  if (selectionMode) toggleSelected(item.id);
                }}
                onLongPress={() => toggleSelected(item.id)}
                onDelete={() => deleteNotification(item.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="notifications-outline"
                size={32}
                color={COLORS.mutedBlue}
              />
              <Text style={styles.emptyTitle}>You are all caught up</Text>
              <Text style={styles.emptyMessage}>
                New notifications will appear here when available.
              </Text>
            </View>
          )}
        </View>


        {/* EMPTY SPACE */}

        <View style={styles.bottomSpace} />

      </ScrollView>

    </SafeAreaView>
  );
};

const NotificationRow = ({
  item,
  selected,
  selectionMode,
  onPress,
  onLongPress,
  onDelete,
}) => {
  const deleteWidth = 84;
  const translateX = useRef(new Animated.Value(0)).current;
  const selectionModeRef = useRef(selectionMode);
  const swipeOpenRef = useRef(false);
  selectionModeRef.current = selectionMode;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gesture) => {
        const horizontalSwipe = Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.25;
        const swipingLeft = gesture.dx < -8;
        const closingSwipe = swipeOpenRef.current && gesture.dx > 8;
        return !selectionModeRef.current && horizontalSwipe && (swipingLeft || closingSwipe);
      },
      onPanResponderMove: (_, gesture) => {
        const offset = swipeOpenRef.current ? -deleteWidth : 0;
        translateX.setValue(Math.max(-deleteWidth, Math.min(0, offset + gesture.dx)));
      },
      onPanResponderRelease: (_, gesture) => {
        const shouldOpen = swipeOpenRef.current
          ? gesture.dx <= 35
          : gesture.dx < -42;
        swipeOpenRef.current = shouldOpen;
        Animated.spring(translateX, {
          toValue: shouldOpen ? -deleteWidth : 0,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      },
      onPanResponderTerminate: () => {
        swipeOpenRef.current = false;
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      },
    })
  ).current;

  const handleDelete = () => {
    swipeOpenRef.current = false;
    onDelete();
  };

  const handleLongPress = () => {
    swipeOpenRef.current = false;
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
    onLongPress();
  };

  return (
    <View style={styles.swipeRow}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`Delete ${item.title}`}
        onPress={handleDelete}
        style={[styles.swipeDeleteAction, { width: deleteWidth }]}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.white} />
        <Text style={styles.swipeDeleteText}>Delete</Text>
      </TouchableOpacity>

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.swipeCard, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`${item.title}. Long press to select.`}
          accessibilityState={{ selected }}
          delayLongPress={350}
          onLongPress={handleLongPress}
          onPress={onPress}
          style={[
            styles.notificationCard,
            selected && styles.selectedNotification,
          ]}
          activeOpacity={0.82}
        >
          {selectionMode && (
            <Ionicons
              name={selected ? "checkbox" : "square-outline"}
              size={22}
              color={selected ? COLORS.primary : COLORS.gray}
              style={styles.selectionCheckbox}
            />
          )}
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={24} color={BLUE} />
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {item.message}
            </Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
          {!selectionMode && (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.paleBlue}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};


export default NotificationScreen;


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  // ===================================================
  // SAFE AREA
  // ===================================================

  safeArea: {
    flex: 1,

    backgroundColor: COLORS.white,
  },


  // ===================================================
  // HEADER
  // ===================================================

  header: {
    height: 65,

    paddingHorizontal: 20,

    backgroundColor: COLORS.white,
  },

  headerTitle: {
    color: BLUE,

    fontSize: 22,

    fontWeight: "700",

    textAlign: "center",
  },


  // ===================================================
  // SCROLL VIEW
  // ===================================================

  scrollView: {
    flex: 1,

    backgroundColor: COLORS.white,
  },

  contentContainer: {
    paddingHorizontal: 25,

    paddingTop: 10,

    paddingBottom: 100,
  },


  // ===================================================
  // TITLE
  // ===================================================

  titleContainer: {
    marginBottom: 20,
  },

  selectionToolbar: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },

  selectedCount: {
    flex: 1,
    color: COLORS.darkText,
    fontSize: 13,
    fontWeight: "600",
  },

  cancelSelection: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "600",
  },

  deleteSelectedButton: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 12,
    borderRadius: 9,
    backgroundColor: COLORS.red,
  },

  deleteSelectedText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 20,

    fontWeight: "700",

    color: COLORS.darkText,

    marginBottom: 5,
  },

  sectionSubtitle: {
    fontSize: 13,

    color: COLORS.gray,
  },


  // ===================================================
  // NOTIFICATIONS
  // ===================================================

  notificationContainer: {
    width: "100%",
  },

  swipeRow: {
    position: "relative",
    overflow: "hidden",
    marginBottom: 12,
    borderRadius: 16,
  },

  swipeCard: {
    width: "100%",
  },

  swipeDeleteAction: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: COLORS.red,
  },

  swipeDeleteText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "600",
  },


  // ===================================================
  // NOTIFICATION CARD
  // ===================================================

  notificationCard: {
    minHeight: 88,

    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 16,

    marginBottom: 0,

    paddingHorizontal: 15,

    paddingVertical: 13,

    flexDirection: "row",

    alignItems: "center",

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.08,

    shadowRadius: 4,

    borderWidth: 1,

    borderColor: COLORS.lightLavender,
  },

  selectedNotification: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },

  selectionCheckbox: {
    marginRight: 11,
  },


  // ===================================================
  // ICON
  // ===================================================

  iconContainer: {
    width: 48,

    height: 48,

    borderRadius: 24,

    backgroundColor: COLORS.paleBlue,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 13,
  },


  // ===================================================
  // NOTIFICATION CONTENT
  // ===================================================

  notificationContent: {
    flex: 1,

    paddingRight: 8,
  },

  notificationTitle: {
    fontSize: 15,

    fontWeight: "700",

    color: COLORS.darkText,

    marginBottom: 4,
  },

  notificationMessage: {
    fontSize: 12,

    lineHeight: 17,

    color: COLORS.gray,

    marginBottom: 4,
  },

  notificationTime: {
    fontSize: 10,

    color: COLORS.gray,
  },

  emptyState: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 70,
  },

  emptyTitle: {
    marginTop: 14,
    color: COLORS.darkText,
    fontSize: 16,
    fontWeight: "600",
  },

  emptyMessage: {
    marginTop: 6,
    color: COLORS.gray,
    fontSize: 12,
    textAlign: "center",
  },


  // ===================================================
  // BOTTOM SPACE
  // ===================================================

  bottomSpace: {
    height: 40,
  },

});