<script lang="ts">
  import type { TableColumn, TableFilter, BulkAction } from '$lib/types/table';
  import Button from '../Button.svelte';

  interface Props {
    columns: TableColumn[];
    filters: TableFilter[];
    searchable: boolean;
    searchPlaceholder: string;
    searchQuery: string;
    columnVisibility: boolean;
    exportable: boolean;
    bulkActions?: BulkAction[];
    selectedCount: number;
    visibleColumns: Set<string>;
    onSearch: (query: string) => void;
    onFilter: (name: string, value: any) => void;
    onClearFilters: () => void;
    onToggleColumn: (column: string) => void;
    onExport: () => void;
    onBulkAction: (action: BulkAction) => void;
  }

  let {
    columns,
    filters,
    searchable,
    searchPlaceholder,
    searchQuery,
    columnVisibility,
    exportable,
    bulkActions = [],
    selectedCount,
    visibleColumns,
    onSearch,
    onFilter,
    onClearFilters,
    onToggleColumn,
    onExport,
    onBulkAction
  }: Props = $props();

  let showColumnSelector = $state(false);
  let showBulkActions = $state(false);
  let filterValues = $state<Record<string, any>>({});

  let hasActiveFilters = $derived(
    searchQuery !== '' || Object.values(filterValues).some(v => v !== '' && v !== null && v !== undefined)
  );
</script>

<div class="mb-4 space-y-3">
  <!-- Main Toolbar -->
  <div class="flex flex-wrap items-center gap-3">
    <!-- Search -->
    {#if searchable}
      <div class="flex-1 min-w-[200px] max-w-md">
        <div class="relative">
          <input
            type="text"
            value={searchQuery}
            oninput={(e) => onSearch(e.currentTarget.value)}
            placeholder={searchPlaceholder}
            class="w-full px-3 py-2 pl-9 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <svg class="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>
    {/if}

    <div class="flex items-center gap-2 ml-auto">
      <!-- Bulk Actions -->
      {#if bulkActions.length > 0 && selectedCount > 0}
        <div class="relative">
          <Button
            variant="secondary"
            size="sm"
            onclick={() => showBulkActions = !showBulkActions}
          >
            <span>⚡</span>
            Bulk Actions ({selectedCount})
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </Button>

          {#if showBulkActions}
            <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
              {#each bulkActions as action}
                <button
                  onclick={() => {
                    onBulkAction(action);
                    showBulkActions = false;
                  }}
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                >
                  {#if action.icon}<span>{action.icon}</span>{/if}
                  <span>{action.label}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- Column Visibility -->
      {#if columnVisibility}
        <div class="relative">
          <Button
            variant="secondary"
            size="sm"
            onclick={() => showColumnSelector = !showColumnSelector}
          >
            <span>👁️</span>
            Columns
          </Button>

          {#if showColumnSelector}
            <div class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10 max-h-96 overflow-y-auto">
              <div class="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Toggle Columns</p>
              </div>
              {#each columns as column}
                <label class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleColumns.has(column.name)}
                    onchange={() => onToggleColumn(column.name)}
                    class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{column.title}</span>
                </label>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- Export -->
      {#if exportable}
        <Button variant="secondary" size="sm" onclick={onExport}>
          <span>📥</span>
          Export
        </Button>
      {/if}
    </div>
  </div>

  <!-- Filters -->
  {#if filters.length > 0}
    <div class="flex flex-wrap items-center gap-3">
      {#each filters as filter}
        <div class="min-w-[150px]">
          {#if filter.type === 'text'}
            <input
              type="text"
              bind:value={filterValues[filter.name]}
              oninput={() => onFilter(filter.name, filterValues[filter.name])}
              placeholder={filter.placeholder || filter.label}
              class="w-full px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          {:else if filter.type === 'select'}
            <select
              bind:value={filterValues[filter.name]}
              onchange={() => onFilter(filter.name, filterValues[filter.name])}
              class="w-full px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            >
              <option value="">{filter.label}</option>
              {#each filter.options || [] as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          {:else if filter.type === 'date'}
            <input
              type="date"
              bind:value={filterValues[filter.name]}
              onchange={() => onFilter(filter.name, filterValues[filter.name])}
              class="w-full px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          {/if}
        </div>
      {/each}

      {#if hasActiveFilters}
        <Button variant="ghost" size="sm" onclick={onClearFilters}>
          <span>✕</span>
          Clear Filters
        </Button>
      {/if}
    </div>
  {/if}
</div>

<!-- Click outside to close dropdowns -->
<svelte:window 
  onclick={(e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      showColumnSelector = false;
      showBulkActions = false;
    }
  }}
/>