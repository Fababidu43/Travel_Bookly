import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import { Search, Heart } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Search size={20} color={Colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher des destinations..."
              placeholderTextColor={Colors.textTertiary}
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
              <View style={styles.itineraryImageContainer}>
                <View style={styles.itineraryImagePlaceholder}>
                  <Text style={styles.palmTree}>🌴</Text>
                  <Text style={styles.plane}>✈️</Text>
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
                    color={traveler.isLiked ? "#FF6B6B" : Colors.textTertiary}
                    fill={traveler.isLiked ? "#FF6B6B" : "transparent"}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  content: {
    paddingHorizontal: 24,
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterChip: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activeFilterChip: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  activeFilterText: {
    color: Colors.textInverse,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  itineraryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    flexDirection: 'row',
    height: 100,
  },
  itineraryImageContainer: {
    width: 100,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itineraryImagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  palmTree: {
    fontSize: 24,
  },
  plane: {
    fontSize: 16,
    position: 'absolute',
    top: -5,
    right: -10,
  },
  itineraryContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  itineraryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
  },
  travelerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    color: Colors.text,
  },
  likeButton: {
    padding: 8,
  },
});