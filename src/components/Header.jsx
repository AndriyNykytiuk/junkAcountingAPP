import React from 'react'
import Logo from '../img/DSNSlogo.svg'

const Header = () => {
  return (
    <div className='flex flex-col justify-center items-center py-10 bg-[#203955] border-b border-gray-300'>

        <img src={Logo} alt="Image" 
        className='h-22 w-22 object-contain'
        />
        <h3 className='text-white text-2xl font-bold'>Cлужба порятунку Рівненщини</h3>

    </div>
  )
}

export default Header