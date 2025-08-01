import { useState } from 'react';

export interface Journal {
  id: string;
  title: string;
  content: string;
  location: string;
  date: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export function useJournals() {
  const [journals, setJournals] = useState<Journal[]>([
    {
      id: '1',
      title: 'Mes aventures en Asie',
      content: 'Un voyage inoubliable à travers l\'Asie du Sud-Est...',
      location: 'Bangkok, Thaïlande',
      date: '16 juillet 2024',
      images: ['https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg'],
      createdAt: new Date('2024-07-16'),
      updatedAt: new Date('2024-07-16'),
    },
    {
      id: '2',
      title: 'Weekend à Paris',
      content: 'Découverte de la ville lumière...',
      location: 'Paris, France',
      date: '2 janvier 2024',
      images: ['https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg'],
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
  ]);

  const createJournal = (journal: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newJournal: Journal = {
      ...journal,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setJournals(prev => [newJournal, ...prev]);
    return newJournal;
  };

  const updateJournal = (id: string, updates: Partial<Journal>) => {
    setJournals(prev =>
      prev.map(journal =>
        journal.id === id
          ? { ...journal, ...updates, updatedAt: new Date() }
          : journal
      )
    );
  };

  const deleteJournal = (id: string) => {
    setJournals(prev => prev.filter(journal => journal.id !== id));
  };

  const getJournalById = (id: string) => {
    return journals.find(journal => journal.id === id);
  };

  return {
    journals,
    createJournal,
    updateJournal,
    deleteJournal,
    getJournalById,
  };
}