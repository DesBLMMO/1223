import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, CheckSquare, Star, Printer } from 'lucide-react';
import { apiFetch } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import EditProductModal from '../components/EditProductModal';

// Component Helper hiển thị sao đánh giá
const StarRating = ({ rating }) => (
  <div className="flex text-yellow-500">
    {[...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={10} 
        fill={i < Math.floor(rating) ? "currentColor" : "none"} 
        strokeWidth={2} 
        className={i < rating ? "text-yellow-500" : "text-gray-300"} 
      />
    ))}
  </div>
);

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm load dữ liệu từ API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/products');
      setProducts(data);
    } catch (err) { 
      console.error("Lỗi tải sản phẩm:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Xử lý Lưu (Thêm mới hoặc Cập nhật)
  const handleSaveProduct = async (formData) => {
    try {
      // Chuyển đổi dữ liệu sang đúng kiểu số trước khi gửi về Backend
      const payload = {
        ...formData,
        importPrice: parseFloat(formData.importPrice) || 0,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        rating: parseFloat(formData.rating) || 5.0
      };

      if (formData.id) {
        // Update
        await apiFetch(`/products/${formData.id}`, { 
          method: 'PUT', 
          body: JSON.stringify(payload) 
        });
      } else {
        // Create
        await apiFetch('/products', { 
          method: 'POST', 
          body: JSON.stringify(payload) 
        });
      }
      
      setIsModalOpen(false);
      fetchProducts(); // Load lại danh sách
    } catch (err) { 
      alert(`Lỗi lưu sản phẩm: ${err.message}`); 
    }
  };

  // Xử lý Xóa
  const handleDelete = async (id) => {
    if(window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        // Lưu ý: Cần đảm bảo Backend có API DELETE /products/:id
        // Nếu chưa có, bạn có thể comment dòng dưới để tránh lỗi
        await apiFetch(`/products/${id}`, { method: 'DELETE' });
        
        // Tạm thời chỉ thông báo vì Backend mẫu chưa có route DELETE
        alert("Đã gửi yêu cầu xóa (Backend cần hỗ trợ method DELETE)");
      } catch (err) {
        alert("Xóa thất bại: " + err.message);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {isModalOpen && (
        <EditProductModal 
          product={editingProduct} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveProduct} 
        />
      )}
      
      <div className="flex justify-between items-end print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-[#232f3e]">Kho hàng</h1>
          <p className="text-sm text-gray-500">Quản lý danh sách và lợi nhuận</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => window.print()} 
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium hover:bg-gray-50 transition"
          >
            <Printer size={16} className="mr-2" /> In báo cáo
          </button>
          <button 
            onClick={() => { setEditingProduct({}); setIsModalOpen(true); }} 
            className="flex items-center px-4 py-2 bg-[#f0c14b] border border-[#a88734] rounded shadow-sm hover:bg-[#f4d078] text-[#111] text-sm font-medium transition"
          >
            <Plus size={16} className="mr-2" /> Thêm sản phẩm
          </button>
        </div>
      </div>

      <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
        {loading ? <LoadingSpinner /> : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fafafa] border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Chi tiết sản phẩm</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Giá (Nhập / Bán)</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Kho & Đánh giá</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Lợi nhuận</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">Chưa có sản phẩm nào.</td></tr>
              ) : products.map((p) => {
                const importPrice = parseFloat(p.importPrice || 0);
                const price = parseFloat(p.price || 0);
                const profit = price - importPrice;
                const margin = price > 0 ? ((profit / price) * 100).toFixed(0) : 0;

                return (
                  <tr key={p.id} className="hover:bg-[#f2fcfd] transition">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-[#007185] hover:underline cursor-pointer">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.category || 'Chưa phân loại'}</div>
                      <div className="text-[10px] text-gray-400 mt-1">SKU: {p.sku || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Vốn: ${importPrice.toFixed(2)}</span>
                        <span className="text-sm font-bold text-[#b12704]">${price.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className={`text-sm font-medium flex items-center ${p.stock > 10 ? 'text-green-700' : 'text-red-700'}`}>
                          {p.stock > 10 && <CheckSquare size={14} className="mr-1"/>} 
                          {p.stock} sản phẩm
                        </span>
                        <div className="flex items-center" title={`Rating: ${p.rating}`}>
                          <StarRating rating={p.rating || 0} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-green-700">+${profit.toFixed(2)}</div>
                      <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1">
                        {margin}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => { setEditingProduct(p); setIsModalOpen(true); }} 
                          className="p-2 text-gray-400 hover:text-[#007185] bg-blue-50 rounded-full transition"
                          title="Sửa"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)} 
                          className="p-2 text-gray-400 hover:text-red-600 bg-red-50 rounded-full transition"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;