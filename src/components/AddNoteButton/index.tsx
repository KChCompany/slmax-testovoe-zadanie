import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import { TouchableOpacity, useColorScheme } from "react-native";

interface Props {
  onPress: any;
}

export const AddNoteButton: React.FC<Props> = ({onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableOpacity onPress={onPress} style={{ justifyContent: 'center'}}>
      <Svg
        width={40}
        height={45}
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M10.74 16.845l3.52-3.829-3.52-3.829"
          stroke={isDarkMode ? '#ffffff' : '#000000'}
          strokeWidth={0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};
