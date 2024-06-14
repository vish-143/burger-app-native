import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useAuth } from '../Utils/authContext';

export default function Home({ navigation}) {
  const [loginDetails, setLoginDetails] = useState("")
  const { setAuthenticated } = useAuth();

  const handleLoginDetails = async () => {
    try {
      const credentialsJSON = await AsyncStorage.getItem("credentials");
      if (credentialsJSON) {
        const credentials = JSON.parse(credentialsJSON);
        setLoginDetails(credentials);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("credentials");
      await AsyncStorage.removeItem("auth")
      setAuthenticated(false)
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View>
      <Text style={styles.header}>Welcome to Home Page!</Text>
      <TouchableOpacity style={styles.getAuthButton} onPress={handleLoginDetails}><Text style={styles.getAuthText}>Get Login Details</Text></TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.credentialText}>Email : {loginDetails.emailField}</Text>
        <Text style={styles.credentialText}>Password : {loginDetails.passwordField}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}><Text style={styles.getAuthText}>Logout</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    paddingVertical: 10
  },

  getAuthButton: {
    width: '60%',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#44a047',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15
  },

  getAuthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  card: {
    backgroundColor: "#3F4E4F",
    borderColor: "#f5f5f5",
    borderRadius: 12,
    borderWidth: 2,
    padding: 30,
    margin: 20,
    elevation: 5,
  },
  credentialText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },

  logoutButton: {
    width: '28%',
    height: 45,
    borderRadius: 25,
    backgroundColor: '#576CBC',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "flex-end",
    marginEnd: 20,
    marginVertical: 30,
  },
})
