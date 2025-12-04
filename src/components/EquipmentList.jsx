import React, { useState, useEffect } from 'react';

const EquipmentList = ({ onEquipmentSelect, isOpen, onToggle }) => {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(
    () => sessionStorage.getItem('selectedEquipmentId') || null
  );
  const [equipments, setEquipments] = useState([]);
  const [error, setError] = useState('');

  // Internal toggle if onToggle not provided (fallback)
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const sessionId = localStorage.getItem('sessionId');
        const res = await fetch('/api/testing/equipments', {
          method: 'GET',
          headers: {
            'session-id': sessionId,
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        setEquipments(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Помилка завантаження списку обладнання');
      }
    };

    fetchEquipments();
  }, []);

  const handleEquipmentSelect = (id, name) => {
    setSelectedEquipmentId(id);
    if (typeof onEquipmentSelect === 'function') {
      onEquipmentSelect(id, name);
    }
  };

  return (
    <div className="w-full mx-auto p-2 md:p-4 overflow-hidden max-w-full">
      <h2
        className={`text-base md:text-lg lg:text-xl text-center cursor-pointer font-bold mb-4 p-3 border-2 transition-all duration-200 rounded-lg hover:border-[#fcd600] hover:text-[#203955] hover:shadow-md break-words ${isOpen
            ? 'bg-[#203955] text-white border-[#203955]'
            : 'bg-white text-[#203955] border-[#203955]'
          }`}
        onClick={handleToggle}
      >
        Випробування
      </h2>
      {error && <p className="text-red-500 text-xs md:text-sm break-words">{error}</p>}
      {isOpen && (
        <ul className="space-y-3 overflow-y-auto max-h-[60vh] pr-1">
          {equipments.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer text-center px-3 py-3 rounded-lg border-2 transition-all duration-200 text-xs md:text-sm lg:text-base break-words overflow-hidden shadow-sm hover:shadow-md
                ${item.id === selectedEquipmentId
                  ? 'bg-[#fcd600] border-[#fcd600] text-[#203955] font-bold scale-105'
                  : 'bg-white border-[#203955] text-[#203955] hover:border-[#fcd600] hover:scale-102'
                }
              `}
              onClick={() => handleEquipmentSelect(item.id, item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EquipmentList;
