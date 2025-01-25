import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

export default function Safety() {
  const [incidents, setIncidents] = React.useState([
    {
      id: '1',
      title: 'Broken Street Light',
      description: 'Street light near Building B is not working',
      location: 'Building B Entrance',
      status: 'pending',
      riskLevel: 'medium',
      timestamp: new Date().toISOString(),
      reportedBy: 'John Doe'
    }
  ]);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Campus Safety</h1>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Report Incident
          </button>
        </div>

        <div className="mt-8 grid gap-6">
          {incidents.map((incident) => (
            <div key={incident.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                      {incident.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{incident.description}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {incident.status}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-sm text-gray-900">{incident.location}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Risk Level</dt>
                    <dd className="mt-1 text-sm text-gray-900">{incident.riskLevel}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Reported By</dt>
                    <dd className="mt-1 text-sm text-gray-900">{incident.reportedBy}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(incident.timestamp).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}