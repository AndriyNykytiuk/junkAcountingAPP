import React,{useState} from 'react'
import { MdCreateNewFolder } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";

const AddTest = ({ brigadeId, equipmentId,setRefreshTrigger}) => {
    const [addItem, setAddItem] = useState(false);
    const [deviceInventoryNumber, setDeviceInventoryNumber] = useState('');
    const [testingDate, setTestingDate] = useState('');
    const [testingResult, setTestingResult] = useState('');
    const [nextTestingDate, setNextTestingDate] = useState('');
    const [url, setUrl] = useState('');

    const toggleAddItem = () => {
        setAddItem(prev=>!prev);
    }
    const handleInventoryChange = (e) => {
        setDeviceInventoryNumber(e.target.value);
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
                    testingDate: testingDate,
                    testingResult: testingResult,
                    nextTestingDate: nextTestingDate,
                    url: url,
                    // protocolTitle: item.protocolTitle || '',
                    }),
                    
                }); 
                console.log({
                        deviceInventoryNumber,
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
            <div className='fixed  bg-white  left-1/8 top-1/4  z-5 p-10 shadow-md'>
                <h2> Для додавання нового випробування заповніть поля:</h2>  
                <div className='flex items-center  gap-2  p-2 rounded '>
                <div>
                    <input type="text"
                    className='border px-3 py-2 rounded bg-white' 
                    placeholder='інвентарний номер обладнання'
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
                    <option value="">Результат випробування</option>
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
                    placeholder='URL документації'
                    onChange={handleUrlChange} />
                </div>
                <button onClick={handleAddTest} 
                title='Додати випробування'>
                    <MdAddCircleOutline className='h-[35px] w-[35px] cursor-pointer hover:scale-110 transition-transform duration-200' />
                </button>
            </div>
            </div>
            

          
        </div>
        
        )
    }
    </div>

     
  )
}

export default AddTest