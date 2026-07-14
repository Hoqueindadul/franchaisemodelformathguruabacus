/**
 * Navigation Configuration
 * Maps each user role to its sidebar navigation items.
 * Icons use react-icons (already installed in the project).
 */

import {
  FaThLarge,        // LayoutDashboard
  FaBriefcase,      // Briefcase
  FaBookOpen,       // BookOpen / Courses
  FaGraduationCap,  // GraduationCap
  FaDollarSign,     // DollarSign / Financials
  FaLifeRing,       // LifeBuoy / Support
  FaCog,            // Settings
  FaUserPlus,       // UserPlus / Admissions
  FaUsers,          // Users / Students Directory
  FaCalendarAlt,    // Calendar / Batches
  FaAward,          // Award / Staff
  FaVideo,          // Video / Live Classes
  FaClipboardList,  // ClipboardList / Assignments
  FaChartBar,       // BarChart / Progress
  FaShoppingBag,    // Products
  FaCodeBranch,     // Branches
} from 'react-icons/fa';

/**
 * @typedef {Object} NavItem
 * @property {string} label       - Display label in sidebar
 * @property {string} path        - React-router-dom path
 * @property {React.Component} icon - Icon component from react-icons
 * @property {string} [badge]     - Optional badge text (e.g. "New")
 */

/** @type {Record<string, NavItem[]>} */
export const navigationConfig = {

  // ─── ADMIN ──────────────────────────────────────────────
  admin: [
    { label: 'Dashboard',           path: '/admin/dashboard',   icon: FaThLarge },
    { label: 'Franchises',          path: '/admin/franchises',  icon: FaBriefcase },
    { label: 'Courses & Curriculum',path: '/admin/courses',     icon: FaBookOpen },
    { label: 'Global Students',     path: '/admin/students',    icon: FaGraduationCap },
    { label: 'Financials & Payouts',path: '/admin/financials',  icon: FaDollarSign },
    { label: 'Support Tickets',     path: '/admin/support',     icon: FaLifeRing },
    { label: 'System Settings',     path: '/admin/settings',    icon: FaCog },
    { label: 'Products',            path: '/admin/products',    icon: FaShoppingBag },
    { label: 'Manage Branches',     path: '/admin/branches',    icon: FaCodeBranch },
  ],

  // ─── FRANCHISE ──────────────────────────────────────────
  franchise: [
    { label: 'Dashboard',           path: '/franchise/dashboard',  icon: FaThLarge },
    { label: 'Admissions',          path: '/franchise/admissions', icon: FaUserPlus },
    { label: 'Students Directory',  path: '/franchise/students',   icon: FaUsers },
    { label: 'Batches & Schedules', path: '/franchise/batches',    icon: FaCalendarAlt },
    { label: 'Staff & Instructors', path: '/franchise/staff',      icon: FaAward },
    { label: 'Local Financials',    path: '/franchise/billing',    icon: FaDollarSign },
    { label: 'My Branches',         path: '/franchise/branches',   icon: FaCodeBranch },
    { label: 'Courses',             path: '/franchise/courses',    icon: FaBookOpen },
  ],

  // ─── STUDENT ────────────────────────────────────────────
  student: [
    { label: 'My Portal',       path: '/student/dashboard',   icon: FaThLarge },
    { label: 'My Courses',      path: '/student/courses',     icon: FaBookOpen },
    { label: 'Live Classes',    path: '/student/live',        icon: FaVideo,         badge: 'Live' },
    { label: 'Assignments',     path: '/student/assignments', icon: FaClipboardList },
    { label: 'Progress & Grades',path: '/student/progress',  icon: FaChartBar },
    { label: 'Fee Ledger',      path: '/student/fees',        icon: FaDollarSign },
    { label: 'Study Material',  path: '/student/studymat',    icon: FaShoppingBag },
    { label: 'Order History',   path: '/student/orders',      icon: FaClipboardList },
  ],
};

/**
 * Role meta — color-coded badge config per role.
 */
export const roleMeta = {
  admin:     { label: 'Admin',     color: '#4f46e5', bg: '#ede9fe', home: '/admin/dashboard'     },
  franchise: { label: 'Franchise', color: '#0284c7', bg: '#e0f2fe', home: '/franchise/dashboard' },
  student:   { label: 'Student',   color: '#16a34a', bg: '#dcfce7', home: '/student/dashboard'   },
};
