<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import type { TableColumn, TableOptions, RowAction, BulkAction } from '$lib/types/table';
  import { createTableStore } from '$lib/stores/table.svelte';
  import { sortData, filterData, paginateData, formatValue, getCellClass, fetchTableData } from '$lib/utils/table';
  import Button from './Button.svelte';
  import TableHeader from './table/TableHeader.svelte';
  import TableRow from './table/TableRow.svelte';
  import TablePagination from './table/TablePagination.svelte';
  import TableToolbar from './table/TableToolbar.svelte';
  import { onMount } from 'svelte';

  interface Props {
    columns: TableColumn<T>[];
    data?: T[];
    options?: TableOptions<T>;
    loading?: boolean;
    customCell?: Snippet<[{ value: any; row: T; column: TableColumn<T> }]>;
  }

  let {
    columns,
    data = $bindable([]),
    options = {},
    loading = $bindable(false),
    customCell
  }: Props = $props();

  // Create table store
  const store = createTableStore<T>(columns);

  // Merge default options
  const opts = $derived({
    selectable: false,
    selectKey: 'id',
    pagination: true,
    searchable: true,
    searchPlaceholder: 'Search...',
    columnVisibility: true,
    striped: true,
    hoverable: true,
    compact: false,
    emptyText: 'No data available',
    loadingText: 'Loading...',
    ...options
  } as Required<TableOptions<T>>);

  // Pagination config
  let paginationConfig = $derived(
    typeof opts.pagination === 'object' 
      ? opts.pagination 
      : { page: 1, perPage: 10, total: 0, perPageOptions: [10, 25, 50, 100] }
  );

  // Internal data - TIDAK pakai $state di sini karena akan di-update di $effect
  let internalData = $state<T[]>([]);
  let totalRecords = $state(0);
  let isLoading = $state(false);

  // Visible columns
  let visibleColumns = $derived(
    columns.filter(col => store.state.visibleColumns.has(col.name))
  );

  // Computed data (filtered, sorted, paginated)
  let processedData = $derived.by(() => {
    if (opts.serverSide) {
      return internalData; // Server handles everything
    }

    let result = [...internalData]; // Create copy to avoid mutation

    // Filter
    result = filterData(result, columns, store.state.searchQuery, store.state.filters);
    
    // Sort
    if (store.state.sortColumn && store.state.sortDirection) {
      result = sortData(result, store.state.sortColumn, store.state.sortDirection);
    }

    // Paginate
    if (opts.pagination) {
      result = paginateData(result, store.state.currentPage, store.state.perPage);
    }

    return result;
  });

  // Total records - computed separately
  let computedTotal = $derived.by(() => {
    if (opts.serverSide) {
      return totalRecords;
    }

    let result = [...internalData];
    result = filterData(result, columns, store.state.searchQuery, store.state.filters);
    return result.length;
  });

  // All selected
  let allSelected = $derived(
    processedData.length > 0 &&
    processedData.every(row => store.state.selectedRows.has((row as any)[opts.selectKey]))
  );

  // Some selected (indeterminate)
  let someSelected = $derived(
    !allSelected &&
    processedData.some(row => store.state.selectedRows.has((row as any)[opts.selectKey]))
  );

  // Selected rows array
  let selectedRowsArray = $derived(
    internalData.filter(row => store.state.selectedRows.has((row as any)[opts.selectKey]))
  );

  // Load data
  async function loadData() {
    if (opts.ajax) {
      isLoading = true;
      loading = true;
      
      try {
        const params: any = {};
        
        if (opts.serverSide) {
          params.page = store.state.currentPage;
          params.perPage = store.state.perPage;
          params.search = store.state.searchQuery;
          params.sortBy = store.state.sortColumn;
          params.sortDir = store.state.sortDirection;
          params.filters = store.state.filters;
        }
        
        const ajaxParams = { ...opts.ajax.params, ...params };
        const result = await fetchTableData({ ...opts.ajax, params: ajaxParams });
        
        internalData = result.data;
        totalRecords = result.total;
      } catch (error) {
        console.error('Failed to load table data:', error);
        internalData = [];
        totalRecords = 0;
      } finally {
        isLoading = false;
        loading = false;
      }
    } else {
      internalData = data || [];
      totalRecords = internalData.length;
    }
  }

  // Handlers
  function handleSort(column: TableColumn<T>) {
    if (!column.sortable) return;
    
    let direction: 'asc' | 'desc' | null = 'asc';
    
    if (store.state.sortColumn === column.name) {
      if (store.state.sortDirection === 'asc') direction = 'desc';
      else if (store.state.sortDirection === 'desc') direction = null;
    }
    
    store.setSort(direction ? column.name : null, direction);
    
    if (opts.onSort) {
      opts.onSort(column.name, direction);
    }
    
    if (opts.serverSide) {
      loadData();
    }
  }

  function handleSelectAll() {
    if (allSelected) {
      store.clearSelection();
    } else {
      const keys = processedData.map(row => (row as any)[opts.selectKey]);
      store.selectAll(keys);
    }
    
    if (opts.onSelectionChange) {
      opts.onSelectionChange(selectedRowsArray);
    }
  }

  function handleRowSelect(row: T) {
    const key = (row as any)[opts.selectKey];
    store.toggleRowSelection(key);
    
    if (opts.onSelectionChange) {
      opts.onSelectionChange(selectedRowsArray);
    }
  }

  function handleSearch(query: string) {
    store.setSearch(query);
    
    if (opts.onSearch) {
      opts.onSearch(query);
    }
    
    if (opts.serverSide) {
      loadData();
    }
  }

  function handleFilter(name: string, value: any) {
    store.setFilter(name, value);
    
    if (opts.onFilter) {
      opts.onFilter(store.state.filters);
    }
    
    if (opts.serverSide) {
      loadData();
    }
  }
  function handleColumnResize(columnName: string, width: number) {
    store.setColumnWidth(columnName, width);
  }
  function handlePageChange(page: number) {
    store.setPage(page);
    
    if (opts.onPageChange) {
      opts.onPageChange(page);
    }
    
    if (opts.serverSide) {
      loadData();
    }
  }

  function handlePerPageChange(perPage: number) {
    store.setPerPage(perPage);
    
    if (opts.onPerPageChange) {
      opts.onPerPageChange(perPage);
    }
    
    if (opts.serverSide) {
      loadData();
    }
  }

  function handleBulkAction(action: BulkAction<T>) {
    action.onClick(selectedRowsArray);
  }

  function handleClearFilters() {
    store.clearFilters();
    
    if (opts.serverSide) {
      loadData();
    }
  }

  function handleExport() {
    // Export to CSV
    const csvData = processedData.map(row => {
      const rowData: any = {};
      visibleColumns.forEach(col => {
        rowData[col.title] = formatValue((row as any)[col.name], col);
      });
      return rowData;
    });
    
    const csv = convertToCSV(csvData);
    downloadCSV(csv, 'table-export.csv');
  }

  function convertToCSV(data: any[]): string {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => 
      headers.map(header => `"${row[header]}"`).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  }

  function downloadCSV(csv: string, filename: string) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Watch data changes - Gunakan $effect untuk side effects
  $effect(() => {
    if (!opts.ajax) {
      internalData = data || [];
    }
  });

  // Load data on mount
  onMount(() => {
    loadData();
  });

  // Refresh function
  export function refresh() {
    loadData();
  }

  export function clearSelection() {
    store.clearSelection();
  }

  export function getSelectedRows() {
    return selectedRowsArray;
  }
</script>

<div class="w-full">
  <!-- Toolbar -->
  <TableToolbar
    {columns}
    filters={opts.filters || []}
    searchable={opts.searchable}
    searchPlaceholder={opts.searchPlaceholder}
    searchQuery={store.state.searchQuery}
    columnVisibility={opts.columnVisibility}
    exportable={opts.exportable}
    bulkActions={opts.bulkActions}
    selectedCount={selectedRowsArray.length}
    visibleColumns={store.state.visibleColumns}
    onSearch={handleSearch}
    onFilter={handleFilter}
    onClearFilters={handleClearFilters}
    onToggleColumn={(col) => store.toggleColumnVisibility(col)}
    onExport={handleExport}
    onBulkAction={handleBulkAction}
  />

  <!-- Table Container -->
  <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <!-- Header dengan resize support -->
        <TableHeader
          columns={visibleColumns}
          selectable={opts.selectable}
          {allSelected}
          {someSelected}
          sortColumn={store.state.sortColumn}
          sortDirection={store.state.sortDirection}
          columnWidths={store.state.columnWidths}
          onSort={handleSort}
          onSelectAll={handleSelectAll}
          onColumnResize={handleColumnResize}
        />

        <!-- Body -->
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          {#if isLoading || loading}
            <tr>
              <td colspan={visibleColumns.length + (opts.selectable ? 1 : 0) + (opts.rowActions?.length ? 1 : 0)} 
                  class="px-4 py-8 text-center">
                <div class="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                  <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p>{opts.loadingText}</p>
                </div>
              </td>
            </tr>
          {:else if processedData.length === 0}
            <tr>
              <td colspan={visibleColumns.length + (opts.selectable ? 1 : 0) + (opts.rowActions?.length ? 1 : 0)} 
                  class="px-4 py-8 text-center">
                <div class="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                  <span class="text-4xl">📋</span>
                  <p>{opts.emptyText}</p>
                  {#if store.state.searchQuery || Object.keys(store.state.filters).length > 0}
                    <Button variant="ghost" size="sm" onclick={handleClearFilters}>
                      Clear filters
                    </Button>
                  {/if}
                </div>
              </td>
            </tr>
          {:else}
            {#each processedData as row, i}
              <TableRow
                {row}
                {columns}
                visibleColumns={visibleColumns}
                selectable={opts.selectable}
                selected={store.state.selectedRows.has((row as any)[opts.selectKey])}
                rowActions={opts.rowActions}
                striped={opts.striped && i % 2 === 1}
                hoverable={opts.hoverable}
                compact={opts.compact}
                onSelect={() => handleRowSelect(row)}
                {customCell}
              />
            {/each}
          {/if}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    {#if opts.pagination && !isLoading && processedData.length > 0}
      <TablePagination
        currentPage={store.state.currentPage}
        perPage={store.state.perPage}
        total={computedTotal}
        perPageOptions={paginationConfig.perPageOptions || [10, 25, 50, 100]}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    {/if}
  </div>
</div>