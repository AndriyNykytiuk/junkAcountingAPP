import React from 'react';
import TestingList from "./TestingList";
import NextTestingChecker from './NextDateChecker';
import TitleTesting from "./TitleTesting";

const TestPole = ({ brigadeId, equipmentId, isSuperAdmin, responseData,setRefreshTrigger,refreshTrigger}) => {
  return (
    <div className='w-full h-screen bg-white border-[1px] rounded-[10px] mb-10 p-4' >

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

   
