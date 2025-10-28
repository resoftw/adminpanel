<script lang="ts">
  interface Props {
    title: string;
    description?: string;
    actions?: any;
  }

  let { title, description, actions }: Props = $props();
</script>

<div class="mb-4">
  <div class="flex items-center justify-between gap-4">
    <div>
      <h1 class="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
      {#if description}
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{description}</p>
      {/if}
    </div>
    {#if actions}
      <div class="flex items-center gap-2">
        {@render actions()}
      </div>
    {/if}
  </div>
</div>