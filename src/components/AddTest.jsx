import React, { useState } from 'react';
import { MdCreateNewFolder } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";

const AddTest = ({ brigadeId, equipmentId, setRefreshTrigger }) => {
    const [addItem, setAddItem] = useState(false);
    const [deviceName, setDeviceName] = useState('');
    const [deviceInventoryNumber, setDeviceInventoryNumber] = useState('');
    const [testingDate, setTestingDate] = useState('');
    const [testingResult, setTestingResult] = useState('');
    const [nextTestingDate, setNextTestingDate] = useState('');
    const [documentName, setDocumentName] = useState('');
    const [url, setUrl] = useState('');

    const toggleAddItem = () => {
        setAddItem(prev => !prev);
    };

    const toggleCloseItem = () => {
        setAddItem(false);
    };

    const handleInventoryChange = (e) => setDeviceInventoryNumber(e.target.value);
    const handleDeviceNameChange = (e) => setDeviceName(e.target.value);
    const handleTestingDateChange = (e) => setTestingDate(new Date(e.target.value).getTime());
    const handleTestingResultChange = (e) => setTestingResult(e.target.value);
    const handleNextTestingDateChange = (e) => setNextTestingDate(new Date(e.target.value).getTime());
    const handleDocumentNameChange = (e) => setDocumentName(e.target.value);
    const handleUrlChange = (e) => setUrl(e.target.value);

    const handleAddTest = async () => {
        if (!brigadeId || !equipmentId) return;

        try {
            const sessionId = localStorage.getItem('sessionId');
            const res = await fetch('/api/testing/brigade/' + brigadeId + '/equipment/' + equipmentId, {
                method: 'POST',
                headers: {
                    'session-id': sessionId,
                    'Content-Type': 'application/json'
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

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Помилка додавання: ${errorText}`);
            }
        } catch (err) {
            console.error(err);
        }
        if (setRefreshTrigger) setRefreshTrigger(Date.now());
        setAddItem(false);
    };

    return (
        <div>
            <button
                onClick={toggleAddItem}
                className='text-2xl mr-2 cursor-pointer hover:scale-110 transition-transform duration-200'
                title='Додати нове випробування'
            >
                <MdCreateNewFolder className='h-[30px] w-[30px] md:h-[40px] md:w-[40px]' />
            </button>
            {addItem && (
                <div className='flex flex-col fixed inset-0 z-50 backdrop-blur-sm p-4 md:p-10 overflow-y-auto'>
                    <div className='flex flex-col items-center gap-3 bg-white w-full max-w-4xl mx-auto my-auto p-4 md:p-10 shadow-md rounded-lg relative'>
                        <h2 className='text-lg md:text-2xl mb-3 text-center'>
                            Для додавання нового випробування заповніть поля:
                        </h2>
                        <MdAddCircleOutline
                            onClick={toggleCloseItem}
                            className='text-2xl md:text-3xl absolute right-4 md:right-10 top-3 md:top-5 cursor-pointer rotate-[45deg] hover:scale-110 transition-transform duration-200'
                        />

                        <div className='flex flex-col md:flex-row md:flex-wrap items-stretch gap-3 md:gap-2 p-1 rounded mb-4 w-full'>
                            <div className='flex-1 min-w-[200px]'>
                                <input
                                    type="text"
                                    className='w-full border px-3 py-2 rounded bg-white text-sm md:text-base'
                                    placeholder='Назва обладнання'
                                    onChange={handleDeviceNameChange}
                                />
                            </div>

                            <div className='flex-1 min-w-[200px]'>
                                <input
                                    type="text"
                                    className='w-full border px-3 py-2 rounded bg-white text-sm md:text-base'
                                    placeholder='Інвентарний номер'
                                    onChange={handleInventoryChange}
                                />
                            </div>

                            <div className='flex-1 min-w-[200px]'>
                                <input
                                    type="date"
                                    className='w-full border px-3 py-2 rounded bg-white text-sm md:text-base'
                                    placeholder='Дата випробування'
                                    onChange={handleTestingDateChange}
                                />
                            </div>

                            <div className='flex-1 min-w-[200px]'>
                                <select
                                    value={testingResult}
                                    onChange={handleTestingResultChange}
                                    name="choseOption"
                                    className='w-full border px-3 py-2 rounded bg-white text-sm md:text-base'
                                >
                                    <option value="">Результат</option>
                                    <option value="passed" className='bg-green-200'>Пройдено</option>
                                    <option value="not passed" className='bg-red-200'>Не пройдено</option>
                                </select>
                            </div>

                            <div className='flex-1 min-w-[200px]'>
                                <input
                                    type="date"
                                    className='w-full border px-3 py-2 rounded bg-white text-sm md:text-base'
                                    placeholder='Дата наступного випробування'
                                    onChange={handleNextTestingDateChange}
                                />
                            </div>

                            <div className='flex-1 min-w-[200px]'>
                                <input
                                    type="text"
                                    className='w-full border px-3 py-2 rounded bg-white text-sm md:text-base'
                                    placeholder='Назва документу'
                                    onChange={handleDocumentNameChange}
                                />
                            </div>

                            <div className='flex-1 min-w-[200px]'>
                                <input
                                    type="text"
                                    className='w-full border px-3 py-2 rounded bg-white text-sm md:text-base'
                                    placeholder='Посилання на документ'
                                    onChange={handleUrlChange}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleAddTest}
                            title='Додати випробування'
                            className='w-full md:w-auto border-[1px] border-gray-300 p-3 md:p-2 rounded cursor-pointer hover:scale-105 transition-transform duration-200 hover:bg-[#fcdb28] bg-white text-sm md:text-base font-semibold'
                        >
                            Додати випробуване обладнання
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTest;