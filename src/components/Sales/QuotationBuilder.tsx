import React, { useState } from 'react';
import { Quotation, QuotationItem } from '../../types/pricing';
import ItemSelector from './ItemSelector';
import { Calculator, Trash2 } from 'lucide-react';

interface QuotationBuilderProps {
  customerId: string;
  projectId?: string;
  onSave: (quotation: Omit<Quotation, 'id' | 'createdAt'>) => void;
}

const QuotationBuilder: React.FC<QuotationBuilderProps> = ({
  customerId,
  projectId,
  onSave,
}) => {
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const discountAmount = (subtotal * discount) / 100;
    const tax = (subtotal - discountAmount) * 0.07; // 7% tax
    const total = subtotal - discountAmount + tax;

    return { subtotal, discountAmount, tax, total };
  };

  const handleSave = () => {
    const { subtotal, discountAmount, tax, total } = calculateTotals();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30); // Valid for 30 days

    onSave({
      customerId,
      projectId,
      items,
      subtotal,
      discount: discountAmount,
      tax,
      total,
      status: 'draft',
      validUntil,
      notes,
    });
  };

  const { subtotal, discountAmount, tax, total } = calculateTotals();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Build Quotation</h2>
        
        <ItemSelector
          categories={[]} // Pass your categories
          items={[]} // Pass your items
          packages={[]} // Pass your packages
          onItemsSelected={setItems}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Selected Items</h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.itemId} className="flex items-center justify-between py-2 border-b">
              <div>
                <h4 className="font-medium">{item.item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.quantity} {item.item.unit} × ${item.item.basePrice}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium">${item.totalPrice.toFixed(2)}</span>
                <button
                  onClick={() => setItems(items.filter(i => i.itemId !== item.itemId))}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <textarea
            placeholder="Additional notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>

        <div className="mt-6 border-t pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax (7%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Generate Quotation
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationBuilder;