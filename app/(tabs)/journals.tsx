import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plane, BookOpen, Calendar, MapPin } from 'lucide-react-native';

export default function JournalsScreen() {
  const journals = [
    {
      id: 1,
      title: 'Mes aventures en Asie',
      date: '16 juillet 2024',
      location: 'Bangkok, Thaïlande',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      pages: 12,
      photos: 45,
    },
    {
      id: 2,
      title: 'Weekend à Paris',
      date: '2 janvier 2024',
      location: 'Paris, France',
      image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=400',
      pages: 6,
      photos: 23,
    },
    {
      id: 3,
      title: 'Randonnée en Suisse',
      date: '15 décembre 2023',
      location: 'Interlaken, Suisse',
      image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400',
      pages: 8,
      photos: 31,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#FAF7F2', '#F4E6D7']}
        style={styles.header}>
        <Text style={styles.appTitle}>Travel Bookly</Text>
        <Text style={styles.title}>Mes aventures{'\n'}en Asie</Text>
        <Text style={styles.subtitle}>Collect moments,{'\n'}not things</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statCard}>
            <View style={styles.statIcon}>
              <Calendar size={20} color="#D2691E" />
            </View>
            <Text style={styles.statNumber}>16 juillet</Text>
            <Text style={styles.statLabel}>Beach</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statCard}>
            <View style={styles.statIcon}>
              <MapPin size={20} color="#D2691E" />
            </View>
            <Text style={styles.statNumber}>13 avril</Text>
            <Text style={styles.statLabel}>Bangkok</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.journalsSection}>
          <Text style={styles.sectionTitle}>Tous mes carnets</Text>
          
          {journals.map((journal) => (
            <TouchableOpacity key={journal.id} style={styles.journalItem}>
              <ImageBackground
                source={{ uri: journal.image }}
                style={styles.journalImage}
                imageStyle={styles.journalImageStyle}>
                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
                  style={styles.journalOverlay}>
                  <View style={styles.journalStats}>
                    <Text style={styles.journalStatsText}>
                      {journal.pages} pages • {journal.photos} photos
                    </Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
              
              <View style={styles.journalInfo}>
                <Text style={styles.journalTitle}>{journal.title}</Text>
                <Text style={styles.journalDate}>{journal.date}</Text>
                <View style={styles.journalLocation}>
                  <MapPin size={14} color="#8B7355" />
                  <Text style={styles.journalLocationText}>{journal.location}</Text>
                </View>
              </View>
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
    backgroundColor: '#FAF7F2',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 16,
    color: '#8B7355',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5D4E37',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B7355',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  content: {
    paddingHorizontal: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginHorizontal: 6,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4E6D7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5D4E37',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5D4E37',
  },
  journalsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5D4E37',
    marginBottom: 16,
  },
  journalItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  journalImage: {
    height: 120,
    justifyContent: 'flex-end',
  },
  journalImageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  journalOverlay: {
    padding: 12,
  },
  journalStats: {
    alignSelf: 'flex-end',
  },
  journalStatsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  journalInfo: {
    padding: 16,
  },
  journalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5D4E37',
    marginBottom: 4,
  },
  journalDate: {
    fontSize: 14,
    color: '#8B7355',
    marginBottom: 8,
  },
  journalLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  journalLocationText: {
    fontSize: 14,
    color: '#8B7355',
    marginLeft: 4,
  },
});