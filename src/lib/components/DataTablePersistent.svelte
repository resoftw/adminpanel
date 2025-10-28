<script lang="ts" generics="T">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import DataTable from './DataTable.svelte';
  import type { TableColumn, TableOptions } from '$lib/types/table';
  import type { Snippet } from 'svelte';

  interface Props {
    columns: TableColumn<T>[];
    data?: T[];
    options?: TableOptions<T>;
    storageKey: string; // Unique key untuk localStorage
    loading?: boolean;
    customCell?: Snippet<[{ value: any; row: T; column: TableColumn<T> }]>;
  }

  let {
    columns,
    data = $bindable([]),
    options = {},
    storageKey,
    loading = $bindable(false),
    customCell
  }: Props = $props();

  let tableRef: any;
  let savedSettings = $state<{
    columnWidths?: Record<string, number>;
    visibleColumns?: string[];
    perPage?: number;
  }>({});

  // Load settings dari localStorage
  onMount(() => {
    if (browser) {
      const saved = localStorage.getItem(`table-${storageKey}`);
      if (saved) {
        try {
          savedSettings = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to load table settings:', e);
        }
      }
    }
  });

  // Apply saved settings ke columns
  let enhancedColumns = $derived(
    columns.map(col => {
      const width = savedSettings.columnWidths?.[col.name];
      const visible = savedSettings.visibleColumns 
        ? savedSettings.visibleColumns.includes(col.name)
        : col.visible !== false;

      return {
        ...col,
        width: width ? `${width}px` : col.width,
        visible
      };
    })
  );

  // Enhanced options dengan saved settings
  let enhancedOptions = $derived({
    ...options,
    pagination: typeof options.pagination === 'object' 
      ? { ...options.pagination, perPage: savedSettings.perPage || options.pagination.perPage }
      : options.pagination
  } as TableOptions<T>);

  // Auto-save ketika settings berubah
  function handleSettingsChange() {
    if (browser && tableRef?.store) {
      const settings = {
        columnWidths: tableRef.store.state.columnWidths,
        visibleColumns: Array.from(tableRef.store.state.visibleColumns),
        perPage: tableRef.store.state.perPage
      };
      
      localStorage.setItem(`table-${storageKey}`, JSON.stringify(settings));
      savedSettings = settings;
    }
  }

  // Watch for changes
  $effect(() => {
    if (tableRef?.store) {
      // Debounce save
      const timeout = setTimeout(() => {
        handleSettingsChange();
      }, 500);

      return () => clearTimeout(timeout);
    }
  });

  // Public methods
  export function resetSettings() {
    if (browser) {
      localStorage.removeItem(`table-${storageKey}`);
      savedSettings = {};
      window.location.reload();
    }
  }

  export function refresh() {
    tableRef?.refresh();
  }
</script>

<DataTable
  bind:this={tableRef}
  columns={enhancedColumns}
  bind:data
  options={enhancedOptions}
  bind:loading
  {customCell}
/>