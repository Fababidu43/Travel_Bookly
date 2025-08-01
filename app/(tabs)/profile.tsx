import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  BookOpen, 
  Heart, 
  Bell, 
  Crown, 
  ChevronRight,
  Settings,
  Share2,
  Download
} from 'lucide-react-native';

export default function ProfileScreen() {
  const menuItems = [
    {
      icon: BookOpen,
      label: 'Carnets',
      color: '#D2691E',
      onPress: () => {},
    },
    {
      icon: Heart,
      label: 'Favoris',
      color: '#FF6B6B',
      onPress: () => {},
    },
    {
      icon: Bell,
      label: 'Notifications',
      color: '#FFB347',
      onPress: () => {},
    },
    {
      icon: Crown,
      label: 'Premium',
      color: '#FFD700',
      onPress: () => {},
    },
    {
      icon: Settings,
      label: 'Paramètres',
      color: '#8B7355',
      onPress: () => {},
    },
    {
      icon: Share2,
      label: 'Partager',
      color: '#4ECDC4',
      onPress: () => {},
    },
    {
      icon: Download,
      label: 'Exporter',
      color: '#95A5A6',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#FAF7F2', '#F4E6D7']}
        style={styles.header}>
        
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#D2691E', '#FF8C00']}
              style={styles.avatarGradient}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
                }}
                style={styles.avatar}
              />
            </LinearGradient>
          </View>
          
          <Text style={styles.userName}>Sarah</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Carnets</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>108</Text>
              <Text style={styles.statLabel}>pages</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>592</Text>
              <Text style={styles.statLabel}>photos</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                  <item.icon size={20} color={item.color} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <ChevronRight size={20} color="#C0B299" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.premiumBanner}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.premiumGradient}>
            <Crown size={24} color="#FFFFFF" />
            <View style={styles.premiumContent}>
              <Text style={styles.premiumTitle}>Passer à Premium</Text>
              <Text style={styles.premiumSubtitle}>
                Débloquez toutes les fonctionnalités
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
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
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5D4E37',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5D4E37',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#8B7355',
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 24,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F4E6D7',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5D4E37',
  },
  premiumBanner: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
  },
  premiumGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  premiumContent: {
    marginLeft: 16,
    flex: 1,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});