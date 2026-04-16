# SpendSync - Kurumsal Harcama Yönetim Paneli

B2B SaaS Expense Tracker Dashboard

## 🚀 Teknoloji Yığını

- **Vite** - Hızlı geliştirme ortamı
- **React 18** - UI kütüphanesi
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern ikon kütüphanesi

## 📁 Proje Yapısı

```
spendsync/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Sidebar.jsx    # Sol menü bileşeni
│   │       └── Header.jsx     # Üst başlık bileşeni
│   ├── App.jsx                # Ana uygulama bileşeni
│   ├── main.jsx               # Giriş noktası
│   └── index.css              # Global stiller
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Phase 1: Layout İskeleti (✅ Tamamlandı)

### Tamamlanan Özellikler:

#### Sidebar Bileşeni
- ✅ Sabit (fixed) sol menü
- ✅ SpendSync logosu ve "Precision Architect" alt başlığı
- ✅ Navigasyon menüsü (Dashboard, Departments, Reports)
- ✅ Aktif menü öğesi için yeşil yan çizgi ve gölge efekti
- ✅ Alt kısımda lacivert "+ New Expense" butonu

#### Header Bileşeni
- ✅ Üst kısımda sabit header
- ✅ Geniş arama çubuğu (placeholder: "Search transactions, departments...")
- ✅ Bildirim zili ikonu (kırmızı nokta badge ile)
- ✅ Ayarlar ikonu
- ✅ Admin profil dropdown (avatar + isim + chevron)

#### Ana Layout
- ✅ Responsive layout yapısı
- ✅ Sidebar + Header + Main content alanı
- ✅ Tasarıma uygun renkler ve spacing

## 🏃‍♂️ Projeyi Çalıştırma

```bash
# Bağımlılıkları yükle (zaten yüklendi)
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## 📋 Sonraki Adımlar (Phase 2)

- [ ] Metrik kartları (Total Expenses, Pending Approvals, Monthly Budget)
- [ ] Recent Expenses tablosu
- [ ] Filtreleme ve sıralama özellikleri
- [ ] Responsive tasarım iyileştirmeleri

## 🎯 Tasarım Prensipleri

- Temiz ve modüler kod yapısı
- Tekrar kullanılabilir bileşenler
- Tailwind CSS ile tutarlı stil sistemi
- Tasarıma sadık renk paleti ve spacing

---

**Geliştirici Notu:** Bu proje aşamalı olarak geliştirilmektedir. Her phase'de yeni özellikler eklenecektir.
