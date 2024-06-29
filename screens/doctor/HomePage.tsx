import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export function DoctorHomePage({navigation}: {navigation: any}) {
  function handleNavigate(path: string) {
    navigation.navigate(path);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome doctor!</Text>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={require('../../images/Image.png')} />
        </View>
        <Text style={styles.text}>Add a medication program</Text>
        <View style={styles.stepperContainer}>
          <View style={styles.stepperItem} />
          <View style={styles.stepperItem} />
          <View style={styles.stepperItem} />
          <View style={styles.stepperItem} />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>Quick setup</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('AddPatient')}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.header}>Patients overview</Text>
        <View style={styles.footerCard}>
          <View style={styles.footerItem}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleNavigate('PatientList')}>
              <Icon name="account-multiple" color={'white'} size={30} />
            </TouchableOpacity>
            <Text>Patient list</Text>
          </View>
          <View style={styles.footerItem}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleNavigate('DoctorProfile')}>
              <Icon name="account-details" color={'white'} size={30} />
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
    marginTop: 70,
  },
  card: {
    borderWidth: 1,
    borderColor: '#858585',
    padding: 16,
    borderRadius: 24,
    display: 'flex',
    gap: 12,
    marginHorizontal: 12,
  },
  imageContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 24,
    padding: 8,
  },
  stepperContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '23%',
    gap: 8,
  },
  stepperItem: {
    backgroundColor: '#858585',
    height: 6,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    verticalAlign: 'middle',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 30,
    paddingVertical: 4,
  },
  buttonText: {
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
    paddingBottom: 100,
  },
  footerItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#858585',
    padding: 16,
    borderRadius: 24,
    flex: 1,
  },
  icon: {
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
  },
});
