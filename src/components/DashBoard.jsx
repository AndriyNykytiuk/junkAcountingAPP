import React, { useState } from 'react';
import EquipmentList from './EquipmentList';

const Dashboard = ({ responseData, onBrigadeSelect, selectedBrigadeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrigade, setSelectedBrigade] = useState(null);

  // Sync selectedBrigade with selectedBrigadeId prop
  React.useEffect(() => {
    if (selectedBrigadeId && responseData?.detachments) {
      const brigade = responseData.detachments
        .flatMap(d => d.brigades)
        .find(b => b.id === selectedBrigadeId);
      if (brigade) {
        setSelectedBrigade(brigade);
      }
    } else {
      setSelectedBrigade(null);
    }
  }, [selectedBrigadeId, responseData]);

  const handleBrigadeClick = (brigade) => {
    setSelectedBrigade(brigade);
    setIsOpen(false);
    if (typeof onBrigadeSelect === 'function') {
      onBrigadeSelect(brigade.id);
    }
  };

  return (
    <div className="w-full lg:w-auto mx-auto p-2 md:p-4 bg-white rounded-[10px] mb-4 border-[1px] max-w-full">
      <div className="border rounded relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-center text-[#fcd700] font-black text-lg md:text-xl lg:text-2xl xl:text-3xl px-2 md:px-4 py-2 bg-[#203955] transition-all duration-200 cursor-pointer hover:bg-white hover:text-[#203955] break-words rounded"
        >
          {selectedBrigade ? selectedBrigade.name : 'Оберіть підрозділ'}
        </button>

        {isOpen && (
          <div className="bg-white px-2 md:px-4 py-2 absolute w-full max-h-96 overflow-y-auto z-50 shadow-lg border border-gray-300 rounded-b">
            {responseData.detachments.map((d) => (
              <div key={d.detachment.id} className="mb-4">
                <p className="font-bold text-xs md:text-sm break-words">{d.detachment.name} — {d.detachment.description}</p>
                <ul className="list-disc pl-5">
                  {d.brigades.map((b) => (
                    <li
                      key={b.id}
                      className="cursor-pointer hover:text-blue-600 text-xs md:text-sm break-words"
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
