import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const ExtenguisProtocols = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);

    // Початковий список протоколів
    const [protocols, setProtocols] = React.useState([
        { id: 1, name: '2022 рік', link: 'https://example.com/protocol-2022.pdf' },
        { id: 2, name: '2023 рік', link: 'https://example.com/protocol-2023.pdf' }
    ]);

    // Стан для нового протоколу
    const [newProtocol, setNewProtocol] = React.useState({
        name: '',
        link: ''
    });

    // Обробник зміни полів форми
    const handleInputChange = (field, value) => {
        setNewProtocol(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Відкриття модального вікна
    const handleOpenModal = () => {
        setNewProtocol({ name: '', link: '' });
        setIsModalOpen(true);
    };

    // Закриття модального вікна
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewProtocol({ name: '', link: '' });
    };

    // Збереження нового протоколу
    const handleSaveProtocol = async () => {
        // Валідація
        if (!newProtocol.name.trim() || !newProtocol.link.trim()) {
            alert('Будь ласка, заповніть всі поля');
            return;
        }

        setIsSaving(true);

        try {
            // Імітація POST запиту на бекенд
            console.log('Відправка POST запиту на бекенд з новим протоколом:', newProtocol);

            // Симуляція затримки мережі
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Імітація успішної відповіді від сервера
            const newId = Math.max(...protocols.map(p => p.id), 0) + 1;
            const savedProtocol = {
                id: newId,
                ...newProtocol
            };

            console.log('Відповідь від сервера: Протокол успішно додано', savedProtocol);

            // Додаємо новий протокол до списку
            setProtocols(prev => [...prev, savedProtocol]);

            // Закриваємо модальне вікно
            handleCloseModal();

            alert('Протокол успішно додано!');
        } catch (error) {
            console.error('Помилка при додаванні протоколу:', error);
            alert('Помилка при додаванні протоколу');
        } finally {
            setIsSaving(false);
        }
    };

    // Видалення протоколу
    const handleDeleteProtocol = async (id) => {
        if (!confirm('Ви впевнені, що хочете видалити цей протокол?')) {
            return;
        }

        try {
            console.log('Відправка DELETE запиту для протоколу з ID:', id);
            await new Promise(resolve => setTimeout(resolve, 500));

            setProtocols(prev => prev.filter(p => p.id !== id));
            console.log('Протокол успішно видалено');
        } catch (error) {
            console.error('Помилка при видаленні:', error);
            alert('Помилка при видаленні протоколу');
        }
    };

    return (
        <>
            <div className="flex-1 mt-4 md:mt-0">
                <div className='flex justify-between items-center mb-2 sm:mb-3 border-b-2 border-[#fcd600] pb-2'>
                    <h4 className="font-bold text-sm sm:text-base md:text-lg text-[#203955]">
                        Протоколи випробувань ПУ:
                    </h4>
                    <IoMdAddCircleOutline
                        onClick={handleOpenModal}
                        className="text-2xl cursor-pointer text-[#203955] hover:text-[#fcd600] transition-colors"
                    />
                </div>

                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
                    {protocols.length === 0 ? (
                        <li className="p-2 sm:p-2.5 bg-white rounded border border-gray-300 text-center text-gray-500 italic">
                            Немає протоколів
                        </li>
                    ) : (
                        protocols.map((protocol) => (
                            <li
                                key={protocol.id}
                                className="flex justify-between items-center p-2 sm:p-2.5 bg-white rounded border border-gray-300 hover:border-[#fcd600] transition-colors group"
                            >
                                <a
                                    href={protocol.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-gray-700 hover:text-[#203955] hover:underline flex-1"
                                >
                                    📄 {protocol.name}
                                </a>
                                <AiOutlineDelete
                                    onClick={() => handleDeleteProtocol(protocol.id)}
                                    className="text-red-600 hover:text-red-800 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                                />
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* Модальне вікно */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full shadow-2xl">
                        <div className="flex justify-between items-center mb-4 border-b-2 border-[#fcd600] pb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-[#203955]">
                                Додати протокол
                            </h3>
                            <MdClose
                                onClick={handleCloseModal}
                                className="text-2xl cursor-pointer text-gray-600 hover:text-red-600 transition-colors"
                            />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#203955] mb-2">
                                    Назва протоколу:
                                </label>
                                <input
                                    type="text"
                                    value={newProtocol.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Наприклад: 2024 рік"
                                    className="w-full border-2 border-[#203955] rounded px-3 py-2 focus:outline-none focus:border-[#fcd600] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#203955] mb-2">
                                    Посилання на протокол:
                                </label>
                                <input
                                    type="url"
                                    value={newProtocol.link}
                                    onChange={(e) => handleInputChange('link', e.target.value)}
                                    placeholder="https://example.com/protocol.pdf"
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
                                    onClick={handleSaveProtocol}
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

export default ExtenguisProtocols
