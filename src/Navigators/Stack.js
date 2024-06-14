// import { createStackNavigator } from "@react-navigation/stack";
// import Login from "../Screens/login.jsx";
// import { useNavigation } from "@react-navigation/native";
// import { StyleSheet, TouchableOpacity, View } from "react-native";
// import getHeaderTitle from "../Utils/header.js";
// import Icon from 'react-native-vector-icons/Ionicons';
// import HomeTabs from "./BottomTabs.js";

// const Stack = createStackNavigator();
// const StackNavigator = () => {
//     const navigation = useNavigation()

//     return (
//         <Stack.Navigator initialRouteName="Login">
//             <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//             <Stack.Screen name="Home Screen" component={HomeTabs} initialParams={{ hello: "Vishva" }} options={({route }) => ({
//                 title: getHeaderTitle(route),
//                 headerLeft: () => (
//                     <View style={styles.iconMenu}>
//                         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//                             <Icon name="menu" size={30} color="black" />
//                         </TouchableOpacity>
//                     </View>
//                 ),
//             })} />
//         </Stack.Navigator>
//     )
// }

// const styles = StyleSheet.create({
//     iconMenu: {
//       flexDirection: 'row',
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//       padding: 10,
//     }
//   })
// export default StackNavigator


import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from "./Drawer.js";
import Login from "../Screens/login.jsx";
import { useAuth } from "../Utils/authContext.js";
import HealthCareLogin from "../Screens/healthcare-login.jsx";
import HomeTabs from "./BottomTabs.js";

const Stack = createStackNavigator();

const StackNavigator = () => {
    const { isAuthenticated, setAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);

    const checkAuthentication = async () => {
        try {
            const authDetail = await AsyncStorage.getItem('auth');
            setAuthenticated(authDetail === 'true');

        } catch (error) {
            console.error('Error retrieving authentication status:', error);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);


    return (
        <>
            {loading ?
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="black" />
                </View> : (

                    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                        {isAuthenticated ?
                            <Stack.Screen name="Home Screen" component={HomeTabs} />
                            :
                            <Stack.Screen name="Login" component={Login} />
                        }
                    </Stack.Navigator>
                )
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StackNavigator;
