<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
  <div class="max-w-2xl text-center">
    <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6">
      A
    </div>
    
    <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
      Modern Admin Panel
    </h1>
    
    <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
      Built with SvelteKit 5, TypeScript, and Tailwind CSS
    </p>
    
    <div class="flex gap-4 justify-center">
      <Button size="md" href="/admin">
        <span>🚀</span>
        Go to Dashboard
      </Button>
      <Button variant="secondary" size="md" href="https://github.com">
        <span>📚</span>
        Documentation
      </Button>
    </div>

    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="text-3xl mb-3">⚡</div>
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Built with SvelteKit 5 for optimal performance</p>
      </div>
      
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="text-3xl mb-3">🎨</div>
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Customizable</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Easily customize with compact design principles</p>
      </div>
      
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="text-3xl mb-3">🌓</div>
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Dark Mode</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Full dark mode support out of the box</p>
      </div>
    </div>
  </div>
</div>