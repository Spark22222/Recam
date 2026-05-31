import { useMemo, useState } from 'react';
import { getCurrentUser } from '../utils/authStorage';
import { mockOrders } from '../data/mockOrders';
import type { OrderStatus } from '../types/order';

const getStatusClassName = (status: OrderStatus) => {
  if (status === 'Delivered') {
    return 'bg-green-100 text-green-700';
  }

  return 'bg-blue-100 text-blue-700';
};

export default function OrdersPage() {
  const user = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) {
      return mockOrders;
    }

    return mockOrders.filter((order) => {
      return (
        order.orderNumber.toLowerCase().includes(keyword) ||
        order.clientName.toLowerCase().includes(keyword) ||
        order.propertyAddress.toLowerCase().includes(keyword) ||
        order.status.toLowerCase().includes(keyword)
      );
    });
  }, [searchTerm]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-center text-4xl font-bold text-slate-950">
        Hi, Welcome {user?.name || 'User'}!
      </h1>

      <div className="mt-8 flex items-center justify-between gap-8">
        <div className="mx-auto flex h-12 w-full max-w-2xl items-center rounded-md bg-slate-100 px-4">
          <span className="mr-3 text-slate-400">⌕</span>

          <input
            type="text"
            placeholder="Search from order list"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          type="button"
          className="h-12 min-w-44 rounded-md bg-[#4C9CE2] px-6 text-sm font-semibold text-white transition hover:bg-[#2f8bd8]"
        >
          + Create Order
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100 text-slate-950">
            <tr>
              <th className="px-7 py-4 font-bold">Order Number</th>
              <th className="px-7 py-4 font-bold">Client Name</th>
              <th className="px-7 py-4 font-bold">Property Address</th>
              <th className="px-7 py-4 font-bold">Order Time</th>
              <th className="px-7 py-4 font-bold">Status</th>
              <th className="px-7 py-4 font-bold"></th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.orderNumber} className="border-t border-slate-100">
                <td className="px-7 py-4">{order.orderNumber}</td>
                <td className="px-7 py-4">{order.clientName}</td>
                <td className="max-w-xs truncate px-7 py-4" title={order.propertyAddress}>
                  {order.propertyAddress}
                </td>
                <td className="px-7 py-4">{order.orderTime}</td>
                <td className="px-7 py-4">
                  <span
                    className={`inline-flex rounded-md px-4 py-1 text-xs font-semibold ${getStatusClassName(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-7 py-4 text-right font-bold">...</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="py-10 text-center text-sm text-slate-500">
            No orders found.
          </div>
        )}
      </div>
    </section>
  );
}