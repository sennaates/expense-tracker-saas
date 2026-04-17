import { useState } from 'react';

const SettingsView = ({ settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Ayarlar</h2>
        <p className="text-gray-600">Uygulama tercihlerinizi yönetin</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-200">
        {/* Currency Settings */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Para Birimi</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="currency"
                value="TRY"
                checked={localSettings.currency === 'TRY'}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Türk Lirası (₺)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="currency"
                value="USD"
                checked={localSettings.currency === 'USD'}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Amerikan Doları ($)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="currency"
                value="EUR"
                checked={localSettings.currency === 'EUR'}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Euro (€)</span>
            </label>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bildirimler</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-gray-900">Bütçe Uyarıları</p>
                <p className="text-xs text-gray-500">Bütçe aşımı durumunda bildirim al</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.notifications.budget}
                onChange={(e) => handleChange('notifications', { ...localSettings.notifications, budget: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-gray-900">Onay Bekleyenler</p>
                <p className="text-xs text-gray-500">Yeni harcama talebi geldiğinde bildir</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.notifications.pending}
                onChange={(e) => handleChange('notifications', { ...localSettings.notifications, pending: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-gray-900">Yüksek Tutarlı Harcamalar</p>
                <p className="text-xs text-gray-500">10K TL üzeri harcamalar için uyarı</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.notifications.highExpense}
                onChange={(e) => handleChange('notifications', { ...localSettings.notifications, highExpense: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Görünüm</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={localSettings.theme === 'light'}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Açık Tema</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer opacity-50 cursor-not-allowed">
              <input
                type="radio"
                name="theme"
                value="dark"
                disabled
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Koyu Tema (Yakında)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex items-center justify-end gap-4">
        {saved && (
          <span className="text-sm text-green-600 font-medium">✓ Ayarlar kaydedildi</span>
        )}
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
