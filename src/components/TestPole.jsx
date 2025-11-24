import React from 'react';
import TestingList from "./TestingList";
import TitleTesting from "./TitleTesting";

const TestPole = ({ brigadeId, equipmentId, isSuperAdmin, responseData, setRefreshTrigger, refreshTrigger }) => {
  return (
    <div className='w-full h-auto lg:h-screen bg-white border-[1px] rounded-[10px] mb-10 p-2 md:p-4 overflow-hidden max-w-full'>
      <TitleTesting
        isSuperAdmin={isSuperAdmin}
        brigadeId={brigadeId}
        equipmentId={equipmentId}
        setRefreshTrigger={setRefreshTrigger}
      />

      <TestingList
        brigadeId={brigadeId}
        equipmentId={equipmentId}
        isSuperAdmin={isSuperAdmin}
        responseData={responseData}
        setRefreshTrigger={setRefreshTrigger}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
};

export default TestPole;
