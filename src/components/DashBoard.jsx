import React, { useState } from 'react';
import EquipmentList from './EquipmentList'; 

const Dashboard = ({ responseData, onBrigadeSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
   const [selectedBrigade, setSelectedBrigade] = useState(null);

  const handleBrigadeClick = (brigade) => {
     setSelectedBrigade(brigade);  
     setIsOpen(false);
    if (typeof onBrigadeSelect === 'function') {
      onBrigadeSelect(brigade.id);
    }
    console.log('selectedBrigadeId:', brigade.id);
  };
 

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-[10px] mb-4 border-[1px]">
      <div className="border rounded relative  ">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-center text-[#fcd700] font-black text-3xl px-4 py-2 bg-[#203955] transition-all duration-200 cursor-pointer hover:bg-white hover:text-[#203955] "
        >
          {selectedBrigade ? selectedBrigade.name : 'Оберіть підрозділ'}
        </button>

        {isOpen && (
          <div className="bg-white px-4 py-2 absolute">
            {responseData.detachments.map((d) => (
              <div key={d.detachment.id} className="mb-4">
                <p className="font-bold">{d.detachment.name} — {d.detachment.description}</p>
                <ul className="list-disc pl-5">
                  {d.brigades.map((b) => (
                    <li
                      key={b.id}
                      className="cursor-pointer hover:text-blue-600"
                      onClick={() => handleBrigadeClick(b)}
                    >
                      {b.name}: {b.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

   
    </div>
  );
};

export default Dashboard;
