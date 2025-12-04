import React, { useState, useEffect } from 'react';
import TestingList from './TestingList';
import TitleTesting from './TitleTesting';

const TestingView = ({ brigadeId, isSuperAdmin, responseData, setRefreshTrigger, refreshTrigger }) => {
    const [equipments, setEquipments] = useState([]);
    const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
    const [selectedEquipmentName, setSelectedEquipmentName] = useState('');
    const [error, setError] = useState('');
    const [testingCounts, setTestingCounts] = useState({});
    const [isLoadingCounts, setIsLoadingCounts] = useState(false);

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

    // Fetch testing counts for all equipments
    useEffect(() => {
        if (equipments.length === 0 || !brigadeId) {
            console.log('Skipping fetch: equipments.length =', equipments.length, 'brigadeId =', brigadeId);
            return;
        }

        const fetchTestingCounts = async () => {
            setIsLoadingCounts(true);
            const counts = {};

            try {
                const sessionId = localStorage.getItem('sessionId');
                console.log('Fetching testing counts for', equipments.length, 'equipments');

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
                            console.log(`Raw API response for ${equipment.name}:`, result);

                            // API returns object with testingItems array (same as TestingList)
                            let count = 0;
                            if (result && result.testingItems && Array.isArray(result.testingItems)) {
                                count = result.testingItems.length;
                                console.log(`Equipment ${equipment.name}: found ${count} testing items`);
                            } else if (Array.isArray(result)) {
                                // Fallback: if API returns array directly
                                count = result.length;
                                console.log(`Equipment ${equipment.name}: data is array with ${count} items`);
                            } else {
                                console.warn(`Unexpected data structure for ${equipment.name}:`, result);
                                count = 0;
                            }

                            counts[equipment.id] = count;
                            console.log(`Final count for ${equipment.name} (ID: ${equipment.id}): ${count}`);
                        } else {
                            counts[equipment.id] = 0;
                            console.warn(`Failed to fetch data for equipment ${equipment.id}:`, res.status);
                        }
                    } catch (err) {
                        console.error(`Error fetching data for equipment ${equipment.id}:`, err);
                        counts[equipment.id] = 0;
                    }
                }

                setTestingCounts(counts);
                console.log('Final counts:', counts);
            } catch (err) {
                console.error('Error fetching testing counts:', err);
            } finally {
                setIsLoadingCounts(false);
            }
        };

        fetchTestingCounts();
    }, [equipments, brigadeId, refreshTrigger]);

    const handleEquipmentSelect = (id, name) => {
        setSelectedEquipmentId(id);
        setSelectedEquipmentName(name);
    };

    const handleBackToList = () => {
        setSelectedEquipmentId(null);
        setSelectedEquipmentName('');
    };

    return (
        <div className="w-full">
            {!selectedEquipmentId ? (
                // Equipment List View
                <div className="space-y-4">
                    <h2 className=" text-center text-xl  sm:text-2xl md:text-3xl font-bold text-[#203955] border-b-2 border-[#f84f00] pb-3">
                        Випробування обладнання
                    </h2>

                    {!brigadeId && (
                        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                            Будь ласка, оберіть бригаду для перегляду випробувань
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {equipments.map((equipment) => {
                            const count = testingCounts[equipment.id] !== undefined ? testingCounts[equipment.id] : 0;

                            return (
                                <div
                                    key={equipment.id}
                                    onClick={() => handleEquipmentSelect(equipment.id, equipment.name)}
                                    className="border-2 border-[#203955] rounded-lg p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-white shadow-md hover:border-[#fcd600] hover:shadow-lg transition-all cursor-pointer group"
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-[#203955] text-white px-3 py-1 rounded-md font-bold text-sm sm:text-base group-hover:bg-[#fcd600] group-hover:text-[#203955] transition-colors">
                                                {equipment.name}
                                            </span>
                                            <span className="text-sm sm:text-base text-gray-600 font-semibold">
                                                ({count})
                                            </span>
                                        </div>

                                        {isLoadingCounts && (
                                            <p className="text-xs text-gray-500">Завантаження...</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {equipments.length === 0 && !error && (
                        <div className="text-center text-gray-500 py-8">
                            Завантаження обладнання...
                        </div>
                    )}
                </div>
            ) : (
                // Testing Details View
                <div className="space-y-4">
                    <button
                        onClick={handleBackToList}
                        className="flex items-center gap-2 px-4 py-2 bg-[#203955] text-white rounded-lg hover:bg-[#2c4c70] transition-colors font-semibold"
                    >
                        ← Назад до списку
                    </button>

                    <TitleTesting
                        isSuperAdmin={isSuperAdmin}
                        brigadeId={brigadeId}
                        equipmentId={selectedEquipmentId}
                        setRefreshTrigger={setRefreshTrigger}
                    />

                    <TestingList
                        brigadeId={brigadeId}
                        equipmentId={selectedEquipmentId}
                        isSuperAdmin={isSuperAdmin}
                        responseData={responseData}
                        setRefreshTrigger={setRefreshTrigger}
                        refreshTrigger={refreshTrigger}
                    />
                </div>
            )}
        </div>
    );
};

export default TestingView;
