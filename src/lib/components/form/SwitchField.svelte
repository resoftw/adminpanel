<script lang="ts">
  import type { FormField } from '$lib/types/form';

  interface Props {
    field: FormField;
    value: any;
    error?: string;
    touched?: boolean;
    onChange: (value: any) => void;
    onBlur: () => void;
    onFocus: () => void;
  }

  let { field, value = $bindable(false), error, touched, onChange, onBlur, onFocus }: Props = $props();

  function handleToggle() {
    if (field.disabled) return;
    value = !value;
    onChange(value);
  }
</script>

<div class="w-full">
  <label class="flex items-center justify-between cursor-pointer py-2">
    <div class="flex-1">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {field.label}
        {#if field.required}
          <span class="text-red-500">*</span>
        {/if}
      </span>
      {#if field.description}
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{field.description}</p>
      {/if}
    </div>

    <button
      type="button"
      role="switch"
      aria-checked={value}
      disabled={field.disabled}
      onclick={handleToggle}
      onblur={onBlur}
      onfocus={onFocus}
      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed
        {value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}"
    >
      <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform
        {value ? 'translate-x-6' : 'translate-x-1'}">
      </span>
    </button>
  </label>

  {#if field.hint && !error}
    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{field.hint}</p>
  {/if}

  {#if error && touched}
    <p class="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>
      {error}
    </p>
  {/if}
</div>