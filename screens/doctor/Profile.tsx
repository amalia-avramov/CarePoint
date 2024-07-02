import {Button, StyleSheet, Text, View} from 'react-native';
import {signOut} from '../authentication/firebaseConfig';

export function Profile({navigation}: {navigation: any}) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button onPress={() => navigation.navigate('DoctorHome')} title="Back" />
      <Button
        onPress={() => {
          signOut();
          navigation.navigate('Login');
        }}
        title="Sign out"
      />
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
});
