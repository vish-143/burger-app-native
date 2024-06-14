import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import CustomTextInput from '../Utils/TextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import WebIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '../Utils/TouchableOpacity';

export default function HealthCareLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agencyCode, setAgencyCode] = useState('')
    const [isEyeOpen, setEyeOpen] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [agencyCodeError, setAgencyCodeError] = useState('')
    const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@([a-zA-Z0-9.-]{2,})+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@]).*$/;
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);


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

    const validateAgencyCode = (text) => {
        if (text.trim() === "") {
            setAgencyCodeError("Agency Code field is required");
        }
        else {
            setAgencyCodeError("")
        }
    }
    const handleEmailChange = (text) => {
        setEmail(text);
        validateEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        validatePassword(text);
    };

    const handleAgencyCodeChange = (text) => {
        setAgencyCode(text);
        validateAgencyCode(text);
    }

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

        if (agencyCode.trim() === "") {
            setAgencyCodeError("Agency Code field is required");
        }
        else {
            setAgencyCodeError("")
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
            setAgencyCode("")
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
                    <Image style={styles.image} source={logo} resizeMode="contain" />
                }
                <Text style={styles.headerText}>Client Login</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Icon name="person-outline" size={25} color="#8bc34b" style={styles.icon} />
                        <CustomTextInput
                            style={styles.inputField}
                            value={email}
                            onChangeText={handleEmailChange}
                            placeholder="Email or Username"
                            placeholderColor="#6b6d6f"
                            keyboardType="email-address"
                        />
                    </View>


                    <Text style={styles.error}>{emailError}</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="lock-closed" size={25} color="#8bc34b" style={styles.icon} />

                        <CustomTextInput
                            style={styles.inputField}
                            value={password}
                            onChangeText={handlePasswordChange}
                            placeholder="Password"
                            placeholderColor="#6b6d6f"
                            secureTextEntry={!isEyeOpen}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                            <Icon name={isEyeOpen ? "eye" : "eye-off"} size={29} color="#8bc34b" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.error}>{passwordError}</Text>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>

                    <View style={styles.inputContainer}>
                        <WebIcon name="web" size={30} color="#8bc34b" style={styles.icon} />
                        <CustomTextInput
                            style={styles.inputField}
                            value={agencyCode}
                            onChangeText={handleAgencyCodeChange}
                            placeholder="Agency Code:*"
                            placeholderColor="#6b6d6f"
                        />
                    </View>
                    <Text style={styles.error}>{agencyCodeError}</Text>
                    <Button buttonStyle={styles.loginButton} onPress={handleLogin} buttonLabelStyle={styles.loginButtonText}>
                        Login
                    </Button>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 15
    },
    image: {
        width: "100%",
        height: 160,
    },
    headerText: {
        fontSize: 26,
        color: "#454545",
        textAlign: "center"
    },
    formContainer: {
        marginTop: 40,
    },
    icon: {
        marginLeft: 13
    },
    inputField: {
        paddingLeft: 10,
        fontSize: 18,
        color: 'black',
        borderRadius: 50,
    },
    inputContainer: {
        width: '93%',
        padding: 5,
        overflow: "hidden",
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: "white",
        alignSelf: "center",
    },
    eyeIcon: {
        position: "absolute",
        right: 12,
        backgroundColor: "white"
    },
    error: {
        color: "red",
        paddingHorizontal: 30,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 5
    },
    forgotPassword: {
        color: "#8bc34b",
        textAlign: "right",
        paddingEnd: 25,
        fontSize: 19,
        fontWeight: "600",
        marginBottom: 35,
        marginTop: -10
    },
    loginButton: {
        width: '93%',
        padding: 15,
        borderRadius: 30,
        backgroundColor: '#8bc34b',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        marginTop: 10,
    },
    loginButtonText: {
        fontSize: 21,
        fontWeight: 'bold',
        color: 'white',
    },
})