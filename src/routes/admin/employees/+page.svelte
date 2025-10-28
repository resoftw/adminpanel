<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import DataTablePersistent from '$lib/components/DataTablePersistent.svelte';
  import Button from '$lib/components/Button.svelte';
  import type { TableColumn, TableOptions } from '$lib/types/table';

  interface Employee {
    id: number;
    name: string;
    email: string;
    position: string;
    department: string;
    salary: number;
    performance: number;
    hired_date: string;
    is_active: boolean;
  }

  const employees: Employee[] = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@company.com', position: 'Senior Developer', department: 'Engineering', salary: 95000, performance: 92, hired_date: '2022-01-15', is_active: true },
    { id: 2, name: 'Mike Chen', email: 'mike.c@company.com', position: 'Product Manager', department: 'Product', salary: 105000, performance: 88, hired_date: '2021-06-20', is_active: true },
    { id: 3, name: 'Emma Davis', email: 'emma.d@company.com', position: 'UX Designer', department: 'Design', salary: 85000, performance: 95, hired_date: '2022-03-10', is_active: true },
    { id: 4, name: 'James Wilson', email: 'james.w@company.com', position: 'DevOps Engineer', department: 'Engineering', salary: 90000, performance: 87, hired_date: '2021-09-05', is_active: true },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@company.com', position: 'Marketing Lead', department: 'Marketing', salary: 92000, performance: 90, hired_date: '2022-02-14', is_active: false },
  ];

  let tableRef: any;

  const columns: TableColumn<Employee>[] = [
    {
      name: 'name',
      title: 'Employee Name',
      sortable: true,
      searchable: true,
      width: '200px',
      minWidth: '150px',
      resizable: true
    },
    {
      name: 'email',
      title: 'Email',
      sortable: true,
      searchable: true,
      width: '220px',
      minWidth: '180px',
      resizable: true,
      cellClass: () => 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'position',
      title: 'Position',
      sortable: true,
      width: '180px',
      minWidth: '120px',
      resizable: true
    },
    {
      name: 'department',
      title: 'Department',
      type: 'badge',
      sortable: true,
      width: '140px',
      minWidth: '100px',
      resizable: true,
      badgeVariant: (value) => {
        const variants: Record<string, any> = {
          'Engineering': 'primary',
          'Product': 'success',
          'Design': 'warning',
          'Marketing': 'info'
        };
        return variants[value] || 'info';
      }
    },
    {
      name: 'salary',
      title: 'Salary',
      type: 'number',
      align: 'right',
      sortable: true,
      width: '130px',
      minWidth: '100px',
      resizable: true,
      formatter: (value) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(value),
      style: () => 'font-weight: 600; color: #059669;'
    },
    {
      name: 'performance',
      title: 'Performance',
      align: 'center',
      sortable: true,
      width: '130px',
      minWidth: '100px',
      resizable: true,
      render: true // Custom render untuk progress bar
    },
    {
      name: 'is_active',
      title: 'Active',
      type: 'boolean',
      align: 'center',
      sortable: true,
      width: '100px',
      minWidth: '80px',
      resizable: true
    },
    {
      name: 'hired_date',
      title: 'Hired Date',
      type: 'date',
      sortable: true,
      width: '130px',
      minWidth: '110px',
      resizable: true
    }
  ];

  const options: TableOptions<Employee> = {
    selectable: true,
    searchable: true,
    columnVisibility: true,
    exportable: true,
    pagination: {
      page: 1,
      perPage: 10,
      total: employees.length,
      perPageOptions: [5, 10, 25, 50]
    },
    striped: true,
    hoverable: true,
    filters: [
      {
        name: 'department',
        label: 'Department',
        type: 'select',
        options: [
          { label: 'Engineering', value: 'Engineering' },
          { label: 'Product', value: 'Product' },
          { label: 'Design', value: 'Design' },
          { label: 'Marketing', value: 'Marketing' }
        ]
      },
      {
        name: 'is_active',
        label: 'Status',
        type: 'select',
        options: [
          { label: 'Active', value: 'true' },
          { label: 'Inactive', value: 'false' }
        ]
      }
    ],
    rowActions: [
      {
        label: 'View',
        icon: '👁️',
        onClick: (row) => console.log('View', row)
      },
      {
        label: 'Edit',
        icon: '✏️',
        onClick: (row) => console.log('Edit', row)
      },
      {
        label: 'Deactivate',
        icon: '⏸️',
        variant: 'ghost',
        onClick: (row) => console.log('Deactivate', row),
        show: (row) => row.is_active
      }
    ],
    bulkActions: [
      {
        label: 'Export Selected',
        icon: '📥',
        onClick: (rows) => console.log('Export', rows)
      },
      {
        label: 'Send Email',
        icon: '✉️',
        onClick: (rows) => console.log('Email', rows)
      }
    ]
  };

  let tableData = $state(employees);
</script>

<PageHeader 
  title="Employee Management" 
  description="Manage employees with persistent table settings"
>
  {#snippet actions()}
    <Button variant="ghost" size="sm" onclick={() => tableRef?.resetSettings()}>
      <span>🔄</span>
      Reset Layout
    </Button>
    <Button variant="secondary" size="sm">
      <span>📊</span>
      Reports
    </Button>
    <Button size="sm">
      <span>➕</span>
      Add Employee
    </Button>
  {/snippet}
</PageHeader>

<!-- Info Banner -->
<div class="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
  <div class="flex items-center gap-3">
    <span class="text-3xl">💡</span>
    <div class="flex-1">
      <h3 class="font-semibold text-purple-900 dark:text-purple-100 mb-1">Smart Table Features</h3>
      <ul class="text-sm text-purple-700 dark:text-purple-300 space-y-1">
        <li>• <strong>Resize columns</strong> by dragging borders - widths are auto-saved</li>
        <li>• <strong>Toggle column visibility</strong> - preferences are remembered</li>
        <li>• <strong>Adjust items per page</strong> - setting is persisted</li>
        <li>• All settings stored in localStorage with key: <code class="px-1 py-0.5 bg-purple-100 dark:bg-purple-900/50 rounded text-xs">table-employees</code></li>
      </ul>
    </div>
  </div>
</div>

<DataTablePersistent
  bind:this={tableRef}
  {columns}
  bind:data={tableData}
  {options}
  storageKey="employees"
>
  {#snippet customCell({ value, row, column })}
    {#if column.name === 'performance'}
      <div class="flex items-center gap-2">
        <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all {
              value >= 90 ? 'bg-green-500' :
              value >= 80 ? 'bg-blue-500' :
              value >= 70 ? 'bg-yellow-500' :
              'bg-red-500'
            }"
            style="width: {value}%"
          ></div>
        </div>
        <span class="text-xs font-semibold text-gray-700 dark:text-gray-300 min-w-[35px]">
          {value}%
        </span>
      </div>
    {/if}
  {/snippet}
</DataTablePersistent>