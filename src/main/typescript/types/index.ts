// Common types for the application

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

export interface Course {
  id: string;
  name: string;
  description: string;
  grade: string;
  schedule: string;
  instructor: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  registrationRequired: boolean;
  registrationDeadline?: Date;
}

export interface Newsletter {
  id: string;
  title: string;
  month: string;
  year: number;
  pdfUrl: string;
  coverImageUrl?: string;
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