<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import DataTable from '$lib/components/DataTable.svelte';
  import type { TableColumn, TableOptions } from '$lib/types/table';
	import Button from '$lib/components/Button.svelte';

  interface Order {
    id: number;
    order_number: string;
    customer: string;
    items: number;
    total: number;
    status: string;
    date: string;
  }

  const orders: Order[] = [
    { id: 1, order_number: '#ORD-001', customer: 'John Doe', items: 3, total: 299.99, status: 'completed', date: '2024-01-15' },
    { id: 2, order_number: '#ORD-002', customer: 'Jane Smith', items: 2, total: 159.99, status: 'pending', date: '2024-01-16' },
    { id: 3, order_number: '#ORD-003', customer: 'Bob Wilson', items: 5, total: 599.99, status: 'processing', date: '2024-01-17' },
  ];

  const columns: TableColumn<Order>[] = [
    {
      name: 'order_number',
      title: 'Order',
      sortable: true,
      width: '150px',
      render: true // Enable custom rendering
    },
    {
      name: 'customer',
      title: 'Customer',
      sortable: true,
      searchable: true
    },
    {
      name: 'items',
      title: 'Items',
      type: 'number',
      align: 'center',
      sortable: true,
      width: '80px'
    },
    {
      name: 'total',
      title: 'Total',
      type: 'number',
      align: 'right',
      sortable: true,
      formatter: (value) => `$${value.toFixed(2)}`,
      style: () => 'font-weight: 600;'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'badge',
      width: '120px',
      sortable: true,
      badgeVariant: (value) => {
        const variants = {
          completed: 'success',
          pending: 'warning',
          processing: 'primary',
          cancelled: 'danger'
        };
        return variants[value as keyof typeof variants] || 'info';
      }
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      sortable: true
    }
  ];

  const options: TableOptions<Order> = {
    selectable: true,
    searchable: true,
    columnVisibility: true,
    exportable: true,
    pagination: true,
    striped: true,
    hoverable: true,
    rowActions: [
      {
        label: 'View',
        icon: '👁️',
        href: (row) => `/admin/orders/${row.id}`
      },
      {
        label: 'Invoice',
        icon: '📄',
        onClick: (row) => console.log('Generate invoice for', row)
      }
    ]
  };
</script>

<PageHeader title="Orders" description="Manage customer orders">
  {#snippet actions()}
    <Button variant="secondary" size="sm">
      <span>📊</span>
      Reports
    </Button>
  {/snippet}
</PageHeader>

<DataTable {columns} data={orders} {options}>
  {#snippet customCell({ value, row, column })}
    {#if column.name === 'order_number'}
      <div class="flex items-center gap-2">
        <span class="font-mono font-semibold text-blue-600 dark:text-blue-400">
          {value}
        </span>
        {#if row.status === 'completed'}
          <span class="text-green-600" title="Completed">✓</span>
        {/if}
      </div>
    {/if}
  {/snippet}
</DataTable>