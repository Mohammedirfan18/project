import React from 'react';
import { ClipboardList, Check, X } from 'lucide-react';

export default function LabRecords() {
  const [records, setRecords] = React.useState([
    {
      id: '1',
      title: 'Digital Electronics Lab 1',
      subject: 'Digital Electronics',
      status: 'pending',
      submittedDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      comments: 'Please review the circuit diagrams in section 3'
    }
  ]);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ClipboardList className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Lab Records</h1>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit New Record
          </button>
        </div>

        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {records.map((record) => (
                <li key={record.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <ClipboardList className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <h2 className="text-lg font-medium text-gray-900">{record.title}</h2>
                          <p className="text-sm text-gray-500">{record.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          <Check className="h-4 w-4" />
                        </button>
                        <button className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Status: 
                          <span className="ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {record.status}
                          </span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Submitted: {new Date(record.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {record.comments && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Comments:</span> {record.comments}
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}