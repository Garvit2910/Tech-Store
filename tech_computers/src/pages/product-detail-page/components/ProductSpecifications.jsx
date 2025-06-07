import React, { useState } from 'react';
import Icon from 'components/AppIcon';

function ProductSpecifications({ specifications }) {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const specificationSections = Object.entries(specifications);

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-8">
      <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
        <Icon name="Settings" size={24} className="mr-2" />
        Technical Specifications
      </h2>

      <div className="space-y-4">
        {specificationSections.map(([sectionName, specs], index) => {
          const isExpanded = expandedSections[sectionName] !== false; // Default to expanded
          const specEntries = Object.entries(specs);

          return (
            <div key={sectionName} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(sectionName)}
                className="w-full px-4 py-3 bg-secondary-50 hover:bg-secondary-100 transition-smooth flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-semibold text-text-primary">{sectionName}</h3>
                <Icon 
                  name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-secondary-600" 
                />
              </button>

              {isExpanded && (
                <div className="p-4 bg-surface">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specEntries.map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:items-center">
                        <dt className="text-sm font-medium text-text-secondary sm:w-1/2 mb-1 sm:mb-0">
                          {key}:
                        </dt>
                        <dd className="text-sm text-text-primary sm:w-1/2 font-medium">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Specs Summary */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="text-lg font-semibold text-primary mb-3">Quick Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Icon name="Cpu" size={24} className="mx-auto text-primary mb-1" />
            <div className="text-xs text-text-secondary">Processor</div>
            <div className="text-sm font-medium text-text-primary">
              {specifications.Processor?.CPU?.split(' ').slice(0, 3).join(' ') || 'N/A'}
            </div>
          </div>
          <div className="text-center">
            <Icon name="Monitor" size={24} className="mx-auto text-primary mb-1" />
            <div className="text-xs text-text-secondary">Graphics</div>
            <div className="text-sm font-medium text-text-primary">
              {specifications.Graphics?.GPU?.split(' ').slice(0, 2).join(' ') || 'N/A'}
            </div>
          </div>
          <div className="text-center">
            <Icon name="HardDrive" size={24} className="mx-auto text-primary mb-1" />
            <div className="text-xs text-text-secondary">Memory</div>
            <div className="text-sm font-medium text-text-primary">
              {specifications['Memory & Storage']?.RAM || 'N/A'}
            </div>
          </div>
          <div className="text-center">
            <Icon name="Smartphone" size={24} className="mx-auto text-primary mb-1" />
            <div className="text-xs text-text-secondary">Display</div>
            <div className="text-sm font-medium text-text-primary">
              {specifications.Display?.['Screen Size'] || 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSpecifications;