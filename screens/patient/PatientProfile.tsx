import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import React, {useState} from 'react';
import {TextInput} from 'react-native';

interface EmergencyContact {
  name: string;
  relation: string;
  phoneNumber: string;
}

interface Patient {
  cnp: string;
  name: string;
  phoneNumber: string;
  bloodType: string;
  weight: string;
  height: string;
  allergies: string[];
  emergencyContacts: EmergencyContact[];
}

const initialPatient: Patient = {
  cnp: '1234567890123',
  name: 'John Doe',
  phoneNumber: '555-1234',
  bloodType: 'O+',
  weight: '70kg',
  height: '175cm',
  allergies: ['Peanuts', 'Pollens'],
  emergencyContacts: [
    {name: 'Jane Doe', relation: 'Spouse', phoneNumber: '555-5678'},
    {name: 'Mike Doe', relation: 'Brother', phoneNumber: '555-8765'},
  ],
};

export function PatientProfile({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {userId} = route?.params;
  const [patient, setPatient] = useState<Patient>(initialPatient);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = (field: keyof Patient, value: string) => {
    setPatient({...patient, [field]: value});
  };

  const handleContactChange = (
    index: number,
    field: keyof EmergencyContact,
    value: string,
  ) => {
    const newContacts = [...patient.emergencyContacts];
    newContacts[index] = {...newContacts[index], [field]: value};
    setPatient({...patient, emergencyContacts: newContacts});
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('PatientList')}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <Image
        source={require('../../images/no-profile-picture.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Patient {userId}</Text>
      <View style={styles.buttonContainer}>
        {!isEditing && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View report</Text>
          </TouchableOpacity>
        )}
        {!isEditing && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Statistics</Text>
          </TouchableOpacity>
        )}
        {isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Icon
              name="content-save"
              size={30}
              style={{
                marginTop: 8,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Icon
              name="circle-edit-outline"
              size={30}
              style={{
                marginTop: 8,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>CNP: {patient.cnp}</Text>
        <Text style={styles.label}>Name: {patient.name}</Text>

        <Text style={styles.label}>Phone Number:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={patient.phoneNumber}
            onChangeText={text => handleInputChange('phoneNumber', text)}
          />
        ) : (
          <Text>{patient.phoneNumber}</Text>
        )}
        <Text style={styles.label}>Blood Type:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={patient.bloodType}
            onChangeText={text => handleInputChange('bloodType', text)}
          />
        ) : (
          <Text>{patient.bloodType}</Text>
        )}
        <Text style={styles.label}>Weight:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={patient.weight}
            onChangeText={text => handleInputChange('weight', text)}
          />
        ) : (
          <Text>{patient.weight}</Text>
        )}
        <Text style={styles.label}>Height:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={patient.height}
            onChangeText={text => handleInputChange('height', text)}
          />
        ) : (
          <Text>{patient.height}</Text>
        )}
        <Text style={styles.label}>Allergies:</Text>
        <Text>{patient.allergies.join(',')}</Text>
        <Text style={styles.label}>Emergency Contacts:</Text>
        <View style={styles.contacts}>
          {patient.emergencyContacts.map((contact, index) => (
            <View key={index} style={styles.contactContainer}>
              <Text style={styles.label}>Name:</Text>
              <Text>{contact.name}</Text>
              <Text style={styles.label}>Relation:</Text>
              <Text>{contact.relation}</Text>
              <Text style={styles.label}>Phone Number:</Text>
              <Text>{contact.phoneNumber}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    marginVertical: 16,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    padding: 12,
    width: 110,
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 64,
  },
  detailsContainer: {
    display: 'flex',
    padding: 16,
    gap: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
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
  },
});
