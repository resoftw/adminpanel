<script lang="ts">
  import Button from '../Button.svelte';

  interface Props {
    currentPage: number;
    perPage: number;
    total: number;
    perPageOptions: number[];
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
  }

  let {
    currentPage,
    perPage,
    total,
    perPageOptions,
    onPageChange,
    onPerPageChange
  }: Props = $props();

  let totalPages = $derived(Math.ceil(total / perPage));
  let startRecord = $derived((currentPage - 1) * perPage + 1);
  let endRecord = $derived(Math.min(currentPage * perPage, total));

  let visiblePages = $derived.by(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  });

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  }

  function changePerPage(newPerPage: number) {
    onPerPageChange(newPerPage);
  }
</script>

<div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3">
  <!-- Info & Per Page -->
  <div class="flex items-center gap-4">
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Showing <span class="font-medium">{startRecord}</span> to <span class="font-medium">{endRecord}</span> of <span class="font-medium">{total}</span> results
    </p>

    <div class="flex items-center gap-2">
      <label class="text-sm text-gray-600 dark:text-gray-400">Show</label>
      <select
        value={perPage}
        onchange={(e) => changePerPage(Number(e.currentTarget.value))}
        class="px-2 py-1 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
      >
        {#each perPageOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Pagination -->
  <div class="flex items-center gap-1">
    <Button 
      variant="ghost" 
      size="sm" 
      disabled={currentPage === 1}
      onclick={() => goToPage(currentPage - 1)}
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Previous
    </Button>

    {#each visiblePages as page}
      {#if page === '...'}
        <span class="px-2 py-1 text-gray-500">...</span>
      {:else}
        <Button
          variant={page === currentPage ? 'primary' : 'ghost'}
          size="sm"
          onclick={() => goToPage(page as number)}
        >
          {page}
        </Button>
      {/if}
    {/each}

    <Button 
      variant="ghost" 
      size="sm" 
      disabled={currentPage === totalPages}
      onclick={() => goToPage(currentPage + 1)}
    >
      Next
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </Button>
  </div>
</div>