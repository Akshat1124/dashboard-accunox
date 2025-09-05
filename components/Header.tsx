
import React from 'react';
import { SearchIcon, AddIcon, CalendarIcon, MoreIcon } from './icons/Icons';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddWidgetClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, onAddWidgetClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center">
        <span className="text-gray-400">Home</span>
        <span className="text-gray-400 mx-2">/</span>
        <span className="text-text-primary font-medium">Dashboard V2</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition"
          />
        </div>

        <button 
            onClick={onAddWidgetClick}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-text-primary hover:bg-gray-50 transition"
        >
          <AddIcon className="w-5 h-5" />
          Add Widget
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-text-primary hover:bg-gray-50 transition">
          <CalendarIcon className="w-5 h-5" />
          Last 2 days
        </button>

        <button className="p-2 border border-gray-300 rounded-md text-text-primary hover:bg-gray-50 transition">
            <MoreIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
