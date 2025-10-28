<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import DataTable from '$lib/components/DataTable.svelte';
  import Button from '$lib/components/Button.svelte';
  import type { TableColumn, TableOptions } from '$lib/types/table';

  interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: string;
  }

  const columns: TableColumn<Product>[] = [
    {
      name: 'name',
      title: 'Product Name',
      sortable: true,
      searchable: true
    },
    {
      name: 'category',
      title: 'Category',
      type: 'badge',
      sortable: true
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      align: 'right',
      sortable: true,
      formatter: (value) => `$${value.toFixed(2)}`
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
      align: 'center',
      sortable: true,
      cellClass: (value) => {
        if (value === 0) return 'text-red-600 dark:text-red-400 font-semibold';
        if (value < 10) return 'text-yellow-600 dark:text-yellow-400 font-semibold';
        return 'text-green-600 dark:text-green-400 font-semibold';
      }
    },
    {
      name: 'status',
      title: 'Status',
      type: 'badge',
      sortable: true,
      badgeVariant: (value) => {
        if (value === 'published') return 'success';
        if (value === 'draft') return 'warning';
        return 'danger';
      }
    }
  ];

  const options: TableOptions<Product> = {
    selectable: true,
    serverSide: true,
    ajax: {
      url: '/api/products',
      method: 'GET',
      dataPath: 'data',
      totalPath: 'total',
      // Transform response if needed
      transform: (response) => response
    },
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
      perPageOptions: [10, 25, 50]
    },
    searchable: true,
    columnVisibility: true,
    exportable: true,
    rowActions: [
      {
        label: 'Edit',
        icon: '✏️',
        href: (row) => `/admin/products/${row.id}/edit`
      },
      {
        label: 'Delete',
        icon: '🗑️',
        variant: 'ghost',
        onClick: (row) => console.log('Delete', row)
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
        onClick: (rows) => console.log('Delete', rows)
      }
    ],
    onSort: (column, direction) => {
      console.log('Sort:', column, direction);
    },
    onPageChange: (page) => {
      console.log('Page:', page);
    },
    onSearch: (query) => {
      console.log('Search:', query);
    }
  };
</script>

<PageHeader title="Products" description="Manage your products">
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

<DataTable {columns} {options} />