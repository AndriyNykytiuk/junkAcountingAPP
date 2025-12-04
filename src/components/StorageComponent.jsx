import React from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { MdSaveAlt } from "react-icons/md";
import ExtenguisProtocols from './ExtenguisProtocols';

const StorageComponent = () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);

    // Стан для даних
    const [data, setData] = React.useState({
        canisters: 2,
        barrels: 2,
        eurocubes: 2
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
            console.log('Відправка PUT запиту на бекенд з даними зберігання:', editData);

            // Симуляція затримки мережі
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Імітація успішної відповіді
            console.log('Відповідь від сервера: Дані зберігання успішно оновлено');

            // Оновлюємо основний стан
            setData({ ...editData });
            setIsEditing(false);

            alert('Дані зберігання успішно збережено!');
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
        <div className="border-2 border-[#203955] rounded-lg p-3 sm:p-4 md:p-5 bg-gradient-to-br from-gray-50 to-white shadow-md">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6">
                <div className="flex-1">
                    <div className='flex justify-between items-center mb-2 sm:mb-3 border-b-2 border-[#fcd600] pb-2'>
                        <h3 className="font-bold text-sm sm:text-base md:text-lg text-[#203955]">
                            Зберігання ПУ: на складі
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

                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
                        <li className="flex justify-between items-center p-2 sm:p-2.5 bg-white rounded border border-gray-300 hover:border-[#fcd600] transition-colors">
                            <span className="font-medium text-gray-700">Каністри:</span>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.canisters}
                                    onChange={(e) => handleInputChange('canisters', e.target.value)}
                                    className="font-bold text-[#203955] text-sm sm:text-base border-2 border-[#203955] rounded px-2 py-1 w-20 focus:outline-none focus:border-[#fcd600]"
                                    min="0"
                                />
                            ) : (
                                <span className="font-bold text-[#203955] text-sm sm:text-base">{data.canisters}</span>
                            )}
                        </li>
                        <li className="flex justify-between items-center p-2 sm:p-2.5 bg-white rounded border border-gray-300 hover:border-[#fcd600] transition-colors">
                            <span className="font-medium text-gray-700">Бочки:</span>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.barrels}
                                    onChange={(e) => handleInputChange('barrels', e.target.value)}
                                    className="font-bold text-[#203955] text-sm sm:text-base border-2 border-[#203955] rounded px-2 py-1 w-20 focus:outline-none focus:border-[#fcd600]"
                                    min="0"
                                />
                            ) : (
                                <span className="font-bold text-[#203955] text-sm sm:text-base">{data.barrels}</span>
                            )}
                        </li>
                        <li className="flex justify-between items-center p-2 sm:p-2.5 bg-white rounded border border-gray-300 hover:border-[#fcd600] transition-colors">
                            <span className="font-medium text-gray-700">Єврокуб:</span>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.eurocubes}
                                    onChange={(e) => handleInputChange('eurocubes', e.target.value)}
                                    className="font-bold text-[#203955] text-sm sm:text-base border-2 border-[#203955] rounded px-2 py-1 w-20 focus:outline-none focus:border-[#fcd600]"
                                    min="0"
                                />
                            ) : (
                                <span className="font-bold text-[#203955] text-sm sm:text-base">{data.eurocubes}</span>
                            )}
                        </li>
                    </ul>
                </div>
                <ExtenguisProtocols />
            </div>
        </div>
    )
}

export default StorageComponent
