// 销售模型
export interface Sales {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  items: SalesItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  expectedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  salespersonId: string;
  salespersonName: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SalesItem {
  id: string;
  productName: string;
  productCode: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
  specifications?: string;
}

export interface SalesCreateInput {
  customerId: string;
  items: Omit<SalesItem, 'id' | 'totalPrice'>[];
  expectedDeliveryDate?: Date;
  salespersonId: string;
  notes?: string;
}

export interface SalesUpdateInput {
  customerId?: string;
  items?: Omit<SalesItem, 'id' | 'totalPrice'>[];
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  expectedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  salespersonId?: string;
  notes?: string;
}
