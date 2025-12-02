import React, { useState, useEffect } from 'react';
import { Filter, MoreHorizontal, Printer } from 'lucide-react';
import { apiFetch } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const StatusBadge = ({ status }) => {
  const styles = {
    Paid: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Failed: "bg-red-100 text-red-700 border-red-200",
    Refunded: "bg-orange-100 text-orange-700 border-orange-200",
    Delivered: "bg-blue-100 text-blue-700 border-blue-200",
    Processing: "bg-purple-100 text-purple-700 border-purple-200",
    Shipped: "bg-indigo-100 text-indigo-700 border-indigo-200",
    Cancelled: "bg-gray-100 text-gray-700 border-gray-200",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center w-fit ${styles[status] || "bg-gray-100 text-gray-600"}`}>{status}</span>;
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/orders'); // Gọi API Orders mới
        setOrders(data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center print:hidden">
        <div><h1 className="text-2xl font-bold text-[#232f3e]">Orders</h1><p className="text-sm text-gray-500">Track orders & returns</p></div>
        <div className="flex space-x-2">
          <button onClick={() => window.print()} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium"><Printer size={16} className="mr-2" /> Print</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium flex items-center"><Filter size={14} className="mr-2"/> Filter</button>
        </div>
      </div>

      <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
         {loading ? <LoadingSpinner /> : (
           <table className="w-full text-left border-collapse">
              <thead className="bg-[#fafafa] border-b border-gray-200">
                 <tr>
                   <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Order ID</th>
                   <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Customer</th>
                   <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Products</th>
                   <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Payment</th>
                   <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                   <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Total</th>
                   <th className="px-6 py-3 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {orders.length === 0 ? <tr><td colSpan="7" className="text-center py-4">No orders found.</td></tr> : orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#f2fcfd]">
                       <td className="px-6 py-4"><span className="font-bold text-[#007185] hover:underline cursor-pointer">{o.order_code}</span></td>
                       <td className="px-6 py-4"><div className="text-sm font-medium text-gray-900">{o.customer_name}</div><div className="text-xs text-gray-500">{o.date}</div></td>
                       <td className="px-6 py-4 max-w-[200px]"><div className="text-xs text-gray-700 truncate" title={o.product_summary}>{o.product_summary}</div></td>
                       <td className="px-6 py-4"><StatusBadge status={o.payment_status} /></td>
                       <td className="px-6 py-4"><StatusBadge status={o.order_status} /></td>
                       <td className="px-6 py-4"><div className="font-bold text-[#b12704]">${parseFloat(o.total).toFixed(2)}</div></td>
                       <td className="px-6 py-4 text-right"><MoreHorizontal size={18} className="text-gray-400 cursor-pointer" /></td>
                    </tr>
                 ))}
              </tbody>
           </table>
         )}
      </div>
    </div>
  );
};

export default OrderManagement;