import { create } from 'zustand';

export type Widget = {
  id: string;
  name: string;
  text: string;
};

export type Category = {
  id: string;
  name: string;
  widgets: Widget[];
};

export type DashboardState = {
  categories: Category[];
  addWidget: (categoryId: string, widget: Widget) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  searchWidgets: (query: string) => Widget[];
};

const initialCategories: Category[] = [
  {
    id: 'cspm',
    name: 'CSPM Executive Dashboard',
    widgets: [
      { id: 'cloud-accounts', name: 'Cloud Accounts', text: 'Random text for Cloud Accounts widget' },
      { id: 'risk-assessment', name: 'Cloud Account Risk Assessment', text: 'Random text for Risk Assessment widget' }
    ]
  },
  {
    id: 'cwpp',
    name: 'CWPP Dashboard',
    widgets: []
  },
  {
    id: 'registry',
    name: 'Registry Scan',
    widgets: []
  }
];

export const useDashboardStore = create<DashboardState>((set, get) => ({
  categories: initialCategories,
  addWidget: (categoryId, widget) => {
    set(state => ({
      categories: state.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, widgets: [...cat.widgets, widget] }
          : cat
      )
    }));
  },
  removeWidget: (categoryId, widgetId) => {
    set(state => ({
      categories: state.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) }
          : cat
      )
    }));
  },
  searchWidgets: (query) => {
    const cats = get().categories;
    return cats.flatMap(cat => cat.widgets.filter(w => w.name.toLowerCase().includes(query.toLowerCase())));
  }
}));
