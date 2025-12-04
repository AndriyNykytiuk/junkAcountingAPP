import React from 'react';

const Aside = ({ onEquipmentSelect, onTransferSelect, onLiquidsSelect, onTestingSelect }) => {

  const handleTransferClick = () => {
    onTransferSelect();
  };

  const handleExtenguishLiquidsClick = () => {
    onLiquidsSelect();
  };

  const handleTestingClick = () => {
    onTestingSelect();
  };


  return (
    <div className='w-full lg:w-64 h-auto lg:h-screen p-2 md:p-4 bg-white rounded-[10px] border-[1px] overflow-hidden max-w-full'>

      {/* Випробування button */}
      <div className="w-full mx-auto  md: max-w-full">
        <div
          className="text-base md:text-lg lg:text-xl text-center cursor-pointer font-bold mb-4 p-4 border-2 border-[#203955] rounded-lg bg-gradient-to-br from-gray-50 to-white shadow-md hover:border-[#fcd600] hover:shadow-lg transition-all duration-200 break-words text-[#203955]"
          onClick={handleTestingClick}
        >
          Випробування
        </div>
      </div>

      {/* Передача майна button */}
      <div className="w-full mx-auto md:max-w-full">
        <div
          className="text-base md:text-lg lg:text-xl text-center cursor-pointer font-bold mb-4 p-4 border-2 border-[#203955] rounded-lg bg-gradient-to-br from-gray-50 to-white shadow-md hover:border-[#fcd600] hover:shadow-lg transition-all duration-200 break-words text-[#203955]"
          onClick={handleTransferClick}
        >
          Передача майна
        </div>
      </div>

      {/* Засоби пожежогасіння button */}
      <div className="w-full mx-auto md: max-w-full">
        <div
          className="text-base md:text-lg lg:text-xl text-center cursor-pointer font-bold mb-4 p-4 border-2 border-[#203955] rounded-lg bg-gradient-to-br from-gray-50 to-white shadow-md hover:border-[#fcd600] hover:shadow-lg transition-all duration-200 break-words text-[#203955]"
          onClick={handleExtenguishLiquidsClick}
        >
          Засоби пожежогасіння
        </div>
      </div>
    </div>
  );
};

export default Aside;
