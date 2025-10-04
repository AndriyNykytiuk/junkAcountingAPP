import React, { useEffect, useState } from 'react';
import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineSaveAs } from "react-icons/md";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('uk-UA');
};

const TestingList = ({ brigadeId, equipmentId }) => {
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
      const res = await fetch(`https://rasp.ivkeen.keenetic.link/api/testing/brigade/${brigadeId}/equipment/${equipmentId}`, {
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
  }, [brigadeId, equipmentId]);

console.log('TestingList props - brigadeId:', brigadeId, 'equipmentId:', equipmentId);

  const handleSave = async () => {
  
    try {
      const sessionId = localStorage.getItem('sessionId');
      const res = await fetch(`https://rasp.ivkeen.keenetic.link/api/testing/brigade/${brigadeId}/equipment/${equipmentId}`, {
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
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Помилка оновлення: ${errorText}`);
      }

      setEditId(null);
      setEditedItem({});
      await fetchTestingData();
    } catch (err) {
      console.error(err);
      setError('Не вдалося оновити дані');
    }
  };

  const bgColor = (result) => {
    if (result === 'passed') return 'bg-green-100';
    if (result === 'failed') return 'bg-red-100';
    if (result === 'not passed') return 'bg-yellow-100';
    return '';
  }

  if (isLoading) return <p className="p-4">Завантаження...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (data.length === 0) return <p className="p-4 text-gray-500">Немає тестувань</p>;

  return (
    <div className="mx-auto w-full p-4">
      <h2 className="text-3xl text-[#202955] text-center font-bold mb-8">Результати тестування</h2>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] gap-5 text-[#202955] text-center mb-4 font-bold border-b pb-2">
        <p><strong>Інвентарний<br />номер:</strong></p>
        <p><strong>Дата<br />Випробування:</strong></p>
        <p><strong>Результат<br />випробувань:</strong></p>
        <p><strong>Дата наступного<br />Випробування:</strong></p>
        <p><strong>Акт / Протокол</strong></p>
      </div>
      <ul className="space-y-4">
        {data.map((item) =>
          editId === item.testingId ? (
            <li key={item.testingId} className={`grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] border p-4 rounded shadow-sm gap-5 text-center place-items-center mb-4 relative ${bgColor(editedItem.testingResult)}`}>
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
                <option value="not passed"> Проходить випробування</option>
              </select>
              <input
                type="date"
                value={editedItem.nextTestingDate || ''}
                onChange={(e) => setEditedItem({ ...editedItem, nextTestingDate: e.target.value })}
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="Посилання на протокол"
                value={editedItem.url || ''}
                onChange={(e) => setEditedItem({ ...editedItem, url: e.target.value })}
                className="border px-1 py-1 rounded "
              />
              <button
                onClick={handleSave}
                className="text-[#202955] text-3xl px-3 py-1 rounded cursor-pointer "
              >
                <MdOutlineSaveAs />
              </button>
            </li>
          ) : (
            <li key={item.testingId} className={`grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] border p-4 rounded shadow-sm gap-5 text-[#202955] font-bold text-center place-items-center mb-4 relative ${bgColor(item.testingResult)}`}>
              <p>{item.deviceInventoryNumber}</p>
              <p>{formatDate(item.testingDate)}</p>
              <p>{item.testingResult === 'passed' ? ' Пройдено' : item.testingResult === 'failed' ? ' Не пройдено' : ' Проходить випробування'}</p>
              <p>{formatDate(item.nextTestingDate)}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#202955] underline"
              >
                протокол
              </a>              
              <button
                className="text-[#202955] text-xl transition-all px-3 py-1 rounded cursor-pointer hover:text-2xl hover:transition-all"
                onClick={() => {
                  setEditId(item.testingId);
                  setEditedItem({
                    deviceInventoryNumber: item.deviceInventoryNumber,
                    testingDate: new Date(item.testingDate).toISOString().split('T')[0],
                    testingResult: item.testingResult,
                    nextTestingDate: new Date(item.nextTestingDate).toISOString().split('T')[0],
                    url: item.url || '',
                  });}
                }>
                <RiEdit2Line className='cursor-p' />
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default TestingList;
