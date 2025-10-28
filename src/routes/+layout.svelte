<script lang="ts">
  import { onMount } from 'svelte';
  import { layoutStore } from '$lib/stores/layout.svelte';
  import '../app.css';

  let { children } = $props();

  // Init theme saat mount
  onMount(() => {
    layoutStore.initTheme();
  });
</script>

<svelte:head>
  <title>Admin Panel</title>
</svelte:head>

{@render children()}