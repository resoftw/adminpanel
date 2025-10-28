<script lang="ts">
  let isOpen = $state(false);
</script>

<div class="fixed bottom-4 left-4 z-40">
  <button
    onclick={() => isOpen = !isOpen}
    class="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
    title="Table Shortcuts"
  >
    <span class="text-xl">⌨️</span>
  </button>

  {#if isOpen}
    <div class="absolute bottom-16 left-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-lg">Keyboard Shortcuts</h3>
          <button onclick={() => isOpen = false} class="text-white/80 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="p-4 max-h-96 overflow-y-auto scrollbar-thin">
        <div class="space-y-4">
          <!-- Resize Shortcuts -->
          <div>
            <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Column Resize</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">Drag border</span>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Mouse</kbd>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">Auto-fit column</span>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Double Click</kbd>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">Adjust ±1px</span>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">← →</kbd>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">Adjust ±10px</span>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Shift + ← →</kbd>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">Cancel resize</span>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Esc</kbd>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">Apply resize</span>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Enter</kbd>
              </div>
            </div>
          </div>

          <!-- General Shortcuts -->
          <div>
            <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">General</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">Focus search</span>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl + F</kbd>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700">Select all</span>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl + A</kbd>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">Export data</span>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl + E</kbd>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Navigation</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">Next page</span>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl + →</kbd>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">Previous page</span>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl + ←</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <p class="text-xs text-gray-600 dark:text-gray-400 text-center">
          Tip: All settings are auto-saved to localStorage
        </p>
      </div>
    </div>
  {/if}
</div>