import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface WorldMapSVGProps {
  width: number;
  height: number;
}

export default function WorldMapSVG({ width, height }: WorldMapSVGProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 500">
      <Defs>
        <LinearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#B8D4E3" />
          <Stop offset="50%" stopColor="#A5C9DD" />
          <Stop offset="100%" stopColor="#92BED7" />
        </LinearGradient>
        <LinearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#E8D5B7" />
          <Stop offset="50%" stopColor="#DCC9A8" />
          <Stop offset="100%" stopColor="#D0BD99" />
        </LinearGradient>
      </Defs>
      
      {/* Océan de fond */}
      <Path
        d="M0 0 L1000 0 L1000 500 L0 500 Z"
        fill="url(#oceanGradient)"
      />
      
      {/* Amérique du Nord */}
      <Path
        d="M50 80 Q80 60, 120 70 Q160 65, 200 80 Q220 90, 240 110 Q250 130, 245 150 Q240 170, 220 180 Q200 185, 180 175 Q160 170, 140 175 Q120 180, 100 170 Q80 160, 70 140 Q60 120, 50 100 Z"
        fill="url(#landGradient)"
        stroke="#C4A882"
        strokeWidth="1"
      />
      
      {/* Amérique du Sud */}
      <Path
        d="M180 200 Q200 190, 220 200 Q240 210, 250 230 Q260 250, 255 280 Q250 310, 240 340 Q230 370, 220 390 Q210 400, 200 395 Q190 390, 185 380 Q180 360, 175 340 Q170 320, 165 300 Q160 280, 165 260 Q170 240, 175 220 Z"
        fill="url(#landGradient)"
        stroke="#C4A882"
        strokeWidth="1"
      />
      
      {/* Europe */}
      <Path
        d="M420 90 Q450 85, 480 90 Q510 95, 530 110 Q540 120, 535 135 Q530 150, 520 160 Q510 165, 500 160 Q490 155, 480 150 Q470 145, 460 140 Q450 135, 440 130 Q430 120, 425 110 Q420 100, 420 90 Z"
        fill="url(#landGradient)"
        stroke="#C4A882"
        strokeWidth="1"
      />
      
      {/* Afrique */}
      <Path
        d="M450 170 Q480 165, 510 175 Q540 185, 560 210 Q570 240, 565 270 Q560 300, 550 330 Q540 360, 525 380 Q510 395, 495 390 Q480 385, 470 375 Q460 360, 455 340 Q450 320, 445 300 Q440 280, 435 260 Q430 240, 435 220 Q440 200, 445 180 Z"
        fill="url(#landGradient)"
        stroke="#C4A882"
        strokeWidth="1"
      />
      
      {/* Asie */}
      <Path
        d="M550 80 Q600 75, 650 85 Q700 95, 750 110 Q800 125, 830 150 Q850 175, 845 200 Q840 225, 825 240 Q810 250, 795 245 Q780 240, 765 235 Q750 230, 735 225 Q720 220, 705 215 Q690 210, 675 205 Q660 200, 645 195 Q630 190, 615 185 Q600 180, 585 175 Q570 170, 560 160 Q550 150, 545 135 Q540 120, 545 105 Q550 90, 550 80 Z"
        fill="url(#landGradient)"
        stroke="#C4A882"
        strokeWidth="1"
      />
      
      {/* Australie */}
      <Path
        d="M720 350 Q760 345, 800 355 Q830 365, 850 380 Q860 390, 855 405 Q850 420, 835 425 Q820 430, 805 425 Q790 420, 775 415 Q760 410, 745 405 Q730 400, 720 390 Q715 380, 715 370 Q715 360, 720 350 Z"
        fill="url(#landGradient)"
        stroke="#C4A882"
        strokeWidth="1"
      />
      
      {/* Groenland */}
      <Path
        d="M320 40 Q340 35, 360 45 Q370 55, 365 70 Q360 80, 350 85 Q340 90, 330 85 Q320 80, 315 70 Q310 60, 315 50 Q320 45, 320 40 Z"
        fill="url(#landGradient)"
        stroke="#C4A882"
        strokeWidth="1"
      />
      
      {/* Îles du Pacifique */}
      <Path d="M850 280 Q855 275, 860 280 Q865 285, 860 290 Q855 295, 850 290 Z" fill="url(#landGradient)" />
      <Path d="M880 320 Q885 315, 890 320 Q895 325, 890 330 Q885 335, 880 330 Z" fill="url(#landGradient)" />
      
      {/* Îles des Caraïbes */}
      <Path d="M220 160 Q225 155, 230 160 Q235 165, 230 170 Q225 175, 220 170 Z" fill="url(#landGradient)" />
      <Path d="M240 165 Q245 160, 250 165 Q255 170, 250 175 Q245 180, 240 175 Z" fill="url(#landGradient)" />
      
      {/* Madagascar */}
      <Path
        d="M580 320 Q590 315, 595 325 Q600 335, 595 345 Q590 355, 585 350 Q580 345, 575 335 Q570 325, 575 320 Q580 315, 580 320 Z"
        fill="url(#landGradient)"
        stroke="#C4A882"
        strokeWidth="0.5"
      />
      
      {/* Japon */}
      <Path
        d="M820 180 Q830 175, 835 185 Q840 195, 835 205 Q830 210, 825 205 Q820 200, 815 190 Q810 180, 815 175 Q820 170, 820 180 Z"
        fill="url(#landGradient)"
        stroke="#C4A882"
        strokeWidth="0.5"
      />
      
      {/* Nouvelle-Zélande */}
      <Path d="M870 420 Q875 415, 880 425 Q885 435, 880 440 Q875 445, 870 440 Z" fill="url(#landGradient)" />
      <Path d="M875 450 Q880 445, 885 455 Q890 465, 885 470 Q880 475, 875 470 Z" fill="url(#landGradient)" />
    </Svg>
  );
}