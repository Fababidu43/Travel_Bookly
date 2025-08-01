import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, Share2, MoveVertical as MoreVertical } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onShare?: () => void;
  onMore?: () => void;
  showActions?: boolean;
}

export default function Header({ 
  title, 
  onBack, 
  onShare, 
  onMore, 
  showActions = false 
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.button}>
        <ArrowLeft size={24} color="#5D4E37" />
      </TouchableOpacity>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.actions}>
        {showActions && (
          <>
            <TouchableOpacity onPress={onShare} style={styles.button}>
              <Share2 size={24} color="#5D4E37" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onMore} style={styles.button}>
              <MoreVertical size={24} color="#5D4E37" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F4E6D7',
  },
  button: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5D4E37',
    flex: 1,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
});