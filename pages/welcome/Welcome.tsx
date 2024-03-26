import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export function Welcome(): React.JSX.Element {
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
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    display: 'flex',
    gap: 32,
  },
  sectionTitle: {
    color: '#101010',
    fontSize: 40,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    lineHeight: 52,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 18,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    textAlign: 'center',
  },
  sectionImage: {
    width: 300,
    height: 300,
  },
});
