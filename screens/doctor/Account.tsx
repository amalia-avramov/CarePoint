import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { useAuthState } from '../authentication/useAuthState';
import { signOut } from '../authentication/firebaseConfig';

interface Doctor {
  id: string;
  name: string;
  phoneNumber: string;
  cnp: string;
  speciality: string;
}

const initialDoctor: Doctor = {
  id: '',
  cnp: '',
  name: '',
  phoneNumber: '',
  speciality: ''
};

export function DoctorAccount({ navigation }: { navigation: any }) {
  const currentUser = useAuthState();
  const [doctor, setDoctor] = useState<Doctor>(initialDoctor);

  function handleNavigate(path: string) {
    navigation.navigate(path);
  }

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorDoc = await firestore().collection('doctors').doc(currentUser?.uid).get();
        if (doctorDoc.exists) {
          setDoctor({ id: doctorDoc.id, ...doctorDoc.data() } as Doctor);
        }
      } catch (error) {
        Alert.alert('Error', 'There was an error fetching account information');
      }
    };

    fetchDoctor();
  }, [currentUser]);

  if(!currentUser)
    return;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('DoctorHome')}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <Text style={styles.header}>Doctor Profile</Text>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={require('../../images/no-profile-picture.png')} style={styles.image} />
        </View>
        <Text style={styles.profileName}>{doctor.name}</Text>
        <View style={styles.profileDetails}>
          <Text style={styles.detailText}>Specialty: {doctor.speciality}</Text>
          <Text style={styles.detailText}>Phone Number: {doctor.phoneNumber}</Text>
          <Text style={styles.detailText}>CNP: {doctor.cnp}</Text>
        </View>
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
  signOut: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
