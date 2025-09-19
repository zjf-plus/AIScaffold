export interface Supplier {
  id: string;
  supplier_code: string;
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  tax_id?: string;
  payment_terms?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSupplierData {
  supplier_code: string;
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  tax_id?: string;
  payment_terms?: string;
}

export interface UpdateSupplierData {
  supplier_code?: string;
  company_name?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  tax_id?: string;
  payment_terms?: string;
  is_active?: boolean;
}
