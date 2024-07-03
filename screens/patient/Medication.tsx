import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Medication({ navigation }: { navigation: any }) {
  function handleNavigate(path: string) {
    navigation.navigate(path);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('PatientHomePage')}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <Text style={styles.header}>Patient Health Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Medication Program</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MedicationDetails')}>
          <View style={styles.medicationItem}>
            <Text style={styles.medicationName}>Medication Name</Text>
            <Text style={styles.medicationDetails}>Dosage: 10mg</Text>
            <Text style={styles.medicationDetails}>Frequency: Twice daily</Text>
            <TouchableOpacity style={styles.markAsTakenButton}>
              <Text style={styles.markAsTakenText}>Mark as Taken</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MedicationDetails')}>
          <View style={styles.medicationItem}>
            <Text style={styles.medicationName}>Medication Name</Text>
            <Text style={styles.medicationDetails}>Dosage: 20mg</Text>
            <Text style={styles.medicationDetails}>Frequency: Once daily</Text>
            <TouchableOpacity style={styles.markAsTakenButton}>
              <Text style={styles.markAsTakenText}>Mark as Taken</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Tension Tracking Tab</Text>
        <View style={styles.tensionItem}>
          <Text style={styles.tensionDetails}>Highest Tension Level: 145</Text>
          <TouchableOpacity style={styles.addEntryButton}>
            <Text style={styles.addEntryText}>Add new entry</Text>
          </TouchableOpacity>
        </View>
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
