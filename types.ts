
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface PhysicalTraits {
  height?: number; // em cm
  hairColor?: string;
  skinTone?: string;
  eyeColor?: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  imageUrl: string;
  denomination: string;
  churchName: string; // Nome específico da igreja
  churchRole: string;
  interests: string[];
  location: string;
  coordinates?: { lat: number; lng: number };
  faithJourney: string;
  physical?: PhysicalTraits;
  maritalStatus: 'Solteiro(a)' | 'Divorciado(a)' | 'Viúvo(a)';
  hasChildren: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Match {
  id: string;
  users: [string, string];
  messages: Message[];
  lastInteraction: number;
}

export interface AppFilters {
  maxDistance: number;
  minAge: number;
  maxAge: number;
  preferredDenomination?: string;
  preferredHeight?: number;
  preferredHairColor?: string;
}

export interface AppState {
  currentUser: Profile & { role: UserRole };
  profiles: Profile[];
  matches: Match[];
  swipedLeft: string[];
  swipedRight: string[];
  favorites: string[];
  filters: AppFilters;
}
