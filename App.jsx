import react, { useEffect } from "react";
import AppNavigator from "./src/navigations/AppNavigator";
import { registerForPushNotificationsAsync } from "./src/services/notificationServices";

function App(){
 useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return(
    <AppNavigator/>
  )
}

export default App