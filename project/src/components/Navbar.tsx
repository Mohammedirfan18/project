import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  ProjectorIcon, 
  ClipboardList, 
  Calendar, 
  Search, 
  Newspaper, 
  Users,
  Menu
} from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Safety', href: '/safety', icon: Shield },
  { name: 'Projects', href: '/projects', icon: ProjectorIcon },
  { name: 'Lab Records', href: '/lab-records', icon: ClipboardList },
  { name: 'Resources', href: '/resources', icon: Calendar },
  { name: 'Lost & Found', href: '/lost-found', icon: Search },
  { name: 'News', href: '/news', icon: Newspaper },
  { name: 'Alumni', href: '/alumni', icon: Users },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                CampusConnect
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium',
                    location.pathname === item.href
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'block pl-3 pr-4 py-2 border-l-4',
                    location.pathname === item.href
                      ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                      : 'border-transparent text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  )}
                >
                  <div className="flex items-center">
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}