
import React from 'react';

interface HorizontalBarChartWidgetProps {
  data: {
    total: number;
    totalLabel: string;
    metrics: { name: string; value: number; color: string }[];
  };
}

const HorizontalBarChartWidget: React.FC<HorizontalBarChartWidgetProps> = ({ data }) => {
  const { total, totalLabel, metrics } = data;
  const totalValue = metrics.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <span className="text-lg font-bold">{total}</span>
        <span className="text-text-secondary ml-2">{totalLabel}</span>
      </div>
      <div className="w-full flex h-4 rounded-full overflow-hidden my-4">
        {metrics.map((item, index) => {
          if (item.value === 0) return null;
          const percentage = totalValue > 0 ? (item.value / totalValue) * 100 : 0;
          return (
            <div
              key={index}
              className="h-full"
              style={{ width: `${percentage}%`, backgroundColor: item.color }}
              title={`${item.name}: ${item.value}`}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {metrics.map((item) => (
          <div key={item.name} className="flex items-center">
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-text-secondary mr-1">{item.name}</span>
            <span className="font-medium text-text-primary">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalBarChartWidget;
