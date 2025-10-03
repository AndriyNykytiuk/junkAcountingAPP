import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/DashBoard';
import Aside from './components/Aside';
import TestPole from './components/TestPole';
import Header from './components/Header';

const App = () => {
  const [responseData, setResponseData] = useState(null);
  const [selectedBrigadeId, setSelectedBrigadeId] = useState(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

  const isSuperAdmin = Array.isArray(responseData?.detachments);
  const isRegularUser = responseData?.brigadeId && !isSuperAdmin;

  useEffect(() => {
    if (isRegularUser) {
      setSelectedBrigadeId(responseData.brigadeId);
    }
  }, [responseData]);

  if (!responseData) {
    return (
      <div className="min-h-screen bg-[#dedede] mx-auto container">
        <LoginForm onLogin={setResponseData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />
      <div className="flex gap-4 p-5 mx-auto container">
       <div className='flex flex-col '>
         {isSuperAdmin && (
          <Dashboard
            responseData={responseData}
            onBrigadeSelect={setSelectedBrigadeId}
            onEquipmentSelect={setSelectedEquipmentId}
          />
        )}
        <Aside onEquipmentSelect={setSelectedEquipmentId} />
       </div>
        <div className="flex-1">
          <TestPole
            brigadeId={selectedBrigadeId}
            equipmentId={selectedEquipmentId}
          />
        </div>
      </div>
    </div>
  );
};


export default App;
