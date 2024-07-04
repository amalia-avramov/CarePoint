import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Patient {
  id: string;
  name: string;
  phoneNumber: string;
  cnp: string;
}

export function PatientList({navigation}: {navigation: any}) {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsSnapshot = await firestore().collection('patients').get();
        const patientsList = patientsSnapshot.docs.map(doc => ({
          id: String(doc.id),
          name: String(doc.data().name),
          phoneNumber: String(doc.data().phoneNumber),
          cnp: String(doc.data().cnp),
        }));
        setPatients(patientsList);
        setFilteredPatients(patientsList);
      } catch (error) {
        Alert.alert('Error', 'There was an error fetching the patients');
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const filterPatients = patients.filter(patient =>
      patient.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredPatients(filterPatients);
  }, [search, patients]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('DoctorHome')}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <View style={styles.searchSection}>
        <Icon
          name="account-search-outline"
          color={'black'}
          size={30}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={search}
          onChangeText={value => setSearch(value)}
        />
      </View>
      <View style={styles.list}>
        {filteredPatients.map(patient => (
          <PatientListItem
            key={patient.id}
            patient={patient}
            onClick={() =>
              navigation.navigate('PatientProfile', {userId: patient.id})
            }
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPatient')}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

function PatientListItem({
  patient,
  onClick,
}: {
  patient: Patient;
  onClick: () => void;
}) {
  return (
    <View style={styles.listItem}>
      <View>
        <Image
          source={require('../../images/no-profile-picture.png')}
          style={styles.image}
        />
        <Text style={styles.listHeader}>{patient.name}</Text>
        <View style={styles.listContent}>
          <Text>{`CNP: ${patient.cnp}`}</Text>
          <Text>|</Text>
          <Text>{`Phone: ${patient.phoneNumber}`}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onClick}>
        <Icon
          name="arrow-right-bold"
          size={25}
          color={'#606060'}
          style={{
            marginTop: 8,
            marginLeft: 8,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 24,
    backgroundColor: '#fff',
    marginTop: 60,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#808080',
    borderRadius: 12,
    marginHorizontal: 8,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  list: {
    display: 'flex',
    gap: 16,
    marginHorizontal: 8,
  },
  listItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  listHeader: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  listContent: {
    flexDirection: 'row',
    gap: 8,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 16,
  },
});
