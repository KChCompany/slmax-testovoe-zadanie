import { Platform, Text, useColorScheme, View } from "react-native";
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import {BackgroundSvg} from './background';

export const Header = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View
      style={{
        display: 'flex',
        width: '100%',
        height: 200,
      }}>
      <BackgroundSvg />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center'
        }}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 28,
            fontFamily: 'Raleway-SemiBold',
            lineHeight: 32.87,
          }}>
          Заметки
        </Text>
      </View>
    </View>
  );
};
