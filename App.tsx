
import React from 'react';
import { DashboardProvider } from './store/dashboardContext';
import DashboardPage from './components/DashboardPage';

const App: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-secondary font-sans">
        <DashboardPage />
      </div>
    </DashboardProvider>
  );
};

export default App;
