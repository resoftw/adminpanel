<script lang="ts">
  import type { MenuItem } from '$lib/types/menu';
  import { layoutStore } from '$lib/stores/layout.svelte';

  interface Props {
    item: MenuItem;
    currentPath: string;
    level?: number;
  }

  let { item, currentPath, level = 0 }: Props = $props();

  let isExpanded = $state(false);
  let isActive = $derived(
    item.href === currentPath || 
    item.children?.some(child => child.href === currentPath) || false
  );

  const badgeColors = {
    primary: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-red-500 text-white',
  };

  function handleClick() {
    if (item.children) {
      isExpanded = !isExpanded;
    } else if (item.href) {
      // Close mobile sidebar when clicking a link
      if (layoutStore.sidebarOpen) {
        layoutStore.toggleMobileSidebar();
      }
    }
  }
</script>

<div>
  {#if item.href && !item.children}
    <!-- Simple Link -->
    <a
      href={item.href}
      onclick={handleClick}
      class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors
        {isActive 
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}"
      style="padding-left: {level * 0.75 + 0.5}rem"
    >
      {#if item.icon}
        <span class="text-base shrink-0">{item.icon}</span>
      {/if}
      
      {#if !layoutStore.sidebarCollapsed}
        <span class="flex-1 truncate">{item.label}</span>
        {#if item.badge}
          <span class="px-1.5 py-0.5 text-xs rounded-full {badgeColors[item.badge.variant]}">
            {item.badge.text}
          </span>
        {/if}
      {/if}
    </a>
  {:else}
    <!-- Parent with Children -->
    <button
      onclick={handleClick}
      class="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors
        {isActive 
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}"
      style="padding-left: {level * 0.75 + 0.5}rem"
    >
      {#if item.icon}
        <span class="text-base shrink-0">{item.icon}</span>
      {/if}
      
      {#if !layoutStore.sidebarCollapsed}
        <span class="flex-1 truncate text-left">{item.label}</span>
        {#if item.badge}
          <span class="px-1.5 py-0.5 text-xs rounded-full {badgeColors[item.badge.variant]}">
            {item.badge.text}
          </span>
        {/if}
        {#if item.children}
          <span class="text-xs transition-transform {isExpanded ? 'rotate-180' : ''}">▼</span>
        {/if}
      {/if}
    </button>

    <!-- Children -->
    {#if item.children && isExpanded && !layoutStore.sidebarCollapsed}
      <div class="mt-0.5 space-y-0.5">
        {#each item.children as child}
          <svelte:self item={child} {currentPath} level={level + 1} />
        {/each}
      </div>
    {/if}
  {/if}
</div>