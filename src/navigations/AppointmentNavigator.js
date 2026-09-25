import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import AllAppointmentScreen from "../screens/appointments/AllAppointmentScreen";
import CancelAppointmentScreen from "../screens/appointments/CancelAppointmentScreen";
import ReviewScreen from "../screens/appointments/ReviewScreen";

const Stack = createNativeStackNavigator();

const AppointmentNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AllAppointment"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AllAppointment"
        component={AllAppointmentScreen}
      />

      <Stack.Screen
        name="CancelAppointment"
        component={CancelAppointmentScreen}
      />

      <Stack.Screen
        name="Review"
        component={ReviewScreen}
      />
    </Stack.Navigator>
  );
};

export default AppointmentNavigator;