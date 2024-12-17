export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  createdAt: Date;
  lastContact: Date;
}

export interface Project {
  id: string;
  customerId: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold';
  startDate: Date;
  endDate?: Date;
  budget: number;
  actualCost?: number;
  progress: number;
}

export interface Sale {
  id: string;
  customerId: string;
  projectId?: string;
  amount: number;
  status: 'draft' | 'pending' | 'paid' | 'cancelled';
  date: Date;
  dueDate: Date;
  items: SaleItem[];
}

export interface SaleItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}