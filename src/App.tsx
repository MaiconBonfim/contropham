import React, { useState } from 'react';
import { Table, BarChart, DollarSign, Package, Target, FileSpreadsheet, Download } from 'lucide-react';
import WeeklySales from './components/WeeklySales';
import MonthlySummary from './components/MonthlySummary';
import Expenses from './components/Expenses';
import Inventory from './components/Inventory';
import Goals from './components/Goals';
import * as XLSX from 'xlsx';

function App() {
  const [activeTab, setActiveTab] = useState('weekly');

  const tabs = [
    { id: 'weekly', name: 'Vendas Semanais', icon: Table },
    { id: 'monthly', name: 'Resumo Mensal', icon: BarChart },
    { id: 'expenses', name: 'Despesas', icon: DollarSign },
    { id: 'inventory', name: 'Estoque', icon: Package },
    { id: 'goals', name: 'Metas', icon: Target },
  ];

  const downloadExcel = () => {
    // Create workbook
    const wb = XLSX.utils.book_new();

    // Get data from each component
    const weeklyComponent = document.getElementById('weekly-sales');
    const monthlyComponent = document.getElementById('monthly-summary');
    const expensesComponent = document.getElementById('expenses');
    const inventoryComponent = document.getElementById('inventory');
    const goalsComponent = document.getElementById('goals');

    // Create worksheets from tables
    if (weeklyComponent) {
      const ws1 = XLSX.utils.table_to_sheet(weeklyComponent.querySelector('table')!);
      XLSX.utils.book_append_sheet(wb, ws1, "Vendas Semanais");
    }
    if (monthlyComponent) {
      const ws2 = XLSX.utils.table_to_sheet(monthlyComponent.querySelector('table')!);
      XLSX.utils.book_append_sheet(wb, ws2, "Resumo Mensal");
    }
    if (expensesComponent) {
      const ws3 = XLSX.utils.table_to_sheet(expensesComponent.querySelector('table')!);
      XLSX.utils.book_append_sheet(wb, ws3, "Despesas");
    }
    if (inventoryComponent) {
      const ws4 = XLSX.utils.table_to_sheet(inventoryComponent.querySelector('table')!);
      XLSX.utils.book_append_sheet(wb, ws4, "Estoque");
    }
    if (goalsComponent) {
      const ws5 = XLSX.utils.table_to_sheet(goalsComponent.querySelector('table')!);
      XLSX.utils.book_append_sheet(wb, ws5, "Metas");
    }

    // Save the file
    XLSX.writeFile(wb, "farmacia-relatorio.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Gestão de Farmácia</h1>
            </div>
            <button
              onClick={downloadExcel}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Download className="h-5 w-5" />
              Baixar Planilha
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div id="weekly-sales" className={activeTab === 'weekly' ? 'block' : 'hidden'}>
          <WeeklySales />
        </div>
        <div id="monthly-summary" className={activeTab === 'monthly' ? 'block' : 'hidden'}>
          <MonthlySummary />
        </div>
        <div id="expenses" className={activeTab === 'expenses' ? 'block' : 'hidden'}>
          <Expenses />
        </div>
        <div id="inventory" className={activeTab === 'inventory' ? 'block' : 'hidden'}>
          <Inventory />
        </div>
        <div id="goals" className={activeTab === 'goals' ? 'block' : 'hidden'}>
          <Goals />
        </div>
      </main>
    </div>
  );
}

export default App;