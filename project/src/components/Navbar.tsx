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
  Menu,
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

function NavItem({ item, isActive }: { item: any; isActive: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.href}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200',
        isActive
          ? 'text-indigo-600 bg-indigo-50'
          : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
      )}
    >
      <Icon className="h-4 w-4 mr-2" />
      {item.name}
    </Link>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              CampusConnect
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={location.pathname === item.href}
              />
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition duration-200"
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
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={location.pathname === item.href}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
