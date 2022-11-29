import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

export const BackgroundSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 1228 590"
    preserveAspectRatio="none"
    {...props}>
    <G id="\u0421\u043B\u043E\u0439_x0020_1">
      <Path
        d="M-1 0h1228v401s-254-6-577 84C248 597-1 591-1 591V1z"
        fill="#82c8de"
        fillRule="nonzero"
      />
      <Path
        d="M1227 0H-1v401s258 0 581 89c402 111 647 100 647 100V0z"
        fill="#10637d"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);
