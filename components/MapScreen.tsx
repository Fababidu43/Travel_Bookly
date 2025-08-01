import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapPin, Star, Clock, CircleCheck as CheckCircle, RotateCcw, Plus, Minus } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface Location {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  status: 'visited' | 'toVisit' | 'favorite';
  temp?: number | null;
  description?: string;
}

interface MapScreenProps {
  locations: Location[];
}

const { width, height } = Dimensions.get('window');

export default function MapScreen({ locations }: MapScreenProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'hybrid'>('standard');
  const mapRef = useRef<MapView>(null);

  const initialRegion = {
    latitude: 20.0,
    longitude: 0.0,
    latitudeDelta: 80.0,
    longitudeDelta: 80.0,
  };

  const getPinColor = (status: string) => {
    switch (status) {
      case 'visited': return Colors.visited;
      case 'toVisit': return Colors.toVisit;
      case 'favorite': return Colors.favorite;
      default: return Colors.textTertiary;
    }
  };

  const getPinIcon = (status: string) => {
    switch (status) {
      case 'visited': return CheckCircle;
      case 'toVisit': return Clock;
      case 'favorite': return Star;
      default: return MapPin;
    }
  };

  const getWeatherEmoji = (temp: number | null) => {
    if (!temp) return '🌤️';
    if (temp > 30) return '🌞';
    if (temp > 20) return '☀️';
    if (temp > 10) return '⛅';
    return '❄️';
  };

  const handleMarkerPress = (location: Location) => {
    setSelectedLocation(location);
    // Centrer la carte sur le marker sélectionné
    mapRef.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 10.0,
      longitudeDelta: 10.0,
    }, 1000);
  };

  const handleResetView = () => {
    mapRef.current?.animateToRegion(initialRegion, 1000);
    setSelectedLocation(null);
  };

  const handleZoomIn = () => {
    mapRef.current?.getCamera().then((camera) => {
      mapRef.current?.animateCamera({
        ...camera,
        zoom: (camera.zoom || 0) + 1,
      }, { duration: 500 });
    });
  };

  const handleZoomOut = () => {
    mapRef.current?.getCamera().then((camera) => {
      mapRef.current?.animateCamera({
        ...camera,
        zoom: Math.max((camera.zoom || 0) - 1, 0),
      }, { duration: 500 });
    });
  };

  const customMapStyle = [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#B8D4E3' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#E8D5B7' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#D0BD99' }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#DCC9A8' }],
    },
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#3E2A1A' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#7F5C3E' }],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Légende */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <CheckCircle size={16} color={Colors.visited} />
          <Text style={styles.legendText}>
            Visité ({locations.filter(l => l.status === 'visited').length})
          </Text>
        </View>
        <View style={styles.legendItem}>
          <Clock size={16} color={Colors.toVisit} />
          <Text style={styles.legendText}>
            À visiter ({locations.filter(l => l.status === 'toVisit').length})
          </Text>
        </View>
        <View style={styles.legendItem}>
          <Star size={16} color={Colors.favorite} fill={Colors.favorite} />
          <Text style={styles.legendText}>
            Favoris ({locations.filter(l => l.status === 'favorite').length})
          </Text>
        </View>
      </View>

      {/* Contrôles de la carte */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
          <Plus size={20} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
          <Minus size={20} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleResetView}>
          <RotateCcw size={20} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.controlButton} 
          onPress={() => {
            const types: ('standard' | 'satellite' | 'hybrid')[] = ['standard', 'satellite', 'hybrid'];
            const currentIndex = types.indexOf(mapType);
            const nextIndex = (currentIndex + 1) % types.length;
            setMapType(types[nextIndex]);
          }}
        >
          <Text style={styles.mapTypeText}>
            {mapType === 'standard' ? '🗺️' : mapType === 'satellite' ? '🛰️' : '🌍'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Google Maps */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        mapType={mapType}
        customMapStyle={customMapStyle}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        rotateEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        onPress={() => setSelectedLocation(null)}
        loadingEnabled={true}
        loadingIndicatorColor={Colors.primary}
        loadingBackgroundColor={Colors.background}
      >
        {locations.map((location) => {
          const PinIcon = getPinIcon(location.status);
          
          return (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              onPress={() => handleMarkerPress(location)}
              anchor={{ x: 0.5, y: 1 }}
              centerOffset={{ x: 0, y: -20 }}
            >
              {/* Custom Marker View */}
              <View style={[
                styles.customMarker,
                { backgroundColor: getPinColor(location.status) },
                selectedLocation?.id === location.id && styles.selectedMarker
              ]}>
                <PinIcon 
                  size={18} 
                  color={Colors.textInverse} 
                  fill={location.status === 'favorite' ? Colors.textInverse : 'none'}
                />
              </View>

              {/* Callout personnalisé */}
              <Callout
                style={styles.callout}
                onPress={() => {
                  // Action personnalisée au clic sur le callout
                  console.log('Callout pressed for:', location.name);
                }}
              >
                <View style={styles.calloutContent}>
                  <Text style={styles.calloutTitle}>{location.name}</Text>
                  {location.country && (
                    <Text style={styles.calloutCountry}>{location.country}</Text>
                  )}
                  {location.temp && (
                    <Text style={styles.calloutTemp}>
                      {getWeatherEmoji(location.temp)} {location.temp}°C Ensoleillé
                    </Text>
                  )}
                  {location.description && (
                    <Text style={styles.calloutDescription}>{location.description}</Text>
                  )}
                  <View style={styles.calloutFooter}>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getPinColor(location.status) }
                    ]}>
                      <Text style={styles.statusText}>
                        {location.status === 'visited' ? 'Visité' : 
                         location.status === 'toVisit' ? 'À visiter' : 'Favori'}
                      </Text>
                    </View>
                  </View>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      {/* Informations de navigation */}
      <View style={styles.mapInfo}>
        <Text style={styles.mapInfoText}>
          📍 {locations.length} destinations • Appuyez sur un pin pour plus d'infos
        </Text>
        {selectedLocation && (
          <Text style={styles.selectedLocationText}>
            📌 {selectedLocation.name}, {selectedLocation.country}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  controls: {
    position: 'absolute',
    top: 80,
    right: 24,
    zIndex: 10,
  },
  controlButton: {
    backgroundColor: Colors.surface,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mapTypeText: {
    fontSize: 18,
  },
  map: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  customMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: Colors.textInverse,
  },
  selectedMarker: {
    transform: [{ scale: 1.3 }],
    elevation: 8,
  },
  callout: {
    width: 220,
    padding: 0,
  },
  calloutContent: {
    backgroundColor: Colors.text,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 200,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  calloutTitle: {
    color: Colors.textInverse,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  calloutCountry: {
    color: Colors.textInverse,
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 6,
  },
  calloutTemp: {
    color: Colors.textInverse,
    fontSize: 13,
    marginBottom: 6,
  },
  calloutDescription: {
    color: Colors.textInverse,
    fontSize: 11,
    opacity: 0.9,
    lineHeight: 14,
    marginBottom: 8,
  },
  calloutFooter: {
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: Colors.textInverse,
    fontSize: 10,
    fontWeight: '600',
  },
  mapInfo: {
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mapInfoText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedLocationText: {
    fontSize: 12,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 4,
  },
});