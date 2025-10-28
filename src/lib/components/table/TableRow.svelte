<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { TableColumn, RowAction } from '$lib/types/table';
  import { formatValue, getCellClass } from '$lib/utils/table';
  import Button from '../Button.svelte';

  interface Props {
    row: any;
    columns: TableColumn[];
    visibleColumns: TableColumn[];
    selectable: boolean;
    selected: boolean;
    rowActions?: RowAction[];
    striped: boolean;
    hoverable: boolean;
    compact: boolean;
    onSelect: () => void;
    customCell?: Snippet<[{ value: any; row: any; column: TableColumn }]>;
  }

  let {
    row,
    columns,
    visibleColumns,
    selectable,
    selected,
    rowActions = [],
    striped,
    hoverable,
    compact,
    onSelect,
    customCell
  }: Props = $props();

  const badgeVariants = {
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  };
</script>

<tr class="
  {striped ? 'bg-gray-50/50 dark:bg-gray-800/30' : ''}
  {hoverable ? 'hover:bg-gray-50 dark:hover:bg-gray-800/50' : ''}
  {selected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
  transition-colors
">
  {#if selectable}
    <td class="px-4 {compact ? 'py-1.5' : 'py-2.5'}">
      <input
        type="checkbox"
        checked={selected}
        onchange={onSelect}
        class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
      />
    </td>
  {/if}

  {#each visibleColumns as column}
    {@const value = row[column.name]}
    {@const cellStyle = column.style ? column.style(value, row, column) : ''}
    {@const cellClass = getCellClass(value, row, column)}
    
    <td 
      class="px-4 {compact ? 'py-1.5' : 'py-2.5'} {cellClass}"
      style={cellStyle}
    >
      {#if column.render && customCell}
        {@render customCell({ value, row, column })}
      {:else if column.type === 'avatar'}
        <div class="flex items-center gap-2">
          <img 
            src={value} 
            alt="" 
            class="w-8 h-8 rounded-full object-cover"
          />
          {#if row[column.name + '_name']}
            <span class="font-medium text-gray-900 dark:text-white">{row[column.name + '_name']}</span>
          {/if}
        </div>
      {:else if column.type === 'badge'}
        {@const variant = column.badgeVariant ? column.badgeVariant(value, row) : 'info'}
        <span class="px-2 py-0.5 text-xs font-medium rounded-full {badgeVariants[variant]}">
          {formatValue(value, column)}
        </span>
      {:else if column.type === 'boolean'}
        <span class="flex {column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : ''}">
          {#if value}
            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          {:else}
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
          {/if}
        </span>
      {:else if column.formatter}
        <span class="text-gray-900 dark:text-white">
          {column.formatter(value, row, column)}
        </span>
      {:else}
        <span class="text-gray-900 dark:text-white">
          {formatValue(value, column)}
        </span>
      {/if}
    </td>
  {/each}

  <td class="px-4 {compact ? 'py-1.5' : 'py-2.5'}">
    <div class="flex items-center justify-end gap-1">
      {#each rowActions as action}
        {#if !action.show || action.show(row)}
          {#if action.href}
            <Button 
              variant={action.variant || 'ghost'} 
              size="sm" 
              href={action.href(row)}
            >
              {#if action.icon}<span>{action.icon}</span>{/if}
              <span>{action.label}</span>
            </Button>
          {:else}
            <Button 
              variant={action.variant || 'ghost'} 
              size="sm" 
              onclick={() => action.onClick(row)}
            >
              {#if action.icon}<span>{action.icon}</span>{/if}
              <span>{action.label}</span>
            </Button>
          {/if}
        {/if}
      {/each}
    </div>
  </td>
</tr>