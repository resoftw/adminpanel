<script lang="ts">
  import { layoutStore } from '$lib/stores/layout.svelte';

  let showUserMenu = $state(false);
  let showNotifications = $state(false);

  function handleDarkModeToggle() {
    layoutStore.toggleDarkMode();
  }

  function handleMobileMenuToggle() {
    layoutStore.toggleMobileSidebar();
  }
</script>

<header 
  class="fixed top-0 right-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-30 transition-all duration-300
    {layoutStore.sidebarCollapsed ? 'left-16' : 'left-64'}
    max-lg:left-0"
>
  <div class="h-full px-4 flex items-center justify-between gap-4">
    <!-- Left Section -->
    <div class="flex items-center gap-3">
      <!-- Mobile Menu Toggle -->
      <button
        onclick={handleMobileMenuToggle}
        class="lg:hidden p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-600 dark:text-gray-400"
        type="button"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Search -->
      <div class="hidden md:flex items-center">
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="w-64 px-3 py-1.5 pl-9 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <svg class="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-2">
      <!-- Dark Mode Toggle -->
      <button
        onclick={handleDarkModeToggle}
        type="button"
        class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-600 dark:text-gray-400 transition-colors"
        title={layoutStore.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {#if layoutStore.darkMode}
          <!-- Sun Icon (Light Mode) -->
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        {:else}
          <!-- Moon Icon (Dark Mode) -->
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {/if}
      </button>

      <!-- Notifications -->
      <div class="relative">
        <button
          onclick={() => showNotifications = !showNotifications}
          type="button"
          class="relative p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-600 dark:text-gray-400"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {#if showNotifications}
          <div class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
            <div class="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
              <h3 class="font-semibold text-sm text-gray-800 dark:text-white">Notifications</h3>
            </div>
            <div class="max-h-96 overflow-y-auto scrollbar-thin">
              {#each Array(5) as _, i}
                <a href="/admin/notifications" class="flex gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                  <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                    <span class="text-sm">📧</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-800 dark:text-white truncate">New message received</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                  </div>
                </a>
              {/each}
            </div>
            <div class="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
              <a href="/admin/notifications" class="text-xs text-blue-600 dark:text-blue-400 hover:underline">View all</a>
            </div>
          </div>
        {/if}
      </div>

      <!-- User Menu -->
      <div class="relative">
        <button
          onclick={() => showUserMenu = !showUserMenu}
          type="button"
          class="flex items-center gap-2 p-1 pr-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff"
            alt="User"
            class="w-7 h-7 rounded-full"
          />
          <span class="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</span>
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {#if showUserMenu}
          <div class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
            <div class="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
              <p class="text-sm font-medium text-gray-800 dark:text-white">John Doe</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
            </div>
            <a href="/admin/profile" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <span>👤</span> Profile
            </a>
            <a href="/admin/settings" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <span>⚙️</span> Settings
            </a>
            <hr class="my-1 border-gray-200 dark:border-gray-700" />
            <button type="button" class="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <span>🚪</span> Logout
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</header>

<!-- Click outside to close dropdowns -->
<svelte:window 
  onclick={(e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button') && !target.closest('[role="menu"]')) {
      showUserMenu = false;
      showNotifications = false;
    }
  }}
/>