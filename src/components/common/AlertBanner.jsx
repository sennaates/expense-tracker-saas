import { X, AlertTriangle } from 'lucide-react';

const AlertBanner = ({ message, onClose }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-800 mb-1">Kritik Uyarı</h3>
          <p className="text-sm text-red-700">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-red-100 rounded transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;
