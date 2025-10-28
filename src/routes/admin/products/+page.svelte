<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import DataTable from '$lib/components/DataTable.svelte';
  import Button from '$lib/components/Button.svelte';
  import type { TableColumn, TableOptions } from '$lib/types/table';

  interface Product {
    id: number;
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    status: string;
    created_at: string;
  }

  const products: Product[] = [
    { id: 1, name: 'Wireless Mouse', sku: 'WM-001', category: 'Electronics', price: 29.99, stock: 150, status: 'published', created_at: '2024-01-15' },
    { id: 2, name: 'USB Keyboard', sku: 'KB-002', category: 'Electronics', price: 49.99, stock: 85, status: 'published', created_at: '2024-01-20' },
    { id: 3, name: 'Laptop Stand', sku: 'LS-003', category: 'Accessories', price: 39.99, stock: 45, status: 'draft', created_at: '2024-02-01' },
    { id: 4, name: 'Monitor 24"', sku: 'MN-004', category: 'Electronics', price: 199.99, stock: 25, status: 'published', created_at: '2024-02-10' },
    { id: 5, name: 'Webcam HD', sku: 'WC-005', category: 'Electronics', price: 79.99, stock: 60, status: 'published', created_at: '2024-02-15' },
  ];

  // Column definitions dengan resizable
  const columns: TableColumn<Product>[] = [
    {
      name: 'name',
      title: 'Product Name',
      sortable: true,
      searchable: true,
      width: '250px',
      minWidth: '150px',
      resizable: true // Enable resize
    },
    {
      name: 'sku',
      title: 'SKU',
      sortable: true,
      searchable: true,
      width: '120px',
      minWidth: '80px',
      resizable: true,
      formatter: (value) => value.toUpperCase(),
      cellClass: () => 'font-mono text-xs'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'badge',
      sortable: true,
      width: '150px',
      minWidth: '100px',
      resizable: true,
      badgeVariant: (value) => {
        if (value === 'Electronics') return 'primary';
        return 'info';
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      align: 'right',
      sortable: true,
      width: '120px',
      minWidth: '80px',
      resizable: true,
      formatter: (value) => `$${value.toFixed(2)}`,
      style: () => 'font-weight: 600;'
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
      align: 'center',
      sortable: true,
      width: '100px',
      minWidth: '70px',
      resizable: true,
      cellClass: (value) => {
        if (value === 0) return 'text-red-600 dark:text-red-400 font-semibold';
        if (value < 30) return 'text-yellow-600 dark:text-yellow-400 font-semibold';
        return 'text-green-600 dark:text-green-400 font-semibold';
      }
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
        if (value === 'published') return 'success';
        if (value === 'draft') return 'warning';
        return 'danger';
      }
    },
    {
      name: 'created_at',
      title: 'Created Date',
      type: 'date',
      sortable: true,
      width: '140px',
      minWidth: '100px',
      resizable: true
    }
  ];

  const options: TableOptions<Product> = {
    selectable: true,
    searchable: true,
    columnVisibility: true,
    exportable: true,
    pagination: {
      page: 1,
      perPage: 10,
      total: products.length,
      perPageOptions: [5, 10, 25, 50]
    },
    striped: true,
    hoverable: true,
    rowActions: [
      {
        label: 'View',
        icon: '👁️',
        href: (row) => `/admin/products/${row.id}`
      },
      {
        label: 'Edit',
        icon: '✏️',
        href: (row) => `/admin/products/${row.id}/edit`
      },
      {
        label: 'Delete',
        icon: '🗑️',
        variant: 'ghost',
        onClick: (row) => handleDelete(row)
      }
    ],
    bulkActions: [
      {
        label: 'Publish',
        icon: '✅',
        onClick: (rows) => console.log('Publish', rows)
      },
      {
        label: 'Delete',
        icon: '🗑️',
        variant: 'danger',
        onClick: (rows) => handleBulkDelete(rows)
      }
    ],
    filters: [
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: [
          { label: 'Electronics', value: 'Electronics' },
          { label: 'Accessories', value: 'Accessories' }
        ]
      },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' }
        ]
      }
    ]
  };

  let tableData = $state(products);

  function handleDelete(product: Product) {
    if (confirm(`Delete product "${product.name}"?`)) {
      tableData = tableData.filter(p => p.id !== product.id);
    }
  }

  function handleBulkDelete(products: Product[]) {
    if (confirm(`Delete ${products.length} products?`)) {
      const ids = products.map(p => p.id);
      tableData = tableData.filter(p => !ids.includes(p.id));
    }
  }
</script>

<PageHeader 
  title="Products with Resizable Columns" 
  description="Drag column borders to resize"
>
  {#snippet actions()}
    <Button variant="secondary" size="sm">
      <span>📊</span>
      Analytics
    </Button>
    <Button size="sm" href="/admin/products/new">
      <span>➕</span>
      Add Product
    </Button>
  {/snippet}
</PageHeader>

<!-- Info Card -->
<div class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
  <div class="flex items-start gap-3">
    <span class="text-2xl">💡</span>
    <div>
      <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-1">Resizable Columns</h3>
      <p class="text-sm text-blue-700 dark:text-blue-300">
        Hover over column borders and drag to resize. Column widths are saved in the table state.
      </p>
    </div>
  </div>
</div>

<DataTable
  {columns}
  bind:data={tableData}
  {options}
/>