<script lang="ts">
  import { page } from '$app/stores';
  import { layoutStore } from '$lib/stores/layout.svelte';
  import { menuGroups } from '$lib/data/menu';
  import SidebarItem from './SidebarItem.svelte';
  import type { MenuGroup } from '$lib/types/menu';

  let groups = $state<MenuGroup[]>(menuGroups);
</script>

<!-- Overlay untuk mobile -->
{#if layoutStore.sidebarOpen}
  <div 
    class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    onclick={() => layoutStore.toggleMobileSidebar()}
    role="button"
    tabindex="0"
  ></div>
{/if}

<!-- Sidebar -->
<aside 
  class="fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-all duration-300 scrollbar-thin overflow-y-auto
    {layoutStore.sidebarCollapsed ? 'w-16' : 'w-64'}
    {layoutStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}"
>
  <!-- Logo -->
  <div class="h-14 flex items-center justify-between px-3 border-b border-gray-200 dark:border-gray-800">
    {#if !layoutStore.sidebarCollapsed}
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
        <span class="font-semibold text-gray-800 dark:text-white text-sm">Admin Panel</span>
      </div>
    {:else}
      <div class="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto">
        A
      </div>
    {/if}
  </div>

  <!-- Menu Groups -->
  <nav class="p-2">
    {#each groups as group}
      <div class="mb-4">
        {#if !layoutStore.sidebarCollapsed}
          <div class="px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {group.label}
          </div>
        {:else}
          <div class="h-px bg-gray-200 dark:bg-gray-800 my-2"></div>
        {/if}
        
        <div class="space-y-0.5">
          {#each group.items as item}
            <SidebarItem {item} currentPath={$page.url.pathname} />
          {/each}
        </div>
      </div>
    {/each}
  </nav>

  <!-- Toggle Button (Desktop) -->
  <button
    onclick={() => layoutStore.toggleSidebar()}
    class="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white shadow-sm transition-colors"
    title={layoutStore.sidebarCollapsed ? 'Expand' : 'Collapse'}
  >
    <span class="text-xs">{layoutStore.sidebarCollapsed ? '→' : '←'}</span>
  </button>
</aside>