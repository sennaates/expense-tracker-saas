import { Search, Bell, Settings, ChevronDown, User } from 'lucide-react';
import { useState } from 'react';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

const Header = ({ searchTerm, setSearchTerm, notifications, onMarkAsRead, onProfileClick, onLogout, onSettingsClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex-shrink-0 z-10">
      <div className="h-full px-4 md:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Search Bar - Flex-1 with max-width */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 md:pl-10 pr-9 md:pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Section - Icons and Profile */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Notification Bell with Badge */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Bell className="w-4 md:w-5 h-4 md:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full">
                  <span className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></span>
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <NotificationDropdown
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                  onMarkAsRead={onMarkAsRead}
                />
              </>
            )}
          </div>

          {/* Settings Icon - Hidden on small screens */}
          <button 
            onClick={onSettingsClick}
            className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Settings className="w-4 md:w-5 h-4 md:h-5" />
          </button>

          {/* Divider - Hidden on small screens */}
          <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors"
            >
              <div className="w-7 md:w-8 h-7 md:h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 md:w-5 h-4 md:h-5 text-white" />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-900 hidden sm:inline">Admin</span>
              <ChevronDown className="w-3 md:w-4 h-3 md:h-4 text-gray-400 hidden sm:inline" />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <ProfileDropdown
                onProfileClick={onProfileClick}
                onLogout={onLogout}
                onSettingsClick={onSettingsClick}
                onClose={() => setShowProfile(false)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
