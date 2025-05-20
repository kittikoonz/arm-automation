'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';

interface Module {
  id: string;
  name: string;
  description: string;
  levelRequired?: number;
}

const modules: Module[] = [
  {
    id: 'autoPlant',
    name: 'AutoPlant',
    description: 'Automatically plants seeds or crops.'
  },
  {
    id: 'autoSell',
    name: 'AutoSell',
    description: 'Automatically sells harvested items.'
  },
  {
    id: 'autoBuy',
    name: 'AutoBuy',
    description: 'Automatically buys needed resources.'
  },
  {
    id: 'autoCutTree',
    name: 'AutoCutTree',
    description: 'Automatically cuts down trees for wood.'
  },
  {
    id: 'autoPitCook',
    name: 'AutoPit/Cook',
    description: 'Automates cooking or pit tasks.'
  },
  {
    id: 'autoTools',
    name: 'AutoTools',
    description: 'Automatically equips or upgrades tools.'
  },
  {
    id: 'autoCraft',
    name: 'AutoCraft',
    description: 'Automates item crafting.'
  },
  {
    id: 'autoBuild',
    name: 'AutoBuild',
    description: 'Automates building structures or upgrades.'
  },
  {
    id: 'autoUpgrade',
    name: 'AutoUpgrade',
    description: 'Automatically upgrades buildings or units.'
  },
  {
    id: 'autoDeliver',
    name: 'AutoDeliver',
    description: 'Automates delivery missions or orders.'
  },
  {
    id: 'autoTimeShard',
    name: 'AutoTimeShard',
    description: 'Automatically collects or uses time shards or similar boosts.'
  },
  {
    id: 'autoEarnFlower',
    name: 'AutoEarnFlower',
    description: 'Automates flower farming once Level 10 is reached.',
    levelRequired: 10
  },
  {
    id: 'autoFarmCoins',
    name: 'AutoFarmCoins',
    description: 'Automates farming in-game currency.'
  },
  {
    id: 'autoRestock',
    name: 'AutoRestock',
    description: 'Automatically restocks essential items.'
  }
];

export default function Dashboard() {
  const [enabledModules, setEnabledModules] = useState<Record<string, boolean>>({});
  const [userLevel] = useState(1); // This would come from your user data

  const toggleModule = (moduleId: string) => {
    setEnabledModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Farm Automation Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your automated farming tasks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const isDisabled = module.levelRequired ? userLevel < module.levelRequired : false;
            const isEnabled = Boolean(enabledModules[module.id]);
            
            return (
              <div
                key={module.id}
                className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-200 ${
                  isDisabled ? 'opacity-50' : 'hover:shadow-xl'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      {module.name}
                      {module.levelRequired && (
                        <span className="ml-2 text-sm text-gray-500">
                          (Lvl {module.levelRequired}+)
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600">{module.description}</p>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onChange={() => !isDisabled && toggleModule(module.id)}
                    className={`${
                      isEnabled ? 'bg-green-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                    disabled={isDisabled}
                  >
                    <span
                      className={`${
                        isEnabled ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
                {isDisabled && (
                  <p className="mt-2 text-sm text-red-500">
                    Requires level {module.levelRequired}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 