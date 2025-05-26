import React from 'react';

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabsNavegacion: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="mb-6 border-b border-gray-200">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`py-3 px-6 font-medium text-sm flex-shrink-0 border-b-2 whitespace-nowrap ${activeTab === tab
              ? 'border-primario-600 text-primario-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsNavegacion;
