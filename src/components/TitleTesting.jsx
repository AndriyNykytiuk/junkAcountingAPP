import React from 'react';
import AddTest from './AddTest';

const TitleTesting = ({ isSuperAdmin, brigadeId, equipmentId, setRefreshTrigger }) => {
  return (
    <div className="mx-auto w-full p-2 md:p-4 relative overflow-hidden max-w-full">
      <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#202955] text-center font-bold mb-4 md:mb-8 break-words px-2">
        Результати випробувань
      </h2>
      <div className='hidden md:block absolute top-2 md:top-4 right-2 md:right-8'>
        {isSuperAdmin && (
          <AddTest
            className='cursor-pointer hover:scale-110 transition-all duration-200'
            brigadeId={brigadeId}
            equipmentId={equipmentId}
            setRefreshTrigger={setRefreshTrigger}
          />
        )}
      </div>
    </div>
  );
};

export default TitleTesting;