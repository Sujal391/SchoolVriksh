// src/components/layout/Sidebar.js
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = ({ role }) => {
  const router = useRouter();
  const isActive = (path) => router.pathname.startsWith(path);

  // Common menu items for all roles
  const commonMenu = [
    { name: 'Dashboard', path: '/dashboard', icon: 'home' },
  ];

  // Role-specific menu items
  const roleMenus = {
    owner: [
      { name: 'Schools', path: '/owner/schools', icon: 'school' },
      { name: 'Users', path: '/owner/users', icon: 'people' },
      { name: 'Settings', path: '/owner/settings', icon: 'settings' },
    ],
    admin: [
      { name: 'Students', path: '/admin/students', icon: 'people' },
      { name: 'Teachers', path: '/admin/teachers', icon: 'person' },
      { name: 'Classes', path: '/admin/classes', icon: 'class' },
      { name: 'Attendance', path: '/admin/attendance', icon: 'checklist' },
    ],
    teacher: [
      { name: 'My Classes', path: '/teacher/classes', icon: 'class' },
      { name: 'Attendance', path: '/teacher/attendance', icon: 'checklist' },
      { name: 'Grades', path: '/teacher/grades', icon: 'grade' },
    ],
    student: [
      { name: 'My Classes', path: '/student/classes', icon: 'class' },
      { name: 'Attendance', path: '/student/attendance', icon: 'checklist' },
      { name: 'Grades', path: '/student/grades', icon: 'grade' },
    ],
    parent: [
      { name: 'Children', path: '/parent/children', icon: 'family' },
      { name: 'Attendance', path: '/parent/attendance', icon: 'checklist' },
      { name: 'Grades', path: '/parent/grades', icon: 'grade' },
    ],
  };

  const menuItems = [...commonMenu, ...(roleMenus[role] || [])];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {menuItems.map((item) => (
                <Link key={item.path} href={item.path} className={`${
                      isActive(item.path)
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
                  
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;