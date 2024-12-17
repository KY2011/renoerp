import { Customer } from './customer';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  dependencies?: string[];
  assignedTo: string[];
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  installerId: string;
  description: string;
  status: 'started' | 'in-progress' | 'completed' | 'blocked';
  photos: PhotoUpdate[];
  timestamp: Date;
}

export interface PhotoUpdate {
  id: string;
  url: string;
  caption: string;
  timestamp: Date;
}