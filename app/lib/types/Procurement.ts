// 采购模型
export interface Procurement {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplierName: string;
  items: ProcurementItem[];
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  orderDate: Date;
  expectedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  createdBy: string;
  approvedBy?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcurementItem {
  id: string;
  productName: string;
  productCode: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specifications?: string;
}

export interface ProcurementCreateInput {
  supplierId: string;
  items: Omit<ProcurementItem, 'id' | 'totalPrice'>[];
  expectedDeliveryDate?: Date;
  notes?: string;
}

export interface ProcurementUpdateInput {
  supplierId?: string;
  items?: Omit<ProcurementItem, 'id' | 'totalPrice'>[];
  status?: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  expectedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  notes?: string;
}
