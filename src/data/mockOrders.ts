import { type MockOrder } from "../types/order";

export const mockOrders: MockOrder[] = [
  {
    orderNumber: 'REC-1001',
    clientName: 'Alvin Chen',
    propertyAddress: '12 George Street, Sydney NSW 2000',
    orderTime: '2026-05-26 09:30',
    status: 'Scheduled',
  },
  {
    orderNumber: 'REC-1002',
    clientName: 'Emily Wong',
    propertyAddress: '88 Pitt Street, Sydney NSW 2000',
    orderTime: '2026-05-26 11:00',
    status: 'Delivered',
  },
  {
    orderNumber: 'REC-1003',
    clientName: 'Michael Brown',
    propertyAddress: '25 King Street, Newtown NSW 2042',
    orderTime: '2026-05-27 14:00',
    status: 'Scheduled',
  },
  {
    orderNumber: 'REC-1004',
    clientName: 'Sarah Lee',
    propertyAddress: '9 Pacific Highway, North Sydney NSW 2060',
    orderTime: '2026-05-28 10:15',
    status: 'Delivered',
  },
  {
    orderNumber: 'REC-1005',
    clientName: 'David Miller',
    propertyAddress: '45 Oxford Street, Bondi Junction NSW 2022',
    orderTime: '2026-05-29 13:45',
    status: 'Scheduled',
  },
];