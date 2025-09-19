import { db } from '../prisma.server';
import { Customer, CreateCustomerData, UpdateCustomerData } from '../../models/Customer';

export class CustomerService {
  constructor() {
    // Prisma 客户端已全局配置
  }

  async getAllCustomers(): Promise<Customer[]> {
    const customers = await db.customer.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return customers.map(customer => ({
      id: customer.id.toString(),
      customer_code: customer.customerCode,
      company_name: customer.companyName,
      contact_person: customer.contactPerson,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      postal_code: customer.postalCode,
      tax_id: customer.taxId,
      credit_limit: customer.creditLimit,
      is_active: customer.isActive,
      created_at: customer.createdAt,
      updated_at: customer.updatedAt
    }));
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    const customer = await db.customer.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!customer) return null;
    
    return {
      id: customer.id.toString(),
      customer_code: customer.customerCode,
      company_name: customer.companyName,
      contact_person: customer.contactPerson,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      postal_code: customer.postalCode,
      tax_id: customer.taxId,
      credit_limit: customer.creditLimit,
      is_active: customer.isActive,
      created_at: customer.createdAt,
      updated_at: customer.updatedAt
    };
  }

  async getCustomerByCode(customer_code: string): Promise<Customer | null> {
    const customer = await db.customer.findUnique({
      where: { customerCode: customer_code }
    });
    
    if (!customer) return null;
    
    return {
      id: customer.id.toString(),
      customer_code: customer.customerCode,
      company_name: customer.companyName,
      contact_person: customer.contactPerson,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      postal_code: customer.postalCode,
      tax_id: customer.taxId,
      credit_limit: customer.creditLimit,
      is_active: customer.isActive,
      created_at: customer.createdAt,
      updated_at: customer.updatedAt
    };
  }

  async getActiveCustomers(): Promise<Customer[]> {
    const customers = await db.customer.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    
    return customers.map(customer => ({
      id: customer.id.toString(),
      customer_code: customer.customerCode,
      company_name: customer.companyName,
      contact_person: customer.contactPerson,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      postal_code: customer.postalCode,
      tax_id: customer.taxId,
      credit_limit: customer.creditLimit,
      is_active: customer.isActive,
      created_at: customer.createdAt,
      updated_at: customer.updatedAt
    }));
  }

  async createCustomer(data: CreateCustomerData): Promise<Customer> {
    // 检查客户代码是否已存在
    const existingCustomer = await db.customer.findUnique({
      where: { customerCode: data.customer_code }
    });
    if (existingCustomer) {
      throw new Error('Customer code already exists');
    }

    const customer = await db.customer.create({
      data: {
        customerCode: data.customer_code,
        companyName: data.company_name,
        contactPerson: data.contact_person,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        country: data.country,
        postalCode: data.postal_code,
        taxId: data.tax_id,
        creditLimit: data.credit_limit || 0,
        isActive: true
      }
    });
    
    return {
      id: customer.id.toString(),
      customer_code: customer.customerCode,
      company_name: customer.companyName,
      contact_person: customer.contactPerson,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      postal_code: customer.postalCode,
      tax_id: customer.taxId,
      credit_limit: customer.creditLimit,
      is_active: customer.isActive,
      created_at: customer.createdAt,
      updated_at: customer.updatedAt
    };
  }

  async updateCustomer(id: string, data: UpdateCustomerData): Promise<Customer | null> {
    const existingCustomer = await db.customer.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingCustomer) {
      throw new Error('Customer not found');
    }

    // 如果更新客户代码，检查是否已存在
    if (data.customer_code && data.customer_code !== existingCustomer.customerCode) {
      const codeExists = await db.customer.findUnique({
        where: { customerCode: data.customer_code }
      });
      if (codeExists) {
        throw new Error('Customer code already exists');
      }
    }

    try {
      const customer = await db.customer.update({
        where: { id: parseInt(id) },
        data: {
          ...(data.customer_code && { customerCode: data.customer_code }),
          ...(data.company_name && { companyName: data.company_name }),
          ...(data.contact_person !== undefined && { contactPerson: data.contact_person }),
          ...(data.email !== undefined && { email: data.email }),
          ...(data.phone !== undefined && { phone: data.phone }),
          ...(data.address !== undefined && { address: data.address }),
          ...(data.city !== undefined && { city: data.city }),
          ...(data.country !== undefined && { country: data.country }),
          ...(data.postal_code !== undefined && { postalCode: data.postal_code }),
          ...(data.tax_id !== undefined && { taxId: data.tax_id }),
          ...(data.credit_limit !== undefined && { creditLimit: data.credit_limit }),
          ...(data.is_active !== undefined && { isActive: data.is_active })
        }
      });
      
      return {
        id: customer.id.toString(),
        customer_code: customer.customerCode,
        company_name: customer.companyName,
        contact_person: customer.contactPerson,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        country: customer.country,
        postal_code: customer.postalCode,
        tax_id: customer.taxId,
        credit_limit: customer.creditLimit,
        is_active: customer.isActive,
        created_at: customer.createdAt,
        updated_at: customer.updatedAt
      };
    } catch (error) {
      return null;
    }
  }

  async deleteCustomer(id: string): Promise<boolean> {
    const existingCustomer = await db.customer.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingCustomer) {
      throw new Error('Customer not found');
    }

    try {
      await db.customer.delete({
        where: { id: parseInt(id) }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async searchCustomers(query: string): Promise<Customer[]> {
    const customers = await db.customer.findMany({
      where: {
        OR: [
          { companyName: { contains: query } },
          { customerCode: { contains: query } },
          { contactPerson: { contains: query } },
          { email: { contains: query } },
          { phone: { contains: query } },
          { city: { contains: query } },
          { country: { contains: query } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return customers.map(customer => ({
      id: customer.id.toString(),
      customer_code: customer.customerCode,
      company_name: customer.companyName,
      contact_person: customer.contactPerson,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      postal_code: customer.postalCode,
      tax_id: customer.taxId,
      credit_limit: customer.creditLimit,
      is_active: customer.isActive,
      created_at: customer.createdAt,
      updated_at: customer.updatedAt
    }));
  }

  async getCustomerStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
  }> {
    const [total, active, inactive] = await Promise.all([
      db.customer.count(),
      db.customer.count({ where: { isActive: true } }),
      db.customer.count({ where: { isActive: false } })
    ]);
    
    return { total, active, inactive };
  }

  async activateCustomer(id: string): Promise<Customer | null> {
    return await this.updateCustomer(id, { is_active: true });
  }

  async deactivateCustomer(id: string): Promise<Customer | null> {
    return await this.updateCustomer(id, { is_active: false });
  }

  async updateCustomerContact(id: string, contact_person: string, email: string, phone: string): Promise<Customer | null> {
    return await this.updateCustomer(id, {
      contact_person,
      email,
      phone
    });
  }

  async updateCustomerAddress(id: string, address: string, city: string, country: string, postal_code: string): Promise<Customer | null> {
    return await this.updateCustomer(id, {
      address,
      city,
      country,
      postal_code
    });
  }

  async updateCreditLimit(id: string, credit_limit: number): Promise<Customer | null> {
    return await this.updateCustomer(id, { credit_limit });
  }
}