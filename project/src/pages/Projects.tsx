import React from 'react';
import { ProjectorIcon, CheckCircle, Clock } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = React.useState([
    {
      id: '1',
      title: 'AI-Powered Campus Security System',
      abstract: 'Developing an AI-based security system for enhanced campus safety',
      objectives: [
        'Implement facial recognition',
        'Develop incident detection algorithm',
        'Create real-time alert system'
      ],
      status: 'in_progress',
      studentId: 'ST001',
      mentorId: 'MT001',
      progress: 65
    }
  ]);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ProjectorIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            New Project
          </button>
        </div>

        <div className="mt-8 grid gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{project.title}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{project.abstract}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Progress: {project.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h4 className="text-sm font-medium text-gray-900">Objectives</h4>
                  <ul className="mt-2 divide-y divide-gray-200">
                    {project.objectives.map((objective, index) => (
                      <li key={index} className="py-3 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm text-gray-600">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Update Progress
                      </button>
                      <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        View Details
                      </button>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}