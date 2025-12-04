import React from 'react';
import TestingList from "./TestingList";
import TitleTesting from "./TitleTesting";
import TransferList from "./TransferList";
import ExtenguishLiquids from "./ExtenguishLiquids";
import TestingView from "./TestingView";

const TestPole = ({ brigadeId, equipmentId, isSuperAdmin, responseData, setRefreshTrigger, refreshTrigger }) => {
  // Check if we should show special views
  const showTransferList = equipmentId === 'transfer';
  const showLiquidsList = equipmentId === 'liquids';
  const showTestingView = equipmentId === 'testing';

  return (
    <div className='w-full bg-white border-[1px] rounded-[10px] mb-10 p-2 md:p-4 max-w-full'>
      {showTestingView ? (
        <TestingView
          brigadeId={brigadeId}
          isSuperAdmin={isSuperAdmin}
          responseData={responseData}
          setRefreshTrigger={setRefreshTrigger}
          refreshTrigger={refreshTrigger}
        />
      ) : showLiquidsList ? (
        <ExtenguishLiquids />
      ) : showTransferList ? (
        <TransferList brigadeId={brigadeId} responseData={responseData} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default TestPole;
