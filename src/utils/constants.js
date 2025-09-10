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

export const ROLE_COLORS = {
  [ROLES.OWNER]: '#f28b82',            // Soft Red
  [ROLES.ADMIN]: '#64b5f6',            // Medium Light Blue
  [ROLES.TEACHER]: '#81c784',          // Medium Light Green
  [ROLES.STUDENT]: '#ffb74d',          // Medium Light Orange
  [ROLES.PARENT]: '#ba68c8',           // Medium Light Purple
  [ROLES.CLERK]: '#4db6ac',            // Medium Teal
  [ROLES.LIBRARIAN]: '#ffd54f',        // Medium Amber
  [ROLES.INVENTORY_MANAGER]: '#bdbdbd', // Medium Gray
  [ROLES.FEE_MANAGER]: '#4fc3f7',      // Light Blue but not too light
  [ROLES.TRANSPORT]: '#9575cd',        // Medium Purple
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