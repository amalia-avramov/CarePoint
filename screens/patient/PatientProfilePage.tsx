import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function PatientProfilePage({ navigation }: { navigation: any }) {
  function handleNavigate(path: string) {
    navigation.navigate(path);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('PatientHomePage')}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={require('../../images/no-profile-picture.png')} style={styles.image} />
        </View>
        <Text style={styles.profileName}>Patient Profile</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.buttonText}>View Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statisticsButton}>
            <Text style={styles.buttonText}>Statistics</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.detailText}>Blood Type: O</Text>
          <Text style={styles.detailText}>Weight: 78 kg</Text>
          <Text style={styles.detailText}>Height: 182 cm</Text>
          <Text style={styles.detailText}>Allergies: Shellfish</Text>
        </View>
        <View style={styles.emergencyContact}>
          <Text style={styles.emergencyHeader}>Emergency Contact</Text>
          <View style={styles.contactRow}>
            <View style={styles.contactItem}>
              <Text style={styles.contactText}>1</Text>
              <Text style={styles.contactLabel}>Father</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactText}>2</Text>
              <Text style={styles.contactLabel}>Sibling</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.viewMedicationButton} onPress={() => handleNavigate('Medication')}>
          <Text style={styles.buttonText}>View Medication</Text>
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
});
