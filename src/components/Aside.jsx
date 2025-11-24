import React from 'react';
import EquipmentList from './EquipmentList';

const Aside = ({ onEquipmentSelect }) => {
  return (
    <div className='w-full lg:w-64 h-auto lg:h-screen p-2 md:p-4 bg-white rounded-[10px] border-[1px] overflow-hidden max-w-full'>
      <EquipmentList onEquipmentSelect={onEquipmentSelect} />
    </div>
  );
};

export default Aside;
