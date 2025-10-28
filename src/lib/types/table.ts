export type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'avatar' | 'custom';
export type ColumnAlign = 'left' | 'center' | 'right';
export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T = any> {
  name: string;
  title: string;
  type?: ColumnType;
  width?: string;
  minWidth?: string;
  align?: ColumnAlign;
  sortable?: boolean;
  searchable?: boolean;
  resizable?: boolean;
  visible?: boolean;
  formatter?: (value: any, row: T, column: TableColumn<T>) => string | number;
  style?: (value: any, row: T, column: TableColumn<T>) => string;
  cellClass?: (value: any, row: T, column: TableColumn<T>) => string;
  render?: (value: any, row: T, column: TableColumn<T>) => any; // For custom Svelte snippets
  badgeVariant?: (value: any, row: T) => 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

export interface RowAction<T = any> {
  label: string;
  icon?: string;
  variant?: 'ghost' | 'primary' | 'secondary' | 'danger';
  onClick: (row: T) => void;
  show?: (row: T) => boolean;
  href?: (row: T) => string;
}

export interface BulkAction<T = any> {
  label: string;
  icon?: string;
  variant?: 'ghost' | 'primary' | 'secondary' | 'danger';
  onClick: (selectedRows: T[]) => void;
}

export interface TableFilter {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'daterange';
  options?: { label: string; value: string }[];
  placeholder?: string;
}

export interface AjaxConfig {
  url: string;
  method?: 'GET' | 'POST';
  params?: Record<string, any>;
  headers?: Record<string, string>;
  dataPath?: string; // Path to data in response (e.g., 'data.items')
  totalPath?: string; // Path to total count (e.g., 'data.total')
  transform?: (response: any) => any;
}

export interface PaginationConfig {
  page: number;
  perPage: number;
  total: number;
  perPageOptions?: number[];
}

export interface TableOptions<T = any> {
  // Selection
  selectable?: boolean;
  selectKey?: string; // Unique key for selection (default: 'id')
  
  // Actions
  rowActions?: RowAction<T>[];
  bulkActions?: BulkAction<T>[];
  
  // Data source
  ajax?: AjaxConfig;
  
  // Pagination
  pagination?: boolean | PaginationConfig;
  serverSide?: boolean; // Server-side pagination/sorting
  
  // Filters
  filters?: TableFilter[];
  searchable?: boolean;
  searchPlaceholder?: string;
  
  // Features
  columnVisibility?: boolean;
  exportable?: boolean;
  
  // Styling
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  
  // Loading
  loading?: boolean;
  loadingText?: string;
  
  // Empty state
  emptyText?: string;
  
  // Callbacks
  onSort?: (column: string, direction: SortDirection) => void;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, any>) => void;
  onSelectionChange?: (selectedRows: T[]) => void;
}

export interface TableState {
  sortColumn: string | null;
  sortDirection: SortDirection;
  currentPage: number;
  perPage: number;
  searchQuery: string;
  filters: Record<string, any>;
  selectedRows: Set<any>;
  columnWidths: Record<string, number>;
  visibleColumns: Set<string>;
}