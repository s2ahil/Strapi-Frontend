import React, { useState } from 'react';

const ItemListManager = () => {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleAddItem = () => {
    if (inputText.trim() !== '') {
      setItems([...items, inputText]);
      setInputText('');
    }
  };

  return (
    <div className="sticky top-0  bg-white ">
      {/* Header */}
      <div className="bg-slate-800 p-4 ">
        <h1 className="text-green-500 text-xl font-bold text-center">Item List Manager</h1>
      </div>

      {/* Content */}
      <div className=' flex  flex-col gap-2 justify-center items-center'>
      <div className="p-6 w-[20rem]  ">
        <h2 className="text-xl font-semibold mb-4">Item List</h2>
        
        <div className="space-y-4">
          {/* Input and Button */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter item"
              className=" px-3 w-[20rem] py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          
          </div>
          <button 
              onClick={handleAddItem}
              className="px-3 py-2 w-[17rem] bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Item
            </button>

          {/* Item List */}
          <ul className="list-disc pl-6 space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      </div>
    </div>
  );
};

export default ItemListManager;