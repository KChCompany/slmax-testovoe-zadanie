import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ShowNoteButton = () => {
  return (
    <Svg
      width={27}
      height={24}
      viewBox="0 0 27 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10.139 10.74l3.828 3.52 3.83-3.52"
        stroke="#000"
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
