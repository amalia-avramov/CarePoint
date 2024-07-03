import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function AnalysisPage({ navigation }: { navigation: any }) {
  function handleNavigate(path: string) {
    navigation.navigate(path);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Medication')}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Image source={require('../../images/no-profile-picture.png')} style={styles.doctorImage} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.doctorName}>Doctor: John Doe</Text>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderText}>Diagnosis: XYZ</Text>
            <Text style={styles.subHeaderText}>Date: 12/03/2024</Text>
          </View>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Text style={styles.inactiveTab} onPress={() => handleNavigate('MedicationDetails')}>Medicine</Text>
        <Text style={styles.activeTab}>Analysis</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionHeader}>Temperature Analysis</Text>
        <View style={styles.analysisItem}>
          <Text style={styles.analysisName}>Temperature</Text>
          <Text style={styles.analysisDetails}>Frequency: Daily</Text>
          <Text style={styles.analysisDetails}>Hours: Morning and Evening</Text>
        </View>
        <Text style={styles.sectionHeader}>Blood Pressure Analysis</Text>
        <View style={styles.analysisItem}>
          <Text style={styles.analysisName}>Blood Pressure</Text>
          <Text style={styles.analysisDetails}>Frequency: Weekly</Text>
          <Text style={styles.analysisDetails}>Hours: Afternoon</Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionHeader}>Other Required Analysis</Text>
        <View style={styles.analysisItem}>
          <Text style={styles.analysisName}>Analysis Name</Text>
          <Text style={styles.analysisDetails}>Frequency: Frequency</Text>
          <Text style={styles.analysisDetails}>Hours: Hours</Text>
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
    width: 50,
    height: 50,
    borderRadius: 25,
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  analysisItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  analysisName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  analysisDetails: {
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
