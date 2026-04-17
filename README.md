# SpendSync - Enterprise Expense Tracker SaaS

<div align="center">

![SpendSync Logo](https://img.shields.io/badge/SpendSync-Precision%20Architect-blue?style=for-the-badge)

**Modern, Full-Featured Expense Management Dashboard**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.x-8884d8?style=flat)](https://recharts.org/)

[Demo](#demo) • [Features](#features) • [Installation](#installation) • [Usage](#usage) • [Tech Stack](#tech-stack)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Usage Guide](#usage-guide)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**SpendSync** is a production-ready, enterprise-grade expense tracking SaaS application built with modern web technologies. It provides comprehensive financial management tools with real-time analytics, smart notifications, and intuitive user experience.

### Why SpendSync?

- 🚀 **Production Ready**: Built with best practices and clean architecture
- 📊 **Data Visualization**: Interactive charts and real-time analytics
- 🔔 **Smart Notifications**: AI-powered budget alerts and warnings
- 📱 **Fully Responsive**: Seamless experience across all devices
- 🎨 **Modern UI/UX**: Clean, professional design with smooth animations
- 🔍 **Advanced Search**: Multi-field search with Turkish character support
- 🌐 **Multi-View Navigation**: Dashboard, Departments, Reports, Settings

---

## ✨ Features

### 🏠 Dashboard
- **Summary Cards**: Real-time metrics for expenses, pending approvals, and budget usage
- **Interactive Charts**: 
  - Donut chart for department-wise expense distribution
  - Bar chart for category-wise spending analysis
- **Expense Table**: Sortable, filterable table with relational data
- **Detail Panel**: Slide-over panel with comprehensive expense information
- **Smart Filters**: Click-to-filter cards with visual feedback

### 📊 Analytics & Reporting
- **Department View**: Budget tracking with progress bars and status indicators
- **Reports View**: Monthly trends, status distribution, and statistical insights
- **Visual Indicators**: Color-coded alerts (Green/Yellow/Red) based on budget usage

### 🔔 Smart Notifications
- **Budget Alerts**: Automatic warnings when departments exceed 80% budget
- **Pending Approvals**: Notifications for expenses awaiting approval
- **High-Value Expenses**: Alerts for transactions over 10,000 TRY
- **Critical Banner**: Top-level alert for budget overruns

### 🔍 Search & Filter
- **Global Search**: Search across expenses, employees, and departments
- **Turkish Character Support**: Normalized search for Turkish characters (ğ, ü, ş, ı, ö, ç)
- **Status Filtering**: Filter by approved, pending, or rejected status
- **Real-time Updates**: Instant filtering with visual feedback

### ⚙️ Settings & Customization
- **Currency Selection**: TRY, USD, EUR support
- **Notification Preferences**: Toggle individual notification types
- **Theme Options**: Light theme (Dark theme coming soon)
- **Profile Management**: Edit user details and roles

### 🎨 UI/UX Features
- **Skeleton Loading**: Professional loading states
- **Empty States**: Helpful messages when no data is available
- **Hover Effects**: Interactive feedback on all clickable elements
- **Smooth Animations**: Transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with breakpoints

---

## 🎬 Demo

### Dashboard View
![Dashboard](https://via.placeholder.com/800x450/3B82F6/FFFFFF?text=Dashboard+View)

### Department Management
![Departments](https://via.placeholder.com/800x450/10B981/FFFFFF?text=Department+View)

### Analytics & Reports
![Reports](https://via.placeholder.com/800x450/F59E0B/FFFFFF?text=Reports+View)

---

## 🛠 Tech Stack

### Core Technologies
- **React 18.3** - UI library with hooks
- **Vite 5.4** - Next-generation frontend tooling
- **Tailwind CSS 3.4** - Utility-first CSS framework

### Data Visualization
- **Recharts 2.x** - Composable charting library
  - Donut Charts
  - Bar Charts
  - Line Charts
  - Custom Tooltips

### UI Components
- **Lucide React** - Beautiful icon library
- **Custom Components** - Reusable, composable components

### State Management
- **React Hooks** - useState, useEffect, useMemo
- **Prop Drilling** - Simple, effective state management

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/spendsync.git

# Navigate to project directory
cd spendsync

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

No environment variables required! The app uses local JSON files for data.

---

## 📁 Project Structure

```
spendsync/
├── public/
│   └── data/
│       ├── departments.json    # Department data
│       ├── employees.json      # Employee data
│       └── expenses.json       # Expense records
├── src/
│   ├── components/
│   │   ├── common/            # Reusable components
│   │   │   ├── AlertBanner.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── ProfileModal.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── dashboard/         # Dashboard-specific components
│   │   │   ├── AnalyticsSection.jsx
│   │   │   ├── ExpenseDetailPanel.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   └── SummaryCards.jsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── NotificationDropdown.jsx
│   │   │   └── ProfileDropdown.jsx
│   │   └── views/             # Page views
│   │       ├── DepartmentsView.jsx
│   │       ├── ReportsView.jsx
│   │       └── SettingsView.jsx
│   ├── services/
│   │   └── api.js             # Data fetching services
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🔑 Key Components

### App.jsx
Main application component with:
- View management (Dashboard, Departments, Reports, Settings)
- State management for all data
- Smart notification system
- Search and filter logic

### Dashboard Components

#### SummaryCards
- Total Expenses card
- Pending Approvals card
- Monthly Budget card with progress bar
- Click-to-filter functionality

#### AnalyticsSection
- Donut chart for department distribution
- Bar chart for category analysis
- Custom tooltips and legends

#### ExpenseTable
- Relational data display
- Employee and department lookups
- Status badges
- Click-to-view details

#### ExpenseDetailPanel
- Slide-over panel
- Comprehensive expense information
- Spending limit analysis
- Action buttons

### Layout Components

#### Header
- Global search bar
- Notification center with badge
- Settings quick access
- Profile dropdown

#### Sidebar
- Navigation menu
- Active state indicators
- New Expense button

### View Components

#### DepartmentsView
- Department cards with budget info
- Progress bars
- Status indicators

#### ReportsView
- Summary statistics
- Monthly trend chart
- Status distribution

#### SettingsView
- Currency selection
- Notification preferences
- Theme options

---

## 📖 Usage Guide

### Navigation

**Sidebar Menu:**
- 🏠 **Dashboard** - Main overview with charts and tables
- 👥 **Departments** - Department budget management
- 📊 **Reports** - Analytics and statistics
- ⚙️ **Settings** - Application preferences

### Search & Filter

**Global Search:**
1. Type in the search bar (supports Turkish characters)
2. Searches across: categories, descriptions, employee names, departments
3. Real-time filtering with result count

**Status Filtering:**
1. Click on "Total Expenses" card → Filter by approved
2. Click on "Pending Approvals" card → Filter by pending
3. Click again to remove filter

### Notifications

**Notification Types:**
- 🔴 **Budget Alerts** - Department exceeds 80% budget
- 🟡 **Pending Approvals** - 3+ expenses awaiting approval
- 🔵 **High-Value Expenses** - Transactions over 10,000 TRY

**Actions:**
- Click bell icon to view notifications
- Mark individual notifications as read
- Mark all as read

### Expense Details

1. Click any row in the expense table
2. Detail panel slides in from right
3. View comprehensive information
4. See spending limit analysis
5. Close with X button or backdrop click

### Settings

**Currency:**
- Select TRY, USD, or EUR
- Affects all monetary displays

**Notifications:**
- Toggle budget alerts
- Toggle pending approval notifications
- Toggle high-expense alerts

**Profile:**
- Click profile icon → Profile Details
- Edit name, email, role
- Save changes

---

## 🚀 Development

### Available Scripts

```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Code Style

- **Component Structure**: Functional components with hooks
- **Naming Convention**: PascalCase for components, camelCase for functions
- **File Organization**: Feature-based folder structure
- **CSS**: Tailwind utility classes with custom components

### Best Practices

1. **DRY Principle**: Reusable components (MetricCard, StatusBadge)
2. **Prop Validation**: Type checking with PropTypes (optional)
3. **Performance**: useMemo for expensive calculations
4. **Accessibility**: Semantic HTML and ARIA labels
5. **Responsive**: Mobile-first approach

---

## 🎨 Design System

### Colors

```javascript
Primary: #3B82F6 (Blue)
Success: #10B981 (Green)
Warning: #F59E0B (Yellow)
Danger: #EF4444 (Red)
Purple: #8B5CF6
Pink: #EC4899
```

### Typography

```javascript
Headings: font-bold
Body: font-medium / font-normal
Small: text-xs / text-sm
```

### Spacing

```javascript
Padding: p-4, p-6, p-8
Gap: gap-4, gap-6
Margin: mb-6, mb-8
```

### Breakpoints

```javascript
sm: 640px   // Small devices
md: 768px   // Tablets
lg: 1024px  // Desktops
xl: 1280px  // Large screens
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation if needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Recharts](https://recharts.org/) - Charting Library
- [Lucide](https://lucide.dev/) - Icon Library

---

## 📊 Project Stats

- **Components**: 20+
- **Views**: 4
- **Lines of Code**: 3000+
- **Development Time**: 12 Phases
- **Features**: 50+

---

## 🗺️ Roadmap

### Phase 13 (Planned)
- [ ] New Expense Form Modal
- [ ] Expense Editing
- [ ] Expense Deletion
- [ ] Bulk Actions

### Phase 14 (Planned)
- [ ] User Authentication
- [ ] Role-Based Access Control
- [ ] Multi-tenant Support

### Phase 15 (Planned)
- [ ] Export to PDF/Excel
- [ ] Email Notifications
- [ ] Approval Workflow

### Future Enhancements
- [ ] Dark Theme
- [ ] Multi-language Support
- [ ] Mobile App (React Native)
- [ ] Backend Integration (Node.js/Express)
- [ ] Database (PostgreSQL/MongoDB)

---

<div align="center">

**Made with ❤️ and ☕**

⭐ Star this repo if you find it helpful!

</div>
