import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DoctorInfoScreen from "../screens/DoctorInfoScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      {/* Home Main Screen */}

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />

      {/* Doctor Details Screen */}

      <Stack.Screen
        name="DoctorInfo"
        component={DoctorInfoScreen}
      />

    </Stack.Navigator>
  );
};

export default HomeNavigator;