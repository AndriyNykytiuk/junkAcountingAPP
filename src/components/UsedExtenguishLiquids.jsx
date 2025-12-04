import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const UsedExtenguishLiquids = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);

    // Початковий список використаних рідин
    const [usageRecords, setUsageRecords] = React.useState([
        { id: 1, volume: 500, date: '2024-01-15', type: 'Навчання', address: 'вул. Шевченка, 10' },
        { id: 2, volume: 300, date: '2024-02-20', type: 'Пожежа', address: 'вул. Грушевського, 25' }
    ]);

    // Стан для нового запису
    const [newRecord, setNewRecord] = React.useState({
        volume: '',
        date: '',
        type: '',
        address: ''
    });

    // Обробник зміни полів форми
    const handleInputChange = (field, value) => {
        setNewRecord(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Відкриття модального вікна
    const handleOpenModal = () => {
        setNewRecord({ volume: '', date: '', type: '', address: '' });
        setIsModalOpen(true);
    };

    // Закриття модального вікна
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewRecord({ volume: '', date: '', type: '', address: '' });
    };

    // Збереження нового запису
    const handleSaveRecord = async () => {
        // Валідація
        if (!newRecord.volume || !newRecord.date || !newRecord.type.trim() || !newRecord.address.trim()) {
            alert('Будь ласка, заповніть всі поля');
            return;
        }

        setIsSaving(true);

        try {
            // Імітація POST запиту на бекенд
            console.log('Відправка POST запиту на бекенд з новим записом використання:', newRecord);

            // Симуляція затримки мережі
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Імітація успішної відповіді від сервера
            const newId = Math.max(...usageRecords.map(r => r.id), 0) + 1;
            const savedRecord = {
                id: newId,
                ...newRecord,
                volume: parseInt(newRecord.volume)
            };

            console.log('Відповідь від сервера: Запис успішно додано', savedRecord);

            // Додаємо новий запис до списку
            setUsageRecords(prev => [...prev, savedRecord]);

            // Закриваємо модальне вікно
            handleCloseModal();

            alert('Запис успішно додано!');
        } catch (error) {
            console.error('Помилка при додаванні запису:', error);
            alert('Помилка при додаванні запису');
        } finally {
            setIsSaving(false);
        }
    };

    // Видалення запису
    const handleDeleteRecord = async (id) => {
        if (!confirm('Ви впевнені, що хочете видалити цей запис?')) {
            return;
        }

        try {
            console.log('Відправка DELETE запиту для запису з ID:', id);
            await new Promise(resolve => setTimeout(resolve, 500));

            setUsageRecords(prev => prev.filter(r => r.id !== id));
            console.log('Запис успішно видалено');
        } catch (error) {
            console.error('Помилка при видаленні:', error);
            alert('Помилка при видаленні запису');
        }
    };

    return (
        <>
            <div className="space-y-3">
                {/* Кнопка додавання */}
                <div className="flex justify-between">
                    <h3 className="font-bold text-sm sm:text-base md:text-lg text-[#203955] mb-3 sm:mb-4 border-b-2 border-[#fcd600] pb-2">
                        Використання з початку року на пожежах, навчаннях, тренуваннях тощо
                    </h3>
                    <button
                        onClick={handleOpenModal}
                        className="flex items-center gap-2 px-4 py-2 bg-[#203955] text-white rounded-lg hover:bg-[#2c4c70] transition-colors font-semibold"
                    >
                        <IoMdAddCircleOutline className="text-xl" />
                        Додати запис
                    </button>
                </div>

                {/* Список записів */}
                <div className="overflow-y-auto max-h-96">
                    {usageRecords.length === 0 ? (
                        <div className="border-2 border-[#203955] rounded-lg p-6 bg-white text-center text-gray-500 italic">
                            Немає записів про використання
                        </div>
                    ) : (
                        usageRecords.map((record) => (
                            <div
                                key={record.id}
                                className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 items-stretch sm:items-center justify-around border-2 border-[#203955] rounded-lg p-3 sm:p-4 bg-white group relative hover:border-[#fcd600] transition-colors mb-3"
                            >
                                <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2 sm:gap-1 p-2 sm:p-0">
                                    <span className="font-semibold text-gray-600 text-xs sm:text-xs md:text-sm">Об'єм:</span>
                                    <span className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-[#203955]">{record.volume}л</span>
                                </div>
                                <div className="hidden sm:block w-px bg-gray-300"></div>
                                <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2 sm:gap-1 p-2 sm:p-0">
                                    <span className="font-semibold text-gray-600 text-xs sm:text-xs md:text-sm">Дата:</span>
                                    <span className="font-medium text-sm sm:text-sm md:text-base text-gray-700">{record.date}</span>
                                </div>
                                <div className="hidden sm:block w-px bg-gray-300"></div>
                                <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2 sm:gap-1 p-2 sm:p-0">
                                    <span className="font-semibold text-gray-600 text-xs sm:text-xs md:text-sm">Тип:</span>
                                    <span className="font-medium text-sm sm:text-sm md:text-base text-gray-700">{record.type}</span>
                                </div>
                                <div className="hidden sm:block w-px bg-gray-300"></div>
                                <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2 sm:gap-1 p-2 sm:p-0">
                                    <span className="font-semibold text-gray-600 text-xs sm:text-xs md:text-sm">Адреса:</span>
                                    <span className="font-medium text-sm sm:text-sm md:text-base text-gray-700">{record.address}</span>
                                </div>

                                {/* Кнопка видалення */}
                                <AiOutlineDelete
                                    onClick={() => handleDeleteRecord(record.id)}
                                    className="absolute top-9 right-2 text-2xl text-red-600 hover:text-red-800 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Модальне вікно */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 max-w-lg w-full shadow-2xl">
                        <div className="flex justify-between items-center mb-4 border-b-2 border-[#fcd600] pb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-[#203955]">
                                Додати запис використання
                            </h3>
                            <MdClose
                                onClick={handleCloseModal}
                                className="text-2xl cursor-pointer text-gray-600 hover:text-red-600 transition-colors"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-scroll ">
                                <div>
                                    <label className="block text-sm font-semibold text-[#203955] mb-2">
                                        Об'єм (л):
                                    </label>
                                    <input
                                        type="number"
                                        value={newRecord.volume}
                                        onChange={(e) => handleInputChange('volume', e.target.value)}
                                        placeholder="500"
                                        min="0"
                                        className="w-full border-2 border-[#203955] rounded px-3 py-2 focus:outline-none focus:border-[#fcd600] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#203955] mb-2">
                                        Дата:
                                    </label>
                                    <input
                                        type="date"
                                        value={newRecord.date}
                                        onChange={(e) => handleInputChange('date', e.target.value)}
                                        className="w-full border-2 border-[#203955] rounded px-3 py-2 focus:outline-none focus:border-[#fcd600] transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#203955] mb-2">
                                    Тип:
                                </label>
                                <select
                                    value={newRecord.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                    className="w-full border-2 border-[#203955] rounded px-3 py-2 focus:outline-none focus:border-[#fcd600] transition-colors"
                                >
                                    <option value="">Оберіть тип</option>
                                    <option value="Пожежа">Пожежа</option>
                                    <option value="Навчання">Навчання</option>
                                    <option value="Тренування">Тренування</option>
                                    <option value="Інше">Інше</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#203955] mb-2">
                                    Адреса:
                                </label>
                                <input
                                    type="text"
                                    value={newRecord.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder="вул. Шевченка, 10"
                                    className="w-full border-2 border-[#203955] rounded px-3 py-2 focus:outline-none focus:border-[#fcd600] transition-colors"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors font-semibold"
                                    disabled={isSaving}
                                >
                                    Скасувати
                                </button>
                                <button
                                    onClick={handleSaveRecord}
                                    disabled={isSaving}
                                    className={`flex-1 px-4 py-2 rounded font-semibold text-white transition-colors ${isSaving
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#203955] hover:bg-[#2c4c70]'
                                        }`}
                                >
                                    {isSaving ? 'Збереження...' : 'Зберегти'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UsedExtenguishLiquids
