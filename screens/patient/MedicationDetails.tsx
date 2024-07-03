import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function MedicationDetails({ navigation }: { navigation: any }) {
  function handleNavigate(path: string) {
    navigation.navigate(path);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Medication')}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Icon name="account" size={50} style={styles.doctorImage} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.doctorName}>Doctor: John Doe</Text>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderText}>Diagnosis: XYZ</Text>
            <Text style={styles.subHeaderText}>Date: 12/03/2024</Text>
          </View>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Text style={styles.activeTab}>Medicine</Text>
        <Text style={styles.inactiveTab} onPress={() => navigation.navigate('AnalysisPage')}>Analysis</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.medicationItem}>
          <Text style={styles.medicationName}>Paracetamol</Text>
          <Text style={styles.medicationDetails}>Frequency: 3 times a day</Text>
          <Text style={styles.medicationDetails}>Time: 9:00 AM, 1:00 PM, 6:00 PM</Text>
        </View>
        <View style={styles.medicationItem}>
          <Text style={styles.medicationName}>Lisinopril</Text>
          <Text style={styles.medicationDetails}>Frequency: Once a day</Text>
          <Text style={styles.medicationDetails}>Time: 8:00 AM</Text>
        </View>
        <View style={styles.medicationItem}>
          <Text style={styles.medicationName}>Atorvastatin</Text>
          <Text style={styles.medicationDetails}>Frequency: Once a day</Text>
          <Text style={styles.medicationDetails}>Time: 10:00 PM</Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.medicationItem}>
          <Text style={styles.medicationName}>Metformin</Text>
          <Text style={styles.medicationDetails}>Frequency: Twice a day</Text>
          <Text style={styles.medicationDetails}>Time: 8:00 AM, 8:00 PM</Text>
        </View>
        <View style={styles.medicationItem}>
          <Text style={styles.medicationName}>Omeprazole</Text>
          <Text style={styles.medicationDetails}>Frequency: Once a day</Text>
          <Text style={styles.medicationDetails}>Time: 9:00 AM</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  doctorImage: {
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
  },
  subHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#555',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  activeTab: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  inactiveTab: {
    fontSize: 16,
    color: '#aaa',
  },
  contentContainer: {
    padding: 16,
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
  upgradeButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
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
