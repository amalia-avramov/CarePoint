import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Patient {
  id: number;
  name: string;
  phoneNumber: string;
  cnp: string;
}

const patients: Patient[] = [
  {
    id: 1,
    name: 'John Doe',
    phoneNumber: '555-1234',
    cnp: '1234567890123',
  },
  {
    id: 2,
    name: 'Jane Smith',
    phoneNumber: '555-5678',
    cnp: '2345678901234',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    phoneNumber: '555-8765',
    cnp: '3456789012345',
  },
  {
    id: 4,
    name: 'Bob Brown',
    phoneNumber: '555-4321',
    cnp: '4567890123456',
  },
  {
    id: 5,
    name: 'Charlie Davis',
    phoneNumber: '555-6789',
    cnp: '5678901234567',
  },
];

export function PatientList({navigation}: {navigation: any}) {
  const [search, setSearch] = useState('');
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
        {patients.map(patient => (
          <PatientListItem
            key={patient.id}
            patient={patient}
            onClick={() =>
              navigation.navigate('PatientProfile', {userId: patient.id})
            }
          />
        ))}
      </View>
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
      <Image
        source={require('../../images/no-profile-picture.png')}
        style={styles.image}
      />
      <View>
        <TextInput value={patient.name} style={styles.listHeader} />
        <View style={styles.listContent}>
          <TextInput value={`CNP: ${patient.cnp}`} />
          <TextInput value={'|'} />
          <TextInput value={`Phone: ${patient.phoneNumber}`} />
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
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
});
