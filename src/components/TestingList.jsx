import React, { useEffect, useState } from 'react';
import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineSaveAs } from "react-icons/md";
import AddTest from './AddTest';
import TitleTesting from './titleTesting';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('uk-UA');
};

const TestingList = ({ brigadeId, equipmentId,setRefreshTrigger,refreshTrigger, isSuperAdmin }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  const fetchTestingData = async () => {
    if (!brigadeId || !equipmentId) return;

    setIsLoading(true);
    try {
      const sessionId = localStorage.getItem('sessionId');
      const res = await fetch(`http://rasp.ivkeen.keenetic.link/api/testing/brigade/${brigadeId}/equipment/${equipmentId}`, {
        method: 'GET',
        headers: {
          'session-id': sessionId,
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();
      setData(result.testingItems || []);
    } catch (err) {
      setError('Не вдалося завантажити дані тестування');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestingData();
  }, [brigadeId, equipmentId, refreshTrigger  ]);

console.log('TestingList props - brigadeId:', brigadeId, 'equipmentId:', equipmentId);

  const handleSave = async () => {
  
    try {
      const sessionId = localStorage.getItem('sessionId');
      const res = await fetch(`http://rasp.ivkeen.keenetic.link/api/testing/brigade/${brigadeId}/equipment/${equipmentId}`, {
        method: 'PUT',
        headers: {
          'session-id': sessionId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceInventoryNumber: editedItem.deviceInventoryNumber,
          testingDate: new Date(editedItem.testingDate).getTime(),
          testingResult: editedItem.testingResult,
          nextTestingDate: new Date(editedItem.nextTestingDate).getTime(),
          url: editedItem.url,
          // protocolTitle: item.protocolTitle || '',
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Помилка оновлення: ${errorText}`);
      }

      setEditId(null);
      setEditedItem({});
      await fetchTestingData();
      if (setRefreshTrigger) setRefreshTrigger(Date.now());
    } catch (err) {
      console.error(err);
      setError('Не вдалося оновити дані');
    }
  };


  const bgColor = (result) => {
    if (result === 'passed') return 'bg-green-200';
    if (result === 'failed') return 'bg-[#ef6428] opacity-90 ';
    if (result === 'not passed') return 'bg-yellow-100';
    return '';
  }

  if (isLoading) return <p className="p-4">Завантаження...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (data.length === 0) return <p className="p-4 text-center text-xl text-gray-500">Підрозділ поки що не має такого обладнання. </p>;

  return (
    <div className="mx-auto w-full p-4">

      <div className="grid grid-cols-6 gap-5 text-[#202955] place-items-center text-center mb-4 font-bold border-b pb-2">
        <p><strong>Інвентарний<br />номер:</strong></p>
        <p><strong>Дата<br />Випробування:</strong></p>
        <p><strong>Результат<br />випробувань:</strong></p>
        <p><strong>Дата наступного<br />Випробування:</strong></p>
        <p><strong>Акт / Протокол</strong></p>

      </div>
      <ul className="space-y-4">
        {data.map((item) =>
          editId === item.testingId ? (
            <li key={item.testingId} className={`flex border p-4 rounded shadow-sm gap-5 text-center place-items-center mb-4 relative ${bgColor(editedItem.testingResult)}`}>
              <p>{editedItem.deviceInventoryNumber}</p>
              <input
                type="date"
                value={editedItem.testingDate || ''}
                onChange={(e) => setEditedItem({ ...editedItem, testingDate: e.target.value })}
                className="border px-2 py-1 rounded"
              />
              <select
                value={editedItem.testingResult || ''}
                onChange={(e) => setEditedItem({ ...editedItem, testingResult: e.target.value })}
                className="border px-2 py-1 rounded"
              >
                <option value="passed">Пройдено</option>
                <option value="failed">Не пройдено</option>
            
              </select>
              <input
                type="date"
                value={editedItem.nextTestingDate || ''}
                onChange={(e) => setEditedItem({ ...editedItem, nextTestingDate: e.target.value })}
                className="border px-2 py-1 rounded"
              />
              <div className='flex flex-col items-center'>
               <input
                  type="text"
                  placeholder="Назва протоколу"
                  value={editedItem.protocolTitle || ''}
                  onChange={(e) => setEditedItem({ ...editedItem, protocolTitle: e.target.value })}
                  className="border px-1 py-1 rounded mb-1"
                />
              <input
                type="text"
                placeholder="Посилання на протокол"
                value={editedItem.url || ''}
                onChange={(e) => setEditedItem({ ...editedItem, url: e.target.value })}
                className="border px-1 py-1 rounded "
              />
              </div>
              <button
                onClick={handleSave}
                title='Зберегти зміни'
                className="text-[#202955] text-3xl px-3 py-1 absolute right-12 top-1/3 rounded cursor-pointer hover:text-4xl hover:transition-all duration-200"
              >
                <MdOutlineSaveAs  />
              </button>
            </li>
          ) : (
            <li key={item.testingId} className={`grid grid-cols-6 w-full border p-4 rounded shadow-sm  text-[#202955] font-bold text-center place-items-center place-content-center mb-4 relative ${bgColor(item.testingResult)}`}>
              <p>{item.deviceInventoryNumber}</p>
              <p>{formatDate(item.testingDate)}</p>
              <p>{item.testingResult === 'passed' ? ' Пройдено' : item.testingResult === 'failed' ? ' Не пройдено' : ' Проходить випробування'}</p>
              <p>{formatDate(item.nextTestingDate)}</p>
              <p className="text-sm italic">{item.protocolTitle || 'Без назви'}</p>
              <div>
              <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#202955] underline"
                >
                 {item.protocolTitle}
                </a> 
                </div>            
              <div>
              <button
              title='Редагувати'
                className="text-[#202955] text-2xl transition-all px-3 py-1 rounded cursor-pointer absolute right-12 top-1/2 transform -translate-y-1/2 hover:text-3xl hover:transition-all duration-200"
                onClick={() => {
                  setEditId(item.testingId);
                  setEditedItem({
                    deviceInventoryNumber: item.deviceInventoryNumber,
                    testingDate: new Date(item.testingDate).toISOString().split('T')[0],
                    testingResult: item.testingResult,
                    nextTestingDate: new Date(item.nextTestingDate).toISOString().split('T')[0],
                    url: item.url || '',
                   // protocolTitle: item.protocolTitle || '',
                  });}
                }>
                <RiEdit2Line className='cursor-pointer' />
              </button>

              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default TestingList;
