import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { 
  ArrowLeft,
  Image as ImageIcon,
  Bold,
  Italic,
  List,
  MapPin,
  Calendar,
  Save
} from 'lucide-react-native';

interface JournalEditorProps {
  onBack: () => void;
  journalTitle?: string;
}

export default function JournalEditor({ onBack, journalTitle = 'Nouveau carnet' }: JournalEditorProps) {
  const [title, setTitle] = useState(journalTitle);
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSave = () => {
    Alert.alert('Succès', 'Votre carnet a été sauvegardé !');
  };

  const toolbarButtons = [
    { icon: Bold, action: () => {} },
    { icon: Italic, action: () => {} },
    { icon: List, action: () => {} },
    { icon: ImageIcon, action: () => {} },
    { icon: MapPin, action: () => {} },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#5D4E37" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Éditer</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Save size={24} color="#D2691E" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.titleSection}>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Titre du carnet"
            placeholderTextColor="#C0B299"
          />
        </View>

        <View style={styles.metaSection}>
          <View style={styles.metaRow}>
            <Calendar size={16} color="#8B7355" />
            <TextInput
              style={styles.metaInput}
              value={date}
              onChangeText={setDate}
              placeholder="Date du voyage"
              placeholderTextColor="#C0B299"
            />
          </View>
          <View style={styles.metaRow}>
            <MapPin size={16} color="#8B7355" />
            <TextInput
              style={styles.metaInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Lieu"
              placeholderTextColor="#C0B299"
            />
          </View>
        </View>

        <View style={styles.toolbar}>
          {toolbarButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.toolbarButton}
              onPress={button.action}>
              <button.icon size={20} color="#8B7355" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.editorSection}>
          <TextInput
            style={styles.contentInput}
            value={content}
            onChangeText={setContent}
            placeholder="Écrivez votre histoire..."
            placeholderTextColor="#C0B299"
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.addPhotoButton}>
          <ImageIcon size={24} color="#D2691E" />
          <Text style={styles.addPhotoText}>Ajouter une photo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  header: {
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5D4E37',
  },
  saveButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  titleSection: {
    marginBottom: 24,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5D4E37',
    borderBottomWidth: 2,
    borderBottomColor: '#F4E6D7',
    paddingVertical: 12,
  },
  metaSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#5D4E37',
    paddingVertical: 8,
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
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
  toolbarButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#F4E6D7',
  },
  editorSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    minHeight: 200,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    color: '#5D4E37',
    lineHeight: 24,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4E6D7',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  addPhotoText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#D2691E',
  },
});