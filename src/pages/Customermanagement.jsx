import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Printer, Download } from 'lucide-react';
import { apiFetch } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/customers');
      setCustomers(data);
    } catch (err) {
      console.error("Lỗi tải khách hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Email,Phone,Location,Spent\n"
      + customers.map(c => `${c.name},${c.email},${c.phone},${c.location},${c.spent}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customers_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-[#232f3e]">Khách hàng</h1>
          <p className="text-sm text-gray-500">Quản lý thông tin và lịch sử mua hàng</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => window.print()} 
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium hover:bg-gray-50 transition"
          >
            <Printer size={16} className="mr-2" /> In danh sách
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium hover:bg-gray-50 transition"
          >
            <Download size={16} className="mr-2" /> Xuất dữ liệu
          </button>
        </div>
      </div>

      <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
         {loading ? <LoadingSpinner /> : (
           <table className="w-full text-left border-collapse">
              <thead className="bg-[#fafafa] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Khách hàng</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Liên hệ</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Vị trí</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Đã chi tiêu</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {customers.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-8 text-gray-500">Chưa có khách hàng nào.</td></tr>
                 ) : customers.map((c) => (
                    <tr key={c.id} className="hover:bg-[#f2fcfd] transition group">
                       <td className="px-6 py-4">
                         <div className="flex items-center">
                           <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 mr-3 shrink-0">
                             {c.name.charAt(0).toUpperCase()}
                           </div>
                           <div>
                             <span className="text-[#007185] font-bold hover:underline cursor-pointer block">
                               {c.name}
                             </span>
                             <span className="text-xs text-gray-500">{c.customer_code || `CUS-${c.id}`}</span>
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex flex-col text-sm text-gray-600">
                           <span>{c.email}</span>
                           <span className="text-xs text-gray-500">{c.phone}</span>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-sm text-gray-600">
                         {c.location || c.address || 'N/A'}
                       </td>
                       <td className="px-6 py-4">
                         <span className="font-bold text-[#111]">
                           ${parseFloat(c.spent || 0).toFixed(2)}
                         </span>
                         <div className="text-[10px] text-gray-400">
                           {c.orders_count || 0} đơn hàng
                         </div>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <button className="p-2 text-gray-400 hover:text-[#007185] bg-gray-50 rounded-full transition">
                           <ArrowUpRight size={18} />
                         </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
         )}
      </div>
    </div>
  );
};

export default CustomerManagement;