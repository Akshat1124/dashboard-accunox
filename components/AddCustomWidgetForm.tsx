import React, { useState } from 'react';
import { useDashboardDispatch } from '../store/dashboardContext';
import { type Category } from '../types';

interface AddCustomWidgetFormProps {
    categories: Category[];
    onClose: () => void;
}

const AddCustomWidgetForm: React.FC<AddCustomWidgetFormProps> = ({ categories, onClose }) => {
    const dispatch = useDashboardDispatch();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || '');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !selectedCategory) {
            setError('Widget name and category are required.');
            return;
        }
        dispatch({
            type: 'ADD_CUSTOM_WIDGET',
            payload: {
                categoryId: selectedCategory,
                title,
                text,
            },
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
                <div>
                    <label htmlFor="widget-title" className="block text-sm font-medium text-gray-700">
                        Widget Name
                    </label>
                    <input
                        type="text"
                        id="widget-title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            setError('')
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="e.g., My Team's Notes"
                    />
                </div>
                <div>
                    <label htmlFor="widget-text" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="widget-text"
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="Add your text content here..."
                    />
                </div>
                <div>
                    <label htmlFor="widget-category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="widget-category"
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value)
                            setError('')
                        }}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
             <div className="px-6 pb-4 flex justify-end">
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark">
                    Create Widget
                </button>
            </div>
        </form>
    );
};

export default AddCustomWidgetForm;