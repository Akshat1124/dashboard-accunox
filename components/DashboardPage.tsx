
import React, { useState, useMemo } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import AddWidgetModal from './AddWidgetModal';
import { useDashboardState } from '../store/dashboardContext';
import { type Category } from '../types';

import { useDashboardStore } from '../store/dashboardStore';

// ...existing code...
const DashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dashboardState = useDashboardState();

  const filteredCategories = useMemo((): Category[] => {
    if (!searchTerm.trim()) {
      return dashboardState.categories;
    }

    const lowercasedFilter = searchTerm.toLowerCase();
    
    return dashboardState.categories
      .map(category => ({
        ...category,
        widgets: category.widgets.filter(widget =>
          widget.title.toLowerCase().includes(lowercasedFilter)
        ),
      }))
      .filter(category => category.widgets.length > 0);
  }, [searchTerm, dashboardState.categories]);

  return (
    <div className="flex h-screen">
      <nav className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
         {/* Simple Sidebar Placeholder */}
      </nav>
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onAddWidgetClick={() => setIsModalOpen(true)} 
        />
        <div className="flex-1 overflow-y-auto p-6">
          <Dashboard categories={filteredCategories} />
        </div>
        {isModalOpen && <AddWidgetModal onClose={() => setIsModalOpen(false)} />}
      </main>
    </div>
  );
};

export default DashboardPage;
