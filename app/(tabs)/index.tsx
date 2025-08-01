import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plane, BookOpen, Plus, MapPin, Calendar, Camera, Heart } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const recentJournals = [
    {
      id: 1,
      title: 'Mes aventures en Asie',
      location: 'Bangkok, Thaïlande',
      date: '16 juil. 2024',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      pages: 12,
      photos: 45,
    },
    {
      id: 2,
      title: 'Weekend à Paris',
      location: 'Paris, France',
      date: '2 janv. 2024',
      image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=400',
      pages: 6,
      photos: 23,
    },
  ];

  const quickActions = [
    { icon: Plus, label: 'Nouveau carnet', color: '#D2691E' },
    { icon: Camera, label: 'Ajouter photo', color: '#FF6B6B' },
    { icon: MapPin, label: 'Marquer lieu', color: '#4ECDC4' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#FF6B35', '#F7931E', '#FFD700']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.appTitle}>Travel Bookly</Text>
            <Text style={styles.heroTitle}>Capture tes{'\n'}plus beaux{'\n'}souvenirs</Text>
            <Text style={styles.heroSubtitle}>
              Crée des carnets de voyage inoubliables et revivez vos aventures
            </Text>
            
            <TouchableOpacity style={styles.primaryButton}>
              <LinearGradient
                colors={['#FFFFFF', '#F8F8F8']}
                style={styles.buttonGradient}>
                <Plus size={20} color="#D2691E" />
                <Text style={styles.buttonText}>Créer un carnet</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          <View style={styles.heroDecoration}>
            <View style={styles.floatingCard}>
              <Plane size={24} color="#FFFFFF" />
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard}>
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Journal */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Carnet en vedette</Text>
          <TouchableOpacity style={styles.featuredCard}>
            <ImageBackground
              source={{ uri: recentJournals[0].image }}
              style={styles.featuredBackground}
              imageStyle={styles.featuredImage}>
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                style={styles.featuredOverlay}>
                <View style={styles.featuredBadge}>
                  <Heart size={16} color="#FFFFFF" />
                  <Text style={styles.featuredBadgeText}>Favori</Text>
                </View>
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredTitle}>{recentJournals[0].title}</Text>
                  <View style={styles.featuredMeta}>
                    <MapPin size={14} color="#FFFFFF" />
                    <Text style={styles.featuredLocation}>{recentJournals[0].location}</Text>
                  </View>
                  <View style={styles.featuredStats}>
                    <Text style={styles.featuredStatsText}>
                      {recentJournals[0].pages} pages • {recentJournals[0].photos} photos
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* Recent Journals */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Récents</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          {recentJournals.slice(1).map((journal) => (
            <TouchableOpacity key={journal.id} style={styles.recentCard}>
              <ImageBackground
                source={{ uri: journal.image }}
                style={styles.recentImage}
                imageStyle={styles.recentImageStyle}>
                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
                  style={styles.recentImageOverlay}>
                </LinearGradient>
              </ImageBackground>
              
              <View style={styles.recentContent}>
                <Text style={styles.recentTitle}>{journal.title}</Text>
                <View style={styles.recentMeta}>
                  <MapPin size={12} color="#8B7355" />
                  <Text style={styles.recentLocation}>{journal.location}</Text>
                </View>
                <View style={styles.recentDate}>
                  <Calendar size={12} color="#C0B299" />
                  <Text style={styles.recentDateText}>{journal.date}</Text>
                </View>
              </View>
              
              <View style={styles.recentStats}>
                <Text style={styles.recentStatsText}>
                  {journal.pages}p • {journal.photos}📷
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#D2691E', '#FF8C00']}
          style={styles.fabGradient}>
          <Plus size={28} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  appTitle: {
    fontSize: 16,
    color: Colors.surface,
    fontWeight: '500',
    marginBottom: 16,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.surface,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 42,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.surface,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  primaryButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  heroDecoration: {
    position: 'absolute',
    top: 60,
    right: 24,
  },
  floatingCard: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  quickActionsSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  featuredSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  featuredCard: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  featuredBackground: {
    flex: 1,
  },
  featuredImage: {
    borderRadius: 20,
  },
  featuredOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,107,107,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  featuredContent: {
    alignSelf: 'stretch',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.surface,
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredLocation: {
    color: Colors.surface,
    fontSize: 14,
    marginLeft: 4,
    opacity: 0.9,
  },
  featuredStats: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  featuredStatsText: {
    color: Colors.surface,
    fontSize: 12,
    fontWeight: '500',
  },
  recentSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  recentCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  recentImage: {
    width: 80,
    height: 80,
  },
  recentImageStyle: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  recentImageOverlay: {
    flex: 1,
  },
  recentContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  recentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recentLocation: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  recentDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentDateText: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginLeft: 4,
  },
  recentStats: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentStatsText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    borderRadius: 28,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});