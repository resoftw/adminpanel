<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import DataTablePersistent from '$lib/components/DataTablePersistent.svelte';
  import ColumnResizeTooltip from '$lib/components/table/ColumnResizeTooltip.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import type { TableColumn, TableOptions } from '$lib/types/table';

  interface Transaction {
    id: number;
    transaction_id: string;
    customer: string;
    product: string;
    quantity: number;
    unit_price: number;
    total: number;
    status: string;
    payment_method: string;
    created_at: string;
    is_refunded: boolean;
  }

  const transactions: Transaction[] = [
    { id: 1, transaction_id: 'TXN-2024-001', customer: 'John Doe', product: 'Laptop Pro 15"', quantity: 1, unit_price: 1299.99, total: 1299.99, status: 'completed', payment_method: 'Credit Card', created_at: '2024-01-15T10:30:00', is_refunded: false },
    { id: 2, transaction_id: 'TXN-2024-002', customer: 'Jane Smith', product: 'Wireless Mouse', quantity: 2, unit_price: 29.99, total: 59.98, status: 'completed', payment_method: 'PayPal', created_at: '2024-01-15T11:45:00', is_refunded: false },
    { id: 3, transaction_id: 'TXN-2024-003', customer: 'Bob Wilson', product: 'USB-C Hub', quantity: 3, unit_price: 49.99, total: 149.97, status: 'pending', payment_method: 'Credit Card', created_at: '2024-01-16T09:15:00', is_refunded: false },
    { id: 4, transaction_id: 'TXN-2024-004', customer: 'Alice Brown', product: 'Mechanical Keyboard', quantity: 1, unit_price: 159.99, total: 159.99, status: 'failed', payment_method: 'Bank Transfer', created_at: '2024-01-16T14:20:00', is_refunded: false },
    { id: 5, transaction_id: 'TXN-2024-005', customer: 'Charlie Davis', product: 'Monitor 27"', quantity: 1, unit_price: 399.99, total: 399.99, status: 'completed', payment_method: 'Credit Card', created_at: '2024-01-17T08:00:00', is_refunded: true },
  ];

  let tableRef: any;
  let tableData = $state(transactions);
  let statsData = $derived({
    total: tableData.reduce((sum, t) => sum + t.total, 0),
    completed: tableData.filter(t => t.status === 'completed').length,
    pending: tableData.filter(t => t.status === 'pending').length,
    refunded: tableData.filter(t => t.is_refunded).length
  });

  const columns: TableColumn<Transaction>[] = [
    {
      name: 'transaction_id',
      title: 'Transaction ID',
      sortable: true,
      searchable: true,
      width: '160px',
      minWidth: '120px',
      resizable: true,
      formatter: (value) => value,
      cellClass: () => 'font-mono text-xs font-semibold'
    },
    {
      name: 'customer',
      title: 'Customer Name',
      sortable: true,
      searchable: true,
      width: '180px',
      minWidth: '140px',
      resizable: true
    },
    {
      name: 'product',
      title: 'Product',
      sortable: true,
      searchable: true,
      width: '220px',
      minWidth: '150px',
      resizable: true
    },
    {
      name: 'quantity',
      title: 'Qty',
      type: 'number',
      align: 'center',
      sortable: true,
      width: '80px',
      minWidth: '60px',
      resizable: true
    },
    {
      name: 'unit_price',
      title: 'Unit Price',
      type: 'number',
      align: 'right',
      sortable: true,
      width: '120px',
      minWidth: '90px',
      resizable: true,
      formatter: (value) => `$${value.toFixed(2)}`
    },
    {
      name: 'total',
      title: 'Total Amount',
      type: 'number',
      align: 'right',
      sortable: true,
      width: '130px',
      minWidth: '100px',
      resizable: true,
      formatter: (value) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value),
      style: () => 'font-weight: 700; font-size: 0.9rem;',
      cellClass: (value) => value > 500 ? 'text-green-600 dark:text-green-400' : ''
    },
    {
      name: 'status',
      title: 'Status',
      type: 'badge',
      sortable: true,
      width: '120px',
      minWidth: '90px',
      resizable: true,
      badgeVariant: (value) => {
        const variants: Record<string, any> = {
          'completed': 'success',
          'pending': 'warning',
          'failed': 'danger',
          'processing': 'primary'
        };
        return variants[value] || 'info';
      }
    },
    {
      name: 'payment_method',
      title: 'Payment',
      sortable: true,
      width: '130px',
      minWidth: '100px',
      resizable: true,
      render: true
    },
    {
      name: 'is_refunded',
      title: 'Refunded',
      type: 'boolean',
      align: 'center',
      sortable: true,
      width: '100px',
      minWidth: '80px',
      resizable: true
    },
    {
      name: 'created_at',
      title: 'Date & Time',
      sortable: true,
      width: '180px',
      minWidth: '140px',
      resizable: true,
      formatter: (value) => new Date(value).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  ];

  const options: TableOptions<Transaction> = {
    selectable: true,
    searchable: true,
    searchPlaceholder: 'Search transactions...',
    columnVisibility: true,
    exportable: true,
    pagination: {
      page: 1,
      perPage: 10,
      total: transactions.length,
      perPageOptions: [5, 10, 25, 50, 100]
    },
    striped: true,
    hoverable: true,
    filters: [
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { label: 'Completed', value: 'completed' },
          { label: 'Pending', value: 'pending' },
          { label: 'Failed', value: 'failed' }
        ]
      },
      {
        name: 'payment_method',
        label: 'Payment Method',
        type: 'select',
        options: [
          { label: 'Credit Card', value: 'Credit Card' },
          { label: 'PayPal', value: 'PayPal' },
          { label: 'Bank Transfer', value: 'Bank Transfer' }
        ]
      },
      {
        name: 'created_at',
        label: 'Date',
        type: 'date'
      }
    ],
    rowActions: [
      {
        label: 'View',
        icon: '👁️',
        onClick: (row) => alert(`View transaction: ${row.transaction_id}`)
      },
      {
        label: 'Invoice',
        icon: '📄',
        onClick: (row) => alert(`Generate invoice for: ${row.transaction_id}`),
        show: (row) => row.status === 'completed'
      },
      {
        label: 'Refund',
        icon: '↩️',
        variant: 'ghost',
        onClick: (row) => handleRefund(row),
        show: (row) => row.status === 'completed' && !row.is_refunded
      }
    ],
    bulkActions: [
      {
        label: 'Export Selected',
        icon: '📥',
        onClick: (rows) => alert(`Export ${rows.length} transactions`)
      },
      {
        label: 'Send Receipt',
        icon: '✉️',
        onClick: (rows) => alert(`Send receipt to ${rows.length} customers`)
      },
      {
        label: 'Mark as Completed',
        icon: '✅',
        variant: 'secondary',
        onClick: (rows) => handleBulkComplete(rows)
      }
    ]
  };

  function handleRefund(transaction: Transaction) {
    if (confirm(`Refund transaction ${transaction.transaction_id}?`)) {
      tableData = tableData.map(t => 
        t.id === transaction.id ? { ...t, is_refunded: true } : t
      );
    }
  }

  function handleBulkComplete(transactions: Transaction[]) {
    const ids = transactions.map(t => t.id);
    tableData = tableData.map(t => 
      ids.includes(t.id) ? { ...t, status: 'completed' } : t
    );
  }

  const paymentIcons: Record<string, string> = {
    'Credit Card': '💳',
    'PayPal': '🅿️',
    'Bank Transfer': '🏦',
    'Cash': '💵'
  };
</script>

<PageHeader 
  title="Transaction Management" 
  description="Complete table with all advanced features"
>
  {#snippet actions()}
    <Button variant="ghost" size="sm" onclick={() => tableRef?.resetSettings()}>
      <span>🔄</span>
      Reset
    </Button>
    <Button variant="secondary" size="sm">
      <span>📊</span>
      Analytics
    </Button>
    <Button size="sm">
      <span>➕</span>
      New Transaction
    </Button>
  {/snippet}
</PageHeader>

<!-- Stats Cards -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  <Card padding="sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          ${statsData.total.toFixed(2)}
        </p>
      </div>
      <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
        <span class="text-2xl">💰</span>
      </div>
    </div>
  </Card>

  <Card padding="sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Completed</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {statsData.completed}
        </p>
      </div>
      <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
        <span class="text-2xl">✅</span>
      </div>
    </div>
  </Card>

  <Card padding="sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Pending</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {statsData.pending}
        </p>
      </div>
      <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
        <span class="text-2xl">⏳</span>
      </div>
    </div>
  </Card>

  <Card padding="sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Refunded</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {statsData.refunded}
        </p>
      </div>
      <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
        <span class="text-2xl">↩️</span>
      </div>
    </div>
  </Card>
</div>

<!-- Feature Showcase -->
<div class="mb-6 p-5 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
  <h3 class="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-3">
    🚀 Advanced Table Features
  </h3>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="flex items-start gap-2">
      <span class="text-xl">↔️</span>
      <div>
        <p class="font-semibold text-sm text-indigo-900 dark:text-indigo-100">Resizable Columns</p>
        <p class="text-xs text-indigo-700 dark:text-indigo-300">Drag borders, double-click to auto-fit</p>
      </div>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-xl">🔍</span>
      <div>
        <p class="font-semibold text-sm text-indigo-900 dark:text-indigo-100">Smart Search</p>
        <p class="text-xs text-indigo-700 dark:text-indigo-300">Search across all columns instantly</p>
      </div>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-xl">📊</span>
      <div>
        <p class="font-semibold text-sm text-indigo-900 dark:text-indigo-100">Multi-Sort</p>
        <p class="text-xs text-indigo-700 dark:text-indigo-300">Click column headers to sort</p>
      </div>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-xl">🎯</span>
      <div>
        <p class="font-semibold text-sm text-indigo-900 dark:text-indigo-100">Advanced Filters</p>
        <p class="text-xs text-indigo-700 dark:text-indigo-300">Multiple filter combinations</p>
      </div>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-xl">👁️</span>
      <div>
        <p class="font-semibold text-sm text-indigo-900 dark:text-indigo-100">Column Visibility</p>
        <p class="text-xs text-indigo-700 dark:text-indigo-300">Show/hide columns dynamically</p>
      </div>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-xl">💾</span>
      <div>
        <p class="font-semibold text-sm text-indigo-900 dark:text-indigo-100">Persistent State</p>
        <p class="text-xs text-indigo-700 dark:text-indigo-300">Settings saved in localStorage</p>
      </div>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-xl">✅</span>
      <div>
        <p class="font-semibold text-sm text-indigo-900 dark:text-indigo-100">Bulk Actions</p>
        <p class="text-xs text-indigo-700 dark:text-indigo-300">Select multiple rows for actions</p>
      </div>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-xl">📥</span>
      <div>
        <p class="font-semibold text-sm text-indigo-900 dark:text-indigo-100">Export CSV</p>
        <p class="text-xs text-indigo-700 dark:text-indigo-300">Export filtered data to CSV</p>
      </div>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-xl">⌨️</span>
      <div>
        <p class="font-semibold text-sm text-indigo-900 dark:text-indigo-100">Keyboard Shortcuts</p>
        <p class="text-xs text-indigo-700 dark:text-indigo-300">Arrow keys while resizing</p>
      </div>
    </div>
  </div>
</div>

<!-- The Table -->
<DataTablePersistent
  bind:this={tableRef}
  {columns}
  bind:data={tableData}
  {options}
  storageKey="transactions"
>
  {#snippet customCell({ value, row, column })}
    {#if column.name === 'payment_method'}
      <div class="flex items-center gap-2">
        <span class="text-lg">{paymentIcons[value] || '💳'}</span>
        <span class="text-gray-900 dark:text-white">{value}</span>
      </div>
    {/if}
  {/snippet}
</DataTablePersistent>

<!-- Resize Tooltip -->
<ColumnResizeTooltip />