import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/DashBoard';
import Aside from './components/Aside';
import TestPole from './components/TestPole';
import Header from './components/Header';
import NextTestingChecker from './components/NextDateChecker';
import './css/asideSection.css';

const App = () => {
  const [responseData, setResponseData] = useState(null);
  const [selectedBrigadeId, setSelectedBrigadeId] = useState(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSuperAdmin = Array.isArray(responseData?.detachments);

  useEffect(() => {
    if (responseData?.brigadeId) {
      setSelectedBrigadeId(responseData.brigadeId);
    }
  }, [responseData]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (!responseData) {
    return (
      <div className="min-h-screen bg-[#dedede]">
        <LoginForm onLogin={setResponseData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#dedede] overflow-x-hidden max-w-full">
      <Header isMenuOpen={isMenuOpen} onMenuToggle={toggleMenu} />

      <div className="flex gap-2 md:gap-4 p-2 md:p-4 relative overflow-x-hidden max-w-full">
        {/* Overlay для закриття меню при кліку поза ним */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-40 lg:hidden"
            onClick={closeMenu}
          />
        )}

        {/* Sidebar з Dashboard та Aside */}
        <div className={`
          flex flex-col items-center aside-section gap-4
          fixed lg:relative top-0 left-0 h-full lg:h-auto
          bg-[#dedede] lg:bg-transparent
          transition-transform duration-300 ease-in-out
          z-50 lg:z-auto
          w-80 lg:w-auto
          pt-4 lg:pt-0
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Показуємо Dashboard тільки якщо користувач супер-адмін або не має brigadeId */}
          {(isSuperAdmin || !responseData.brigadeId) && (
            <Dashboard
              responseData={responseData}
              onBrigadeSelect={(id) => {
                setSelectedBrigadeId(id);
                closeMenu();
              }}
            />
          )}
          <Aside onEquipmentSelect={(id) => {
            setSelectedEquipmentId(id);
            closeMenu();
          }} />
        </div>

        {/* Main content */}
        <div className="w-full flex flex-col gap-4">
          <NextTestingChecker brigadeId={selectedBrigadeId} refreshTrigger={refreshTrigger} />
          <TestPole
            brigadeId={selectedBrigadeId}
            equipmentId={selectedEquipmentId}
            setRefreshTrigger={setRefreshTrigger}
            refreshTrigger={refreshTrigger}
            responseData={responseData}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
