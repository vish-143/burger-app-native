import React, { useEffect, useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import foodImage from "../assets/food.jpg";
import eyeOpen from "../assets/eye.png";
import eyeClose from "../assets/hide.png";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../Utils/authContext";
import CustomTextInput from "../Utils/TextInput";

const Login = ({ babe }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEyeOpen, setEyeOpen] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@([a-zA-Z0-9.-]{2,})+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@]).*$/;
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const { setAuthenticated } = useAuth();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    const validateEmail = (text) => {
        if (text.trim() === "") {
            setEmailError("Email field is required");
        } else if (!emailRegex.test(text)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError("");
        }
    };

    const validatePassword = (text) => {
        if (text.trim() === "") {
            setPasswordError("Password field is required");
        } else if (text.length < 8) {
            setPasswordError("Password must be at least 8 characters");

        } else if (!passwordRegex.test(text)) {
            setPasswordError("Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character");
        } else {
            setPasswordError("");
        }
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        validateEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        validatePassword(text);
    };


    const handleLogin = async () => {
        let isValid = true;

        if (email.trim() === "") {
            setEmailError("Email field is required");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (password.trim() === "") {
            setPasswordError("Password field is required");
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError("Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (isValid) {
            const emailField = JSON.stringify(email)
            const passwordField = JSON.stringify(password)
            const credentials = { emailField, passwordField };
            try {
                await AsyncStorage.setItem('credentials', JSON.stringify(credentials));
            } catch (error) {
                console.error('Error storing data:', error);
            }
            setEmail("")
            setPassword("")
            await AsyncStorage.setItem('auth', JSON.stringify(true))
            setAuthenticated(true)
            navigation.navigate('Home Screen');
        }
    };


    const togglePasswordVisibility = () => {
        setEyeOpen(!isEyeOpen);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                {!isKeyboardVisible &&

                    <Image style={styles.image} source={foodImage} resizeMode="cover" />
                }
                <Text style={styles.loginHeader}>Login</Text>
                <View style={styles.formContainer}>
                    <CustomTextInput
                        style={styles.input}
                        value={email}
                        onChangeText={handleEmailChange}
                        placeholder="Email"
                        placeholderColor="black"
                        keyboardType="email-address"
                    />
                    <Text style={styles.error}>{emailError}</Text>
                    <View style={styles.passwordContainer}>
                        <CustomTextInput
                            style={styles.passwordInput}
                            value={password}
                            onChangeText={handlePasswordChange}
                            placeholder="Password"
                            placeholderColor="black"
                            secureTextEntry={!isEyeOpen}
                        />
                        <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
                            <Image style={styles.eyeImage} source={isEyeOpen ? eyeOpen : eyeClose} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.error}>{passwordError}</Text>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.footer}>Don't have an account? <Text style={{ color: "#44a047", fontWeight: "bold" }}>Create new account</Text></Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    scrollContainer: {
        justifyContent: 'center',
    },
    image: {
        width: "100%",
        height: 270,
    },
    formContainer: {
        marginTop: 35,
    },
    loginHeader: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
        paddingHorizontal: 25,
        marginTop: 25
    },
    input: {
        width: '90%',
        height: 60,
        borderColor: '#eeeeee',
        borderWidth: 1,
        borderRadius: 25,
        paddingLeft: 20,
        fontSize: 18,
        color: 'black',
        backgroundColor: "#eeeeee",
        alignSelf: "center",
    },
    passwordContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#eeeeee',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: "#eeeeee",
        alignSelf: "center",
    },
    passwordInput: {
        flex: 1,
        height: 60,
        paddingLeft: 20,
        fontSize: 18,
        color: 'black',
        backgroundColor: "#eeeeee",
        borderRadius: 25,
    },
    forgotPassword: {
        color: "#44a047",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 35
    },
    loginButton: {
        width: '90%',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#44a047',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    footer: {
        marginTop: 35,
        textAlign: "center",
        color: "black",
        fontSize: 15,
    },
    eyeButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: "#eeeeee",
        position:"absolute",
        left:290
    },
    eyeImage: {
        width: 25,
        height: 25,
    },
    error: {
        color: "red",
        paddingHorizontal: 30,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10
    }
});

export default Login;
