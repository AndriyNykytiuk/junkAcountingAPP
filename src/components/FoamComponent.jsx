import React from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { MdSaveAlt } from "react-icons/md";

const FoamComponent = () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);

    // Стан для даних
    const [data, setData] = React.useState({
        carsPassedTests: 0,
        carsFailedTests: 0,
        warehousePassedTests: 0,
        warehouseFailedTests: 0,
        usedFromYearStart: 9200
    });

    // Тимчасовий стан для редагування
    const [editData, setEditData] = React.useState({ ...data });

    // Обробник зміни значень в input
    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: parseInt(value) || 0
        }));
    };

    // Імітація PUT запиту на бекенд
    const handleSave = async () => {
        setIsSaving(true);

        try {
            // Імітація API запиту
            console.log('Відправка PUT запиту на бекенд з даними:', editData);

            // Симуляція затримки мережі
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Імітація успішної відповіді
            console.log('Відповідь від сервера: Дані успішно оновлено');

            // Оновлюємо основний стан
            setData({ ...editData });
            setIsEditing(false);

            alert('Дані успішно збережено!');
        } catch (error) {
            console.error('Помилка при збереженні:', error);
            alert('Помилка при збереженні даних');
        } finally {
            setIsSaving(false);
        }
    };

    // Скасування редагування
    const handleCancel = () => {
        setEditData({ ...data });
        setIsEditing(false);
    };

    return (
        <div className="flex-1">
            <div className='flex justify-between items-center px-10 font-bold text-sm sm:text-base md:text-lg lg:text-xl text-center mb-3 sm:mb-4 text-[#203955] border-b-2 border-[#fcd600] pb-2'>
                <h3 className="">
                    Піноутворювач
                </h3>
                {isEditing ? (
                    <div className="flex gap-2">
                        <button
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            disabled={isSaving}
                        >
                            
                        </button>
                        <MdSaveAlt
                            onClick={handleSave}
                            className={`cursor-pointer ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:text-green-600'} transition-colors`}
                        />
                    </div>
                ) : (
                    <AiOutlineEdit
                        onClick={() => setIsEditing(true)}
                        className="cursor-pointer hover:text-[#fcd600] transition-colors"
                    />
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* На автомобілях */}
                <div className="flex-1 border-2 border-[#203955] rounded-lg p-2 sm:p-3 md:p-4 bg-white shadow-sm">
                    <h4 className="font-semibold text-xs sm:text-sm md:text-base text-[#203955] mb-2 sm:mb-3">
                        На автомобілях:
                    </h4>
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                        <p className="text-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                            <span className="font-medium">Пройшов випробування:</span>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.carsPassedTests}
                                    onChange={(e) => handleInputChange('carsPassedTests', e.target.value)}
                                    className="font-bold text-green-700 text-sm sm:text-base border-2 border-[#203955] rounded px-2 py-1 w-20 focus:outline-none focus:border-[#fcd600]"
                                    min="0"
                                />
                            ) : (
                                <span className="font-bold text-green-700 text-sm sm:text-base">{data.carsPassedTests}</span>
                            )}
                        </p>
                        <p className="text-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                            <span className="font-medium">Не пройшов випробування:</span>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.carsFailedTests}
                                    onChange={(e) => handleInputChange('carsFailedTests', e.target.value)}
                                    className="font-bold text-red-700 text-sm sm:text-base border-2 border-[#203955] rounded px-2 py-1 w-20 focus:outline-none focus:border-[#fcd600]"
                                    min="0"
                                />
                            ) : (
                                <span className="font-bold text-red-700 text-sm sm:text-base">{data.carsFailedTests}</span>
                            )}
                        </p>
                    </div>
                </div>

                {/* На складі */}
                <div className="flex-1 border-2 border-[#203955] rounded-lg p-2 sm:p-3 md:p-4 bg-white shadow-sm">
                    <h4 className="font-semibold text-xs sm:text-sm md:text-base text-[#203955] mb-2 sm:mb-3">
                        На складі:
                    </h4>
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                        <p className="text-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                            <span className="font-medium">Пройшов випробування:</span>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.warehousePassedTests}
                                    onChange={(e) => handleInputChange('warehousePassedTests', e.target.value)}
                                    className="font-bold text-green-700 text-sm sm:text-base border-2 border-[#203955] rounded px-2 py-1 w-20 focus:outline-none focus:border-[#fcd600]"
                                    min="0"
                                />
                            ) : (
                                <span className="font-bold text-green-700 text-sm sm:text-base">{data.warehousePassedTests}</span>
                            )}
                        </p>
                        <p className="text-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                            <span className="font-medium">Не пройшов випробування:</span>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.warehouseFailedTests}
                                    onChange={(e) => handleInputChange('warehouseFailedTests', e.target.value)}
                                    className="font-bold text-red-700 text-sm sm:text-base border-2 border-[#203955] rounded px-2 py-1 w-20 focus:outline-none focus:border-[#fcd600]"
                                    min="0"
                                />
                            ) : (
                                <span className="font-bold text-red-700 text-sm sm:text-base">{data.warehouseFailedTests}</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center p-3">
                <p className='text-gray-700 font-bold'>Використано з початку року: </p>
                
                
                
                    <p className='font-bold text-green-700'>{data.usedFromYearStart} л</p>
                
            </div>
        </div>
    )
}

export default FoamComponent
