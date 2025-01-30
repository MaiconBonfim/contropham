import React, { useState } from 'react';

interface MonthSummary {
  month: string;
  grossSales: number;
  discounts: number;
  netSales: number;
  costs: number;
  profit: number;
  notes: string;
}

export default function MonthlySummary() {
  const [monthlySummaries, setMonthlySummaries] = useState<MonthSummary[]>([
    {
      month: '2024-03',
      grossSales: 50000,
      discounts: 2000,
      netSales: 48000,
      costs: 30000,
      profit: 18000,
      notes: 'Alta temporada'
    }
  ]);

  const addNewMonth = () => {
    const newMonth: MonthSummary = {
      month: '',
      grossSales: 0,
      discounts: 0,
      netSales: 0,
      costs: 0,
      profit: 0,
      notes: ''
    };
    setMonthlySummaries([...monthlySummaries, newMonth]);
  };

  const updateMonth = (index: number, field: keyof MonthSummary, value: string | number) => {
    const updatedSummaries = [...monthlySummaries];
    updatedSummaries[index] = {
      ...updatedSummaries[index],
      [field]: value
    };

    if (field === 'grossSales' || field === 'discounts' || field === 'costs') {
      const grossSales = updatedSummaries[index].grossSales;
      const discounts = updatedSummaries[index].discounts;
      const costs = updatedSummaries[index].costs;
      updatedSummaries[index].netSales = grossSales - discounts;
      updatedSummaries[index].profit = grossSales - discounts - costs;
    }

    setMonthlySummaries(updatedSummaries);
  };

  const totals = monthlySummaries.reduce((acc, month) => ({
    grossSales: acc.grossSales + month.grossSales,
    discounts: acc.discounts + month.discounts,
    netSales: acc.netSales + month.netSales,
    costs: acc.costs + month.costs,
    profit: acc.profit + month.profit
  }), {
    grossSales: 0,
    discounts: 0,
    netSales: 0,
    costs: 0,
    profit: 0
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Resumo Mensal</h2>
        <button
          onClick={addNewMonth}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Adicionar Mês
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mês</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendas Brutas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descontos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendas Líquidas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lucro</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {monthlySummaries.map((month, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <input
                    type="month"
                    value={month.month}
                    onChange={(e) => updateMonth(index, 'month', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={month.grossSales}
                    onChange={(e) => updateMonth(index, 'grossSales', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={month.discounts}
                    onChange={(e) => updateMonth(index, 'discounts', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{month.netSales.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={month.costs}
                    onChange={(e) => updateMonth(index, 'costs', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{month.profit.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={month.notes}
                    onChange={(e) => updateMonth(index, 'notes', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="px-6 py-4 font-medium">Total Anual</td>
              <td className="px-6 py-4 font-medium">{totals.grossSales.toFixed(2)}</td>
              <td className="px-6 py-4 font-medium">{totals.discounts.toFixed(2)}</td>
              <td className="px-6 py-4 font-medium">{totals.netSales.toFixed(2)}</td>
              <td className="px-6 py-4 font-medium">{totals.costs.toFixed(2)}</td>
              <td className="px-6 py-4 font-medium">{totals.profit.toFixed(2)}</td>
              <td className="px-6 py-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}