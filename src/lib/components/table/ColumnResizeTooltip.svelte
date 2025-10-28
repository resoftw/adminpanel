<script lang="ts">
  let show = $state(false);
  let hasShown = $state(false);

  // Show tooltip once on first load
  $effect(() => {
    if (typeof window !== 'undefined' && !hasShown) {
      const shown = localStorage.getItem('resize-tooltip-shown');
      if (!shown) {
        setTimeout(() => {
          show = true;
          hasShown = true;
          localStorage.setItem('resize-tooltip-shown', 'true');
          
          // Auto hide after 5 seconds
          setTimeout(() => {
            show = false;
          }, 5000);
        }, 1000);
      }
    }
  });

  function dismiss() {
    show = false;
  }
</script>

{#if show}
  <div class="fixed bottom-4 right-4 z-50 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 animate-slide-up">
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0">
        <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <span class="text-xl">💡</span>
        </div>
      </div>
      
      <div class="flex-1">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Resizable Columns</h3>
        <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Hover column borders to resize</li>
          <li>• Double-click to auto-fit content</li>
          <li>• Use arrow keys while resizing</li>
          <li>• Press Escape to cancel</li>
        </ul>
      </div>
      
      <button 
        onclick={dismiss}
        class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
{/if}

<style>
  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
</style>