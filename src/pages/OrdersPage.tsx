import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
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
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const keyword = searchTerm.trim().toLowerCase();

  const filteredOrders = useMemo(() => {
    if (!keyword) {
      return mockOrders;
    }

    return mockOrders.filter((order) => {
      return (
        order.orderNumber.toLowerCase().includes(keyword) ||
        order.clientName.toLowerCase().includes(keyword) ||
        order.clientEmail.toLowerCase().includes(keyword) ||
        order.propertyAddress.toLowerCase().includes(keyword)
      );
    });
  }, [keyword]);

  const showDropdown = isSearchFocused && Boolean(keyword);

  const hasSearchResults = filteredOrders.length > 0;

  const tableOrders = keyword && !hasSearchResults ? mockOrders : filteredOrders;

  const handleCreateOrder = () => {
    navigate('/orders/create');
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-center text-4xl font-bold text-slate-950">
        Hi, Welcome {user?.name || 'User'}!
      </h1>

      <div className="mt-8 flex items-center justify-between gap-8">
        <div className="relative mx-auto w-full max-w-2xl">
          <div className="flex h-12 w-full items-center rounded-md bg-slate-100 px-4 focus-within:ring-2 focus-within:ring-blue-300">
            <span className="mr-3 text-slate-400">⌕</span>

            <input
              type="text"
              placeholder="Search from order list"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {showDropdown && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-80 overflow-y-auto rounded-md bg-white py-3 shadow-lg">
              {hasSearchResults ? (
                filteredOrders.map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    onMouseDown={() => {
                      setSearchTerm(order.orderNumber);
                      setIsSearchFocused(false);
                    }}
                    className="block w-full px-8 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <span className="font-medium text-slate-700">
                      {order.orderNumber}
                    </span>{' '}
                    <span className="text-slate-500">
                      ( {order.clientName} )
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-8 py-4 text-sm text-slate-500">
                  No exist order, please try a new one or{' '}
                  <button
                    type="button"
                    onMouseDown={handleCreateOrder}
                    className="font-semibold text-slate-700 underline hover:text-blue-600"
                  >
                    Create New Order
                  </button>
                  .
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleCreateOrder}
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
            {tableOrders.map((order) => (
              <tr key={order.id} className="border-t border-slate-100">
                <td className="px-7 py-4">{order.orderNumber}</td>

                <td className="px-7 py-4">{order.clientName}</td>

                <td
                  className="max-w-xs truncate px-7 py-4"
                  title={order.propertyAddress}
                >
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
      </div>
    </section>
  );
}