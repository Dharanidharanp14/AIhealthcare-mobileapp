import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    console.log("Push notifications require a physical device.");
    return null;
  }


  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#2864F0",
    });
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  // Ask permission if not already granted
  if (existingStatus !== "granted") {
    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Notification permission not granted.");
    return null;
  }

  // Get EAS project ID
  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  if (!projectId) {
    console.log("EAS projectId not found.");
    return null;
  }

  try {
    const tokenResponse =
      await Notifications.getExpoPushTokenAsync({
        projectId,
      });

    const token = tokenResponse.data;

    console.log("================================");
    console.log("EXPO PUSH TOKEN:");
    console.log(token);
    console.log("================================");

    return token;
  } catch (error) {
    console.log(
      "Error getting Expo Push Token:",
      error
    );

    return null;
  }
}