import {Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function PatientProfile({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {userId} = route?.params;
  return (
    <SafeAreaView>
      <Text>Patient {userId}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('PatientList')}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
