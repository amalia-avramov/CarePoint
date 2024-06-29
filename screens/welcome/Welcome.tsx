import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const WelcomePage: React.FC<{navigation: any}> = ({navigation}) => {
  const handleStart = async () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>CarePoint</Text>
      <Text style={styles.sectionDescription}>
        Enhance doctor-patient communication
      </Text>
      <Image
        source={require('../../images/welcome.png')}
        style={styles.sectionImage}
      />
      <TouchableOpacity onPress={handleStart} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 64,
    paddingHorizontal: 24,
    justifyContent: 'center',
    display: 'flex',
    gap: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#101010',
    fontSize: 40,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    lineHeight: 52,
  },
  sectionDescription: {
    fontSize: 18,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
  },
  sectionImage: {
    marginTop: 64,
    width: 300,
    height: 300,
  },
  sectionIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    marginTop: 64,
    backgroundColor: 'black',
    borderRadius: 28,
    height: 56,
    width: 56,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WelcomePage;
