import React, { useState, useEffect } from 'react';

const TransferList = ({ brigadeId, responseData }) => {
    const [equipments, setEquipments] = useState([]);
    const [allTestingData, setAllTestingData] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Transfer feature state
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [targetBrigadeId, setTargetBrigadeId] = useState('');
    const [isTransferring, setIsTransferring] = useState(false);
    const [availableBrigades, setAvailableBrigades] = useState([]);

    // Extract available brigades from responseData or use mock
    useEffect(() => {
        let brigades = [];
        if (responseData?.detachments) {
            // Flatten brigades from detachments if available (Super Admin view)
            brigades = responseData.detachments.flatMap(d => d.brigades || []);
        } else {
            // Mock brigades if not available in responseData (or for regular users who need to see other brigades)
            // TODO: Replace with actual API call to get available brigades for transfer
            brigades = [
                { id: '1', name: '1-ДПРЗ' },
                { id: '2', name: '2-ДПРЗ' },
                { id: '3', name: '3-ДПРЗ' },
                { id: 'mock-1', name: 'Інша частина (Mock)' }
            ];
        }
        // Filter out current brigade
        setAvailableBrigades(brigades.filter(b => b.id !== brigadeId));
    }, [responseData, brigadeId]);

    // Fetch all equipments
    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const sessionId = localStorage.getItem('sessionId');
                const res = await fetch('/api/testing/equipments', {
                    method: 'GET',
                    headers: {
                        'session-id': sessionId,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await res.json();
                setEquipments(data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Помилка завантаження списку обладнання');
            }
        };

        fetchEquipments();
    }, []);

    // Fetch testing data for all equipments
    useEffect(() => {
        if (equipments.length === 0 || !brigadeId) return;

        const fetchAllTestingData = async () => {
            setIsLoading(true);
            const testingDataMap = {};

            try {
                const sessionId = localStorage.getItem('sessionId');

                // Fetch testing data for each equipment
                for (const equipment of equipments) {
                    try {
                        const res = await fetch(`/api/testing/brigade/${brigadeId}/equipment/${equipment.id}`, {
                            method: 'GET',
                            headers: {
                                'session-id': sessionId,
                                'Content-Type': 'application/json',
                            },
                        });

                        if (res.ok) {
                            const result = await res.json();
                            testingDataMap[equipment.id] = result.testingItems || [];
                        }
                    } catch (err) {
                        console.error(`Error fetching data for equipment ${equipment.id}:`, err);
                    }
                }

                setAllTestingData(testingDataMap);
            } catch (err) {
                console.error('Error fetching testing data:', err);
                setError('Помилка завантаження даних випробувань');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllTestingData();
    }, [equipments, brigadeId]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('uk-UA');
    };

    // Checkbox handlers
    const handleCheckboxChange = (testingId) => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(testingId)) {
            newSelected.delete(testingId);
        } else {
            newSelected.add(testingId);
        }
        setSelectedItems(newSelected);
    };

    const handleSelectAllInGroup = (items) => {
        const newSelected = new Set(selectedItems);
        const allSelected = items.every(item => newSelected.has(item.testingId));

        items.forEach(item => {
            if (allSelected) {
                newSelected.delete(item.testingId);
            } else {
                newSelected.add(item.testingId);
            }
        });
        setSelectedItems(newSelected);
    };

    // Mock Transfer Function
    const handleTransfer = async () => {
        if (!targetBrigadeId) {
            alert('Будь ласка, виберіть частину для передачі');
            return;
        }
        if (selectedItems.size === 0) {
            alert('Будь ласка, виберіть об\'єкти для передачі');
            return;
        }

        setIsTransferring(true);

        try {
            // MOCK API CALL
            // TODO: Replace this with actual API endpoint when available
            // const res = await fetch('/api/transfer', { method: 'POST', body: ... });

            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

            console.log('Transferring items:', Array.from(selectedItems));
            console.log('To brigade:', targetBrigadeId);

            // Optimistic update: Remove transferred items from view
            const newTestingData = { ...allTestingData };
            Object.keys(newTestingData).forEach(eqId => {
                newTestingData[eqId] = newTestingData[eqId].filter(item => !selectedItems.has(item.testingId));
            });
            setAllTestingData(newTestingData);

            setSelectedItems(new Set());
            alert('Об\'єкти успішно передано! (Тестовий режим)');

        } catch (error) {
            console.error('Transfer error:', error);
            alert('Помилка при передачі майна');
        } finally {
            setIsTransferring(false);
        }
    };

    return (
        <div className="w-full mx-auto p-2 md:p-4 overflow-hidden max-w-full relative">
            <h2 className="text-xl md:text-2xl lg:text-3xl text-center font-bold mb-6 p-3 text-[#203955] border-b-2 border-[#f84f00]">
                Передача майна
            </h2>

            {/* Transfer Control Panel */}
            {selectedItems.size > 0 && (
                <div className="sticky top-0 z-10 bg-white p-4 shadow-lg rounded-lg border-2 border-[#fcd600] mb-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-down">
                    <div className="font-bold text-[#203955]">
                        Вибрано об'єктів: <span className="text-lg">{selectedItems.size}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <select
                            value={targetBrigadeId}
                            onChange={(e) => setTargetBrigadeId(e.target.value)}
                            className="p-2 border-2 border-[#203955] rounded-md bg-white text-[#203955] font-medium focus:outline-none focus:border-[#fcd600]"
                        >
                            <option value="">Оберіть підрозділ...</option>
                            {availableBrigades.map(brigade => (
                                <option key={brigade.id} value={brigade.id}>
                                    {brigade.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleTransfer}
                            disabled={isTransferring || !targetBrigadeId}
                            className={`px-6 py-2 rounded-md font-bold text-white transition-all duration-200 ${isTransferring || !targetBrigadeId
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#203955] hover:bg-[#2c4c70] active:scale-95'
                                }`}
                        >
                            {isTransferring ? 'Передача...' : 'Передати'}
                        </button>
                    </div>
                </div>
            )}

            {error && <p className="text-red-500 text-sm md:text-base break-words mb-4">{error}</p>}

            <div className="space-y-6 overflow-y-auto max-h-[75vh]">
                {isLoading ? (
                    <p className="text-center text-gray-500 text-lg">Завантаження...</p>
                ) : equipments.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">Немає обладнання</p>
                ) : (
                    equipments.map((equipment) => {
                        const testingItems = allTestingData[equipment.id] || [];
                        const allGroupSelected = testingItems.length > 0 && testingItems.every(item => selectedItems.has(item.testingId));

                        return (
                            <div key={equipment.id} className="border-2 border-[#203955] rounded-lg p-4 md:p-5 bg-gradient-to-br from-gray-50 to-white shadow-md">
                                <div className="flex items-center justify-between mb-4 border-b-2 border-[#fcd600] pb-2">
                                    <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#203955] flex items-center gap-2">
                                        <span className="bg-[#203955] text-white px-3 py-1 rounded-md">{equipment.name}</span>
                                        <span className="text-sm text-gray-600">({testingItems.length})</span>
                                    </h3>

                                    {testingItems.length > 0 && (
                                        <button
                                            onClick={() => handleSelectAllInGroup(testingItems)}
                                            className="text-xs md:text-sm font-bold text-[#203955] hover:text-[#fcd600] transition-colors"
                                        >
                                            {allGroupSelected ? 'Зняти виділення' : 'Вибрати всі'}
                                        </button>
                                    )}
                                </div>

                                {testingItems.length === 0 ? (
                                    <p className="text-sm md:text-base text-gray-500 text-center py-4 italic">
                                        Немає даних про випробування
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {testingItems.map((item) => (
                                            <div
                                                key={item.testingId}
                                                className={`border-2 rounded-lg p-3 md:p-4 shadow-md transition-all duration-200 flex items-center gap-3 ${selectedItems.has(item.testingId) ? 'border-[#fcd600] bg-yellow-50' : 'border-[#203955]'
                                                    } ${item.testingResult === 'passed' && !selectedItems.has(item.testingId)
                                                        ? 'bg-green-50 hover:bg-green-100'
                                                        : item.testingResult === 'failed' && !selectedItems.has(item.testingId)
                                                            ? 'bg-red-50 hover:bg-red-100'
                                                            : item.testingResult === 'not passed' && !selectedItems.has(item.testingId)
                                                                ? 'bg-yellow-50 hover:bg-yellow-100'
                                                                : ''
                                                    }`}
                                                onClick={() => handleCheckboxChange(item.testingId)} // Allow clicking row to select
                                            >
                                                {/* Checkbox */}
                                                <div className="flex-shrink-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.has(item.testingId)}
                                                        onChange={() => handleCheckboxChange(item.testingId)}
                                                        className="w-5 h-5 md:w-6 md:h-6 cursor-pointer accent-[#203955]"
                                                        onClick={(e) => e.stopPropagation()} // Prevent double toggle
                                                    />
                                                </div>

                                                <div className="flex-grow flex flex-col md:flex-row md:items-center gap-3 md:gap-4 cursor-pointer">
                                                    <div className="flex justify-between items-center md:flex-col md:items-start md:flex-1">
                                                        <span className="font-semibold text-gray-600 text-xs">Інвентарний номер:</span>
                                                        <span className="text-[#203955] font-bold text-sm md:text-base">{item.deviceInventoryNumber}</span>
                                                    </div>

                                                    <div className="flex justify-between items-center md:flex-col md:items-start md:flex-1">
                                                        <span className="font-semibold text-gray-600 text-xs">Дата випробування:</span>
                                                        <span className="font-medium text-sm md:text-base">{formatDate(item.testingDate)}</span>
                                                    </div>

                                                    <div className="flex justify-between items-center md:flex-col md:items-start md:flex-1">
                                                        <span className="font-semibold text-gray-600 text-xs">Результат:</span>
                                                        <span className={`font-bold text-sm md:text-base ${item.testingResult === 'passed'
                                                                ? 'text-green-700'
                                                                : item.testingResult === 'failed'
                                                                    ? 'text-red-700'
                                                                    : 'text-yellow-700'
                                                            }`}>
                                                            {item.testingResult === 'passed'
                                                                ? '✓ Пройдено'
                                                                : item.testingResult === 'failed'
                                                                    ? '✗ Не пройдено'
                                                                    : '⏳ Проходить випробування'}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between items-center md:flex-col md:items-start md:flex-1">
                                                        <span className="font-semibold text-gray-600 text-xs">Наступне випробування:</span>
                                                        <span className="font-medium text-sm md:text-base">{formatDate(item.nextTestingDate)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default TransferList;
