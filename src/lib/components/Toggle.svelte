<script lang="ts">
  interface Props {
    checked: boolean;
    onchange?: (value: boolean) => void;
    disabled?: boolean;
  }

  let { checked = $bindable(false), onchange, disabled = false }: Props = $props();

  function handleToggle() {
    if (disabled) return;
    checked = !checked;
    onchange?.(checked);
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  {disabled}
  onclick={handleToggle}
  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed
    {checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}"
>
  <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform
    {checked ? 'translate-x-6' : 'translate-x-1'}">
  </span>
</button>