import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';

import {signIn} from './firebaseConfig';

// Yup schema for validation
const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .required('Password is required'),
});

const LoginPage: React.FC<{navigation: any}> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      // Validate using the Yup schema
      await loginSchema.validate({email, password}, {abortEarly: false});
      setErrors({}); // Clear previous errors if any

      // Continue Login process
      console.log('Login attempt with:', email, password);
      await handleFirebaseLogin(email, password);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorMessages: {[key: string]: string} = {};
        err.inner.forEach(error => {
          if (error.path) errorMessages[error.path] = error.message;
        });
        setErrors(errorMessages);
        Alert.alert('Validation Errors', err.errors.join('\n'));
      }
    }
  };

  const handleFirebaseLogin = async (email: string, password: string) => {
    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);
    if (result.success) {
      navigation.navigate('DoctorHome');
    } else {
      Alert.alert('Login Failed', result.error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/login_image.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>CarePoint</Text>
      <Text style={styles.subtitle}>
        Take control of your health effortlessly
      </Text>
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
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPassword}>Forgot your password?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Create an account</Text>
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
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 30,
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#000',
    marginBottom: 20,
  },
  signUpText: {
    color: 'blue',
  },
});

export default LoginPage;
