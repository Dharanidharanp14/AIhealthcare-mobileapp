import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ProfileScreen from "../screens/profile/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import SettingsScreen from "../screens/profile/SettingScreen";
import PasswordManagerScreen from "../screens/profile/PasswordManagerScreen";
import NotificationSettingScreen from "../screens/profile/NotificationSettingScreen";
import PrivacyPolicyScreen from "../screens/profile/PrivacyPolicyScreen";
import HelpCenterScreen from "../screens/profile/HelpCenterScreen";


const Stack = createNativeStackNavigator();

const ProfileNavigator = ({ route }) => {

  return (
    <Stack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="ProfileHome"
        component={ProfileScreen}
        initialParams={{
          currentPassword:
            route?.params?.currentPassword,
        }}
      />

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

      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />

  <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />

    </Stack.Navigator>
  );
};

export default ProfileNavigator;