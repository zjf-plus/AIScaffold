export interface Customer {
  id: string;
  customer_code: string;
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  tax_id?: string;
  credit_limit: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCustomerData {
  customer_code: string;
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  tax_id?: string;
  credit_limit?: number;
}

export interface UpdateCustomerData {
  customer_code?: string;
  company_name?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  tax_id?: string;
  credit_limit?: number;
  is_active?: boolean;
}
