import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export function AddPatient({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cnp, setCnp] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState('');

  const handleAddPatient = async () => {
    try {
      // Create user account
      const userCredential = await auth().createUserWithEmailAndPassword(email, cnp);
      const userId = userCredential.user.uid;

      // Add patient data to Firestore
      await firestore().collection('patients').doc(userId).set({
        name,
        email,
        phoneNumber,
        cnp,
        height,
        weight,
        bloodType,
        allergies: allergies.split(',').map(allergy => allergy.trim()),
        emergencyContacts: emergencyContacts.split(',').map(contact => contact.trim()),
      });

      Alert.alert('Success', 'Patient added successfully');
      navigation.navigate('DoctorHome');
    } catch (error: any) {
      Alert.alert('Error', `There was an error adding the patient: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <Text style={styles.header}>Add Patient</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="CNP" value={cnp} onChangeText={setCnp} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Height" value={height} onChangeText={setHeight} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Weight" value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Blood Type" value={bloodType} onChangeText={setBloodType} />
      <TextInput style={styles.input} placeholder="Allergies (comma separated)" value={allergies} onChangeText={setAllergies} />
      <TextInput style={styles.input} placeholder="Emergency Contacts (comma separated)" value={emergencyContacts} onChangeText={setEmergencyContacts} />
      <TouchableOpacity style={styles.button} onPress={handleAddPatient}>
        <Text style={styles.buttonText}>Add Patient</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
