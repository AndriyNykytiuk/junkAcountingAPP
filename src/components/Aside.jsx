import React from 'react'
import EquipmentList from './EquipmentList'

const Aside = ({ onEquipmentSelect }) => {
  return (
    <div className='w-64 h-screen p-4 bg-white rounded-[10px] border-[1px] '>
      <EquipmentList onEquipmentSelect={onEquipmentSelect} />

    </div>
  );
};

export default Aside;
      


