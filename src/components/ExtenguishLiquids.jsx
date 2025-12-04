import React from 'react'
import FoamComponent from './FoamComponent';
import PowderComponent from './PowderComponent';
import StorageComponent from './StorageComponent';
import UsedExtenguishLiquids from './UsedExtenguishLiquids';

const ExtenguishLiquids = () => {
    return (
        <div className="w-full mx-auto p-2 sm:p-3 md:p-4 lg:p-5 max-w-full relative">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-bold mb-4 sm:mb-5 md:mb-6 p-2 sm:p-3 text-[#203955] border-b-2 border-[#f84f00]">
                Засоби пожежогасіння
            </h2>

            <div className="space-y-4 sm:space-y-5 md:space-y-6 pr-1">
                {/* Піноутворювач та Порошок секція */}
                <div className="border-2 border-[#203955] rounded-lg p-3 sm:p-4 md:p-5 bg-gradient-to-br from-gray-50 to-white shadow-md">
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-6">
                        {/* Піноутворювач */}
                        <FoamComponent />
                        {/* Порошок */}
                        <PowderComponent />
                    </div>
                </div>

                {/* Зберігання та Протоколи */}

                <StorageComponent />
                {/* Використання */}
                <div className="border-2 border-[#203955] rounded-lg p-3 sm:p-4 md:p-5 overflow-y-auto max-h-[75vh] bg-gradient-to-br from-gray-50 to-white shadow-md">


                    <UsedExtenguishLiquids />
                </div>
            </div>
        </div>
    )
}

export default ExtenguishLiquids
