import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  ProjectorIcon, 
  ClipboardList, 
  Calendar, 
  Search, 
  Newspaper, 
  Users 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const features = [
  {
    name: 'Campus Safety',
    description: 'Report and track safety incidents across campus in real-time.',
    icon: Shield,
    href: '/safety',
  },
  {
    name: 'Project Management',
    description: 'Manage final year projects with seamless collaboration.',
    icon: ProjectorIcon,
    href: '/projects',
  },
  {
    name: 'Lab Records',
    description: 'Submit and track lab records with automated workflows.',
    icon: ClipboardList,
    href: '/lab-records',
  },
  {
    name: 'Resource Booking',
    description: 'Book campus resources efficiently with real-time availability.',
    icon: Calendar,
    href: '/resources',
  },
  {
    name: 'Lost & Found',
    description: 'Report and find lost items with AI-powered matching.',
    icon: Search,
    href: '/lost-found',
  },
  {
    name: 'Campus News',
    description: 'Stay updated with personalized campus news and announcements.',
    icon: Newspaper,
    href: '/news',
  },
  {
    name: 'Alumni Network',
    description: 'Connect with alumni for mentorship and opportunities.',
    icon: Users,
    href: '/alumni',
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome{user ? `, ${user.firstName}` : ''} to{' '}
            <span className="text-indigo-600">CampusConnect</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your all-in-one platform for campus management, safety, and collaboration.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.name}
                  to={feature.href}
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-600 ring-4 ring-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}