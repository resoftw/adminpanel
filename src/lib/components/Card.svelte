<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    children: Snippet;
    actions?: Snippet;
    padding?: 'none' | 'sm' | 'md';
  }

  let { title, children, actions, padding = 'md' }: Props = $props();

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4'
  };
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
  {#if title || actions}
    <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      {#if title}
        <h3 class="font-semibold text-gray-900 dark:text-white">{title}</h3>
      {/if}
      {#if actions}
        <div class="flex items-center gap-2">
          {@render actions()}
        </div>
      {/if}
    </div>
  {/if}
  <div class="{paddingClasses[padding]}">
    {@render children()}
  </div>
</div>