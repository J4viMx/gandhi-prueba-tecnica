import React from "react";

const Tabs = ({ options, activeTab, onTabChange, handles }) => (
  <div className={handles.tabs}>
    {options.map((tab) => (
      <button
        key={tab.id}
        className={`${handles.tab} ${
          activeTab === tab.id ? handles.active : ""
        }`}
        onClick={() => onTabChange(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default Tabs;
