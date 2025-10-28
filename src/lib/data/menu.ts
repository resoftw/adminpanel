import type { MenuGroup } from '$lib/types/menu';

export const menuGroups: MenuGroup[] = [
  {
    id: 'main',
    label: 'Main',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: '📊',
        href: '/admin',
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: '📈',
        href: '/admin/analytics',
        badge: { text: 'New', variant: 'primary' }
      },
    ]
  },
  {
    id: 'management',
    label: 'Management',
    items: [
      {
        id: 'users',
        label: 'Users',
        icon: '👥',
        children: [
          { id: 'users-list', label: 'All Users', href: '/admin/users' },
          { id: 'users-roles', label: 'Roles', href: '/admin/users/roles' },
          { id: 'users-permissions', label: 'Permissions', href: '/admin/users/permissions' },
        ]
      },
      {
        id: 'products',
        label: 'Products',
        icon: '📦',
        children: [
          { id: 'products-list', label: 'All Products', href: '/admin/products' },
          { id: 'products-categories', label: 'Categories', href: '/admin/products/categories' },
          { id: 'products-inventory', label: 'Inventory', href: '/admin/products/inventory', badge: { text: '12', variant: 'warning' } },
        ]
      },
      {
        id: 'orders',
        label: 'Orders',
        icon: '🛒',
        href: '/admin/orders',
        badge: { text: '5', variant: 'danger' }
      },
      {
        id: 'employees',
        label: 'Employees',
        icon: '👔',
        href: '/admin/employees'
      },
    ]
  },
  {
    id: 'content',
    label: 'Content',
    items: [
      {
        id: 'posts',
        label: 'Posts',
        icon: '📝',
        children: [
          { id: 'posts-all', label: 'All Posts', href: '/admin/posts' },
          { id: 'posts-new', label: 'Create New', href: '/admin/posts/new' },
          { id: 'posts-categories', label: 'Categories', href: '/admin/posts/categories' },
        ]
      },
      {
        id: 'media',
        label: 'Media',
        icon: '🖼️',
        href: '/admin/media'
      },
    ]
  },
  {
    id: 'datatable',
    label: 'DataTable',
    items: [
      {
        id: 'table-demo',
        label: 'Full Demo',
        icon: '🚀',
        href: '/admin/table-demo',
        badge: { text: 'Demo', variant: 'success' }
      },
      {
        id: 'table-super',
        label: 'Transactions',
        icon: '💳',
        href: '/admin/super-table'
      },
      {
        id: 'table-docs',
        label: 'Documentation',
        icon: '📚',
        href: '/admin/table-docs'
      }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    items: [
      {
        id: 'general',
        label: 'General',
        icon: '⚙️',
        href: '/admin/settings/general'
      },
      {
        id: 'integrations',
        label: 'Integrations',
        icon: '🔌',
        href: '/admin/settings/integrations'
      },
    ]
  },
  {
    id: 'forms',
    label: 'Forms',
    items: [
      {
        id: 'form-demo',
        label: 'Basic Form',
        icon: '📝',
        href: '/admin/form-demo'
      },
      {
        id: 'form-advanced',
        label: 'Advanced Form',
        icon: '⚙️',
        href: '/admin/form-advanced'
      },
      {
        id: 'form-upload',
        label: 'File Upload',
        icon: '📤',
        href: '/admin/form-upload'
      },
      {
        id: 'form-conditional',
        label: 'Conditional Fields',
        icon: '🔀',
        href: '/admin/form-conditional'
      },
      {
        id: 'form-validation',
        label: 'Validation',
        icon: '✅',
        href: '/admin/form-validation'
      },
      {
        id: 'form-custom',
        label: 'Custom Fields',
        icon: '🎨',
        href: '/admin/form-custom'
      },
      {
        id: 'form-builder',
        label: 'Form Builder',
        icon: '🏗️',
        href: '/admin/form-builder',
        badge: { text: 'New', variant: 'success' }
      }
    ]
  }
];