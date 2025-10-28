<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import DataTable from '$lib/components/DataTable.svelte';
  import Button from '$lib/components/Button.svelte';
  import type { TableColumn, TableOptions, RowAction, BulkAction, TableFilter } from '$lib/types/table';

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    avatar: string;
    created_at: string;
    login_count: number;
  }

  // Sample data
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', avatar: 'https://ui-avatars.com/api/?name=John+Doe', created_at: '2024-01-15', login_count: 45 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith', created_at: '2024-02-20', login_count: 32 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson', created_at: '2024-03-10', login_count: 12 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active', avatar: 'https://ui-avatars.com/api/?name=Alice+Brown', created_at: '2024-01-25', login_count: 67 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active', avatar: 'https://ui-avatars.com/api/?name=Charlie+Wilson', created_at: '2024-02-14', login_count: 23 },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active', avatar: 'https://ui-avatars.com/api/?name=Diana+Prince', created_at: '2024-01-05', login_count: 89 },
  ];

  let tableData = $state(users);
  let loading = $state(false);

  // Column definitions
  const columns: TableColumn<User>[] = [
    {
      name: 'avatar',
      title: 'User',
      type: 'avatar',
      width: '250px',
      sortable: true,
      searchable: true,
      formatter: (value, row) => row.name
    },
    {
      name: 'email',
      title: 'Email',
      type: 'text',
      sortable: true,
      searchable: true
    },
    {
      name: 'role',
      title: 'Role',
      type: 'badge',
      width: '120px',
      sortable: true,
      badgeVariant: (value) => {
        if (value === 'Admin') return 'primary';
        if (value === 'Editor') return 'info';
        return 'success';
      }
    },
    {
      name: 'status',
      title: 'Status',
      type: 'badge',
      width: '100px',
      sortable: true,
      badgeVariant: (value) => value === 'active' ? 'success' : 'danger'
    },
    {
      name: 'login_count',
      title: 'Logins',
      type: 'number',
      width: '100px',
      align: 'right',
      sortable: true
    },
    {
      name: 'created_at',
      title: 'Created',
      type: 'date',
      width: '120px',
      sortable: true
    }
  ];

  // Filters
  const filters: TableFilter[] = [
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'Admin' },
        { label: 'Editor', value: 'Editor' },
        { label: 'User', value: 'User' }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
      ]
    }
  ];

  // Row actions
  const rowActions: RowAction<User>[] = [
    {
      label: 'View',
      icon: '👁️',
      variant: 'ghost',
      href: (row) => `/admin/users/${row.id}`
    },
    {
      label: 'Edit',
      icon: '✏️',
      variant: 'ghost',
      href: (row) => `/admin/users/${row.id}/edit`
    },
    {
      label: 'Delete',
      icon: '🗑️',
      variant: 'ghost',
      onClick: (row) => handleDelete(row),
      show: (row) => row.role !== 'Admin' // Don't show delete for admins
    }
  ];

  // Bulk actions
  const bulkActions: BulkAction<User>[] = [
    {
      label: 'Activate',
      icon: '✅',
      variant: 'secondary',
      onClick: (rows) => handleBulkActivate(rows)
    },
    {
      label: 'Deactivate',
      icon: '⏸️',
      variant: 'secondary',
      onClick: (rows) => handleBulkDeactivate(rows)
    },
    {
      label: 'Delete',
      icon: '🗑️',
      variant: 'danger',
      onClick: (rows) => handleBulkDelete(rows)
    }
  ];

  // Table options
  const options: TableOptions<User> = {
    selectable: true,
    selectKey: 'id',
    rowActions,
    bulkActions,
    pagination: {
      page: 1,
      perPage: 10,
      total: users.length,
      perPageOptions: [5, 10, 25, 50, 100]
    },
    filters,
    searchable: true,
    searchPlaceholder: 'Search users...',
    columnVisibility: true,
    exportable: true,
    striped: true,
    hoverable: true,
    emptyText: 'No users found',
    onSelectionChange: (selected) => {
      console.log('Selected users:', selected);
    }
  };

  // Handlers
  function handleDelete(user: User) {
    if (confirm(`Delete user ${user.name}?`)) {
      tableData = tableData.filter(u => u.id !== user.id);
      console.log('Deleted:', user);
    }
  }

  function handleBulkActivate(users: User[]) {
    console.log('Bulk activate:', users);
    tableData = tableData.map(u => {
      if (users.find(selected => selected.id === u.id)) {
        return { ...u, status: 'active' };
      }
      return u;
    });
  }

  function handleBulkDeactivate(users: User[]) {
    console.log('Bulk deactivate:', users);
    tableData = tableData.map(u => {
      if (users.find(selected => selected.id === u.id)) {
        return { ...u, status: 'inactive' };
      }
      return u;
    });
  }

  function handleBulkDelete(users: User[]) {
    if (confirm(`Delete ${users.length} users?`)) {
      const userIds = users.map(u => u.id);
      tableData = tableData.filter(u => !userIds.includes(u.id));
      console.log('Bulk deleted:', users);
    }
  }

  // For Ajax example
  function loadAjaxData() {
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 1000);
  }
</script>

<PageHeader 
  title="Users Management" 
  description="Manage your users and their permissions"
>
  {#snippet actions()}
    <Button variant="secondary" size="sm">
      <span>📥</span>
      Import
    </Button>
    <Button size="sm" href="/admin/users/new">
      <span>➕</span>
      Add User
    </Button>
  {/snippet}
</PageHeader>

<DataTable
  {columns}
  bind:data={tableData}
  {options}
  bind:loading
/>