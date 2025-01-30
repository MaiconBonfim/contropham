import React, { useState } from 'react';

interface InventoryItem {
  product: string;
  initialQuantity: number;
  inflow: number;
  outflow: number;
  finalQuantity: number;
  unitCost: number;
  totalCost: number;
}

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      product: 'Paracetamol',
      initialQuantity: 100,
      inflow: 50,
      outflow: 80,
      finalQuantity: 70,
      unitCost: 5,
      totalCost: 350
    }
  ]);

  const addNewItem = () => {
    const newItem: InventoryItem = {
      product: '',
      initialQuantity: 0,
      inflow: 0,
      outflow: 0,
      finalQuantity: 0,
      unitCost: 0,
      totalCost: 0
    };
    setInventory([...inventory, newItem]);
  };

  const updateItem = (index: number, field: keyof InventoryItem, value: string | number) => {
    const updatedInventory = [...inventory];
    updatedInventory[index] = {
      ...updatedInventory[index],
      [field]: value
    };

    // Recalculate final quantity and total cost
    if (field === 'initialQuantity' || field === 'inflow' || field === 'outflow' || field === 'unitCost') {
      const item = updatedInventory[index];
      item.finalQuantity = item.initialQuantity + item.inflow - item.outflow;
      item.totalCost = item.finalQuantity * item.unitCost;
    }

    setInventory(updatedInventory);
  };

  const total = inventory.reduce((acc, item) => acc + item.totalCost, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Estoque</h2>
        <button
          onClick={addNewItem}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Adicionar Produto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd. Inicial</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entradas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saídas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd. Final</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo Unit.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={item.product}
                    onChange={(e) => updateItem(index, 'product', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={item.initialQuantity}
                    onChange={(e) => updateItem(index, 'initialQuantity', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={item.inflow}
                    onChange={(e) => updateItem(index, 'inflow', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={item.outflow}
                    onChange={(e) => updateItem(index, 'outflow', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{item.finalQuantity}</span>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={item.unitCost}
                    onChange={(e) => updateItem(index, 'unitCost', Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{item.totalCost.toFixed(2)}</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="px-6 py-4 font-medium" colSpan={6}>Total</td>
              <td className="px-6 py-4 font-medium">{total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}