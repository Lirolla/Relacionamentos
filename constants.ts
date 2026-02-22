
import { Profile, UserRole, AppState } from './types';

export const MOCK_PROFILES: Profile[] = [];

export const INITIAL_STATE: AppState = {
  currentUser: {
    id: '1',
    name: '',
    age: 0,
    bio: '',
    imageUrl: '',
    denomination: '',
    churchName: '',
    churchRole: '',
    interests: [],
    location: '',
    coordinates: { lat: 0, lng: 0 },
    faithJourney: '',
    physical: { height: 0 },
    maritalStatus: 'Solteiro(a)',
    hasChildren: false,
    role: UserRole.USER
  },
  profiles: [],
  matches: [],
  swipedLeft: [],
  swipedRight: [],
  favorites: [],
  filters: {
    maxDistance: 50,
    minAge: 18,
    maxAge: 45
  }
};
