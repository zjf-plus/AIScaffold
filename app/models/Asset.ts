export interface Asset {
  id: string;
  asset_code: string;
  asset_name: string;
  category: string;
  sub_category?: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  purchase_date: Date;
  purchase_price: number;
  current_value: number;
  status: 'active' | 'maintenance' | 'retired' | 'disposed';
  location: string;
  department: string;
  assigned_to?: string;
  warranty_expiry?: Date;
  last_maintenance_date?: Date;
  next_maintenance_date?: Date;
  description?: string;
  specifications?: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface CreateAssetData {
  asset_code: string;
  asset_name: string;
  category: string;
  sub_category?: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  purchase_date: Date;
  purchase_price: number;
  current_value: number;
  status?: 'active' | 'maintenance' | 'retired' | 'disposed';
  location: string;
  department: string;
  assigned_to?: string;
  warranty_expiry?: Date;
  description?: string;
  specifications?: Record<string, any>;
}

export interface UpdateAssetData {
  asset_code?: string;
  asset_name?: string;
  category?: string;
  sub_category?: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  purchase_date?: Date;
  purchase_price?: number;
  current_value?: number;
  status?: 'active' | 'maintenance' | 'retired' | 'disposed';
  location?: string;
  department?: string;
  assigned_to?: string | null;
  warranty_expiry?: Date;
  last_maintenance_date?: Date;
  next_maintenance_date?: Date;
  description?: string | null;
  specifications?: Record<string, any>;
}
