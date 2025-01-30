import React, { useState } from 'react';

interface Goal {
  month: string;
  salesTarget: number;
  profitTarget: number;
  actualSales: number;
  actualProfit: number;
  deviation: number;
  notes: string;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      month: '2024-03',
      salesTarget: 50000,
      profitTarget: 20000,
      actualSales: 48000,
      actualProfit: 18000,
      deviation: -2000,
      notes: 'Quase atingiu a meta'
    }
  ]);

  const addNewGoal = () => {
    const newGoal: Goal = {
      month: '',
      salesTarget: 0,
      profitTarget: 0,
      actualSales: 0,
      actualProfit: 0,
      deviation: 0,
      notes: ''
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (index: number, field: keyof Goal, value: string | number) => {
    const updatedGoals = [...goals];
    updatedGoals[index] = {
      ...updatedGoals[index],
      [field]: value
    };

    // Recalculate deviation
    if (field === 'salesTarget' || field === 'actualSales') {
      updatedGoals[index].deviation = updatedGoals[index].actualSales - updatedGoals[index].salesTarget;
    }

    setGoals(updatedGoals);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Metas</h2>
        <button
          onClick={addNewGoal}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Adicionar Meta
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mês</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta de Vendas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta de Lucro</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendas Realizadas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lucro Realizado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desvio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {goals.map((goal, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <input
                    type="month"
                    value={goal.month}
                    onChange={(e) => updateGoal(index, 'month', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={goal.salesTarget}
                    onChange={(e) => updateGoal(index, 'salesTarget', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={goal.profitTarget}
                    onChange={(e) => updateGoal(index, 'profitTarget', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={goal.actualSales}
                    onChange={(e) => updateGoal(index, 'actualSales', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={goal.actualProfit}
                    onChange={(e) => updateGoal(index, 'actualProfit', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className={goal.deviation >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {goal.deviation.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={goal.notes}
                    onChange={(e) => updateGoal(index, 'notes', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}