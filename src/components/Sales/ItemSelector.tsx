import React, { useState } from 'react';
import { Package, Item, Category, QuotationItem } from '../../types/pricing';
import { Search, Plus, Minus, Package as PackageIcon } from 'lucide-react';

interface ItemSelectorProps {
  categories: Category[];
  items: Item[];
  packages: Package[];
  onItemsSelected: (items: QuotationItem[]) => void;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  categories,
  items,
  packages,
  onItemsSelected,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map());

  const filteredItems = items.filter((item) => {
    const matchesCategory = !selectedCategory || item.categoryId === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuantityChange = (itemId: string, quantity: number) => {
    const newSelectedItems = new Map(selectedItems);
    if (quantity > 0) {
      newSelectedItems.set(itemId, quantity);
    } else {
      newSelectedItems.delete(itemId);
    }
    setSelectedItems(newSelectedItems);
    
    const quotationItems: QuotationItem[] = Array.from(newSelectedItems.entries())
      .map(([id, qty]) => {
        const item = items.find(i => i.id === id)!;
        return {
          itemId: id,
          quantity: qty,
          item,
          totalPrice: calculateItemTotal(item, qty)
        };
      });
    
    onItemsSelected(quotationItems);
  };

  const calculateItemTotal = (item: Item, quantity: number) => {
    const baseTotal = (item.materialCost + item.laborCost) * quantity;
    return Math.max(baseTotal, item.basePrice * Math.ceil(quantity / item.minimumQuantity));
  };

  const handlePackageSelect = (pkg: Package) => {
    const newSelectedItems = new Map(selectedItems);
    pkg.items.forEach(({ itemId, quantity }) => {
      const currentQty = newSelectedItems.get(itemId) || 0;
      newSelectedItems.set(itemId, currentQty + quantity);
    });
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="space-y-6">
      {/* Search and Category Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search items..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Packages Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => handlePackageSelect(pkg)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
          >
            <div className="flex items-center space-x-3">
              <PackageIcon className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-medium">{pkg.name}</h3>
                <p className="text-sm text-gray-500">{pkg.items.length} items</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            {item.images?.[0] && (
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            <div className="mt-2 text-sm">
              <span className="font-medium">${item.basePrice}</span> per {item.unit}
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(
                  item.id,
                  (selectedItems.get(item.id) || 0) - 1
                )}
                className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min="0"
                value={selectedItems.get(item.id) || 0}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                className="w-20 text-center border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleQuantityChange(
                  item.id,
                  (selectedItems.get(item.id) || 0) + 1
                )}
                className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemSelector;