export interface Dispute {
  id: string;
  projectId: string;
  customerId: string;
  title: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'quality' | 'timeline' | 'communication' | 'billing' | 'other';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface DisputeUpdate {
  id: string;
  disputeId: string;
  userId: string;
  content: string;
  attachments?: string[];
  internal: boolean;
  createdAt: Date;
}