import React from "react";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import COLORS from "../constants/colors";

import HomeNavigator from "./HomeNavigator";
import AppointmentNavigator from "./AppointmentNavigator";
import MessageScreen from "../screens/MessageScreen";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ route }) => {

  const currentPassword =
    route?.params?.currentPassword || "";

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

        tabBarItemStyle: {
          height: 49,
          padding: 0,
        },

        tabBarIcon: ({
          focused,
          color,
        }) => {

          let iconName;

          if (route.name === "Home") {

            iconName = focused
              ? "home"
              : "home-outline";

          }

          else if (route.name === "Chat") {

            iconName = focused
              ? "chatbubbles"
              : "chatbubbles-outline";

          }

          else if (route.name === "Profile") {

            iconName = focused
              ? "person"
              : "person-outline";

          }

          else if (route.name === "Appointments") {

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

      {/* HOME */}

      <Tab.Screen
        name="Home"
        component={HomeNavigator}
      />


      {/* CHAT */}

      <Tab.Screen
        name="Chat"
        component={MessageScreen}
      />


      {/* PROFILE */}

      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        initialParams={{
          currentPassword: currentPassword,
        }}
      />


      {/* APPOINTMENTS */}

      <Tab.Screen
        name="Appointments"
        component={AppointmentNavigator}
      />

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;