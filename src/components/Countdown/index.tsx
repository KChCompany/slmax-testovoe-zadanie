import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  onStop: () => void;
}

export const Countdown: React.FC<Props> = ({onStop}) => {
  const [count, setCount] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevState => {
        if (prevState === 0) {
          clearInterval(interval);
          setTimeout(async () => {
            onStop();
          }, 100);
          return 0;
        }
        return prevState - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <View style={{marginVertical: 5}}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        imageRendering="optimizeQuality"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        viewBox="0 0 295 295"
        fill={'#fff'}>
        <Path d="M271 148c0-63-49-125-125-125-62 0-92 46-105 70-13 17-13 20-28 22-6 0-11-5-11-11V37c0-6 5-11 11-11s11 5 11 11v40C40 49 76 0 146 0c90 0 148 74 148 148s-57 148-148 148c-43 0-79-17-105-43-14-14-24-30-32-48-2-6 0-12 6-14s12 0 14 6c6 15 15 29 27 41 22 22 52 36 89 36 76 0 125-62 125-125z" />
      </Svg>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Raleway-SemiBold',
          lineHeight: 16,
          color: '#ffffff',
          textAlign: 'center',
          width: '100%',
          marginTop: 3,
          position: 'absolute',
        }}>
        {count}
      </Text>
    </View>
  );
};
