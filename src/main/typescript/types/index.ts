// Common types for the ES International Department website

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: Date;
  updatedAt: Date;
  category: 'course' | 'activity' | 'announcement' | 'newsletter';
  imageUrl?: string;
  attachments?: Attachment[];
  isPublished: boolean;
  publishFrom?: Date;
  publishTo?: Date;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  fileSize: number;
  mimeType: string;
}

// English Pacing Guide structure
export interface PacingGuide {
  id: string;
  grade: 1 | 2 | 3;
  level: 'E1' | 'E2' | 'E3';
  title: string;
  fileUrl: string;
  updatedAt: Date;
  isActive: boolean;
}

// English ID Squad structure
export interface Squad {
  id: string;
  name: string;
  description: string;
  values: string[];
  color: string;
  icon?: string;
}

// English Event structure
export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location?: string;
  type: 'coffee-principal' | 'parent-engagement' | 'other';
  feedbackEnabled: boolean;
  registrationRequired: boolean;
  registrationDeadline?: Date;
}

// English Newsletter structure
export interface Newsletter {
  id: string;
  title: string;
  month: string;
  year: number;
  pdfUrl: string;
  coverImageUrl?: string;
  publishedAt: Date;
  featured: boolean;
}

// English Resource structure
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'link' | 'video' | 'document';
  url: string;
  category: 'reading-buddies' | 'readworks' | 'literacy' | 'transition' | 'summer';
  grade?: number;
  featured: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// English content structure
export interface EnglishContent {
  home: {
    welcomeMessage: string;
    newsletterNote: string;
  };
  pacingGuides: {
    description: string;
    note: string;
  };
  idSquads: {
    description: string;
    conclusion: string;
  };
  contact: {
    message: string;
    extension: string;
  };
}

// Navigation structure
export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}