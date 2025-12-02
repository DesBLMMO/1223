import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

const EditProductModal = ({ product, onClose, onSave }) => {
  const isEditing = !!product.id;
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    sku: '', 
    description: '',
    ...product 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-800">{isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tên sản phẩm</label>
            <input 
              type="text" name="name" value={formData.name} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#5D5FEF] focus:ring-2 focus:ring-[#5D5FEF]/20 outline-none transition" 
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">SKU</label>
              <input 
                type="text" name="sku" value={formData.sku} onChange={handleChange}
                placeholder="Mã duy nhất"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#5D5FEF] focus:ring-2 focus:ring-[#5D5FEF]/20 outline-none transition" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Giá ($)</label>
              <input 
                type="number" name="price" step="0.01" value={formData.price} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#5D5FEF] focus:ring-2 focus:ring-[#5D5FEF]/20 outline-none transition" 
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Mô tả</label>
            <textarea 
              name="description" value={formData.description || ''} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#5D5FEF] focus:ring-2 focus:ring-[#5D5FEF]/20 outline-none transition" 
              rows="3"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Hủy</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#5D5FEF] rounded-lg hover:bg-[#4b4dcf] shadow-md hover:shadow-lg transition flex items-center">
              <Save size={16} className="mr-2" /> Lưu lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;