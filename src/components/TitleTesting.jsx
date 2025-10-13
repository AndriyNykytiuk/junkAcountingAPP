import React from 'react'
import AddTest from './AddTest'

const TitleTesting = ({ isSuperAdmin, brigadeId, equipmentId, setRefreshTrigger }) => {
  return (
    <div className="mx-auto  w-full p-4 relative ">     
         <h2 className="text-3xl text-[#202955] text-center font-bold mb-8">Результати випробувань</h2>
            <div   className='absolute top-1/2 right-1/9'>
                {isSuperAdmin&&  
                <AddTest className='cursor-pointer hover:scale-110 transition-all duration-200'
                        brigadeId={brigadeId} 
                        equipmentId={equipmentId} 
                        setRefreshTrigger={setRefreshTrigger}
                        />}
            </div>
        </div>
  )
}

export default TitleTesting