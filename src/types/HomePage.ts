// Hero Section
export interface HeroSectionData {
  subtitle: string;
  titleColor: string;
  buttonText: string;
  url: string;
  buttonTextColor: string;
  createdAt?: FirebaseTimestamp;
  updatedAt?: FirebaseTimestamp;
  descriptionColor: string;
  title: string;
  description: string;
  subtitleColor: string;
}

// Welcome Section
export interface WelcomeSectionData {
  headerTitle: string;
  bottomText: string;
  rightColumnText: string;
  leftColumnText: string;
  headerSubtitle: string;
  id?: string;
}

// Place For You Section
export interface PlaceForYouData {
  mensaje: string;
  subtitulo: string;
  titulo: string;
  textoBoton: string;
  imagen: string;
  creadoEn?: FirebaseTimestamp;
}

// About Section
export interface AboutSectionData {
  profileImage: string;
  name: string;
  description: string;
  title: string;
}

// Causa (OurCausa)
export interface CauseItem {
  title: string;
  description: string;
  videoText: string;
  subtitle: string;
  id: number;
}

export interface CausesData {
  subtitle: string;
  title: string;
  items: CauseItem[];
}

// Quote Section
export interface QuoteSectionData {
  imageUrl: string;
  quote: string;
  role: string;
  author: string;
  updatedAt?: FirebaseTimestamp;
}

// Timestamp Firebase (genérico)
export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

// Interfaz general si las unificas en un solo fetch:
export interface PageContent {
  heroSection: HeroSectionData;
  welcomeSection: WelcomeSectionData;
  placeForYou: PlaceForYouData;
  aboutSection: AboutSectionData;
  causes: CausesData;
  quoteSection: QuoteSectionData;
}
