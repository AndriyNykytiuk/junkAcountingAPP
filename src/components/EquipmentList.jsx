import React, { useState, useEffect } from 'react';

const EquipmentList = ({ onEquipmentSelect }) => {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(
    // Якщо вже щось збережено в sessionStorage — беремо звідти
    () => sessionStorage.getItem('selectedEquipmentId') || null
  );
  const [equipments, setEquipments] = useState([]);
  const [error, setError] = useState('');
  const [testingList, setTestingList] = useState(false);

  const openTestingList = () => {
    setTestingList(prev=>!prev)
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

        console.log('sessionId:', sessionId);
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`HTTP ${res.status}: ${errText}`);
        }

        const data = await res.json();
        setEquipments(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Помилка завантаження списку обладнання');
      }
    };

    fetchEquipments();
  }, []); // можна додати sessionId в залежності, якщо він може змінитися

  const handleEquipmentSelect = (id) => {
 
    setSelectedEquipmentId(id);
    if (typeof onEquipmentSelect === 'function') {
      onEquipmentSelect(id);
    }
    console.log('Обрано обладнання (id):', id);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className={`text-xl text-center cursor-pointer  font-bold mb-4 p-2 border-[1px] hover:translate-x-1 transition-all duration-200 rounded-[10px] hover:border-[1px] hover:rounded-[10px] hover:text-[##fcd600] ${testingList ? 'bg-red-[100] border-[2px] bg-[#203955] text-white text-center p-2 rounded-[10px]' : ''}`} onClick={openTestingList}>Випробування</h2>
      {error && <p className="text-red-500">{error}</p>}
        {testingList && (      
            <ul className="space-y-2">
        {equipments.map((item) => (
          <li
            key={item.id}
            className={`cursor-pointer text-center px-4 py-2 rounded transform transition-all duration-200
              ${item.id === selectedEquipmentId ? 'bg-[#fcd600] text-xl font-bold translate-x-4' : 'bg-gray-100 hover:translate-x-4'}
            `}
            onClick={() => handleEquipmentSelect(item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>)}
    </div>
  );
};

export default EquipmentList;
