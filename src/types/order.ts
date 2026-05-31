export type OrderStatus = 'Scheduled' | 'Delivered';

export interface Order {
  id: string;
  orderNumber: string;
  clientName: string;
  clientEmail: string;
  propertyAddress: string;
  orderTime: string;
  status: OrderStatus;
}