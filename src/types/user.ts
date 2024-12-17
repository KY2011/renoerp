export interface User {
  id: string;
  role: 'admin' | 'installer' | 'manager';
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}