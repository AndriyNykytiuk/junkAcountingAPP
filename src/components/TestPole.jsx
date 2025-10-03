import React from 'react';
import TestingList from "./TestingList";

const TestPole = ({ brigadeId, equipmentId }) => {
  return (
    <div className='w-full h-screen bg-white rounded mb-10'>

      <TestingList brigadeId={brigadeId} equipmentId={equipmentId} />
    </div>
  );
};

export default TestPole;
