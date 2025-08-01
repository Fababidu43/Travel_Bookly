export interface Location {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  country: string;
  visited: boolean;
  visitedDate?: string;
  notes?: string;
  photos?: string[];
}

export interface TravelEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  location: Location;
  photos: string[];
  mood?: string;
  weather?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TravelJournal {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  startDate: string;
  endDate?: string;
  entries: TravelEntry[];
  locations: Location[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
  journalsCount: number;
  pagesCount: number;
  photosCount: number;
  createdAt: Date;
}