import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthState } from '../authentication/useAuthState';

export function PatientHomePage({ navigation }: { navigation: any }) {
  const currentUser = useAuthState();
  
  function handleNavigate(path: string) {
    navigation.navigate(path);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, Patient!</Text>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={require('../../images/Image.png')} style={styles.image} />
        </View>
        <Text style={styles.trackText}>Track your progress</Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFilled} />
          <View style={styles.progressBarEmpty} />
        </View>
        <View style={styles.trackContainer}>
          <Text style={styles.trackLabel}>Stay updated on your health</Text>
          <TouchableOpacity style={styles.trackButton}>
            <Text style={styles.trackButtonText}>Track</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.header}>Overview</Text>
        <View style={styles.footerCard}>
          <View style={styles.footerItem}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Medication', {patientId: currentUser?.uid})}>
              <Icon name="pill" color={'white'} size={30} />
            </TouchableOpacity>
            <Text>Medication</Text>
          </View>
          <View style={styles.footerItem}>
            <TouchableOpacity style={styles.icon} onPress={() => handleNavigate('PatientProfilePage')}>
              <Icon name="account" color={'white'} size={30} />
            </TouchableOpacity>
            <Text>Account</Text>
          </View>
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
    gap: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: '700',
    lineHeight: 32,
    fontSize: 24,
    marginHorizontal: 24,
    marginTop: 40,
  },
  card: {
    borderWidth: 1,
    borderColor: '#858585',
    padding: 16,
    borderRadius: 24,
    display: 'flex',
    gap: 12,
    marginHorizontal: 12,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 24,
    padding: 8,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 24,
  },
  trackText: {
    fontSize: 18,
    fontWeight: '700',
  },
  progressBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFilled: {
    backgroundColor: '#000',
    width: '50%',
  },
  progressBarEmpty: {
    backgroundColor: '#eee',
    flex: 1,
  },
  trackContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  trackLabel: {
    fontSize: 16,
    fontWeight: '400',
  },
  trackButton: {
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  upgradeButton: {
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 16,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footerContainer: {
    justifyContent: 'flex-end',
    marginTop: 'auto',
    gap: 12,
  },
  footerCard: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 24,
    borderWidth: 1,
    borderColor: '#858585',
    padding: 16,
    borderRadius: 24,
    paddingBottom: 40,
    marginHorizontal: 12,
  },
  footerItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  icon: {
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
  },
});
