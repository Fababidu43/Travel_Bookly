import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import Svg, { 
  Circle, 
  Path, 
  Text as SvgText, 
  Defs, 
  LinearGradient as SvgLinearGradient, 
  Stop,
  G,
  Polygon
} from 'react-native-svg';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const mapWidth = width - 48;
const mapHeight = 400;

interface Location {
  id: string;
  name: string;
  country: string;
  x: number;
  y: number;
  status: 'visited' | 'toVisit' | 'favorite';
  temp?: number;
  weather?: string;
  description?: string;
}

export default function MapsScreen() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const locations: Location[] = [
    {
      id: 'paris',
      name: 'Paris',
      country: 'France',
      x: 52,
      y: 25,
      status: 'visited',
      temp: 22,
      weather: 'Ensoleillé',
      description: 'Ville lumière avec la Tour Eiffel',
    },
    {
      id: 'bangkok',
      name: 'Bangkok',
      country: 'Thaïlande',
      x: 75,
      y: 60,
      status: 'visited',
      temp: 34,
      weather: 'Ensoleillé',
      description: 'Temples dorés et street food',
    },
    {
      id: 'tokyo',
      name: 'Tokyo',
      country: 'Japon',
      x: 85,
      y: 45,
      status: 'toVisit',
      temp: 18,
      weather: 'Nuageux',
      description: 'Modernité et traditions',
    },
    {
      id: 'newyork',
      name: 'New York',
      country: 'États-Unis',
      x: 25,
      y: 35,
      status: 'toVisit',
      temp: 15,
      weather: 'Pluvieux',
      description: 'La grosse pomme',
    },
    {
      id: 'sydney',
      name: 'Sydney',
      country: 'Australie',
      x: 90,
      y: 85,
      status: 'favorite',
      temp: 25,
      weather: 'Ensoleillé',
      description: 'Opéra et plages magnifiques',
    },
    {
      id: 'bali',
      name: 'Bali',
      country: 'Indonésie',
      x: 80,
      y: 75,
      status: 'visited',
      temp: 30,
      weather: 'Tropical',
      description: 'Paradis tropical',
    },
  ];

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'visited':
        return Colors.visited;
      case 'toVisit':
        return Colors.toVisit;
      case 'favorite':
        return Colors.favorite;
      default:
        return Colors.textTertiary;
    }
  };

  const getWeatherEmoji = (weather: string) => {
    switch (weather?.toLowerCase()) {
      case 'ensoleillé':
        return '☀️';
      case 'nuageux':
        return '☁️';
      case 'pluvieux':
        return '🌧️';
      case 'tropical':
        return '🌴';
      default:
        return '🌤️';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Cartes</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Interactive Map */}
        <View style={styles.mapContainer}>
          <Svg width={mapWidth} height={mapHeight} viewBox="0 0 100 100">
            <Defs>
              <SvgLinearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#E8F4FD" />
                <Stop offset="50%" stopColor="#D1E7F8" />
                <Stop offset="100%" stopColor="#B8D9F3" />
              </SvgLinearGradient>
              <SvgLinearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#F5E6D3" />
                <Stop offset="50%" stopColor="#E8D5B7" />
                <Stop offset="100%" stopColor="#DCC9A8" />
              </SvgLinearGradient>
            </Defs>
            
            {/* Ocean background */}
            <Circle cx="50" cy="50" r="48" fill="url(#oceanGradient)" />
            
            {/* Continents - simplified world map */}
            {/* North America */}
            <Path 
              d="M 15 25 Q 35 20, 40 40 Q 35 45, 25 42 Q 18 35, 15 25 Z" 
              fill="url(#landGradient)" 
              stroke="#C4A882" 
              strokeWidth="0.3" 
            />
            
            {/* South America */}
            <Path 
              d="M 25 50 Q 35 48, 38 65 Q 35 75, 28 70 Q 22 60, 25 50 Z" 
              fill="url(#landGradient)" 
              stroke="#C4A882" 
              strokeWidth="0.3" 
            />
            
            {/* Europe */}
            <Path 
              d="M 45 20 Q 55 18, 60 25 Q 58 30, 52 28 Q 48 25, 45 20 Z" 
              fill="url(#landGradient)" 
              stroke="#C4A882" 
              strokeWidth="0.3" 
            />
            
            {/* Africa */}
            <Path 
              d="M 45 35 Q 58 33, 60 55 Q 55 70, 48 65 Q 42 50, 45 35 Z" 
              fill="url(#landGradient)" 
              stroke="#C4A882" 
              strokeWidth="0.3" 
            />
            
            {/* Asia */}
            <Path 
              d="M 65 20 Q 85 15, 90 35 Q 88 50, 80 45 Q 70 40, 65 20 Z" 
              fill="url(#landGradient)" 
              stroke="#C4A882" 
              strokeWidth="0.3" 
            />
            
            {/* Australia */}
            <Path 
              d="M 80 75 Q 92 73, 95 85 Q 90 88, 85 85 Q 78 80, 80 75 Z" 
              fill="url(#landGradient)" 
              stroke="#C4A882" 
              strokeWidth="0.3" 
            />

            {/* Decorative elements */}
            <G opacity="0.6">
              {/* Palm trees */}
              <SvgText x="20" y="70" fontSize="3" fill="#8FBC8F">🌴</SvgText>
              <SvgText x="85" y="80" fontSize="3" fill="#8FBC8F">🌴</SvgText>
              
              {/* Airplane */}
              <Polygon points="70,15 72,14 74,15 72,16" fill={Colors.primary} />
            </G>
            
            {/* Location markers */}
            {locations.map((location) => (
              <G key={location.id}>
                {/* Marker circle */}
                <Circle
                  cx={location.x}
                  cy={location.y}
                  r={selectedLocation?.id === location.id ? "4" : "3"}
                  fill={getMarkerColor(location.status)}
                  stroke={Colors.surface}
                  strokeWidth="1"
                  onPress={() => setSelectedLocation(location)}
                  opacity={selectedLocation?.id === location.id ? 1 : 0.9}
                />
                
                {/* Star for favorites */}
                {location.status === 'favorite' && (
                  <Polygon
                    points={`${location.x},${location.y-1.5} ${location.x+0.5},${location.y-0.5} ${location.x+1.5},${location.y-0.5} ${location.x+0.7},${location.y+0.2} ${location.x+1},${location.y+1} ${location.x},${location.y+0.5} ${location.x-1},${location.y+1} ${location.x-0.7},${location.y+0.2} ${location.x-1.5},${location.y-0.5} ${location.x-0.5},${location.y-0.5}`}
                    fill={Colors.surface}
                    opacity="0.9"
                  />
                )}
              </G>
            ))}
          </Svg>

          {/* Location info popup */}
          {selectedLocation && (
            <View style={styles.locationPopup}>
              <View style={styles.popupContent}>
                <Text style={styles.popupTitle}>{selectedLocation.name}</Text>
                <Text style={styles.popupTemp}>
                  {selectedLocation.temp}°C {getWeatherEmoji(selectedLocation.weather || '')} {selectedLocation.weather}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.visited }]} />
            <Text style={styles.legendText}>Visité</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.toVisit }]} />
            <Text style={styles.legendText}>À visiter</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.favorite }]} />
            <Text style={styles.legendText}>Favori</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  mapContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    margin: 24,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
  },
  locationPopup: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  popupContent: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  popupTemp: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
});