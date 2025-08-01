import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Search, Heart } from 'lucide-react-native';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Pays');

  const filters = ['Pays', 'Type de voyage', 'Plus de filtres'];
  
  const popularTravelers = [
    {
      id: 1,
      name: 'Laura',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      isLiked: true,
    },
    {
      id: 2,
      name: 'Tom',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      isLiked: false,
    },
    {
      id: 3,
      name: 'Anna',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      isLiked: true,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#8B7355" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher des destinations..."
            placeholderTextColor="#C0B299"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Text style={styles.title}>Explorer</Text>
      </View>

      <View style={styles.content}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}>
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilter(filter)}>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itinéraires</Text>
          
          <TouchableOpacity style={styles.itineraryCard}>
            <View style={styles.itineraryImage}>
              <View style={styles.itineraryImagePlaceholder}>
                <Text style={styles.itineraryImageText}>🏝️✈️</Text>
              </View>
            </View>
            <View style={styles.itineraryContent}>
              <Text style={styles.itineraryTitle}>Road trip{'\n'}en Asie{'\n'}du Sud-Est</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voyageurs populaires</Text>
          
          {popularTravelers.map((traveler) => (
            <TouchableOpacity key={traveler.id} style={styles.travelerItem}>
              <Image
                source={{ uri: traveler.avatar }}
                style={styles.travelerAvatar}
              />
              <Text style={styles.travelerName}>{traveler.name}</Text>
              <TouchableOpacity style={styles.likeButton}>
                <Heart 
                  size={20} 
                  color={traveler.isLiked ? "#FF6B6B" : "#C0B299"}
                  fill={traveler.isLiked ? "#FF6B6B" : "transparent"}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#5D4E37',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5D4E37',
  },
  content: {
    paddingHorizontal: 24,
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  activeFilterChip: {
    backgroundColor: '#D2691E',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B7355',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5D4E37',
    marginBottom: 16,
  },
  itineraryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    flexDirection: 'row',
    height: 100,
  },
  itineraryImage: {
    width: 100,
    backgroundColor: '#F4E6D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itineraryImagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itineraryImageText: {
    fontSize: 24,
  },
  itineraryContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  itineraryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D4E37',
    lineHeight: 20,
  },
  travelerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  travelerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  travelerName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#5D4E37',
  },
  likeButton: {
    padding: 8,
  },
});