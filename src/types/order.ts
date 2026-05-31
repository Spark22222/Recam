export type OrderStatus = 'Scheduled' | 'Delivered';

export interface Order {
  id: string;
  orderNumber: string;
  clientName: string;
  propertyAddress: string;
  orderTime: string;
  status: OrderStatus;
}