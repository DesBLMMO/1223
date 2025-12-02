import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8 text-[#007185]">
    <Loader className="animate-spin mr-2" /> Đang tải dữ liệu...
  </div>
);

export default LoadingSpinner;