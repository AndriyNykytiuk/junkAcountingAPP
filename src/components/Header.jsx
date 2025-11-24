import React from 'react';
import Logo from '../img/DSNSlogo.svg';
import Burger from './Burger.jsx';

const Header = ({ isMenuOpen, onMenuToggle }) => {
  return (
    <div className='flex flex-col justify-center items-center py-6 md:py-10 px-4 bg-[#203955] relative border-b border-gray-300 overflow-hidden max-w-full'>
      <Burger isOpen={isMenuOpen} onClick={onMenuToggle} />
      <img src={Logo} alt="Image"
        className='h-16 w-16 md:h-22 md:w-22 object-contain'
      />
      <h3 className='text-white text-lg md:text-xl lg:text-2xl font-bold text-center px-2 break-words max-w-full'>
        Служба порятунку Рівненщини
      </h3>
    </div>
  );
};

export default Header;