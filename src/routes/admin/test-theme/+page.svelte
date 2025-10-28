<script lang="ts">
  import { browser } from '$app/environment';
  import { layoutStore } from '$lib/stores/layout.svelte';
  import Button from '$lib/components/Button.svelte';
  
  let manualDark = $state(false);
  let htmlClass = $state('');
  
  function testToggle() {
    layoutStore.toggleDarkMode();
    updateHtmlClass();
  }
  
  function manualToggle() {
    if (!browser) return;
    
    manualDark = !manualDark;
    if (manualDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateHtmlClass();
  }
  
  function updateHtmlClass() {
    if (browser) {
      htmlClass = document.documentElement.className;
    }
  }
  
  $effect(() => {
    if (browser) {
      updateHtmlClass();
    }
  });
</script>

<div class="p-8 space-y-4">
  <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Theme Test Page</h1>
  
  <div class="space-y-2">
    <p class="text-gray-700 dark:text-gray-300">Store Dark Mode: {layoutStore.darkMode}</p>
    <p class="text-gray-700 dark:text-gray-300">Manual Dark: {manualDark}</p>
    <p class="text-gray-700 dark:text-gray-300">HTML Class: {htmlClass || 'loading...'}</p>
    <p class="text-gray-700 dark:text-gray-300">Browser: {browser ? 'Yes' : 'No (SSR)'}</p>
  </div>
  
  <div class="flex gap-2">
    <Button onclick={testToggle}>
      Toggle via Store
    </Button>
    
    <Button variant="secondary" onclick={manualToggle}>
      Manual Toggle
    </Button>
  </div>
  
  <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
    <p class="text-gray-900 dark:text-white font-medium">Background Test</p>
    <p class="text-gray-600 dark:text-gray-400 text-sm">This should change color when toggling dark mode</p>
  </div>
  
  <div class="grid grid-cols-2 gap-4">
    <div class="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <p class="text-gray-900 dark:text-white">Card 1</p>
    </div>
    <div class="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <p class="text-gray-900 dark:text-white">Card 2</p>
    </div>
  </div>
  
  <div class="mt-8">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">LocalStorage Info</h2>
    <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
      {#if browser}
        <p class="text-gray-700 dark:text-gray-300">theme: {localStorage.getItem('theme') || 'not set'}</p>
      {:else}
        <p class="text-gray-500">SSR - localStorage not available</p>
      {/if}
    </div>
  </div>
</div>