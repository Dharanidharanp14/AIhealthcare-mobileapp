import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ChatConversationScreen from "../screens/ChatConversationScreen";

import BottomTabNavigator from "./BottomTabNavigator";

// Profile Screens
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import SettingsScreen from "../screens/profile/SettingScreen";
import PasswordManagerScreen from "../screens/profile/PasswordManagerScreen";
import NotificationSettingScreen from "../screens/profile/NotificationSettingScreen";
import PrivacyPolicyScreen from "../screens/profile/PrivacyPolicyScreen";
import HelpCenterScreen from "../screens/profile/HelpCenterScreen";
import DoctorInfoScreen from "../screens/DoctorInfoScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >

        {/* ================= AUTH SCREENS ================= */}

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />

        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />

        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
        />

        {/* ================= MAIN BOTTOM TAB ================= */}

        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
        />

        <Stack.Screen
          name="MessageChat"
          component={ChatConversationScreen}
          options={{ animation: "slide_from_right" }}
        />

        {/* ================= PROFILE SUB SCREENS ================= */}

        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />

        <Stack.Screen
          name="PasswordManager"
          component={PasswordManagerScreen}
        />

        <Stack.Screen
          name="NotificationSetting"
          component={NotificationSettingScreen}
        />

        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
        />

        <Stack.Screen
          name="HelpCenter"
          component={HelpCenterScreen}
        />

        
              {/* Doctor Details Screen */}
        
              <Stack.Screen
                name="DoctorInfo"
                component={DoctorInfoScreen}
              />
        

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator;