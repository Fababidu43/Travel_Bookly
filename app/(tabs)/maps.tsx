import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import MapScreen from '@/components/MapScreen';
import { Colors } from '@/constants/Colors';

export default function MapsScreen() {
  const locations = [
    {
      id: 'Paris',
      name: 'Paris',
      country: 'France',
      latitude: 48.8566,
      longitude: 2.3522,
      status: 'visited' as const,
      temp: 22,
      description: 'Ville lumière avec la Tour Eiffel',
    },
    {
      id: 'Bangkok',
      name: 'Bangkok',
      country: 'Thaïlande',
      latitude: 13.7563,
      longitude: 100.5018,
      status: 'visited' as const,
      temp: 34,
      description: 'Temples dorés et street food',
    },
    {
      id: 'Tokyo',
      name: 'Tokyo',
      country: 'Japon',
      latitude: 35.6762,
      longitude: 139.6503,
      status: 'toVisit' as const,
      temp: 18,
      description: 'Modernité et traditions',
    },
    {
      id: 'New York',
      name: 'New York',
      country: 'États-Unis',
      latitude: 40.7128,
      longitude: -74.0060,
      status: 'toVisit' as const,
      temp: 15,
      description: 'La grosse pomme',
    },
    {
      id: 'Sydney',
      name: 'Sydney',
      country: 'Australie',
      latitude: -33.8688,
      longitude: 151.2093,
      status: 'favorite' as const,
      temp: 25,
      description: 'Opéra et plages magnifiques',
    },
    {
      id: 'Rome',
      name: 'Rome',
      country: 'Italie',
      latitude: 41.9028,
      longitude: 12.4964,
      status: 'favorite' as const,
      temp: 26,
      description: 'Histoire antique et dolce vita',
    },
    {
      id: 'Bali',
      name: 'Bali',
      country: 'Indonésie',
      latitude: -8.3405,
      longitude: 115.0920,
      status: 'visited' as const,
      temp: 30,
      description: 'Paradis tropical',
    },
    {
      id: 'Reykjavik',
      name: 'Reykjavik',
      country: 'Islande',
      latitude: 64.1466,
      longitude: -21.9426,
      status: 'toVisit' as const,
      temp: 5,
      description: 'Aurores boréales',
    },
    {
      id: 'Lisbonne',
      name: 'Lisbonne',
      country: 'Portugal',
      latitude: 38.7223,
      longitude: -9.1393,
      status: 'favorite' as const,
      temp: 24,
      description: 'Tramways et fado',
    },
    {
      id: 'Le Caire',
      name: 'Le Caire',
      country: 'Égypte',
      latitude: 30.0444,
      longitude: 31.2357,
      status: 'visited' as const,
      temp: 28,
      description: 'Pyramides et Nil',
    },
    {
      id: 'Vancouver',
      name: 'Vancouver',
      country: 'Canada',
      latitude: 49.2827,
      longitude: -123.1207,
      status: 'toVisit' as const,
      temp: 12,
      description: 'Montagnes et océan',
    },
    {
      id: 'Le Cap',
      name: 'Le Cap',
      country: 'Afrique du Sud',
      latitude: -33.9249,
      longitude: 18.4241,
      status: 'visited' as const,
      temp: 20,
      description: 'Table Mountain',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header simple */}
      <View style={styles.header}>
        <Text style={styles.title}>Cartes</Text>
      </View>

      {/* Google Maps avec données réelles */}
      <MapScreen locations={locations} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
});