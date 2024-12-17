export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Item {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  unit: string;
  basePrice: number;
  minimumQuantity: number;
  laborCost: number;
  materialCost: number;
  images?: string[];
}

export interface Package {
  id: string;
  name: string;
  description: string;
  items: PackageItem[];
  discount?: number;
}

export interface PackageItem {
  itemId: string;
  quantity: number;
  customPrice?: number;
}

export interface QuotationItem extends PackageItem {
  item: Item;
  totalPrice: number;
}

export interface Quotation {
  id: string;
  customerId: string;
  projectId?: string;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  validUntil: Date;
  createdAt: Date;
  notes?: string;
}