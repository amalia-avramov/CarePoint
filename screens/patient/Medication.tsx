import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

interface Medicine {
  name: string;
  administrationMethod: 'oral' | 'inhalation'; // Example administration methods
  frequency: 'daily' | 'every2days'; // Example frequencies
  startDate: string;
  endDate?: string;
  program: ProgramEntry[];
}

interface ProgramEntry {
  hour: number;
  quantity: number;
  dates: Date[];
}

interface Program {
  id: string;
  diagnostic: string;
  medicine: Medicine;
  patientId: string;
}

export function Medication({ navigation, route }: { navigation: any, route: any }) {
  const {patientId} = route?.params;
  const [programs, setPrograms] = useState<Program[]>([]);

  function handleNavigate(path: string) {
    navigation.navigate(path);
  }

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const snapshot = await firestore()
          .collection('programs')
          .where('patientId', '==', patientId)
          .get();

        const programsList: Program[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Program[];

        setPrograms(programsList);
      } catch (err) {
        Alert.alert('Error fetching programs');
      }
    };

    if (patientId) {
      fetchPrograms();
    } else {
      setPrograms([]);
    }
  }, [patientId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <Text style={styles.header}>Patient Health Dashboard</Text>
      {programs.map(program => (
        <View key={program.id} style={styles.card}>
          <Text style={styles.cardHeader}>Medication Program</Text>
          <Text style={styles.medicationName}>{program.diagnostic}</Text>
          <Text style={styles.medicationDetails}>Start Date: {program.medicine.startDate}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MedicationDetails', { programId: program.id })}>
            <View style={styles.medicationItem}>
              <Text style={styles.medicationName}>{program.medicine.name}</Text>
              <Text style={styles.medicationDetails}>Dosage: {program.medicine.administrationMethod}</Text>
              <Text style={styles.medicationDetails}>Frequency: {program.medicine.frequency}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
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
    marginBottom: 16,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  medicationItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  medicationDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  markAsTakenButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 8,
  },
  markAsTakenText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 8,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  tensionItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
  },
  tensionDetails: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  addEntryButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 8,
  },
  addEntryText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
