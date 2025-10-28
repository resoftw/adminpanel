<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import DataTable from '$lib/components/DataTable.svelte';
  import Button from '$lib/components/Button.svelte';
  import type { TableColumn, TableOptions } from '$lib/types/table';

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    department: string;
    status: string;
    salary: number;
    joined_date: string;
  }

  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', department: 'IT', status: 'active', salary: 75000, joined_date: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', department: 'Sales', status: 'active', salary: 85000, joined_date: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Developer', department: 'IT', status: 'active', salary: 70000, joined_date: '2023-03-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Designer', department: 'Marketing', status: 'active', salary: 65000, joined_date: '2023-04-05' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', department: 'IT', status: 'inactive', salary: 72000, joined_date: '2023-05-12' },
  ];

  let tableRef: any;
  let savedColumnWidths = $state<Record<string, number>>({});
  let savedVisibleColumns = $state<string[]>([]);

  const STORAGE_KEY = 'advanced-table-settings';

  // Load saved settings
  onMount(() => {
    if (browser) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const settings = JSON.parse(saved);
          savedColumnWidths = settings.columnWidths || {};
          savedVisibleColumns = settings.visibleColumns || [];
        } catch (e) {
          console.error('Failed to load table settings:', e);
        }
      }
    }
  });

  // Save settings
  function saveSettings() {
    if (browser && tableRef) {
      const settings = {
        columnWidths: savedColumnWidths,
        visibleColumns: savedVisibleColumns
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }

  // Reset settings
  function resetSettings() {
    if (confirm('Reset all column settings to default?')) {
      savedColumnWidths = {};
      savedVisibleColumns = [];
      if (browser) {
        localStorage.removeItem(STORAGE_KEY);
      }
      // Force reload
      window.location.reload();
    }
  }

  const columns: TableColumn<User>[] = [
    {
      name: 'name',
      title: 'Full Name',
      sortable: true,
      searchable: true,
      width: savedColumnWidths['name'] ? `${savedColumnWidths['name']}px` : '200px',
      minWidth: '120px',
      resizable: true,
      visible: !savedVisibleColumns.length || savedVisibleColumns.includes('name')
    },
    {
      name: 'email',
      title: 'Email Address',
      sortable: true,
      searchable: true,
      width: savedColumnWidths['email'] ? `${savedColumnWidths['email']}px` : '250px',
      minWidth: '150px',
      resizable: true,
      visible: !savedVisibleColumns.length || savedVisibleColumns.includes('email')
    },
    {
      name: 'role',
      title: 'Role',
      type: 'badge',
      sortable: true,
      width: savedColumnWidths['role'] ? `${savedColumnWidths['role']}px` : '120px',
      minWidth: '80px',
      resizable: true,
      visible: !savedVisibleColumns.length || savedVisibleColumns.includes('role'),
      badgeVariant: (value) => {
        if (value === 'Admin') return 'danger';
        if (value === 'Manager') return 'primary';
        return 'info';
      }
    },
    {
      name: 'department',
      title: 'Department',
      type: 'badge',
      sortable: true,
      width: savedColumnWidths['department'] ? `${savedColumnWidths['department']}px` : '140px',
      minWidth: '100px',
      resizable: true,
      visible: !savedVisibleColumns.length || savedVisibleColumns.includes('department'),
      badgeVariant: () => 'success'
    },
    {
      name: 'salary',
      title: 'Salary',
      type: 'number',
      align: 'right',
      sortable: true,
      width: savedColumnWidths['salary'] ? `${savedColumnWidths['salary']}px` : '130px',
      minWidth: '90px',
      resizable: true,
      visible: !savedVisibleColumns.length || savedVisibleColumns.includes('salary'),
      formatter: (value) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(value)
    },
    {
      name: 'status',
      title: 'Status',
      type: 'badge',
      sortable: true,
      width: savedColumnWidths['status'] ? `${savedColumnWidths['status']}px` : '100px',
      minWidth: '80px',
      resizable: true,
      visible: !savedVisibleColumns.length || savedVisibleColumns.includes('status'),
      badgeVariant: (value) => value === 'active' ? 'success' : 'danger'
    },
    {
      name: 'joined_date',
      title: 'Join Date',
      type: 'date',
      sortable: true,
      width: savedColumnWidths['joined_date'] ? `${savedColumnWidths['joined_date']}px` : '130px',
      minWidth: '100px',
      resizable: true,
      visible: !savedVisibleColumns.length || savedVisibleColumns.includes('joined_date')
    }
  ];

  const options: TableOptions<User> = {
    selectable: true,
    searchable: true,
    columnVisibility: true,
    exportable: true,
    pagination: {
      page: 1,
      perPage: 10,
      total: users.length,
      perPageOptions: [5, 10, 25, 50]
    },
    striped: true,
    hoverable: true,
    filters: [
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { label: 'Admin', value: 'Admin' },
          { label: 'Manager', value: 'Manager' },
          { label: 'Developer', value: 'Developer' },
          { label: 'Designer', value: 'Designer' }
        ]
      },
      {
        name: 'department',
        label: 'Department',
        type: 'select',
        options: [
          { label: 'IT', value: 'IT' },
          { label: 'Sales', value: 'Sales' },
          { label: 'Marketing', value: 'Marketing' }
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
    ],
    rowActions: [
      {
        label: 'View',
        icon: '👁️',
        onClick: (row) => alert(`View user: ${row.name}`)
      },
      {
        label: 'Edit',
        icon: '✏️',
        onClick: (row) => alert(`Edit user: ${row.name}`)
      }
    ]
  };

  let tableData = $state(users);
</script>

<PageHeader 
  title="Advanced Resizable Table" 
  description="Column settings are saved to localStorage"
>
  {#snippet actions()}
    <Button variant="secondary" size="sm" onclick={saveSettings}>
      <span>💾</span>
      Save Layout
    </Button>
    <Button variant="ghost" size="sm" onclick={resetSettings}>
      <span>🔄</span>
      Reset
    </Button>
  {/snippet}
</PageHeader>

<!-- Features Info -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
  <div class="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <div class="flex items-center gap-3">
      <span class="text-3xl">↔️</span>
      <div>
        <h3 class="font-semibold text-blue-900 dark:text-blue-100">Resizable</h3>
        <p class="text-xs text-blue-700 dark:text-blue-300">Drag column borders to resize</p>
      </div>
    </div>
  </div>

  <div class="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-lg">
    <div class="flex items-center gap-3">
      <span class="text-3xl">👁️</span>
      <div>
        <h3 class="font-semibold text-green-900 dark:text-green-100">Show/Hide</h3>
        <p class="text-xs text-green-700 dark:text-green-300">Toggle column visibility</p>
      </div>
    </div>
  </div>

  <div class="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-lg">
    <div class="flex items-center gap-3">
      <span class="text-3xl">💾</span>
      <div>
        <h3 class="font-semibold text-purple-900 dark:text-purple-100">Persistent</h3>
        <p class="text-xs text-purple-700 dark:text-purple-300">Settings saved to localStorage</p>
      </div>
    </div>
  </div>
</div>

<DataTable
  bind:this={tableRef}
  {columns}
  bind:data={tableData}
  {options}
/>