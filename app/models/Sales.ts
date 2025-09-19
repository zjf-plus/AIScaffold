export interface Sales {
  id: string;
  sale_code: string;
  customer_id: string;
  sale_date: Date;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'partial' | 'overdue';
  notes?: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface SaleItem {
  id: string;
  sale_id: string;
  asset_id?: string;
  asset_name: string;
  category: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: Date;
}

export interface CreateSalesData {
  sale_code: string;
  customer_id: string;
  sale_date: Date;
  total_amount: number;
  notes?: string;
  created_by: string;
  items: CreateSaleItemData[];
}

export interface CreateSaleItemData {
  asset_id?: string;
  asset_name: string;
  category: string;
  quantity: number;
  unit_price: number;
}

export interface UpdateSalesData {
  customer_id?: string;
  sale_date?: Date;
  total_amount?: number;
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_status?: 'pending' | 'paid' | 'partial' | 'overdue';
  notes?: string;
}
