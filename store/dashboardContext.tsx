import React, { createContext, useReducer, useContext, useEffect, type Dispatch, type ReactNode } from 'react';
import { type DashboardState, type DashboardAction, type Widget } from '../types';
import { getInitialDashboardState } from '../data/dashboardData';

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