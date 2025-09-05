import React, { useState } from 'react';
import { useDashboardState, useDashboardDispatch } from '../store/dashboardContext';
import { CloseIcon } from './icons/Icons';
import { type Category } from '../types';
import AddCustomWidgetForm from './AddCustomWidgetForm';

interface AddWidgetModalProps {
  onClose: () => void;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({ onClose }) => {
  const { categories, widgetVisibility } = useDashboardState();
  const dispatch = useDashboardDispatch();
  const [activeTab, setActiveTab] = useState<string>('predefined');
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>(categories[0]?.id || '');

  const handleToggle = (widgetId: string) => {
    dispatch({ type: 'TOGGLE_WIDGET_VISIBILITY', payload: { widgetId } });
  };
  
  const activeCategory: Category | undefined = categories.find(c => c.id === activeCategoryTab);
  const predefinedWidgets = activeCategory?.widgets.filter(w => w.type !== 'custom') || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-text-primary">Add Widget</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="border-b border-gray-200 px-6">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <button
                    onClick={() => setActiveTab('predefined')}
                    className={`${
                        activeTab === 'predefined'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                >
                    Personalise Dashboard
                </button>
                <button
                    onClick={() => setActiveTab('custom')}
                    className={`${
                        activeTab === 'custom'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                >
                    Create Custom Widget
                </button>
            </nav>
        </div>
        
        {activeTab === 'predefined' && (
          <div className="p-6">
              <p className="text-text-secondary mb-4">Select from the predefined widgets below.</p>
              <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                      {categories.map(category => (
                          <button
                              key={category.id}
                              onClick={() => setActiveCategoryTab(category.id)}
                              className={`${
                                  activeCategoryTab === category.id
                                  ? 'border-primary text-primary'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                          >
                              {category.title.split(' ')[0]}
                          </button>
                      ))}
                  </nav>
              </div>

              <div className="mt-6 space-y-4 max-h-64 overflow-y-auto">
                  {predefinedWidgets.length > 0 ? predefinedWidgets.map(widget => (
                      <label key={widget.id} className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                          <input
                              type="checkbox"
                              checked={widgetVisibility[widget.id] || false}
                              onChange={() => handleToggle(widget.id)}
                              className="h-4 w-4 text-primary focus:ring-primary-dark border-gray-300 rounded"
                          />
                          <span className="text-text-primary">{widget.title}</span>
                      </label>
                  )) : (
                    <p className="text-text-secondary text-center py-4">No predefined widgets in this category.</p>
                  )}
              </div>
          </div>
        )}

        {activeTab === 'custom' && (
            <AddCustomWidgetForm categories={categories} onClose={onClose}/>
        )}
        
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            {activeTab === 'custom' ? 'Cancel' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;