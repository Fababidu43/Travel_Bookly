import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plane, BookOpen, Calendar, MapPin } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

export default function JournalsScreen() {
  const journals = [
    {
      id: 1,
      title: 'Mes aventures en Asie',
      date: '16 juil. 2024',
      location: 'Bangkok, Thaïlande',
      pages: 12,
      photos: 45,
    },
    {
      id: 2,
      title: 'Weekend à Paris',
      date: '2 janvier 2024',
      location: 'Paris, France',
      pages: 6,
      photos: 23,
    },
    {
      id: 3,
      title: 'Randonnée en Suisse',
      date: '15 décembre 2023',
      location: 'Interlaken, Suisse',
      pages: 8,
      photos: 31,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Travel Bookly</Text>
          <Text style={styles.title}>Mes carnets{'\n'}de voyage</Text>
          <Text style={styles.subtitle}>Replonge dans tes plus beaux{'\n'}souvenirs.</Text>
          
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Créer un carnet</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Journal Card */}
        <View style={styles.featuredSection}>
          <View style={styles.featuredCard}>
            <LinearGradient
              colors={['#F4A460', '#D2691E']}
              style={styles.featuredGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              
              {/* Decorative elements */}
              <View style={styles.decorativeElements}>
                <View style={styles.palmTree}>🌴</View>
                <Plane size={24} color="#FFFFFF" style={styles.plane} />
                <BookOpen size={32} color="#8D6E63" style={styles.book} />
                <View style={styles.palmTreeRight}>🌴</View>
              </View>
              
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>Mes aventures{'\n'}en Asie</Text>
                <Text style={styles.featuredDate}>16 juil. 2024</Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* All Journals Section */}
        <View style={styles.journalsSection}>
          <Text style={styles.sectionTitle}>Tous mes carnets</Text>
          
          {journals.map((journal) => (
            <TouchableOpacity key={journal.id} style={styles.journalItem}>
              <View style={styles.journalInfo}>
                <Text style={styles.journalTitle}>{journal.title}</Text>
                <Text style={styles.journalDate}>{journal.date}</Text>
                <View style={styles.journalLocation}>
                  <MapPin size={14} color={Colors.textSecondary} />
                  <Text style={styles.journalLocationText}>{journal.location}</Text>
                </View>
              </View>
              <View style={styles.journalStats}>
                <Text style={styles.journalStatsText}>
                  {journal.pages} pages • {journal.photos} photos
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingBottom: 32,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  createButton: {
    backgroundColor: Colors.buttonPrimary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  createButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  featuredSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  featuredCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  featuredGradient: {
    padding: 24,
    minHeight: 200,
    position: 'relative',
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  palmTree: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 24,
  },
  palmTreeRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 24,
  },
  plane: {
    position: 'absolute',
    top: 30,
    right: 60,
    transform: [{ rotate: '15deg' }],
  },
  book: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    marginLeft: -16,
  },
  featuredContent: {
    marginTop: 'auto',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textInverse,
    marginBottom: 8,
    lineHeight: 28,
  },
  featuredDate: {
    fontSize: 14,
    color: Colors.textInverse,
    opacity: 0.9,
  },
  journalsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  journalItem: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  journalInfo: {
    flex: 1,
  },
  journalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  journalDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  journalLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  journalLocationText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  journalStats: {
    alignItems: 'flex-end',
  },
  journalStatsText: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
});