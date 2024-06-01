'use client';

import { useEffect, useState } from 'react';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';

const fetchNewspaper = async () => {
  const response = await fetch(`/api/newspaper`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json().then((data) => data.files);
};

export default function Home() {
  const [fileNames, setFileNames] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState('');

  useEffect(() => {
    fetchNewspaper().then((data) => {
      setFileNames(data.reverse());
      if (data.length > 0 && selectedPDF === '') {
        setSelectedPDF(data[0]);
      }
    });
  }, [selectedPDF]);

  const handleFileClick = (fileName: string) => {
    setSelectedPDF(fileName);
  };
  return (
    <div>
      <BackToDashboardButton></BackToDashboardButton>
      <div className="flex h-1/2 w-full gap-x-4 px-8 py-8">
        <iframe src={`/uploads/dorfzeitung/${selectedPDF}`} width={1920} height={1080}></iframe>
        <div className="w-1/4">
          <div className="max-w-md rounded-lg border bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Alle Zeitungen</h3>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {fileNames.map((fileName: string) => (
                  <li className="rounded-lg py-3 hover:bg-gray-100 sm:py-4" key={fileName}>
                    <button className="flex items-center space-x-4" onClick={() => handleFileClick(fileName)}>
                      <div className="min-w-0 flex-1 p-2">
                        <p className="truncate text-left text-sm font-medium text-gray-900 dark:text-white">
                          {fileName}
                        </p>
                        <p className="truncate text-left text-sm text-gray-500 dark:text-gray-400">Veröffentlichung</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
