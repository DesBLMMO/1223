import React from 'react';
import { DollarSign, Package, ShoppingCart, Users, Printer } from 'lucide-react';
import { RevenueBarChart, VisitorLineChart, DonutChart } from '../components/Charts';

// --- MOCK DATA CHO BIỂU ĐỒ ---
// (Dữ liệu này được giữ tĩnh để đảm bảo giao diện đẹp như thiết kế gốc)
const DASHBOARD_DATA = {
  online: [15000, 18000, 12000, 22000, 17000, 21000, 19000],
  offline: [12000, 14000, 11000, 16000, 13000, 15000, 14000],
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
};

const VISITOR_DATA = {
  loyal: [120, 150, 180, 220, 260, 320, 300, 350, 400, 380, 420, 450],
  new: [80, 100, 90, 140, 180, 200, 180, 220, 250, 280, 300, 320]
};

const RETURNS_DATA = [
  { label: "Completed", value: 75, color: "#00E096" },
  { label: "Returned", value: 15, color: "#FF4560" },
  { label: "Pending", value: 10, color: "#FEB019" }
];

const Dashboard = () => {
  return (
    <div className="animate-fadeIn">
      {/* Header & Print Button */}
      <div className="mb-6 flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-[#232f3e]">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Snapshot of key performance indicators</p>
        </div>
        <button 
          onClick={() => window.print()} 
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 text-sm font-medium transition"
        >
           <Printer size={16} className="mr-2" /> Print Report
        </button>
      </div>

      {/* 1. Top Cards: Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Sales", val: "$12.5k", sub: "+8% from yesterday", bg: "bg-[#FFE2E5]", iconBg: "bg-[#FA5A7D]", icon: DollarSign },
          { title: "Total Order", val: "300", sub: "+5% from yesterday", bg: "bg-[#FFF4DE]", iconBg: "bg-[#FF947A]", icon: Package },
          { title: "Product Sold", val: "5", sub: "+1.2% from yesterday", bg: "bg-[#DCFCE7]", iconBg: "bg-[#3CD856]", icon: ShoppingCart },
          { title: "New Customers", val: "8", sub: "0.5% from yesterday", bg: "bg-[#F3E8FF]", iconBg: "bg-[#BF83FF]", icon: Users }
        ].map((item, i) => (
          <div key={i} className={`p-5 rounded-xl ${item.bg} hover:shadow-md transition-shadow`}>
            <div className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center text-white mb-3`}>
              <item.icon size={20} />
            </div>
            <h3 className="text-2xl font-bold text-[#151D48]">{item.val}</h3>
            <p className="text-[#425166] text-sm font-medium mb-1">{item.title}</p>
            <p className="text-xs text-[#4079ED] font-semibold">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* 2. Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Total Revenue Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#05004E] text-lg">Total Revenue</h3>
            <div className="flex gap-3 text-xs font-medium">
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#0095FF] mr-1"></span>Online</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#00E096] mr-1"></span>Offline</div>
            </div>
          </div>
          <RevenueBarChart 
            onlineData={DASHBOARD_DATA.online} 
            offlineData={DASHBOARD_DATA.offline} 
            labels={DASHBOARD_DATA.labels} 
            height={220} 
          />
        </div>

        {/* Visitor Insights Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#05004E] text-lg">Visitor Insights</h3>
            <div className="flex gap-3 text-xs font-medium">
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#884DFF] mr-1"></span>Loyal</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#FF4560] mr-1"></span>New</div>
            </div>
          </div>
          <VisitorLineChart data={VISITOR_DATA} height={220} />
        </div>
      </div>

      {/* 3. Bottom Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Returns Analysis Donut */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <div className="w-full flex justify-between mb-4">
            <h3 className="font-bold text-[#05004E]">Returns Analysis</h3>
          </div>
          <DonutChart data={RETURNS_DATA} />
          <div className="mt-4 w-full space-y-2">
            {RETURNS_DATA.map((d, i) => (
              <div key={i} className="flex justify-between text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: d.color}}></span>
                  {d.label}
                </div>
                <span className="font-bold text-gray-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Placeholder for future widgets (Sales Map, Top Products...) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm col-span-2 flex items-center justify-center text-gray-400 text-sm">
          <span>(Bản đồ doanh số và Sản phẩm bán chạy sẽ hiển thị tại đây khi có đủ dữ liệu thực tế)</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;