import React from "react";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import COLORS from "../constants/colors";
import AppointmentsScreen from "../screens/AppointmentsScreen";
import MessageScreen from "../screens/MessageScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.white,
        tabBarStyle: {
          position: "absolute",
          left: 30,
          right: 30,
          bottom: 0,
          height: 49,

          backgroundColor: COLORS.primary,

          borderRadius: 28,

          borderTopWidth: 0,

          elevation: 5,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.15,
          shadowRadius: 5,

          paddingTop: 0,
          paddingBottom: 0,
        },

        // Remove default spacing
        tabBarItemStyle: {
          height: 49,
          padding: 0,
        },

        tabBarIcon: ({
          focused,
          color,
          size,
        }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "home"
              : "home-outline";
          }

          if (route.name === "Chat") {
            iconName = focused
              ? "chatbubbles"
              : "chatbubbles-outline";
          }

          if (route.name === "Profile") {
            iconName = focused
              ? "person"
              : "person-outline";
          }

          if (route.name === "Appointments") {
            iconName = focused
              ? "calendar"
              : "calendar-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={22}
              color={color}
            />
          );
        },
      })}
    >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Chat"
        component={MessageScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
      />

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;