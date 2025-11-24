import React, { useState, useEffect } from 'react';

const EquipmentList = ({ onEquipmentSelect }) => {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(
    () => sessionStorage.getItem('selectedEquipmentId') || null
  );
  const [equipments, setEquipments] = useState([]);
  const [error, setError] = useState('');
  const [testingList, setTestingList] = useState(false);

  const openTestingList = () => {
    setTestingList(prev => !prev);
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

  const handleEquipmentSelect = (id) => {
    setSelectedEquipmentId(id);
    if (typeof onEquipmentSelect === 'function') {
      onEquipmentSelect(id);
    }
  };

  return (
    <div className="w-full mx-auto p-2 md:p-4 overflow-hidden max-w-full">
      <h2
        className={`text-base md:text-lg lg:text-xl text-center cursor-pointer font-bold mb-4 p-2 border-[1px] hover:translate-x-1 transition-all duration-200 rounded-[10px] hover:border-[1px] hover:rounded-[10px] hover:text-[#fcd600] break-words ${testingList ? 'bg-[#203955] border-[2px] text-white' : ''}`}
        onClick={openTestingList}
      >
        Випробування
      </h2>
      {error && <p className="text-red-500 text-xs md:text-sm break-words">{error}</p>}
      {testingList && (
        <ul className="space-y-2 overflow-y-auto max-h-[60vh]">
          {equipments.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer text-center px-2 md:px-3 lg:px-4 py-2 rounded transform transition-all duration-200 text-xs md:text-sm lg:text-base break-words overflow-hidden
                ${item.id === selectedEquipmentId ? 'bg-[#fcd600] font-bold translate-x-2 md:translate-x-4' : 'bg-gray-100 hover:translate-x-2 md:hover:translate-x-4'}
              `}
              onClick={() => handleEquipmentSelect(item.id)}
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
