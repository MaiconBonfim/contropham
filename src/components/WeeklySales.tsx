import React, { useState } from 'react';

interface SaleDay {
  date: string;
  grossSales: number;
  discounts: number;
  netSales: number;
  costs: number;
  profit: number;
  notes: string;
}

export default function WeeklySales() {
  const [weekSales, setWeekSales] = useState<SaleDay[]>([
    {
      date: '2024-03-11',
      grossSales: 5000,
      discounts: 200,
      netSales: 4800,
      costs: 3000,
      profit: 1800,
      notes: 'Promoção de remédios'
    }
  ]);

  const addNewDay = () => {
    const newDay: SaleDay = {
      date: '',
      grossSales: 0,
      discounts: 0,
      netSales: 0,
      costs: 0,
      profit: 0,
      notes: ''
    };
    setWeekSales([...weekSales, newDay]);
  };

  const updateDay = (index: number, field: keyof SaleDay, value: string | number) => {
    const updatedSales = [...weekSales];
    updatedSales[index] = {
      ...updatedSales[index],
      [field]: value
    };

    // Recalculate net sales and profit
    if (field === 'grossSales' || field === 'discounts' || field === 'costs') {
      const grossSales = updatedSales[index].grossSales;
      const discounts = updatedSales[index].discounts;
      const costs = updatedSales[index].costs;
      updatedSales[index].netSales = grossSales - discounts;
      updatedSales[index].profit = grossSales - discounts - costs;
    }

    setWeekSales(updatedSales);
  };

  const totals = weekSales.reduce((acc, day) => ({
    grossSales: acc.grossSales + day.grossSales,
    discounts: acc.discounts + day.discounts,
    netSales: acc.netSales + day.netSales,
    costs: acc.costs + day.costs,
    profit: acc.profit + day.profit
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
        <h2 className="text-xl font-semibold text-gray-900">Vendas Semanais</h2>
        <button
          onClick={addNewDay}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Adicionar Dia
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendas Brutas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descontos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendas Líquidas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lucro</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {weekSales.map((day, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <input
                    type="date"
                    value={day.date}
                    onChange={(e) => updateDay(index, 'date', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={day.grossSales}
                    onChange={(e) => updateDay(index, 'grossSales', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={day.discounts}
                    onChange={(e) => updateDay(index, 'discounts', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{day.netSales.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={day.costs}
                    onChange={(e) => updateDay(index, 'costs', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{day.profit.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={day.notes}
                    onChange={(e) => updateDay(index, 'notes', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="px-6 py-4 font-medium">Total</td>
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