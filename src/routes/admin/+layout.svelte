<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  import { layoutStore } from '$lib/stores/layout.svelte';

  let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-950">
  <Sidebar />
  <Header />
  
  <main 
    class="pt-14 transition-all duration-300
      {layoutStore.sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}"
  >
    <div class="p-4 max-w-[1600px]">
      {@render children()}
    </div>
  </main>
</div>