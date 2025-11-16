import React,{useState} from 'react'
import { MdCreateNewFolder } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";

const AddTest = ({ brigadeId, equipmentId,setRefreshTrigger}) => {
    const [addItem, setAddItem] = useState(false);
   
    const [deviceName, setDeviceName] = useState('');
    const [deviceInventoryNumber, setDeviceInventoryNumber] = useState('');
    const [testingDate, setTestingDate] = useState('');
    const [testingResult, setTestingResult] = useState('');
    const [nextTestingDate, setNextTestingDate] = useState('');
    const [documentName, setDocumentName] = useState('');
    const [url, setUrl] = useState('');

    const toggleAddItem = () => {
        setAddItem(prev=>!prev);
    }
    const toggleCloseItem=()=>{
        setAddItem(false)
    }
    const handleInventoryChange = (e) => {
        setDeviceInventoryNumber(e.target.value);
    }
    const handleDeviceNameChange = (e) => {
        setDeviceName(e.target.value);
    }
    const handleTestingDateChange=(e)=>{
        setTestingDate(new Date(e.target.value).getTime());
    }

    const handleTestingResultChange=(e)=>{
        setTestingResult(e.target.value);
    }

    const handleNextTestingDateChange=(e)=>{
        setNextTestingDate(new Date(e.target.value).getTime());
    }
    const handleDocumentNameChange=(e)=>{
        setDocumentName(e.target.value);
    }
    const handleUrlChange=(e)=>{
        setUrl(e.target.value);
    }
 
        const handleAddTest = async () => {
            console.log('brigadeId:', brigadeId, 'equipmentId:', equipmentId);
            if (!brigadeId || !equipmentId) return;

            try{
                const sessionId=localStorage.getItem('sessionId');
                const res=await fetch('/api/testing/brigade/'+brigadeId+'/equipment/'+equipmentId,{
                    method:'POST',
                    headers:{
                        'session-id':sessionId,
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                    deviceInventoryNumber: deviceInventoryNumber,
                    deviceName: deviceName,
                    testingDate: testingDate,
                    testingResult: testingResult,
                    nextTestingDate: nextTestingDate,
                    url: url,
                    documentName: documentName,
                    }),
                    
                }); 
                console.log({
                        deviceInventoryNumber,
                        deviceName,
                        testingDate,
                        testingResult,
                        nextTestingDate,
                        url,
                        });

                
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Помилка додавання: ${errorText}`);
                }
            } catch (err) {
                console.error(err);
            }
            if (setRefreshTrigger) setRefreshTrigger(Date.now());
            setAddItem(false);

        }

  return (

    <div>
         <button onClick={toggleAddItem} 
         className='text-2xl  mr-2 cursor-pointer hover:scale-110 transition-transform duration-200' 
         title='Додати нове випробування'>
            <MdCreateNewFolder className='h-[35px] w-[35px]' />
            </button> 
            {
        addItem && (
        <div className= 'flex flex-col fixed inset-0 z-2 backdrop-blur-sm  top-1/2 h-full w-screen transform -translate-y-1/2 p-10   p-2 rounded shadow-md'>
            <div className='flex flex-col items-center gap-3 fixed  bg-white  left-2 top-1/4  z-5 p-10 shadow-md'>
                <h2 className='text-2xl mb-3'> Для додавання нового випробування заповніть поля:</h2> 
                 <MdAddCircleOutline 
                 onClick={toggleCloseItem} 
                 className='text-2xl absolute right-10 top-5 mb-2 cursor-pointer rotate-[45deg] hover:scale-110 transition-transform duration-200 '
                 />
                <div className='flex  items-start  gap-2  p-1 rounded mb-4 '>
                    <div>
                            <input type="text"
                            className='border px-3 py-2 rounded bg-white' 
                            placeholder='назва обладнання'
                            onChange={handleDeviceNameChange}
                            />
                    </div>
                    <div>
                    <input type="text"
                    className='border px-3 py-2 rounded bg-white' 
                    placeholder='інвентарний номер '
                    onChange={handleInventoryChange}
                    />
                </div>
                <div>
                    <input type="date"
                     className='border px-3 py-2 rounded bg-white' 
                    placeholder='дата випробування'
                    onChange={handleTestingDateChange} />
                </div>
                <div>
                <select value={testingResult} onChange={handleTestingResultChange} name="choseOption"
                 className='border px-3 py-2 rounded bg-white'  >
                    <option value="">Результат</option>
                    <option value="passed" className='bg-green-200'>Пройдено</option>
                    <option value="not passed"  className='bg-red-200'>Не пройдено</option>
                </select>
                </div>
                <div>
                    <input type="date"
                     className='border px-3 py-2 rounded bg-white' 
                    placeholder='дата наступного випробування'
                    onChange={handleNextTestingDateChange} />
                </div>
                <div>
                    <input type="text"
                     className='border px-3 py-2 rounded bg-white' 
                    placeholder='назва документу'
                    onChange={handleDocumentNameChange} />
                </div>
                <div>
                    <input type="text"
                     className='border px-3 py-2 rounded bg-white' 
                    placeholder='посилання на документ'
                    onChange={handleUrlChange} />
                </div>

            </div>
             <button onClick={handleAddTest} 
                title='Додати випробування'>
                    <h3 className='border-[1px] border-gray-300 p-2 rounded cursor-pointer hover:scale-105 transition-transform duration-200 hover:bg-[#fcdb28] transition-transform bg-white'>Додати випробуване обладнання</h3>
                </button>
            </div>
            

          
        </div>
        
        )
    }
    </div>

     
  )
}

export default AddTest