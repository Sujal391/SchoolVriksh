// src/utils/constants.js
export const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent',
  CLERK: 'clerk',
  LIBRARIAN: 'librarian',
  INVENTORY_MANAGER: 'inventory_manager',
  FEE_MANAGER: 'fee_manager',
  TRANSPORT: 'transport',
};

export const ROLE_LABELS = {
  [ROLES.OWNER]: 'Owner',
  [ROLES.ADMIN]: 'Admin',
  [ROLES.TEACHER]: 'Teacher',
  [ROLES.STUDENT]: 'Student',
  [ROLES.PARENT]: 'Parent',
  [ROLES.CLERK]: 'Clerk',
  [ROLES.LIBRARIAN]: 'Librarian',
  [ROLES.INVENTORY_MANAGER]: 'Inventory Manager',
  [ROLES.FEE_MANAGER]: 'Fee Manager',
  [ROLES.TRANSPORT]: 'Transport',
};

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const ADMISSION_TYPE_OPTIONS = [
  { value: 'Regular', label: 'Regular' },
  { value: 'RTE', label: 'RTE' },
];