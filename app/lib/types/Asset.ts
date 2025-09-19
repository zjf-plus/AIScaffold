// 资产模型
export interface Asset {
  id: string;
  assetCode: string;
  assetName: string;
  category: string;
  subCategory?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  purchaseDate: Date;
  purchasePrice: number;
  currentValue: number;
  status: 'active' | 'maintenance' | 'retired' | 'disposed';
  location: string;
  department: string;
  assignedTo?: string;
  assignedToName?: string;
  warrantyExpiry?: Date;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  description?: string;
  specifications?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AssetCreateInput {
  assetName: string;
  category: string;
  subCategory?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  purchaseDate: Date;
  purchasePrice: number;
  location: string;
  department: string;
  assignedTo?: string;
  warrantyExpiry?: Date;
  description?: string;
  specifications?: Record<string, any>;
}

export interface AssetUpdateInput {
  assetName?: string;
  category?: string;
  subCategory?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  purchaseDate?: Date;
  purchasePrice?: number;
  currentValue?: number;
  status?: 'active' | 'maintenance' | 'retired' | 'disposed';
  location?: string;
  department?: string;
  assignedTo?: string;
  warrantyExpiry?: Date;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  description?: string;
  specifications?: Record<string, any>;
}
