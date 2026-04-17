import { User, Settings, LogOut } from 'lucide-react';

const ProfileDropdown = ({ onProfileClick, onLogout, onSettingsClick, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <p className="text-sm font-semibold text-gray-900">Admin User</p>
          <p className="text-xs text-gray-500 mt-0.5">admin@spendsync.com</p>
        </div>
        
        <div className="py-2">
          <button
            onClick={() => {
              onProfileClick();
              onClose();
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
          >
            <User className="w-4 h-4" />
            Profil Detayları
          </button>
          <button
            onClick={() => {
              onSettingsClick();
              onClose();
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Ayarlar
          </button>
        </div>
        
        <div className="border-t border-gray-200 py-2">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
