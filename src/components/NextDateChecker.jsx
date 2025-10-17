import { useEffect,useState } from 'react';

const NextDateChecker = ({ brigadeId, refreshTrigger }) => {
  const [upcomingTests, setUpcomingTests] = useState([]);

  useEffect(() => {
      if (!brigadeId) {
   ;
    return;
  }
    const fetchTestingForAllEquipment = async () => {
      try {
        const sessionId = localStorage.getItem('sessionId');
      

        const response = await fetch('https://rasp.ivkeen.keenetic.link/api/testing/equipments', {
          method: 'GET',
          headers: {
            'session-id': sessionId,
            'Content-Type': 'application/json',
          },
        });

        const equipmentList = await response.json();
        console.log(' Повний список обладнання:', equipmentList);

        // 2. Витягуємо масив equipmentId
        const equipmentIds = equipmentList.map(item => item.id);
        console.log(' Масив equipmentId:', equipmentIds);
        const allTestingItems = [];

        
        for (const equipmentId of equipmentIds) {
          const url = `http://rasp.ivkeen.keenetic.link/api/testing/brigade/${brigadeId}/equipment/${equipmentId}`;
         

          const res = await fetch(url, {
            method: 'GET',
            headers: {
              'session-id': sessionId,
              'Content-Type': 'application/json',
            },
          });

          const testData = await res.json();
           const items = testData.testingItems || [];
          console.log(` Тестування для equipmentId=${equipmentId}:`, items);
          allTestingItems.push(...items);
          console.log(' Всі тестування в частині:', allTestingItems);
          
const loginDate = new Date(); 
const thresholdDate = new Date(loginDate.getTime() + 10 * 24 * 60 * 60 * 1000);



const upcomingTests = allTestingItems.filter(item => {
  if (typeof item.nextTestingDate === 'number') {
    const testDate = new Date(item.nextTestingDate);
    return testDate >=loginDate &&  testDate<=thresholdDate;
  }
  return false;
});

setUpcomingTests(upcomingTests);
console.log(' Тестування через 10 днів:', upcomingTests.map(item => ({
  deviceInventoryNumber: item.deviceInventoryNumber,
  nextTestingDate: new Date(item.nextTestingDate).toISOString(),
})));

        }

      } catch (error) {
        console.error(' Помилка', error);
      }
    };

    fetchTestingForAllEquipment();
  }, [brigadeId, refreshTrigger]);

 
  return (
    <>
      {upcomingTests.length > 0 && (
        <div className="p-4 bg-white text-center text-[#202955] font-medium border-[1px] rounded-[10px] mb-4">
          <h3 className="text-3xl text-[#202955] text-center font-bold mb-8">ПТО та АРО що потребує випробувань</h3>
          <div className='grid grid-cols-3 gap-4 mb-4 font-extrabold border-b '>
            <h4>Name:</h4>
            <h4>Інвентарний номер:</h4>
            <h4>Випробувати до:</h4>
          </div>
          <ul className="space-y-3">
            {upcomingTests.map((item, index) => (
              <li key={index} className="grid grid-cols-3 place-items-center bg-[#fcd600] opacity-90 shadow-sm p-2 border rounded">
                <div>тут буде назва</div>
                <div>{item.deviceInventoryNumber}</div>
                <div>{new Date(item.nextTestingDate).toLocaleDateString('uk-UA')}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NextDateChecker;
