import type { TableColumn, TableState, SortDirection } from '$lib/types/table';

export function createTableStore<T = any>(initialColumns: TableColumn<T>[]) {
  let state = $state<TableState>({
    sortColumn: null,
    sortDirection: null,
    currentPage: 1,
    perPage: 10,
    searchQuery: '',
    filters: {},
    selectedRows: new Set(),
    columnWidths: {},
    visibleColumns: new Set(initialColumns.filter(col => col.visible !== false).map(col => col.name))
  });

  return {
    get state() { return state; },
    
    setSort(column: string | null, direction: SortDirection) {
      state.sortColumn = column;
      state.sortDirection = direction;
    },
    
    setPage(page: number) {
      state.currentPage = page;
    },
    
    setPerPage(perPage: number) {
      state.perPage = perPage;
      state.currentPage = 1; // Reset to first page
    },
    
    setSearch(query: string) {
      state.searchQuery = query;
      state.currentPage = 1; // Reset to first page
    },
    
    setFilter(name: string, value: any) {
      state.filters[name] = value;
      state.currentPage = 1; // Reset to first page
    },
    
    clearFilters() {
      state.filters = {};
      state.searchQuery = '';
      state.currentPage = 1;
    },
    
    toggleRowSelection(key: any) {
      if (state.selectedRows.has(key)) {
        state.selectedRows.delete(key);
      } else {
        state.selectedRows.add(key);
      }
      state.selectedRows = new Set(state.selectedRows); // Trigger reactivity
    },
    
    selectAll(keys: any[]) {
      state.selectedRows = new Set(keys);
    },
    
    clearSelection() {
      state.selectedRows.clear();
      state.selectedRows = new Set(state.selectedRows);
    },
    
    setColumnWidth(column: string, width: number) {
      state.columnWidths[column] = width;
    },
    
    toggleColumnVisibility(column: string) {
      if (state.visibleColumns.has(column)) {
        state.visibleColumns.delete(column);
      } else {
        state.visibleColumns.add(column);
      }
      state.visibleColumns = new Set(state.visibleColumns);
    },
    
    isColumnVisible(column: string) {
      return state.visibleColumns.has(column);
    }
  };
}