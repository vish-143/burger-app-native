import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import { useEffect } from "react";
import { AuthProvider } from './src/Utils/authContext';
import StackNavigator from './src/Navigators/Stack';
import ForegroundHandler from './src/Utils/foregroundHandler'
import { requestUserPermission,NotificationServices } from './src/Utils/pushNotification';


const App = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  useEffect(() => {
    requestUserPermission();
    NotificationServices();
  }, []);

  return (
    <AuthProvider>
      <ForegroundHandler />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer >
    </AuthProvider>
  );
};

export default App;
