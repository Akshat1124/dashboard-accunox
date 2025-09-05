import { type Category, type DashboardState } from '../types';

export const ALL_CATEGORIES: Category[] = [
  {
    id: 'cspm',
    title: 'CSPM Executive Dashboard',
    widgets: [
      {
        id: 'cloud-accounts',
        title: 'Cloud Accounts',
        type: 'donut',
        data: {
          total: 2,
          metrics: [
            { name: 'Connected', value: 2, color: '#3b82f6' },
            { name: 'Not Connected', value: 0, color: '#e5e7eb' },
          ],
        },
      },
      {
        id: 'cloud-risk',
        title: 'Cloud Account Risk Assessment',
        type: 'donut',
        data: {
          total: 9659,
          metrics: [
            { name: 'Passed', value: 7253, color: '#10b981' },
            { name: 'Warning', value: 880, color: '#f59e0b' },
            { name: 'Failed', value: 1688, color: '#ef4444' },
            { name: 'Not available', value: 36, color: '#9ca3af' },
          ],
        },
      },
    ],
  },
  {
    id: 'cwpp',
    title: 'CWPP Dashboard:',
    widgets: [
      {
        id: 'namespace-alerts',
        title: 'Top 5 Namespace Specific Alerts',
        type: 'placeholder',
        data: { text: 'No Graph data available!' },
      },
      {
        id: 'workload-alerts',
        title: 'Workload Alerts',
        type: 'placeholder',
        data: { text: 'No Graph data available!' },
      },
    ],
  },
  {
    id: 'registry-scan',
    title: 'Registry Scan',
    widgets: [
      {
        id: 'image-risk',
        title: 'Image Risk Assessment',
        type: 'horizontal-bar',
        data: {
          total: 1470,
          totalLabel: 'Total Vulnerabilities',
          metrics: [
            { name: 'Critical', value: 150, color: '#ef4444' },
            { name: 'High', value: 360, color: '#f97316' },
            { name: 'Medium', value: 450, color: '#f59e0b' },
            { name: 'Low', value: 510, color: '#eab308' },
          ],
        },
      },
      {
        id: 'image-security',
        title: 'Image Security Issues',
        type: 'horizontal-bar',
        data: {
          total: 2,
          totalLabel: 'Total Images',
          metrics: [
            { name: 'Critical', value: 1, color: '#ef4444' },
            { name: 'High', value: 1, color: '#f97316' },
            { name: 'Medium', value: 0, color: '#f59e0b' },
            { name: 'Low', value: 0, color: '#eab308' },
          ],
        },
      },
    ],
  },
];


const getDefaultState = (): DashboardState => {
  const allWidgets = ALL_CATEGORIES.flatMap(c => c.widgets);
  const initialVisibility: Record<string, boolean> = {};
  allWidgets.forEach(widget => {
    initialVisibility[widget.id] = true;
  });
  
  // Let's hide one by default to show the "Add Widget" functionality
  initialVisibility['workload-alerts'] = false;

  return {
    categories: ALL_CATEGORIES,
    widgetVisibility: initialVisibility,
  };
};


export const getInitialDashboardState = (): DashboardState => {
  try {
    const storedState = localStorage.getItem('dashboardState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      // Ensure all default widgets have a visibility setting
      const defaultState = getDefaultState();
      const allWidgetIds = defaultState.categories.flatMap(c => c.widgets).map(w => w.id);
      
      for (const id of allWidgetIds) {
        if (parsedState.widgetVisibility[id] === undefined) {
          parsedState.widgetVisibility[id] = defaultState.widgetVisibility[id];
        }
      }
       // Make sure all base categories exist
      const stateCategoryIds = new Set(parsedState.categories.map((c: Category) => c.id));
      for (const defaultCategory of defaultState.categories) {
        if (!stateCategoryIds.has(defaultCategory.id)) {
          parsedState.categories.push(defaultCategory);
        }
      }


      return parsedState;
    }
  } catch (error) {
    console.error("Could not parse dashboard state from localStorage", error);
  }
  return getDefaultState();
};