import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
import { MapPin } from 'lucide-react-native';

interface Location {
  id: string;
  name: string;
  country: string;
  x: number; // Position X sur la carte (0-100%)
  y: number; // Position Y sur la carte (0-100%)
  status: 'visited' | 'toVisit' | 'favorite';
  date?: string;
  description?: string;
}

const { width, height } = Dimensions.get('window');
const mapWidth = width - 48;
const mapHeight = 300;

export default function SimpleMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const locations: Location[] = [
    {
      id: '1',
      name: 'Paris',
      country: 'France',
      x: 52,
      y: 25,
      status: 'visited',
      date: 'Juin 2024',
      description: 'Magnifique weekend dans la ville lumière'
    },
    {
      id: '2',
      name: 'Bangkok',
      country: 'Thaïlande',
      x: 75,
      y: 60,
      status: 'visited',
      date: 'Juillet 2024',
      description: 'Aventure incroyable en Asie du Sud-Est'
    },
    {
      id: '3',
      name: 'Tokyo',
      country: 'Japon',
      x: 85,
      y: 45,
      status: 'toVisit',
      description: 'Prochaine destination pour découvrir la culture japonaise'
    },
    {
      id: '4',
      name: 'New York',
      country: 'États-Unis',
      x: 25,
      y: 35,
      status: 'toVisit',
      description: 'La grosse pomme m\'attend !'
    },
    {
      id: '5',
      name: 'Sydney',
      country: 'Australie',
      x: 90,
      y: 85,
      status: 'favorite',
      date: 'Août 2023',
      description: 'Couchers de soleil inoubliables'
    },
  ];

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'visited':
        return '#D2691E';
      case 'toVisit':
        return '#8FBC8F';
      case 'favorite':
        return '#FFD700';
      default:
        return '#D2691E';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'visited':
        return 'Visité';
      case 'toVisit':
        return 'À visiter';
      case 'favorite':
        return 'Favori';
      default:
        return '';
    }
  };

  // Forme simplifiée du monde
  const worldPath = `
    M 50 20 
    Q 20 10, 10 30
    Q 5 50, 15 70
    Q 30 85, 50 80
    Q 70 85, 85 70
    Q 95 50, 90 30
    Q 80 10, 50 20
    Z
  `;

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Svg width={mapWidth} height={mapHeight} viewBox="0 0 100 100">
          {/* Fond de la carte */}
          <Circle cx="50" cy="50" r="45" fill="#E8F4FD" stroke="#B3D9F2" strokeWidth="0.5" />
          
          {/* Forme du monde simplifiée */}
          <Path d={worldPath} fill="#C8E6C9" stroke="#81C784" strokeWidth="0.3" />
          
          {/* Marqueurs des destinations */}
          {locations.map((location) => (
            <Circle
              key={location.id}
              cx={location.x}
              cy={location.y}
              r="2"
              fill={getMarkerColor(location.status)}
              stroke="#FFFFFF"
              strokeWidth="0.5"
              onPress={() => setSelectedLocation(location)}
            />
          ))}
          
          {/* Labels des villes */}
          {locations.map((location) => (
            <SvgText
              key={`label-${location.id}`}
              x={location.x}
              y={location.y - 3}
              fontSize="3"
              fill="#5D4E37"
              textAnchor="middle"
              fontWeight="600"
            >
              {location.name}
            </SvgText>
          ))}
        </Svg>

        {/* Overlay d'informations */}
        {selectedLocation && (
          <View style={styles.locationInfo}>
            <View style={styles.locationCard}>
              <View style={styles.locationHeader}>
                <View>
                  <Text style={styles.locationName}>{selectedLocation.name}</Text>
                  <Text style={styles.locationCountry}>{selectedLocation.country}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getMarkerColor(selectedLocation.status) }
                ]}>
                  <Text style={styles.statusText}>
                    {getStatusText(selectedLocation.status)}
                  </Text>
                </View>
              </View>
              
              {selectedLocation.date && (
                <Text style={styles.locationMeta}>
                  {selectedLocation.date}
                </Text>
              )}
              
              <Text style={styles.locationDescription}>
                {selectedLocation.description}
              </Text>
              
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedLocation(null)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Liste des destinations */}
      <ScrollView style={styles.locationsList} horizontal showsHorizontalScrollIndicator={false}>
        {locations.map((location) => (
          <TouchableOpacity
            key={location.id}
            style={[
              styles.locationChip,
              selectedLocation?.id === location.id && styles.selectedChip
            ]}
            onPress={() => setSelectedLocation(location)}
          >
            <View style={[
              styles.chipDot,
              { backgroundColor: getMarkerColor(location.status) }
            ]} />
            <Text style={[
              styles.chipText,
              selectedLocation?.id === location.id && styles.selectedChipText
            ]}>
              {location.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Légende */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Légende</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#D2691E' }]} />
            <Text style={styles.legendText}>Visité</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#8FBC8F' }]} />
            <Text style={styles.legendText}>À visiter</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFD700' }]} />
            <Text style={styles.legendText}>Favori</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 24,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
  },
  locationInfo: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5D4E37',
    marginBottom: 2,
  },
  locationCountry: {
    fontSize: 14,
    color: '#8B7355',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  locationMeta: {
    fontSize: 12,
    color: '#8B7355',
    marginBottom: 6,
  },
  locationDescription: {
    fontSize: 12,
    color: '#5D4E37',
    lineHeight: 16,
    marginBottom: 12,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F4E6D7',
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#D2691E',
    fontSize: 12,
    fontWeight: '600',
  },
  locationsList: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4E6D7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: '#D2691E',
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#5D4E37',
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  legend: {
    backgroundColor: '#FFFFFF',
    margin: 24,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5D4E37',
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#8B7355',
  },
});