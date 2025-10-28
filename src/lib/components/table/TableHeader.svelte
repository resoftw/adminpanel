<script lang="ts">
  import type { TableColumn, SortDirection } from '$lib/types/table';
  import ResizableHeader from './ResizableHeader.svelte';

  interface Props {
    columns: TableColumn[];
    selectable: boolean;
    allSelected: boolean;
    someSelected: boolean;
    sortColumn: string | null;
    sortDirection: SortDirection;
    columnWidths?: Record<string, number>; // Tambahan
    onSort: (column: TableColumn) => void;
    onSelectAll: () => void;
    onColumnResize?: (column: string, width: number) => void; // Tambahan
  }

  let {
    columns,
    selectable,
    allSelected,
    someSelected,
    sortColumn,
    sortDirection,
    columnWidths = {},
    onSort,
    onSelectAll,
    onColumnResize
  }: Props = $props();

  function getColumnWidth(column: TableColumn): string {
    if (columnWidths[column.name]) {
      return `${columnWidths[column.name]}px`;
    }
    return column.width || 'auto';
  }
</script>

<thead class="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
  <tr>
    {#if selectable}
      <th class="px-4 py-2.5 text-left w-12">
        <input
          type="checkbox"
          checked={allSelected}
          indeterminate={someSelected}
          onchange={onSelectAll}
          class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
        />
      </th>
    {/if}

    {#each columns as column}
      <th
        class="px-4 py-2.5 font-semibold text-gray-700 dark:text-gray-300 relative
          {column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
          {column.sortable ? 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-800' : ''}"
        style="width: {getColumnWidth(column)}; min-width: {column.minWidth || '80px'};"
        onclick={() => column.sortable && onSort(column)}
      >
        <div class="flex items-center gap-2 {column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : ''}">
          <span>{column.title}</span>
          {#if column.sortable}
            <span class="text-xs text-gray-400">
              {#if sortColumn === column.name}
                {#if sortDirection === 'asc'}
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"/>
                  </svg>
                {:else if sortDirection === 'desc'}
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"/>
                  </svg>
                {/if}
              {:else}
                <svg class="w-4 h-4 opacity-30" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"/>
                </svg>
              {/if}
            </span>
          {/if}
        </div>

        <!-- Resizable Handle -->
        {#if column.resizable !== false && onColumnResize}
          <ResizableHeader 
            {column} 
            onResize={(width) => onColumnResize(column.name, width)} 
          />
        {/if}
      </th>
    {/each}

    <th class="px-4 py-2.5 text-right font-semibold text-gray-700 dark:text-gray-300">
      Actions
    </th>
  </tr>
</thead>