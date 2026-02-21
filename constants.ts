
import { Profile, UserRole, AppState } from './types';

export const MOCK_PROFILES: Profile[] = [
  {
    id: '2',
    name: 'Sarah Oliveira',
    age: 24,
    bio: 'Apaixonada por louvor e missões. Procuro alguém que queira crescer espiritualmente comigo.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    denomination: 'Batista',
    churchName: 'Batista da Lagoinha',
    churchRole: 'Líder de Louvor',
    interests: ['Música', 'Viagens', 'Estudo Bíblico'],
    location: 'São Paulo, SP',
    coordinates: { lat: -23.5505, lng: -46.6333 },
    faithJourney: 'Convertida há 10 anos, servindo ativamente no louvor.',
    physical: { height: 165, hairColor: 'Morena', eyeColor: 'Castanhos' },
    maritalStatus: 'Solteiro(a)',
    hasChildren: false
  },
  {
    id: '3',
    name: 'Gabriel Santos',
    age: 28,
    bio: 'Engenheiro, amo café e conversas profundas sobre a Palavra.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    denomination: 'Quadrangular',
    churchName: 'IEQ Sede',
    churchRole: 'Diácono',
    interests: ['Tecnologia', 'Café', 'Esportes'],
    location: 'Rio de Janeiro, RJ',
    coordinates: { lat: -22.9068, lng: -43.1729 },
    faithJourney: 'Nascido em berço cristão.',
    physical: { height: 185, hairColor: 'Castanho', eyeColor: 'Verdes' },
    maritalStatus: 'Solteiro(a)',
    hasChildren: false
  },
  {
    id: '4',
    name: 'Rebeca Lima',
    age: 26,
    bio: 'Professora da EBD. Amo crianças e acredito no propósito da família.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    denomination: 'Assembleia de Deus',
    churchName: 'AD Brás',
    churchRole: 'Professora EBD',
    interests: ['Educação', 'Leitura', 'Culinária'],
    location: 'Guarulhos, SP',
    coordinates: { lat: -23.4542, lng: -46.5333 },
    faithJourney: 'Firme na rocha que é Cristo.',
    physical: { height: 170, hairColor: 'Loira', eyeColor: 'Azuis' },
    maritalStatus: 'Solteiro(a)',
    hasChildren: false
  },
  {
    id: '5',
    name: 'Mateus Rocha',
    age: 30,
    bio: 'Bacharel em teologia e montanhista.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    denomination: 'Presbiteriana',
    churchName: 'IPB Pinheiros',
    churchRole: 'Músico',
    interests: ['Teologia', 'Violão', 'Montanhismo'],
    location: 'São Bernardo, SP',
    coordinates: { lat: -23.6944, lng: -46.5654 },
    faithJourney: 'Caminhando com Cristo.',
    physical: { height: 178, hairColor: 'Moreno', eyeColor: 'Castanhos' },
    maritalStatus: 'Divorciado(a)',
    hasChildren: true
  }
];

export const INITIAL_STATE: AppState = {
  currentUser: {
    id: '1',
    name: 'Usuário Premium',
    age: 27,
    bio: 'Em busca de um propósito compartilhado.',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    denomination: 'Batista',
    churchName: 'Batista Memorial',
    churchRole: 'Membro',
    interests: ['Oração', 'Voluntariado'],
    location: 'São Paulo, SP',
    coordinates: { lat: -23.5505, lng: -46.6333 },
    faithJourney: 'Seguindo a Jesus.',
    physical: { height: 180, hairColor: 'Preto' },
    maritalStatus: 'Solteiro(a)',
    hasChildren: false,
    role: UserRole.USER
  },
  profiles: MOCK_PROFILES,
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
