<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import DataTablePersistent from '$lib/components/DataTablePersistent.svelte';
  import TableQuickReference from '$lib/components/table/TableQuickReference.svelte';
  import ColumnResizeTooltip from '$lib/components/table/ColumnResizeTooltip.svelte';
  import Button from '$lib/components/Button.svelte';
  import type { TableColumn, TableOptions } from '$lib/types/table';

  // Generate sample data
  interface DemoData {
    id: number;
    name: string;
    email: string;
    age: number;
    city: string;
    country: string;
    occupation: string;
    salary: number;
    joined_date: string;
    is_active: boolean;
    performance: number;
  }

  function generateData(count: number): DemoData[] {
    const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Toronto', 'Berlin', 'Singapore'];
    const countries = ['USA', 'UK', 'Japan', 'France', 'Australia', 'Canada', 'Germany', 'Singapore'];
    const occupations = ['Developer', 'Designer', 'Manager', 'Analyst', 'Engineer', 'Consultant'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: Math.floor(Math.random() * 40) + 25,
      city: cities[Math.floor(Math.random() * cities.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      occupation: occupations[Math.floor(Math.random() * occupations.length)],
      salary: Math.floor(Math.random() * 100000) + 40000,
      joined_date: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      is_active: Math.random() > 0.3,
      performance: Math.floor(Math.random() * 40) + 60
    }));
  }

  let tableRef: any;
  let tableData = $state(generateData(100));

  const columns: TableColumn<DemoData>[] = [
    {
      name: 'id',
      title: 'ID',
      type: 'number',
      sortable: true,
      width: '80px',
      minWidth: '60px',
      resizable: true,
      align: 'center'
    },
    {
      name: 'name',
      title: 'Full Name',
      sortable: true,
      searchable: true,
      width: '180px',
      minWidth: '120px',
      resizable: true
    },
    {
      name: 'email',
      title: 'Email Address',
      sortable: true,
      searchable: true,
      width: '220px',
      minWidth: '150px',
      resizable: true,
      cellClass: () => 'text-blue-600 dark:text-blue-400 font-medium'
    },
    {
      name: 'age',
      title: 'Age',
      type: 'number',
      sortable: true,
      width: '80px',
      minWidth: '60px',
      resizable: true,
      align: 'center'
    },
    {
      name: 'city',
      title: 'City',
      sortable: true,
      searchable: true,
      width: '140px',
      minWidth: '100px',
      resizable: true
    },
    {
      name: 'country',
      title: 'Country',
      type: 'badge',
      sortable: true,
      width: '120px',
      minWidth: '90px',
      resizable: true,
      badgeVariant: () => 'info'
    },
    {
      name: 'occupation',
      title: 'Occupation',
      type: 'badge',
      sortable: true,
      width: '140px',
      minWidth: '100px',
      resizable: true,
      badgeVariant: (value) => {
        const variants: Record<string, any> = {
          'Developer': 'primary',
          'Designer': 'warning',
          'Manager': 'success',
          'Analyst': 'info',
          'Engineer': 'primary',
          'Consultant': 'success'
        };
        return variants[value] || 'info';
      }
    },
    {
      name: 'salary',
      title: 'Annual Salary',
      type: 'number',
      sortable: true,
      width: '140px',
      minWidth: '100px',
      resizable: true,
      align: 'right',
      formatter: (value) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(value),
      cellClass: (value) => {
        if (value > 100000) return 'text-green-600 dark:text-green-400 font-bold';
        if (value > 70000) return 'text-blue-600 dark:text-blue-400 font-semibold';
        return '';
      }
    },
    {
      name: 'performance',
      title: 'Performance',
      sortable: true,
      width: '150px',
      minWidth: '120px',
      resizable: true,
      render: true
    },
    {
      name: 'is_active',
      title: 'Status',
      type: 'boolean',
      sortable: true,
      width: '100px',
      minWidth: '80px',
      resizable: true,
      align: 'center'
    },
    {
      name: 'joined_date',
      title: 'Join Date',
      type: 'date',
      sortable: true,
      width: '130px',
      minWidth: '110px',
      resizable: true
    }
  ];

  const options: TableOptions<DemoData> = {
    selectable: true,
    searchable: true,
    searchPlaceholder: 'Search by name, email, city...',
    columnVisibility: true,
    exportable: true,
    pagination: {
      page: 1,
      perPage: 25,
      total: tableData.length,
      perPageOptions: [10, 25, 50, 100]
    },
    striped: true,
    hoverable: true,
    filters: [
      {
        name: 'country',
        label: 'Country',
        type: 'select',
        options: [
          { label: 'USA', value: 'USA' },
          { label: 'UK', value: 'UK' },
          { label: 'Japan', value: 'Japan' },
          { label: 'France', value: 'France' },
          { label: 'Australia', value: 'Australia' },
          { label: 'Canada', value: 'Canada' },
          { label: 'Germany', value: 'Germany' },
          { label: 'Singapore', value: 'Singapore' }
        ]
      },
      {
        name: 'occupation',
        label: 'Occupation',
        type: 'select',
        options: [
          { label: 'Developer', value: 'Developer' },
          { label: 'Designer', value: 'Designer' },
          { label: 'Manager', value: 'Manager' },
          { label: 'Analyst', value: 'Analyst' },
          { label: 'Engineer', value: 'Engineer' },
          { label: 'Consultant', value: 'Consultant' }
        ]
      }
    ],
    rowActions: [
      {
        label: 'View',
        icon: '👁️',
        onClick: (row) => alert(`View: ${row.name}`)
      },
      {
        label: 'Edit',
        icon: '✏️',
        onClick: (row) => alert(`Edit: ${row.name}`)
      },
      {
        label: 'Delete',
        icon: '🗑️',
        variant: 'ghost',
        onClick: (row) => {
          if (confirm(`Delete ${row.name}?`)) {
            tableData = tableData.filter(d => d.id !== row.id);
          }
        }
      }
    ],
    bulkActions: [
      {
        label: 'Activate',
        icon: '✅',
        onClick: (rows) => {
          const ids = rows.map(r => r.id);
          tableData = tableData.map(d => 
            ids.includes(d.id) ? { ...d, is_active: true } : d
          );
        }
      },
      {
        label: 'Deactivate',
        icon: '⏸️',
        onClick: (rows) => {
          const ids = rows.map(r => r.id);
          tableData = tableData.map(d => 
            ids.includes(d.id) ? { ...d, is_active: false } : d
          );
        }
      },
      {
        label: 'Delete Selected',
        icon: '🗑️',
        variant: 'danger',
        onClick: (rows) => {
          if (confirm(`Delete ${rows.length} items?`)) {
            const ids = rows.map(r => r.id);
            tableData = tableData.filter(d => !ids.includes(d.id));
          }
        }
      }
    ]
  };
</script>

<PageHeader 
  title="DataTable - Full Demo" 
  description="Complete showcase of all table features with 100 sample records"
>
  {#snippet actions()}
    <Button variant="ghost" size="sm" onclick={() => tableRef?.resetSettings()}>
      <span>🔄</span>
      Reset
    </Button>
    <Button variant="secondary" size="sm" onclick={() => tableData = generateData(100)}>
      <span>🎲</span>
      Regenerate Data
    </Button>
  {/snippet}
</PageHeader>

<!-- Feature Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-200 dark:border-blue-800">
    <div class="text-3xl mb-2">↔️</div>
    <h3 class="font-bold text-blue-900 dark:text-blue-100 mb-1">Resizable</h3>
    <p class="text-xs text-blue-700 dark:text-blue-300">Drag column borders to resize. Double-click to auto-fit.</p>
  </div>

  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-green-200 dark:border-green-800">
    <div class="text-3xl mb-2">💾</div>
    <h3 class="font-bold text-green-900 dark:text-green-100 mb-1">Persistent</h3>
    <p class="text-xs text-green-700 dark:text-green-300">All settings auto-saved to localStorage.</p>
  </div>

  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-200 dark:border-purple-800">
    <div class="text-3xl mb-2">🎯</div>
    <h3 class="font-bold text-purple-900 dark:text-purple-100 mb-1">Filters</h3>
    <p class="text-xs text-purple-700 dark:text-purple-300">Multiple filter types with smart search.</p>
  </div>

  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-orange-200 dark:border-orange-800">
    <div class="text-3xl mb-2">⚡</div>
    <h3 class="font-bold text-orange-900 dark:text-orange-100 mb-1">Actions</h3>
    <p class="text-xs text-orange-700 dark:text-orange-300">Row actions and bulk operations.</p>
  </div>
</div>

<!-- Table -->
<DataTablePersistent
  bind:this={tableRef}
  {columns}
  bind:data={tableData}
  {options}
  storageKey="demo-table"
>
  {#snippet customCell({ value, row, column })}
    {#if column.name === 'performance'}
      <div class="flex items-center gap-2">
        <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            class="h-full transition-all {
              value >= 90 ? 'bg-gradient-to-r from-green-400 to-green-600' :
              value >= 80 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
              value >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
              'bg-gradient-to-r from-red-400 to-red-600'
            }"
            style="width: {value}%"
          ></div>
        </div>
        <span class="text-xs font-semibold min-w-[35px] {
            value >= 90 ? 'text-green-600 dark:text-green-400' :
            value >= 80 ? 'text-blue-600 dark:text-blue-400' :
            value >= 70 ? 'text-yellow-600 dark:text-yellow-400' :
            'text-red-600 dark:text-red-400'
          }">
          {value}%
        </span>
      </div>
    {/if}
  {/snippet}
</DataTablePersistent>

<!-- Helper Components -->
<TableQuickReference />
<ColumnResizeTooltip />