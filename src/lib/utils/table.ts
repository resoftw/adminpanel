import type { TableColumn, SortDirection } from '$lib/types/table';

export function sortData<T>(data: T[], column: string, direction: SortDirection): T[] {
  if (!direction) return data;
  
  return [...data].sort((a: any, b: any) => {
    const aVal = a[column];
    const bVal = b[column];
    
    if (aVal === bVal) return 0;
    
    let comparison = 0;
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      comparison = aVal - bVal;
    } else if (aVal instanceof Date && bVal instanceof Date) {
      comparison = aVal.getTime() - bVal.getTime();
    } else {
      comparison = String(aVal).localeCompare(String(bVal));
    }
    
    return direction === 'asc' ? comparison : -comparison;
  });
}

export function filterData<T>(
  data: T[],
  columns: TableColumn<T>[],
  searchQuery: string,
  filters: Record<string, any>
): T[] {
  let filtered = data;
  
  // Apply search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    const searchableColumns = columns.filter(col => col.searchable !== false);
    
    filtered = filtered.filter(row => {
      return searchableColumns.some(col => {
        const value = (row as any)[col.name];
        return String(value).toLowerCase().includes(query);
      });
    });
  }
  
  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      filtered = filtered.filter(row => {
        const rowValue = (row as any)[key];
        if (Array.isArray(value)) {
          return value.includes(rowValue);
        }
        return rowValue === value || String(rowValue).includes(String(value));
      });
    }
  });
  
  return filtered;
}

export function paginateData<T>(data: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return data.slice(start, end);
}

export function formatValue(value: any, column: TableColumn): string {
  if (column.formatter) {
    return String(column.formatter(value, {} as any, column));
  }
  
  switch (column.type) {
    case 'date':
      return value ? new Date(value).toLocaleDateString() : '';
    case 'number':
      return value?.toLocaleString() || '0';
    case 'boolean':
      return value ? 'Yes' : 'No';
    default:
      return String(value || '');
  }
}

export function getCellClass(value: any, row: any, column: TableColumn): string {
  const baseClass = [];
  
  // Alignment
  if (column.align === 'center') baseClass.push('text-center');
  else if (column.align === 'right') baseClass.push('text-right');
  else baseClass.push('text-left');
  
  // Custom class
  if (column.cellClass) {
    baseClass.push(column.cellClass(value, row, column));
  }
  
  return baseClass.join(' ');
}

export async function fetchTableData(ajax: any): Promise<{ data: any[]; total: number }> {
  const { url, method = 'GET', params = {}, headers = {}, dataPath, totalPath } = ajax;
  
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = method === 'GET' && queryString ? `${url}?${queryString}` : url;
  
  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: method === 'POST' ? JSON.stringify(params) : undefined
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  let result = await response.json();
  
  // Apply transform if provided
  if (ajax.transform) {
    result = ajax.transform(result);
  }
  
  // Extract data and total from response
  const data = dataPath ? getNestedValue(result, dataPath) : result.data || result;
  const total = totalPath ? getNestedValue(result, totalPath) : result.total || data.length;
  
  return { data, total };
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((curr, key) => curr?.[key], obj);
}