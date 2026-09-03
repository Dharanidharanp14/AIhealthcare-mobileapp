import React, { useEffect } from "react";
import Constants from "expo-constants";
import AppNavigator from "./src/navigations/AppNavigator";

function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      if (Constants.executionEnvironment === "storeClient") {
        console.log(
          "Expo Go detected - remote push notifications skipped."
        );
        return;
      }

      try {
        await import(
          "./src/services/notificationHandler"
        );

        const {
          registerForPushNotificationsAsync,
        } = await import(
          "./src/services/notificationServices"
        );

        await registerForPushNotificationsAsync();
      } catch (error) {
        console.log(
          "Notification setup failed:",
          error
        );
      }
    };

    setupNotifications();
  }, []);

  return <AppNavigator />;
}

export default App;