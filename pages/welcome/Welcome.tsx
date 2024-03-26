import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      <View style={styles.sectionIcon}>
        <Icon name="message-plus" size={30} color={'white'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
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
});
