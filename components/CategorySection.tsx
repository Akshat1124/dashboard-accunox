import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import { useDashboardState } from '../store/dashboardContext';
import { type Category } from '../types';

interface CategorySectionProps {
  category: Category;
  draggedWidgetId: string | null | undefined;
  onDragStart: (widgetId: string, sourceCategoryId: string, sourceIndex: number) => void;
  onDrop: (destCategoryId: string, destIndex: number) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, onDragStart, onDrop, draggedWidgetId }) => {
  const { widgetVisibility } = useDashboardState();
  const [isDragOver, setIsDragOver] = useState(false);
  
  const visibleWidgets = category.widgets.filter(widget => widgetVisibility[widget.id]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    // If dropping on the section but not a specific widget, add to the end
    onDrop(category.id, visibleWidgets.length);
  };


  return (
    <section>
      <h2 className="text-xl font-semibold text-text-primary mb-4">{category.title}</h2>
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300 rounded-lg ${isDragOver ? 'bg-blue-50/50 ring-2 ring-accent-blue ring-offset-2' : ''}`}
      >
        {visibleWidgets.map((widget, index) => (
          <WidgetCard 
            key={widget.id} 
            widget={widget} 
            isDragged={draggedWidgetId === widget.id}
            onDragStart={() => onDragStart(widget.id, category.id, index)}
            onDrop={() => onDrop(category.id, index)}
          />
        ))}
        {visibleWidgets.length === 0 && (
           <div className="col-span-full text-center py-10 px-6 bg-card border-2 border-dashed border-gray-300 rounded-lg">
             <p className="text-text-secondary">{isDragOver ? "Drop widget here" : "No widgets to display for this category."}</p>
             <p className="text-sm text-gray-400">{!isDragOver && "Try changing your search filter or adding widgets."}</p>
           </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;