export type WidgetType = 'donut' | 'horizontal-bar' | 'placeholder' | 'custom';

export interface Widget {
  id: string;
  title: string;
  type: WidgetType;
  data?: any;
  customData?: {
    title: string;
    text: string;
  };
}

export interface Category {
  id:string;
  title: string;
  widgets: Widget[];
}

export interface DashboardState {
  categories: Category[];
  widgetVisibility: Record<string, boolean>;
}

export type DashboardAction = 
  | { type: 'TOGGLE_WIDGET_VISIBILITY'; payload: { widgetId: string; isVisible?: boolean } }
  | { type: 'ADD_CUSTOM_WIDGET'; payload: { categoryId: string; title: string; text: string } }
  | { type: 'REMOVE_WIDGET'; payload: { widgetId: string } }
  | { type: 'UPDATE_WIDGET_ORDER'; payload: { sourceCategoryId: string; destCategoryId: string; sourceIndex: number; destIndex: number; widgetId: string } };