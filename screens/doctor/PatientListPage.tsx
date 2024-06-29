import {Button, StyleSheet, Text, View} from 'react-native';

export function PatientList({navigation}: {navigation: any}) {
  return (
    <View style={styles.container}>
      <Text>Patient list</Text>
      <PatientListItem onClick={() => navigation.navigate('DoctorHome')} />
    </View>
  );
}

function PatientListItem({onClick}: {onClick: () => void}) {
  return (
    <View>
      <Button title="Back" onPress={onClick}></Button>
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
