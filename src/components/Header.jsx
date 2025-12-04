import React from 'react';
import Logo from '../img/DSNSlogo.svg';
import Burger from './Burger.jsx';

const Header = ({ isMenuOpen, onMenuToggle, selectedBrigadeName, selectedEquipmentName }) => {
  return (
    <div className='flex flex-col justify-center items-center py-6 md:pt-10 pb-2 px-4 bg-[#203955] relative border-b border-gray-300 overflow-hidden max-w-full'>
      <Burger isOpen={isMenuOpen} onClick={onMenuToggle} />
      <img src={Logo} alt="Image"
        className='h-16 w-16 md:h-22 md:w-22 object-contain'
      />
      <h3 className='text-white text-lg md:text-xl lg:text-2xl font-bold text-center px-2 break-words max-w-full'>
        Наглядова справа
      </h3>

      {/* Selected context - visible only on mobile/tablet */}
      {(selectedBrigadeName || selectedEquipmentName) && (
        <div className="lg:hidden mt-2 text-center">
          {selectedBrigadeName && (
            <p className="text-[#fcd700] font-bold text-sm md:text-base break-words">
              {selectedBrigadeName}
            </p>
          )}
          {selectedEquipmentName && (
            <p className="text-white text-xs md:text-sm break-words mt-1">
              {selectedEquipmentName}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;