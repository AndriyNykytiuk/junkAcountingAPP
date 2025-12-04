import React from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { MdSaveAlt } from "react-icons/md";

const PowderComponent = () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);

    // Стан для даних
    const [data, setData] = React.useState({
        carsAmount: 5000,
        warehouseAmount: 1000
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
            console.log('Відправка PUT запиту на бекенд з даними порошку:', editData);

            // Симуляція затримки мережі
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Імітація успішної відповіді
            console.log('Відповідь від сервера: Дані порошку успішно оновлено');

            // Оновлюємо основний стан
            setData({ ...editData });
            setIsEditing(false);

            alert('Дані порошку успішно збережено!');
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
        <div className="flex-1 mt-4 lg:mt-0">
            <div className='flex justify-between items-center px-10 font-bold text-sm sm:text-base md:text-lg lg:text-xl text-center mb-3 sm:mb-4 text-[#203955] border-b-2 border-[#fcd600] pb-2'>
                <h4 className="">
                    Порошок
                </h4>
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

            <div className="powder-block flex flex-col px-10 sm:flex-row gap-3 sm:gap-4 justify-center">
                <div className="flex-1  border-2 border-[#203955] rounded-lg p-2 sm:p-3 md:p-4 bg-white shadow-sm max-w-md">
                    <div className="space-y-2 sm:space-y-3">
                        <div className='flex gap-4 items-center justify-between'>
                            <h4 className="font-semibold text-xs sm:text-sm md:text-base text-[#203955]">
                                На автомобілях:
                            </h4>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.carsAmount}
                                    onChange={(e) => handleInputChange('carsAmount', e.target.value)}
                                    className="font-bold text-green-700 text-sm sm:text-base border-2 border-[#203955] rounded px-2 py-1 w-20 focus:outline-none focus:border-[#fcd600]"
                                    min="0"
                                />
                            ) : (
                                <p className="font-bold text-green-700 text-sm sm:text-base">{data.carsAmount}</p>
                            )}
                        </div>
                        <div className="flex justify-between items-center gap-4 border-t border-gray-200 pt-2 sm:pt-3">
                            <h4 className="font-semibold text-xs sm:text-sm md:text-base text-[#203955]">
                                На складі:
                            </h4>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.warehouseAmount}
                                    onChange={(e) => handleInputChange('warehouseAmount', e.target.value)}
                                    className="font-bold text-green-700 text-sm sm:text-base border-2 border-[#203955] rounded px-2 py-1 w-20 focus:outline-none focus:border-[#fcd600]"
                                    min="0"
                                />
                            ) : (
                                <p className="font-bold text-green-700 text-sm sm:text-base">{data.warehouseAmount}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PowderComponent
