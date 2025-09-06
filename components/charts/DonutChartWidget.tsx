
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface DonutChartWidgetProps {
  data: {
    total: number;
    metrics: { name: string; value: number; color: string }[];
  };
}

const DonutChartWidget: React.FC<DonutChartWidgetProps> = ({ data }) => {
  const { total, metrics } = data;

  return (
    <div className="w-full h-full flex items-center">
      <ResponsiveContainer width="50%" height="100%">
        <PieChart>
          <Pie
            data={metrics}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
            isAnimationActive={true}
          >
            {metrics.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <foreignObject x="50%" y="50%" width="100" height="100" style={{ transform: 'translate(-50px, -25px)'}}>
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-bold text-text-primary">{total}</div>
              <div className="text-sm text-text-secondary">Total</div>
            </div>
          </foreignObject>
        </PieChart>
      </ResponsiveContainer>
      <div className="w-1/2 flex flex-col justify-center space-y-2">
        {metrics.map((item) => (
          <div key={item.name} className="flex items-center text-sm">
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-text-secondary mr-auto">{item.name}</span>
            <span className="font-medium text-text-primary">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChartWidget;
