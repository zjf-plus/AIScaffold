// 供应商模型
export interface Supplier {
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
  paymentTerms: string;
  rating: number;
  status: 'active' | 'inactive' | 'suspended';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SupplierCreateInput {
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
  paymentTerms: string;
  rating?: number;
  notes?: string;
}

export interface SupplierUpdateInput {
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
  paymentTerms?: string;
  rating?: number;
  status?: 'active' | 'inactive' | 'suspended';
  notes?: string;
}
