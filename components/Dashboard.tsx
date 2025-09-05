import React, { useState } from 'react';
import CategorySection from './CategorySection';
import { type Category } from '../types';
import { useDashboardDispatch } from '../store/dashboardContext';

interface DashboardProps {
  categories: Category[];
}

const Dashboard: React.FC<DashboardProps> = ({ categories }) => {
  const dispatch = useDashboardDispatch();
  const [draggedWidget, setDraggedWidget] = useState<{ widgetId: string; sourceCategoryId: string; sourceIndex: number } | null>(null);

  const handleDragStart = (widgetId: string, sourceCategoryId: string, sourceIndex: number) => {
    setDraggedWidget({ widgetId, sourceCategoryId, sourceIndex });
  };

  const handleDrop = (destCategoryId: string, destIndex: number) => {
    if (!draggedWidget) return;

    const { widgetId, sourceCategoryId, sourceIndex } = draggedWidget;

    // Prevent dropping in the same spot
    if (sourceCategoryId === destCategoryId && sourceIndex === destIndex) {
      setDraggedWidget(null);
      return;
    }

    dispatch({
      type: 'UPDATE_WIDGET_ORDER',
      payload: {
        widgetId,
        sourceCategoryId,
        sourceIndex,
        destCategoryId,
        destIndex,
      },
    });
    setDraggedWidget(null);
  };

  return (
    <div className="space-y-8">
      {categories.map(category => (
        <CategorySection 
          key={category.id} 
          category={category}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          draggedWidgetId={draggedWidget?.widgetId}
        />
      ))}
    </div>
  );
};

export default Dashboard;