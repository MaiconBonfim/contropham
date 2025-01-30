import React, { useState } from 'react';

interface Expense {
  date: string;
  type: string;
  amount: number;
  description: string;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      date: '2024-03-11',
      type: 'Aluguel',
      amount: 3000,
      description: 'Pagamento do aluguel'
    }
  ]);

  const addNewExpense = () => {
    const newExpense: Expense = {
      date: '',
      type: '',
      amount: 0,
      description: ''
    };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (index: number, field: keyof Expense, value: string | number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = {
      ...updatedExpenses[index],
      [field]: value
    };
    setExpenses(updatedExpenses);
  };

  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Despesas</h2>
        <button
          onClick={addNewExpense}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Adicionar Despesa
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <input
                    type="date"
                    value={expense.date}
                    onChange={(e) => updateExpense(index, 'date', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={expense.type}
                    onChange={(e) => updateExpense(index, 'type', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={expense.amount}
                    onChange={(e) => updateExpense(index, 'amount', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={expense.description}
                    onChange={(e) => updateExpense(index, 'description', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="px-6 py-4 font-medium" colSpan={2}>Total</td>
              <td className="px-6 py-4 font-medium">{total.toFixed(2)}</td>
              <td className="px-6 py-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}