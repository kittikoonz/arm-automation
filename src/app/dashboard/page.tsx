'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import {
  SparklesIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  FireIcon,
  BuildingOffice2Icon,
  ArrowTrendingUpIcon,
  GiftIcon,
  BoltIcon,
  BanknotesIcon,
  ArrowPathIcon,
  ShoppingBagIcon,
  ScissorsIcon
} from '@heroicons/react/24/solid';

const modules = [
  {
    id: 'autoPlant',
    name: 'AutoPlant',
    description: 'Automatically plants seeds or crops.',
    icon: SparklesIcon,
  },
  {
    id: 'autoSell',
    name: 'AutoSell',
    description: 'Automatically sells harvested items.',
    icon: ShoppingBagIcon,
  },
  {
    id: 'autoBuy',
    name: 'AutoBuy',
    description: 'Automatically buys needed resources.',
    icon: ShoppingCartIcon,
  },
  {
    id: 'autoCutTree',
    name: 'AutoCutTree',
    description: 'Automatically cuts down trees for wood.',
    icon: ScissorsIcon,
  },
  {
    id: 'autoPitCook',
    name: 'AutoPit/Cook',
    description: 'Automates cooking or pit tasks.',
    icon: FireIcon,
  },
  {
    id: 'autoTools',
    name: 'AutoTools',
    description: 'Automatically equips or upgrades tools.',
    icon: WrenchScrewdriverIcon,
  },
  {
    id: 'autoCraft',
    name: 'AutoCraft',
    description: 'Automates item crafting.',
    icon: GiftIcon,
  },
  {
    id: 'autoBuild',
    name: 'AutoBuild',
    description: 'Automates building structures or upgrades.',
    icon: BuildingOffice2Icon,
  },
  {
    id: 'autoUpgrade',
    name: 'AutoUpgrade',
    description: 'Automatically upgrades buildings or units.',
    icon: ArrowTrendingUpIcon,
  },
  {
    id: 'autoDeliver',
    name: 'AutoDeliver',
    description: 'Automates delivery missions or orders.',
    icon: TruckIcon,
  },
  {
    id: 'autoTimeShard',
    name: 'AutoTimeShard',
    description: 'Automatically collects or uses time shards or similar boosts.',
    icon: BoltIcon,
  },
  {
    id: 'autoEarnFlower',
    name: 'AutoEarnFlower (Lvl 10+)',
    description: 'Automates flower farming once Level 10 is reached.',
    icon: GiftIcon,
    levelRequired: 10,
  },
  {
    id: 'autoFarmCoins',
    name: 'AutoFarmCoins',
    description: 'Automates farming in-game currency.',
    icon: CurrencyDollarIcon,
  },
  {
    id: 'autoRestock',
    name: 'AutoRestock',
    description: 'Automatically restocks essential items.',
    icon: ArrowPathIcon,
  },
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
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-yellow-100 to-green-400 relative overflow-x-hidden">
      {/* Sunflower Land style header */}
      <div className="w-full flex flex-col items-center py-10 mb-8">
        <div className="flex items-center gap-4 mb-2">
          <SparklesIcon className="w-10 h-10 text-yellow-400 animate-spin-slow" />
          <h1 className="text-5xl font-extrabold text-green-800 drop-shadow-lg tracking-tight">Farm Automation Dashboard</h1>
        </div>
        <p className="text-lg text-green-700 font-medium">Manage your automated farming tasks</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {modules.map((module) => {
            const isDisabled = module.levelRequired ? userLevel < module.levelRequired : false;
            const isEnabled = Boolean(enabledModules[module.id]);
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className={`relative bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-start border-2 border-green-200 hover:border-green-400 transition-all duration-200 ${isDisabled ? 'opacity-60 grayscale' : 'hover:scale-105'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-200 to-green-200 shadow-md">
                    <Icon className="w-8 h-8 text-green-700" />
                  </span>
                  <h3 className="text-2xl font-bold text-green-900 drop-shadow-sm">{module.name}</h3>
                </div>
                <p className="text-green-700 mb-4 text-base font-medium">{module.description}</p>
                <Switch
                  checked={isEnabled}
                  onChange={() => !isDisabled && toggleModule(module.id)}
                  className={`$ {
                    isEnabled ? 'bg-green-500' : 'bg-gray-300'
                  } relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-2`}
                  disabled={isDisabled}
                >
                  <span
                    className={`$ {
                      isEnabled ? 'translate-x-7' : 'translate-x-1'
                    } inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform`}
                  />
                </Switch>
                {isDisabled && (
                  <p className="mt-2 text-sm text-red-500 font-semibold">Requires level {module.levelRequired}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative sunflower icon bottom right */}
      <div className="fixed bottom-6 right-6 z-10">
        <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-300 shadow-lg animate-spin-slow">
          <SparklesIcon className="w-12 h-12 text-yellow-600" />
        </span>
      </div>
    </div>
  );
} 