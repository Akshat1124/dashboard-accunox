
import React from 'react';
import { ChartBarIcon } from './icons/Icons';

interface PlaceholderWidgetProps {
    text: string;
}

const PlaceholderWidget: React.FC<PlaceholderWidgetProps> = ({ text }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-400">
            <ChartBarIcon className="w-12 h-12 mb-2" />
            <p>{text}</p>
        </div>
    );
};

export default PlaceholderWidget;
