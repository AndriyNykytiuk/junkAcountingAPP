import React, { useEffect, useState } from 'react';
import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineSaveAs } from "react-icons/md";
import '../css/test.css';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('uk-UA');
};

const TestingList = ({ brigadeId, equipmentId, setRefreshTrigger, refreshTrigger }) => {
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
      const res = await fetch(`/api/testing/brigade/${brigadeId}/equipment/${equipmentId}`, {
        method: 'GET',
        headers: {
          'session-id': sessionId,
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();
      setData(result.testingItems || []);
    } catch {
      setError('Не вдалося завантажити дані тестування');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brigadeId, equipmentId, refreshTrigger]);

  const handleSave = async () => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      const res = await fetch(`/api/testing/brigade/${brigadeId}/equipment/${equipmentId}`, {
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
          deviceName: editedItem.deviceName,
          documentName: editedItem.documentName,
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
    if (result === 'failed') return 'bg-[#ef6428] opacity-90';
    if (result === 'not passed') return 'bg-yellow-100';
    return '';
  };

  if (isLoading) return <p className="p-4">Завантаження...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (data.length === 0) return <p className="p-4 text-center text-lg md:text-xl text-gray-500">Підрозділ поки що не має такого обладнання.</p>;

  return (
    <div className="mx-auto w-full p-2 md:p-4">
      {/* Desktop/Tablet header - hidden only on mobile */}
      <div className="hidden md:grid title grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-5 text-[#202955] items-center justify-between text-center mb-4 font-bold border-b pb-2 text-sm">
        <p><strong>Інвентарний<br />номер:</strong></p>
        <p><strong>Дата<br />Випробування:</strong></p>
        <p><strong>Результат<br />випробувань:</strong></p>
        <p><strong>Дата наступного<br />Випробування:</strong></p>
        <p><strong>Акт / Протокол</strong></p>
        <p><strong>Редагувати</strong></p>
      </div>

      <ul className="space-y-4">
        {data.map((item) =>
          editId === item.testingId ? (
            // Edit mode - responsive
            <li key={item.testingId} className={`test-itm grid grid-cols-1 md:grid-cols-6 border p-3 md:p-4 rounded shadow-sm gap-3 md:gap-5 mb-4 relative ${bgColor(editedItem.testingResult)}`}>
              <div className="flex flex-col md:block">
                <label className="text-xs font-bold mb-1 md:hidden">Інвентарний номер:</label>
                <p className="text-sm md:text-base">{editedItem.deviceInventoryNumber}</p>
              </div>

              <div className="flex flex-col md:block">
                <label className="text-xs font-bold mb-1 md:hidden">Дата випробування:</label>
                <input
                  type="date"
                  value={editedItem.testingDate || ''}
                  onChange={(e) => setEditedItem({ ...editedItem, testingDate: e.target.value })}
                  className="border px-2 py-1 rounded text-sm md:text-base w-full"
                />
              </div>

              <div className="flex flex-col md:block">
                <label className="text-xs font-bold mb-1 md:hidden">Результат:</label>
                <select
                  value={editedItem.testingResult || ''}
                  onChange={(e) => setEditedItem({ ...editedItem, testingResult: e.target.value })}
                  className="border px-2 py-1 rounded text-sm md:text-base w-full"
                >
                  <option value="passed">Пройдено</option>
                  <option value="failed">Не пройдено</option>
                </select>
              </div>

              <div className="flex flex-col md:block">
                <label className="text-xs font-bold mb-1 md:hidden">Наступне випробування:</label>
                <input
                  type="date"
                  value={editedItem.nextTestingDate || ''}
                  onChange={(e) => setEditedItem({ ...editedItem, nextTestingDate: e.target.value })}
                  className="border px-2 py-1 rounded text-sm md:text-base w-full"
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className="text-xs font-bold mb-1 md:hidden">Документ:</label>
                <input
                  type="text"
                  placeholder="Назва протоколу"
                  value={editedItem.documentName || ''}
                  onChange={(e) => setEditedItem({ ...editedItem, documentName: e.target.value })}
                  className="border px-1 py-1 rounded text-sm md:text-base w-full"
                />
                <input
                  type="text"
                  placeholder="Посилання на протокол"
                  value={editedItem.url || ''}
                  onChange={(e) => setEditedItem({ ...editedItem, url: e.target.value })}
                  className="border px-1 py-1 rounded text-sm md:text-base w-full"
                />
              </div>

              <button
                onClick={handleSave}
                title='Зберегти зміни'
                className="text-[#202955] save-btn text-2xl md:text-3xl px-3 py-1 md:absolute md:right-12 md:top-1/3 rounded cursor-pointer hover:text-3xl md:hover:text-4xl transition-all duration-200"
              >
                <MdOutlineSaveAs />
              </button>
            </li>
          ) : (
            // View mode - responsive card layout on mobile, 6-col grid on tablet/desktop
            <li key={item.testingId} className={`test-itm grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-3 md:gap-5 w-full border p-3 md:p-4 rounded shadow-sm text-[#202955] font-bold text-center mb-4 relative ${bgColor(item.testingResult)}`}>
              <div className="flex justify-between md:block">
                <span className="text-xs font-bold md:hidden">Інв. номер:</span>
                <p className='cursor-pointer text-sm md:text-base'>{item.deviceInventoryNumber}</p>
              </div>

              <div className="flex justify-between md:block">
                <span className="text-xs font-bold md:hidden">Дата випробування:</span>
                <p className="text-sm md:text-base">{formatDate(item.testingDate)}</p>
              </div>

              <div className="flex justify-between md:block">
                <span className="text-xs font-bold md:hidden">Результат:</span>
                <p className="text-sm md:text-base">{item.testingResult === 'passed' ? 'Пройдено' : item.testingResult === 'failed' ? 'Не пройдено' : 'Проходить випробування'}</p>
              </div>

              <div className="flex justify-between md:block">
                <span className="text-xs font-bold md:hidden">Наступне випробування:</span>
                <p className="text-sm md:text-base">{formatDate(item.nextTestingDate)}</p>
              </div>

              <div className="flex justify-between md:block">
                <span className="text-xs font-bold md:hidden">Документ:</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#202955] underline text-sm md:text-base"
                >
                  {item.documentName}
                </a>
              </div>

              <button
                title='Редагувати'
                className="text-[#202955] text-xl md:text-2xl transition-all py-1 rounded cursor-pointer md:absolute md:right-12 md:top-1/2 md:transform md:-translate-y-1/2 hover:text-2xl md:hover:text-3xl transition-all duration-200 mt-2 md:mt-0"
                onClick={() => {
                  setEditId(item.testingId);
                  setEditedItem({
                    deviceInventoryNumber: item.deviceInventoryNumber,
                    testingDate: new Date(item.testingDate).toISOString().split('T')[0],
                    testingResult: item.testingResult,
                    nextTestingDate: new Date(item.nextTestingDate).toISOString().split('T')[0],
                    documentName: item.documentName || '',
                    deviceName: item.deviceName || '',
                    url: item.url || '',
                  });
                }}
              >
                <RiEdit2Line className='cursor-pointer edit-btn mx-auto' />
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default TestingList;
