import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
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
import { MapPin, Heart, Clock, CircleCheck as CheckCircle, Star, Plane } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface Location {
  id: string;
  name: string;
  country: string;
  x: number;
  y: number;
  status: 'visited' | 'toVisit' | 'favorite';
  date?: string;
  description?: string;
  rating?: number;
  temperature?: string;
  weather?: string;
}

const { width } = Dimensions.get('window');
const mapWidth = width - 32;
const mapHeight = 400;

export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'visited' | 'toVisit' | 'favorite'>('all');

  const locations: Location[] = [
    {
      id: '1',
      name: 'Paris',
      country: 'France',
      x: 52,
      y: 25,
      status: 'visited',
      date: 'Juin 2024',
      description: 'Magnifique weekend dans la ville lumière avec visite de la Tour Eiffel',
      rating: 5,
      temperature: '22°C',
      weather: 'Ensoleillé'
    },
    {
      id: '2',
      name: 'Bangkok',
      country: 'Thaïlande',
      x: 75,
      y: 60,
      status: 'visited',
      date: 'Juillet 2024',
      description: 'Aventure incroyable en Asie du Sud-Est, temples magnifiques',
      rating: 5,
      temperature: '34°C',
      weather: 'Ensoleillé'
    },
    {
      id: '3',
      name: 'Tokyo',
      country: 'Japon',
      x: 85,
      y: 45,
      status: 'toVisit',
      description: 'Prochaine destination pour découvrir la culture japonaise',
      temperature: '18°C',
      weather: 'Nuageux'
    },
    {
      id: '4',
      name: 'New York',
      country: 'États-Unis',
      x: 25,
      y: 35,
      status: 'toVisit',
      description: 'La grosse pomme m\'attend ! Central Park et Broadway',
      temperature: '15°C',
      weather: 'Pluvieux'
    },
    {
      id: '5',
      name: 'Sydney',
      country: 'Australie',
      x: 90,
      y: 85,
      status: 'favorite',
      date: 'Août 2023',
      description: 'Couchers de soleil inoubliables à l\'Opéra de Sydney',
      rating: 5,
      temperature: '25°C',
      weather: 'Ensoleillé'
    },
    {
      id: '6',
      name: 'Rome',
      country: 'Italie',
      x: 55,
      y: 35,
      status: 'favorite',
      date: 'Mai 2024',
      description: 'Histoire antique et cuisine délicieuse, le Colisée était magique',
      rating: 5,
      temperature: '26°C',
      weather: 'Ensoleillé'
    },
    {
      id: '7',
      name: 'Bali',
      country: 'Indonésie',
      x: 80,
      y: 75,
      status: 'visited',
      date: 'Mars 2024',
      description: 'Plages paradisiaques et temples hindous',
      rating: 4,
      temperature: '30°C',
      weather: 'Tropical'
    },
    {
      id: '8',
      name: 'Reykjavik',
      country: 'Islande',
      x: 45,
      y: 15,
      status: 'toVisit',
      description: 'Aurores boréales et sources chaudes naturelles',
      temperature: '5°C',
      weather: 'Froid'
    }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'visited':
        return CheckCircle;
      case 'toVisit':
        return Clock;
      case 'favorite':
        return Heart;
      default:
        return MapPin;
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
      case 'froid':
        return '❄️';
      default:
        return '🌤️';
    }
  };

  const filteredLocations = filterStatus === 'all' 
    ? locations 
    : locations.filter(loc => loc.status === filterStatus);

  const getFilterCount = (status: string) => {
    return locations.filter(loc => loc.status === status).length;
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Handle pan gesture updates
    })
    .onEnd(() => {
      // Handle pan gesture end
    });

  return (
    <View style={styles.container}>
      {/* Filtres */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === 'all' && styles.activeFilter]}
          onPress={() => setFilterStatus('all')}
        >
          <Text style={[styles.filterText, filterStatus === 'all' && styles.activeFilterText]}>
            Tous ({locations.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filterStatus === 'visited' && styles.activeFilter]}
          onPress={() => setFilterStatus('visited')}
        >
          <CheckCircle size={16} color={filterStatus === 'visited' ? Colors.surface : Colors.visited} />
          <Text style={[styles.filterText, filterStatus === 'visited' && styles.activeFilterText]}>
            Visités ({getFilterCount('visited')})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filterStatus === 'toVisit' && styles.activeFilter]}
          onPress={() => setFilterStatus('toVisit')}
        >
          <Clock size={16} color={filterStatus === 'toVisit' ? Colors.surface : Colors.toVisit} />
          <Text style={[styles.filterText, filterStatus === 'toVisit' && styles.activeFilterText]}>
            À visiter ({getFilterCount('toVisit')})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filterStatus === 'favorite' && styles.activeFilter]}
          onPress={() => setFilterStatus('favorite')}
        >
          <Heart size={16} color={filterStatus === 'favorite' ? Colors.surface : Colors.favorite} />
          <Text style={[styles.filterText, filterStatus === 'favorite' && styles.activeFilterText]}>
            Favoris ({getFilterCount('favorite')})
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Carte interactive */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={styles.mapContainer}>
          <Svg width={mapWidth} height={mapHeight} viewBox="0 0 100 100">
            <Defs>
              <SvgLinearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#E3F2FD" />
                <Stop offset="50%" stopColor="#BBDEFB" />
                <Stop offset="100%" stopColor="#90CAF9" />
              </SvgLinearGradient>
              <SvgLinearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#F5DEB3" />
                <Stop offset="50%" stopColor="#DEB887" />
                <Stop offset="100%" stopColor="#D2B48C" />
              </SvgLinearGradient>
              <SvgLinearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#A0522D" />
                <Stop offset="100%" stopColor="#8B4513" />
              </SvgLinearGradient>
            </Defs>
            
            {/* Océan avec vagues */}
            <Circle cx="50" cy="50" r="48" fill="url(#oceanGradient)" stroke="#4FC3F7" strokeWidth="0.5" />
            
            {/* Vagues décoratives */}
            <Path d="M 10 20 Q 15 18, 20 20 Q 25 22, 30 20" stroke="#81D4FA" strokeWidth="0.3" fill="none" opacity="0.6" />
            <Path d="M 70 80 Q 75 78, 80 80 Q 85 82, 90 80" stroke="#81D4FA" strokeWidth="0.3" fill="none" opacity="0.6" />
            
            {/* Continents détaillés */}
            {/* Europe avec détails */}
            <G>
              <Path d="M 45 20 Q 55 18, 60 25 Q 58 30, 52 28 Q 48 25, 45 20 Z" fill="url(#landGradient)" stroke="#CD853F" strokeWidth="0.3" />
              <Path d="M 48 22 Q 50 21, 52 22 Q 51 24, 49 23 Z" fill="url(#mountainGradient)" opacity="0.7" />
            </G>
            
            {/* Asie avec montagnes */}
            <G>
              <Path d="M 65 20 Q 85 15, 90 35 Q 88 50, 80 45 Q 70 40, 65 20 Z" fill="url(#landGradient)" stroke="#CD853F" strokeWidth="0.3" />
              <Path d="M 72 25 Q 78 23, 82 28 Q 80 32, 75 30 Z" fill="url(#mountainGradient)" opacity="0.7" />
              <Path d="M 68 35 Q 72 33, 75 36 Q 73 38, 70 37 Z" fill="url(#mountainGradient)" opacity="0.7" />
            </G>
            
            {/* Amérique du Nord */}
            <G>
              <Path d="M 15 25 Q 35 20, 40 40 Q 35 45, 25 42 Q 18 35, 15 25 Z" fill="url(#landGradient)" stroke="#CD853F" strokeWidth="0.3" />
              <Path d="M 22 30 Q 28 28, 32 32 Q 30 35, 25 33 Z" fill="url(#mountainGradient)" opacity="0.7" />
            </G>
            
            {/* Amérique du Sud */}
            <G>
              <Path d="M 25 50 Q 35 48, 38 65 Q 35 75, 28 70 Q 22 60, 25 50 Z" fill="url(#landGradient)" stroke="#CD853F" strokeWidth="0.3" />
              <Path d="M 28 55 Q 32 53, 34 58 Q 32 62, 29 60 Z" fill="url(#mountainGradient)" opacity="0.7" />
            </G>
            
            {/* Afrique */}
            <G>
              <Path d="M 45 35 Q 58 33, 60 55 Q 55 70, 48 65 Q 42 50, 45 35 Z" fill="url(#landGradient)" stroke="#CD853F" strokeWidth="0.3" />
              <Path d="M 50 45 Q 54 43, 56 48 Q 54 52, 51 50 Z" fill="url(#mountainGradient)" opacity="0.7" />
            </G>
            
            {/* Australie */}
            <G>
              <Path d="M 80 75 Q 92 73, 95 85 Q 90 88, 85 85 Q 78 80, 80 75 Z" fill="url(#landGradient)" stroke="#CD853F" strokeWidth="0.3" />
            </G>

            {/* Îles tropicales */}
            <Circle cx="78" cy="68" r="1.5" fill="url(#landGradient)" stroke="#CD853F" strokeWidth="0.2" />
            <Circle cx="82" cy="70" r="1" fill="url(#landGradient)" stroke="#CD853F" strokeWidth="0.2" />
            
            {/* Avions décoratifs */}
            <G opacity="0.6">
              <Polygon points="30,15 32,14 34,15 32,16" fill="#FF8C00" />
              <Polygon points="70,25 72,24 74,25 72,26" fill="#FF8C00" />
            </G>
            
            {/* Marqueurs des destinations avec animations */}
            {filteredLocations.map((location, index) => (
              <G key={location.id}>
                {/* Cercle de pulsation pour les favoris */}
                {location.status === 'favorite' && (
                  <Circle
                    cx={location.x}
                    cy={location.y}
                    r="5"
                    fill="none"
                    stroke={getMarkerColor(location.status)}
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                )}
                
                {/* Marqueur principal */}
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
                
                {/* Étoile pour les favoris */}
                {location.status === 'favorite' && (
                  <Polygon
                    points={`${location.x},${location.y-1.5} ${location.x+0.5},${location.y-0.5} ${location.x+1.5},${location.y-0.5} ${location.x+0.7},${location.y+0.2} ${location.x+1},${location.y+1} ${location.x},${location.y+0.5} ${location.x-1},${location.y+1} ${location.x-0.7},${location.y+0.2} ${location.x-1.5},${location.y-0.5} ${location.x-0.5},${location.y-0.5}`}
                    fill={Colors.surface}
                    opacity="0.9"
                  />
                )}
              </G>
            ))}
            
            {/* Labels des villes avec fond */}
            {filteredLocations.map((location) => (
              <G key={`label-${location.id}`}>
                <SvgText
                  x={location.x}
                  y={location.y - 6}
                  fontSize="2.5"
                  fill={Colors.text}
                  textAnchor="middle"
                  fontWeight="700"
                  stroke={Colors.surface}
                  strokeWidth="0.3"
                >
                  {location.name}
                </SvgText>
              </G>
            ))}
          </Svg>

          {/* Overlay d'informations amélioré */}
          {selectedLocation && (
            <View style={styles.locationInfo}>
              <View style={[
                styles.locationCard,
                { borderLeftColor: getMarkerColor(selectedLocation.status) }
              ]}>
                <View style={styles.locationHeader}>
                  <View style={styles.locationTitleContainer}>
                    <Text style={styles.locationName}>{selectedLocation.name}</Text>
                    <Text style={styles.locationCountry}>{selectedLocation.country}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getMarkerColor(selectedLocation.status) }
                  ]}>
                    {React.createElement(getStatusIcon(selectedLocation.status), {
                      size: 14,
                      color: Colors.surface
                    })}
                    <Text style={styles.statusText}>
                      {getStatusText(selectedLocation.status)}
                    </Text>
                  </View>
                </View>
                
                {/* Météo et température */}
                {selectedLocation.temperature && (
                  <View style={styles.weatherContainer}>
                    <Text style={styles.weatherText}>
                      {getWeatherEmoji(selectedLocation.weather || '')} {selectedLocation.temperature}
                    </Text>
                    <Text style={styles.weatherDescription}>{selectedLocation.weather}</Text>
                  </View>
                )}

                {selectedLocation.date && (
                  <Text style={styles.locationMeta}>
                    📅 {selectedLocation.date}
                  </Text>
                )}

                {selectedLocation.rating && (
                  <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        color={i < selectedLocation.rating! ? Colors.warning : Colors.textTertiary}
                        fill={i < selectedLocation.rating! ? Colors.warning : 'none'}
                      />
                    ))}
                    <Text style={styles.ratingText}>({selectedLocation.rating}/5)</Text>
                  </View>
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
        </Animated.View>
      </GestureDetector>

      {/* Liste des destinations avec scroll horizontal */}
      <ScrollView style={styles.locationsList} horizontal showsHorizontalScrollIndicator={false}>
        {filteredLocations.map((location) => {
          const StatusIcon = getStatusIcon(location.status);
          return (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.locationChip,
                selectedLocation?.id === location.id && styles.selectedChip,
                { borderLeftColor: getMarkerColor(location.status) }
              ]}
              onPress={() => setSelectedLocation(location)}
            >
              <StatusIcon size={16} color={getMarkerColor(location.status)} />
              <View style={styles.chipContent}>
                <Text style={[
                  styles.chipText,
                  selectedLocation?.id === location.id && styles.selectedChipText
                ]}>
                  {location.name}
                </Text>
                {location.temperature && (
                  <Text style={styles.chipTemp}>
                    {getWeatherEmoji(location.weather || '')} {location.temperature}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Statistiques améliorées */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={[styles.statIconContainer, { backgroundColor: `${Colors.visited}20` }]}>
            <CheckCircle size={20} color={Colors.visited} />
          </View>
          <Text style={styles.statNumber}>{getFilterCount('visited')}</Text>
          <Text style={styles.statLabel}>Visités</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statIconContainer, { backgroundColor: `${Colors.toVisit}20` }]}>
            <Clock size={20} color={Colors.toVisit} />
          </View>
          <Text style={styles.statNumber}>{getFilterCount('toVisit')}</Text>
          <Text style={styles.statLabel}>À visiter</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statIconContainer, { backgroundColor: `${Colors.favorite}20` }]}>
            <Heart size={20} color={Colors.favorite} />
          </View>
          <Text style={styles.statNumber}>{getFilterCount('favorite')}</Text>
          <Text style={styles.statLabel}>Favoris</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filtersContent: {
    paddingRight: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilter: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 6,
  },
  activeFilterText: {
    color: Colors.surface,
  },
  mapContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    margin: 16,
    padding: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  locationInfo: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  locationCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    borderLeftWidth: 4,
    borderColor: Colors.border,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  locationTitleContainer: {
    flex: 1,
  },
  locationName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  locationCountry: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: Colors.surface,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  weatherText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 8,
  },
  weatherDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  locationMeta: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  locationDescription: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 8,
  },
  closeButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  locationsList: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 3,
    borderColor: Colors.border,
    minWidth: 120,
  },
  selectedChip: {
    backgroundColor: Colors.surfaceVariant,
    borderColor: Colors.border,
  },
  chipContent: {
    marginLeft: 8,
    flex: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  selectedChipText: {
    color: Colors.primary,
  },
  chipTemp: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});