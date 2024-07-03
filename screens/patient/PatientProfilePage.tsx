import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signOut } from '../authentication/firebaseConfig';
import { useAuthState } from '../authentication/useAuthState';
import firestore from '@react-native-firebase/firestore';

interface Patient {
  id: string;
  cnp: string;
  name: string;
  phoneNumber: string;
  bloodType: string;
  weight: string;
  height: string;
  allergies: string[];
  emergencyContacts: string[];
}

const initialPatient: Patient = {
  id: '',
  cnp: '',
  name: '',
  phoneNumber: '',
  bloodType: '',
  weight: '',
  height: '',
  allergies: [],
  emergencyContacts: [],
};

export function PatientProfilePage({ navigation }: { navigation: any }) {
  const currentUser = useAuthState();
  const [patient, setPatient] = useState<Patient>(initialPatient);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientDoc = await firestore().collection('patients').doc(currentUser?.uid).get();
        if (patientDoc.exists) {
          setPatient({ id: patientDoc.id, ...patientDoc.data() } as Patient);
        }
      } catch (error) {
        Alert.alert('Error', 'There was an error fetching the patients');
      }
    };

    fetchPatient();
  }, [currentUser]);
  
  function handleNavigate(path: string) {
    navigation.navigate(path);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('PatientHomePage')}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <Text style={styles.header}>Patient Profile</Text>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={require('../../images/no-profile-picture.png')} style={styles.image} />
        </View>
        <Text style={styles.profileName}>{patient.name}</Text>
        <View style={styles.profileDetails}>
          <Text style={styles.detailText}>Blood Type: {patient.bloodType}</Text>
          <Text style={styles.detailText}>Weight: {patient.weight} kg</Text>
          <Text style={styles.detailText}>Height: {patient.height} cm</Text>
          <Text style={styles.detailText}>Allergies: {patient?.allergies?.join(', ')}</Text>
        </View>
        <View style={styles.emergencyContact}>
          <Text style={styles.emergencyHeader}>Emergency Contacts</Text>
          <View style={styles.contacts}>
          {patient?.emergencyContacts?.map((contact, index) => (
            <View key={index} style={styles.contactContainer}>
              <Text style={styles.label}>Name:</Text>
              <Text>{contact}</Text>
            </View>
          ))}
        </View>
        </View>
        <TouchableOpacity style={styles.viewMedicationButton} onPress={() => navigation.navigate('Medication', {patientId: currentUser?.uid})}>
          <Text style={styles.buttonText}>View Medication</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOut} onPress={() => {
            signOut();
            navigation.navigate('Login');
        }}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontWeight: '700',
    lineHeight: 32,
    fontSize: 20,
    marginVertical: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#858585',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    borderRadius: 24,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 16,
  },
  reportButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statisticsButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  profileDetails: {
    alignItems: 'flex-start',
    width: '80%',
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  emergencyContact: {
    alignItems: 'center',
    width: '80%',
    marginBottom: 16,
  },
  emergencyHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  contactItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '45%',
  },
  contactText: {
    fontSize: 16,
    fontWeight: '700',
  },
  contactLabel: {
    fontSize: 14,
    color: '#555',
  },
  viewMedicationButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  signOut: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 10
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  contacts: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 16,
    justifyContent: 'space-between',
  },
  contactContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flex: 1,
  }
});
