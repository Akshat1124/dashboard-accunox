import React from 'react';
import { useDashboardDispatch } from '../store/dashboardContext';
import { type Widget } from '../types';
import DonutChartWidget from './charts/DonutChartWidget';
import HorizontalBarChartWidget from './charts/HorizontalBarChartWidget';
import PlaceholderWidget from './PlaceholderWidget';
import { CloseIcon } from './icons/Icons';

interface WidgetCardProps {
  widget: Widget;
  isDragged: boolean;
  onDragStart: () => void;
  onDrop: () => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ widget, isDragged, onDragStart, onDrop }) => {
  const dispatch = useDashboardDispatch();

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_WIDGET', payload: { widgetId: widget.id } });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };


  const renderContent = () => {
    switch (widget.type) {
      case 'donut':
        return <DonutChartWidget data={widget.data} />;
      case 'horizontal-bar':
        return <HorizontalBarChartWidget data={widget.data} />;
      case 'placeholder':
        return <PlaceholderWidget text={widget.data.text} />;
      case 'custom':
        return (
            <div className="text-left w-full h-full p-2">
                <p className="text-text-secondary">{widget.customData?.text}</p>
            </div>
        );
      default:
        return <div>Unsupported widget type</div>;
    }
  };

  const title = widget.type === 'custom' ? widget.customData?.title : widget.title;

  return (
    <div 
      draggable 
      onDragStart={onDragStart}
      onDragOver={handleDragOver}
      onDrop={onDrop}
  className={`bg-card rounded-lg shadow-sm border border-gray-200 flex flex-col min-h-[300px] min-w-[340px] transition-all duration-200 ${isDragged ? 'opacity-50 scale-95 shadow-lg' : 'opacity-100'}`}
      >
      <header className="p-4 border-b border-gray-200 flex justify-between items-center cursor-move">
        <div className="flex items-center gap-2">
            <h3 className="font-semibold text-text-primary">{title}</h3>
            {widget.type === 'custom' && (
                <span className="text-xs font-medium bg-blue-100 text-accent-blue px-2 py-0.5 rounded-full">Custom</span>
            )}
        </div>
        <button onClick={handleRemove} className="text-gray-400 hover:text-red-500 transition-colors" title={widget.type === 'custom' ? 'Delete Widget' : 'Hide Widget'}>
          <CloseIcon className="w-5 h-5" />
        </button>
      </header>
      <main className="p-4 flex-grow flex items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default WidgetCard;