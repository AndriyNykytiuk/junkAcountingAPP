import { useEffect, useState } from 'react';

const NextDateChecker = ({ brigadeId, refreshTrigger }) => {
  const [upcomingTests, setUpcomingTests] = useState([]);

  useEffect(() => {
    if (!brigadeId) {
      return;
    }

    const fetchTestingForAllEquipment = async () => {
      try {
        const sessionId = localStorage.getItem('sessionId');
        const response = await fetch('/api/testing/equipments', {
          method: 'GET',
          headers: {
            'session-id': sessionId,
            'Content-Type': 'application/json',
          },
        });

        const equipmentList = await response.json();
        console.log('Повний список обладнання:', equipmentList);

        const equipmentIds = equipmentList.map(item => item.id);
        console.log('Масив equipmentId:', equipmentIds);

        const allTestingItems = [];

        // Збираємо всі тестування для кожного обладнання
        for (const equipmentId of equipmentIds) {
          const url = `/api/testing/brigade/${brigadeId}/equipment/${equipmentId}`;

          const res = await fetch(url, {
            method: 'GET',
            headers: {
              'session-id': sessionId,
              'Content-Type': 'application/json',
            },
          });

          const testData = await res.json();
          const items = testData.testingItems || [];
          console.log(`Тестування для equipmentId=${equipmentId}:`, items);
          allTestingItems.push(...items);
        }

        console.log('Всі тестування в частині:', allTestingItems);

        // Фільтруємо тестування що потребують уваги (наступні 10 днів)
        const loginDate = new Date();
        const thresholdDate = new Date(loginDate.getTime() + 10 * 24 * 60 * 60 * 1000);

        const filteredTests = allTestingItems.filter(item => {
          if (typeof item.nextTestingDate === 'number') {
            const testDate = new Date(item.nextTestingDate);
            return testDate >= loginDate && testDate <= thresholdDate;
          }
          return false;
        });

        // Сортуємо за датою
        filteredTests.sort((a, b) => a.nextTestingDate - b.nextTestingDate);

        setUpcomingTests(filteredTests);
        console.log('Тестування через 10 днів:', filteredTests.map(item => ({
          deviceInventoryNumber: item.deviceInventoryNumber,
          nextTestingDate: new Date(item.nextTestingDate).toISOString(),
        })));

      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      }
    };

    fetchTestingForAllEquipment();
  }, [brigadeId, refreshTrigger]);

  return (
    <>
      {upcomingTests.length > 0 && (
        <div className="p-2 md:p-4 bg-white text-center text-[#202955] font-medium border-[1px] rounded-[10px] mb-4 overflow-hidden max-w-full">
          <h3 className="text-base md:text-lg lg:text-2xl xl:text-3xl text-[#202955] text-center font-bold mb-4 md:mb-8 break-words px-2">
            ПТО та АРО що потребує випробувань
          </h3>

          {/* Desktop header - hidden on mobile */}
          <div className='hidden md:grid grid-cols-3 gap-2 md:gap-4 mb-4 font-extrabold border-b text-sm md:text-base px-2'>
            <h4 className="break-words">Назва обладнання</h4>
            <h4 className="break-words">Інвентарний номер:</h4>
            <h4 className="break-words">Випробувати до:</h4>
          </div>

          {/* List items - card layout on mobile, grid on desktop */}
          <ul className="space-y-2 md:space-y-3">
            {upcomingTests.map((item, index) => (
              <li
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 place-items-center bg-[#fcd600] opacity-90 shadow-sm p-3 md:p-2 border rounded text-xs md:text-sm overflow-hidden"
              >
                {/* Mobile: card layout with labels */}
                <div className="flex justify-between w-full md:block px-2">
                  <span className="font-bold md:hidden">Назва обладнання:</span>
                  <div className="font-semibold md:font-normal text-right md:text-center break-words max-w-[60%] md:max-w-full">
                    {item.deviceName}
                  </div>
                </div>

                <div className="flex justify-between w-full md:block px-2">
                  <span className="font-bold md:hidden">Інвентарний номер:</span>
                  <div className="text-right md:text-center break-words">{item.deviceInventoryNumber}</div>
                </div>

                <div className="flex justify-between w-full md:block px-2">
                  <span className="font-bold md:hidden">Випробувати до:</span>
                  <div className="text-right md:text-center font-bold md:font-normal break-words">
                    {new Date(item.nextTestingDate).toLocaleDateString('uk-UA')}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NextDateChecker;
