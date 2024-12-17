import React from 'react';
import { Menu, Home, Users, Briefcase, DollarSign, LogOut } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gray-800">
          <div className="flex items-center h-16 px-4 bg-gray-900">
            <h1 className="text-xl font-bold text-white">RenovERP</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            <NavItem icon={<Home />} text="Dashboard" active />
            <NavItem icon={<Users />} text="Customers" />
            <NavItem icon={<Briefcase />} text="Projects" />
            <NavItem icon={<DollarSign />} text="Sales" />
          </nav>
          <div className="p-4 border-t border-gray-700">
            <button className="flex items-center w-full px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Welcome back, Admin</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}> = ({ icon, text, active }) => {
  return (
    <a
      href="#"
      className={`flex items-center px-4 py-2 text-sm rounded-md ${
        active
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {text}
    </a>
  );
};

export default Layout;