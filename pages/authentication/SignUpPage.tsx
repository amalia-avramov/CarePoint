import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import * as yup from 'yup';

import { signUp } from './firebaseConfig';

// Yup schema for validation
const signUpSchema = yup.object({
    email: yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup.string()
        .min(4, "Password must be at least 4 characters long")
        .required("Password is required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], "Passwords must match")
        .required("Confirm password is required")
});

const SignUpPage: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState<{ email?: string, password?: string, confirmPassword?: string }>({});
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        try {
            // Validate using the Yup schema
            await signUpSchema.validate({ email, password, confirmPassword }, { abortEarly: false });
            setErrors({});  // Clear previous errors if any

            // Continue Sign Up process
            console.log('Register attempt with:', email, password);
            await handleFirebaseSignUp(email, password)
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const errorMessages: { [key: string]: string } = {};
                err.inner.forEach((error) => {
                    if (error.path) errorMessages[error.path] = error.message;
                });
                setErrors(errorMessages);
                Alert.alert("Validation Errors", err.errors.join("\n"));
            }
        }
    };

    const handleFirebaseSignUp = async (email: string, password: string) => {
        setLoading(true);
        const result = await signUp(email, password);
        setLoading(false);
        if (result.success) {
            Alert.alert("Signup Successful", "You are now signed up!");
            navigation.goBack();
        } else {
            Alert.alert("Signup Failed", result.error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={[styles.input, errors.email ? styles.invalidInput : {}]}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.errorText}>{errors.email}</Text>
            <TextInput
                style={[styles.input, errors.password ? styles.invalidInput : {}]}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
            />
            <Text style={styles.errorText}>{errors.password}</Text>
            <TextInput
                style={[styles.input, errors.confirmPassword ? styles.invalidInput : {}]}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            {loading && <Text>Loading...</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    invalidInput: {
        borderColor: 'red', // Changes border color to red for invalid inputs
    },
    errorText: {
        width: '100%',
        color: 'red', // Error message color
        fontSize: 14,
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#000',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SignUpPage;
