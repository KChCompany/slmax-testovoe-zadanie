import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BackgroundSvg} from './background';

export const Header = () => {
  return (
    <View style={styles.container}>
      <BackgroundSvg />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Заметки</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: 200,
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Raleway-SemiBold',
    lineHeight: 32.87,
  },
});
