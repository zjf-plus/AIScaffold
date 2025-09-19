// 客户模型
export interface Customer {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  taxId?: string;
  creditLimit: number;
  paymentTerms: string;
  rating: number;
  status: 'active' | 'inactive' | 'suspended';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerCreateInput {
  name: string;
  code: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  taxId?: string;
  creditLimit: number;
  paymentTerms: string;
  rating?: number;
  notes?: string;
}

export interface CustomerUpdateInput {
  name?: string;
  code?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  taxId?: string;
  creditLimit?: number;
  paymentTerms?: string;
  rating?: number;
  status?: 'active' | 'inactive' | 'suspended';
  notes?: string;
}
