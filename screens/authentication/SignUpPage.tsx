import firestore from '@react-native-firebase/firestore';
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

import {signUp} from './firebaseConfig';

// Yup schema for validation
const signUpSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  name: yup.string().required('Name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  speciality: yup.string().required('Speciality is required'),
  cnp: yup
    .string()
    .matches(/^\d{13}$/, 'CNP must contain 13 digits')
    .required('CNP is required'),
});

const SignUpPage: React.FC<{navigation: any}> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [cnp, setCnp] = useState('');

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      // Validate using the Yup schema
      await signUpSchema.validate(
        {email, password, confirmPassword, name, phoneNumber, speciality, cnp},
        {abortEarly: false},
      );
      setErrors({}); // Clear previous errors if any

      // Continue Sign Up process
      console.log(
        'Register attempt with:',
        email,
        password,
        name,
        phoneNumber,
        speciality,
        cnp,
      );
      await handleFirebaseSignUp(email, password);
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

  const handleFirebaseSignUp = async (email: string, password: string) => {
    setLoading(true);
    const result = await signUp(email, password);
    setLoading(false);
    if (result.user) {
      // Store additional user details in Firestore
      console.log(result.user.uid);
      await storeUserDetails(result.user.uid);
      Alert.alert('Signup Successful', 'You are now signed up!');
      navigation.goBack();
    } else {
      Alert.alert('Signup Failed', result.error.message);
    }
  };

  const storeUserDetails = async (userId: string) => {
    try {
      await firestore().collection('doctors').doc(userId).set({
        name: name,
        CNP: cnp,
        phoneNumber: phoneNumber,
        speciality: speciality,
        accountPending: true,
      });
    } catch (error) {
      console.error('Error storing user details:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/register.png')}
        style={styles.image}
      />
      <Text style={styles.title}>CarePoint</Text>
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
        style={[
          styles.input,
          errors.confirmPassword ? styles.invalidInput : {},
        ]}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      <TextInput
        style={[styles.input, errors.name ? styles.invalidInput : {}]}
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <Text style={styles.errorText}>{errors.name}</Text>
      <TextInput
        style={[styles.input, errors.cnp ? styles.invalidInput : {}]}
        onChangeText={setCnp}
        value={cnp}
        placeholder="CNP"
      />
      <Text style={styles.errorText}>{errors.cnp}</Text>
      <TextInput
        style={[styles.input, errors.phoneNumber ? styles.invalidInput : {}]}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <Text style={styles.errorText}>{errors.phoneNumber}</Text>
      <TextInput
        style={[styles.input, errors.speciality ? styles.invalidInput : {}]}
        onChangeText={setSpeciality}
        value={speciality}
        placeholder="Speciality"
      />
      <Text style={styles.errorText}>{errors.speciality}</Text>
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
    backgroundColor: '#fff',
  },
  image: {
    height: 100,
    width: 120,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
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
