export interface Procurement {
  id: string;
  procurement_code: string;
  supplier_id: string;
  procurement_date: Date;
  expected_delivery_date?: Date;
  actual_delivery_date?: Date;
  total_amount: number;
  status: 'pending' | 'approved' | 'ordered' | 'delivered' | 'cancelled';
  notes?: string;
  created_by: string;
  approved_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProcurementItem {
  id: string;
  procurement_id: string;
  asset_name: string;
  category: string;
  sub_category?: string;
  brand?: string;
  model?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  specifications?: Record<string, any>;
  created_at: Date;
}

export interface CreateProcurementData {
  procurement_code: string;
  supplier_id: string;
  procurement_date: Date;
  expected_delivery_date?: Date;
  total_amount: number;
  notes?: string;
  created_by: string;
  items: CreateProcurementItemData[];
}

export interface CreateProcurementItemData {
  asset_name: string;
  category: string;
  sub_category?: string;
  brand?: string;
  model?: string;
  quantity: number;
  unit_price: number;
  specifications?: Record<string, any>;
}

export interface UpdateProcurementData {
  supplier_id?: string;
  procurement_date?: Date;
  expected_delivery_date?: Date;
  actual_delivery_date?: Date;
  total_amount?: number;
  status?: 'pending' | 'approved' | 'ordered' | 'delivered' | 'cancelled';
  notes?: string;
  approved_by?: string;
}
