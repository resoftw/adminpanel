<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Card from '$lib/components/Card.svelte';
  import Button from '$lib/components/Button.svelte';

  let siteName = $state('My Admin Panel');
  let siteEmail = $state('admin@example.com');
  let enableNotifications = $state(true);
  let enableAnalytics = $state(false);
  let maintenanceMode = $state(false);
</script>

<PageHeader 
  title="Settings" 
  description="Manage your application settings"
/>

<div class="max-w-3xl space-y-4">
  <!-- General Settings -->
  <Card title="General Settings" padding="md">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Site Name
        </label>
        <input
          type="text"
          bind:value={siteName}
          class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Contact Email
        </label>
        <input
          type="email"
          bind:value={siteEmail}
          class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Description
        </label>
        <textarea
          rows="3"
          class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
          placeholder="Enter site description..."
        ></textarea>
      </div>
    </div>
  </Card>

  <!-- Preferences -->
  <Card title="Preferences" padding="md">
    <div class="space-y-3">
      <label class="flex items-center justify-between py-2 cursor-pointer">
        <div>
          <p class="text-sm font-medium text-gray-900 dark:text-white">Enable Notifications</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">Receive email notifications for important events</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enableNotifications}
          onclick={() => enableNotifications = !enableNotifications}
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
            {enableNotifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}"
        >
          <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            {enableNotifications ? 'translate-x-6' : 'translate-x-1'}">
          </span>
        </button>
      </label>

      <label class="flex items-center justify-between py-2 border-t border-gray-200 dark:border-gray-700 cursor-pointer">
        <div>
          <p class="text-sm font-medium text-gray-900 dark:text-white">Analytics Tracking</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">Enable analytics to track visitor data</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enableAnalytics}
          onclick={() => enableAnalytics = !enableAnalytics}
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
            {enableAnalytics ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}"
        >
          <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            {enableAnalytics ? 'translate-x-6' : 'translate-x-1'}">
          </span>
        </button>
      </label>

      <label class="flex items-center justify-between py-2 border-t border-gray-200 dark:border-gray-700 cursor-pointer">
        <div>
          <p class="text-sm font-medium text-gray-900 dark:text-white">Maintenance Mode</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">Put site in maintenance mode</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={maintenanceMode}
          onclick={() => maintenanceMode = !maintenanceMode}
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
            {maintenanceMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}"
        >
          <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            {maintenanceMode ? 'translate-x-6' : 'translate-x-1'}">
          </span>
        </button>
      </label>
    </div>
  </Card>

  <!-- Security -->
  <Card title="Security" padding="md">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Current Password
        </label>
        <input
          type="password"
          class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          New Password
        </label>
        <input
          type="password"
          class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Confirm New Password
        </label>
        <input
          type="password"
          class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  </Card>

  <!-- Actions -->
  <div class="flex items-center justify-between">
    <Button variant="danger" size="md">
      Delete Account
    </Button>
    <div class="flex gap-2">
      <Button variant="ghost" size="md">
        Cancel
      </Button>
      <Button size="md">
        Save Changes
      </Button>
    </div>
  </div>
</div>