import React, { createContext, useReducer, useContext, useEffect, type Dispatch, type ReactNode } from 'react';
import { type DashboardState, type DashboardAction, type Widget } from '../types';
import { getInitialDashboardState } from '../data/dashboardData';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const DashboardStateContext = createContext<DashboardState | undefined>(undefined);
const DashboardDispatchContext = createContext<Dispatch<DashboardAction> | undefined>(undefined);

const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'TOGGLE_WIDGET_VISIBILITY': {
      const { widgetId, isVisible } = action.payload;
      const currentVisibility = state.widgetVisibility[widgetId];
      const newVisibility = isVisible !== undefined ? isVisible : !currentVisibility;
      
      return {
        ...state,
        widgetVisibility: {
          ...state.widgetVisibility,
          [widgetId]: newVisibility,
        },
      };
    }
    case 'ADD_CUSTOM_WIDGET': {
      const { categoryId, title, text } = action.payload;
      const newWidget: Widget = {
        id: `custom-${Date.now()}`,
        title: title,
        type: 'custom',
        customData: {
          title,
          text,
        },
      };

      const newCategories = state.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: [...category.widgets, newWidget],
          };
        }
        return category;
      });

      return {
        ...state,
        categories: newCategories,
        widgetVisibility: {
          ...state.widgetVisibility,
          [newWidget.id]: true,
        },
      };
    }
    case 'REMOVE_WIDGET': {
      const { widgetId } = action.payload;

      const newCategories = state.categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget => widget.id !== widgetId),
      }));

      const newVisibility = { ...state.widgetVisibility };
      // If it's a custom widget, remove it from visibility map entirely
      if (widgetId.startsWith('custom-')) {
        delete newVisibility[widgetId];
      } else {
        // Otherwise just hide it
        newVisibility[widgetId] = false;
      }
      

      return {
        ...state,
        categories: newCategories,
        widgetVisibility: newVisibility,
      };
    }
    case 'UPDATE_WIDGET_ORDER': {
      const { sourceCategoryId, destCategoryId, sourceIndex, destIndex, widgetId } = action.payload;
      const newCategories = JSON.parse(JSON.stringify(state.categories));

      const sourceCategory = newCategories.find((c: any) => c.id === sourceCategoryId);
      const destCategory = newCategories.find((c: any) => c.id === destCategoryId);

      if (!sourceCategory || !destCategory) return state;

      const [movedWidget] = sourceCategory.widgets.splice(sourceIndex, 1);
      destCategory.widgets.splice(destIndex, 0, movedWidget);

      return {
        ...state,
        categories: newCategories,
      };
    }
    default: {
      return state;
    }
  }
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dashboardReducer, getInitialDashboardState());

  useEffect(() => {
    try {
      localStorage.setItem('dashboardState', JSON.stringify(state));
    } catch (error) {
      console.error("Could not save dashboard state to localStorage", error);
    }
  }, [state]);

  return (
    <DashboardStateContext.Provider value={state}>
      <DashboardDispatchContext.Provider value={dispatch}>
        {children}
      </DashboardDispatchContext.Provider>
    </DashboardStateContext.Provider>
  );
};

export const useDashboardState = () => {
  const context = useContext(DashboardStateContext);
  if (context === undefined) {
    throw new Error('useDashboardState must be used within a DashboardProvider');
  }
  return context;
};

export const useDashboardDispatch = () => {
  const context = useContext(DashboardDispatchContext);
  if (context === undefined) {
    throw new Error('useDashboardDispatch must be used within a DashboardProvider');
  }
  return context;
};

const data = [
  { name: 'Passed', value: 7253, color: '#22c55e' },
  { name: 'Warning', value: 880, color: '#fbbf24' },
  { name: 'Failed', value: 1688, color: '#ef4444' },
  { name: 'Not available', value: 36, color: '#6b7280' }
];

export function CloudAccountRiskAssessmentWidget() {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            innerRadius="60%"
            stroke="#fff"
            strokeWidth={3}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}