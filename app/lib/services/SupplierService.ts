import { db } from '../prisma.server';
import { Supplier, CreateSupplierData, UpdateSupplierData } from '../../models/Supplier';

export class SupplierService {
  constructor() {
    // Prisma 客户端已全局配置
  }

  async getAllSuppliers(): Promise<Supplier[]> {
    const suppliers = await db.supplier.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return suppliers.map(supplier => ({
      id: supplier.id.toString(),
      supplier_code: supplier.supplierCode,
      company_name: supplier.companyName,
      contact_person: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      city: supplier.city,
      country: supplier.country,
      postal_code: supplier.postalCode,
      tax_id: supplier.taxId,
      payment_terms: supplier.paymentTerms,
      is_active: supplier.isActive,
      created_at: supplier.createdAt,
      updated_at: supplier.updatedAt
    }));
  }

  async getSupplierById(id: string): Promise<Supplier | null> {
    const supplier = await db.supplier.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!supplier) return null;
    
    return {
      id: supplier.id.toString(),
      supplier_code: supplier.supplierCode,
      company_name: supplier.companyName,
      contact_person: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      city: supplier.city,
      country: supplier.country,
      postal_code: supplier.postalCode,
      tax_id: supplier.taxId,
      payment_terms: supplier.paymentTerms,
      is_active: supplier.isActive,
      created_at: supplier.createdAt,
      updated_at: supplier.updatedAt
    };
  }

  async getSupplierByCode(supplier_code: string): Promise<Supplier | null> {
    const supplier = await db.supplier.findUnique({
      where: { supplierCode: supplier_code }
    });
    
    if (!supplier) return null;
    
    return {
      id: supplier.id.toString(),
      supplier_code: supplier.supplierCode,
      company_name: supplier.companyName,
      contact_person: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      city: supplier.city,
      country: supplier.country,
      postal_code: supplier.postalCode,
      tax_id: supplier.taxId,
      payment_terms: supplier.paymentTerms,
      is_active: supplier.isActive,
      created_at: supplier.createdAt,
      updated_at: supplier.updatedAt
    };
  }

  async getActiveSuppliers(): Promise<Supplier[]> {
    const suppliers = await db.supplier.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    
    return suppliers.map(supplier => ({
      id: supplier.id.toString(),
      supplier_code: supplier.supplierCode,
      company_name: supplier.companyName,
      contact_person: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      city: supplier.city,
      country: supplier.country,
      postal_code: supplier.postalCode,
      tax_id: supplier.taxId,
      payment_terms: supplier.paymentTerms,
      is_active: supplier.isActive,
      created_at: supplier.createdAt,
      updated_at: supplier.updatedAt
    }));
  }

  async createSupplier(data: CreateSupplierData): Promise<Supplier> {
    // 检查供应商代码是否已存在
    const existingSupplier = await db.supplier.findUnique({
      where: { supplierCode: data.supplier_code }
    });
    if (existingSupplier) {
      throw new Error('Supplier code already exists');
    }

    const supplier = await db.supplier.create({
      data: {
        supplierCode: data.supplier_code,
        companyName: data.company_name,
        contactPerson: data.contact_person,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        country: data.country,
        postalCode: data.postal_code,
        taxId: data.tax_id,
        paymentTerms: data.payment_terms,
        isActive: true
      }
    });
    
    return {
      id: supplier.id.toString(),
      supplier_code: supplier.supplierCode,
      company_name: supplier.companyName,
      contact_person: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      city: supplier.city,
      country: supplier.country,
      postal_code: supplier.postalCode,
      tax_id: supplier.taxId,
      payment_terms: supplier.paymentTerms,
      is_active: supplier.isActive,
      created_at: supplier.createdAt,
      updated_at: supplier.updatedAt
    };
  }

  async updateSupplier(id: string, data: UpdateSupplierData): Promise<Supplier | null> {
    const existingSupplier = await db.supplier.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingSupplier) {
      throw new Error('Supplier not found');
    }

    // 如果更新供应商代码，检查是否已存在
    if (data.supplier_code && data.supplier_code !== existingSupplier.supplierCode) {
      const codeExists = await db.supplier.findUnique({
        where: { supplierCode: data.supplier_code }
      });
      if (codeExists) {
        throw new Error('Supplier code already exists');
      }
    }

    try {
      const supplier = await db.supplier.update({
        where: { id: parseInt(id) },
        data: {
          ...(data.supplier_code && { supplierCode: data.supplier_code }),
          ...(data.company_name && { companyName: data.company_name }),
          ...(data.contact_person !== undefined && { contactPerson: data.contact_person }),
          ...(data.email !== undefined && { email: data.email }),
          ...(data.phone !== undefined && { phone: data.phone }),
          ...(data.address !== undefined && { address: data.address }),
          ...(data.city !== undefined && { city: data.city }),
          ...(data.country !== undefined && { country: data.country }),
          ...(data.postal_code !== undefined && { postalCode: data.postal_code }),
          ...(data.tax_id !== undefined && { taxId: data.tax_id }),
          ...(data.payment_terms !== undefined && { paymentTerms: data.payment_terms }),
          ...(data.is_active !== undefined && { isActive: data.is_active })
        }
      });
      
      return {
        id: supplier.id.toString(),
        supplier_code: supplier.supplierCode,
        company_name: supplier.companyName,
        contact_person: supplier.contactPerson,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        city: supplier.city,
        country: supplier.country,
        postal_code: supplier.postalCode,
        tax_id: supplier.taxId,
        payment_terms: supplier.paymentTerms,
        is_active: supplier.isActive,
        created_at: supplier.createdAt,
        updated_at: supplier.updatedAt
      };
    } catch (error) {
      return null;
    }
  }

  async deleteSupplier(id: string): Promise<boolean> {
    const existingSupplier = await db.supplier.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingSupplier) {
      throw new Error('Supplier not found');
    }

    try {
      await db.supplier.delete({
        where: { id: parseInt(id) }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async searchSuppliers(query: string): Promise<Supplier[]> {
    const suppliers = await db.supplier.findMany({
      where: {
        OR: [
          { companyName: { contains: query } },
          { supplierCode: { contains: query } },
          { contactPerson: { contains: query } },
          { email: { contains: query } },
          { phone: { contains: query } },
          { city: { contains: query } },
          { country: { contains: query } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return suppliers.map(supplier => ({
      id: supplier.id.toString(),
      supplier_code: supplier.supplierCode,
      company_name: supplier.companyName,
      contact_person: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      city: supplier.city,
      country: supplier.country,
      postal_code: supplier.postalCode,
      tax_id: supplier.taxId,
      payment_terms: supplier.paymentTerms,
      is_active: supplier.isActive,
      created_at: supplier.createdAt,
      updated_at: supplier.updatedAt
    }));
  }

  async getSupplierStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
  }> {
    const [total, active, inactive] = await Promise.all([
      db.supplier.count(),
      db.supplier.count({ where: { isActive: true } }),
      db.supplier.count({ where: { isActive: false } })
    ]);
    
    return { total, active, inactive };
  }

  async activateSupplier(id: string): Promise<Supplier | null> {
    return await this.updateSupplier(id, { is_active: true });
  }

  async deactivateSupplier(id: string): Promise<Supplier | null> {
    return await this.updateSupplier(id, { is_active: false });
  }

  async updateSupplierContact(id: string, contact_person: string, email: string, phone: string): Promise<Supplier | null> {
    return await this.updateSupplier(id, {
      contact_person,
      email,
      phone
    });
  }

  async updateSupplierAddress(id: string, address: string, city: string, country: string, postal_code: string): Promise<Supplier | null> {
    return await this.updateSupplier(id, {
      address,
      city,
      country,
      postal_code
    });
  }
}