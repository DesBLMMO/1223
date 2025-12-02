import React, { useState } from 'react';
import { LayoutDashboard, Package, Users, ShoppingCart, LogOut, Menu, Bell, User, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children, activePage, setActivePage }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'products', icon: Package, label: 'Inventory' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' }, 
    { id: 'customers', icon: Users, label: 'Customers' },
  ];

  return (
    <div className="flex h-screen bg-[#f1f3f6] print:bg-white font-sans">
      {/* --- SIDEBAR --- */}
      <aside className={`print:hidden ${isSidebarOpen ? 'w-64' : 'w-16'} bg-[#232f3e] text-white transition-all duration-300 flex flex-col z-30 shrink-0`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-gray-700 bg-[#131921]">
          {isSidebarOpen ? (
            <div className="flex items-center gap-1 font-bold text-xl tracking-tight">
               <span className="text-white">Admin</span><span className="text-[#febd69]">Central</span>
            </div>
          ) : <span className="text-[#febd69] font-bold">A</span>}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center px-4 py-3 transition-colors border-l-4 ${
                activePage === item.id 
                  ? 'bg-[#37475a] border-[#febd69] text-white font-bold' 
                  : 'border-transparent text-gray-300 hover:text-white hover:bg-[#37475a]'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="ml-3 text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button onClick={logout} className="w-full flex items-center text-gray-400 hover:text-white transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-3 text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden print:overflow-visible">
        
        {/* Header / Navbar */}
        <header className="print:hidden h-16 bg-white shadow-sm flex items-center justify-between px-4 z-20 border-b border-gray-200">
          <div className="flex items-center flex-1">
            {/* Toggle Sidebar Button */}
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded text-gray-600 mr-4">
              <Menu size={24} />
            </button>
            
            {/* Search Bar (Visual Only) */}
            <div className="hidden md:flex flex-1 max-w-2xl h-10 rounded overflow-hidden border border-gray-300 focus-within:border-[#e77600] focus-within:ring-2 focus-within:ring-[#e77600]/50 transition-all shadow-sm">
                <select className="bg-gray-100 text-gray-600 text-xs px-2 border-r border-gray-300 outline-none hover:bg-gray-200 cursor-pointer">
                    <option>All</option><option>Products</option><option>Orders</option>
                </select>
                <input type="text" placeholder="Search..." className="flex-1 px-4 text-sm outline-none text-gray-700" />
                <button className="bg-[#febd69] hover:bg-[#f3a847] px-5 flex items-center justify-center transition-colors">
                    <Search size={20} className="text-[#232f3e]" />
                </button>
            </div>
          </div>

          {/* User Profile Area */}
          <div className="flex items-center space-x-6 ml-4">
            <div className="relative cursor-pointer text-gray-600 hover:text-[#e77600]">
              <Bell size={20} /><span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                  <p className="text-xs text-gray-500">Hello,</p>
                  <p className="text-sm font-bold text-[#232f3e] group-hover:text-[#e77600]">{user?.username || 'Admin'}</p>
              </div>
              <div className="h-9 w-9 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300">
                  <User size={18} className="text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f1f3f6] p-6 print:bg-white print:p-0 print:overflow-visible">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;