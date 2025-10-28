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

  let { field, value = $bindable(''), error, touched, onChange, onBlur, onFocus }: Props = $props();

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
    onChange(target.value);
  }
</script>

<div class="w-full">
  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    {field.label}
    {#if field.required}
      <span class="text-red-500">*</span>
    {/if}
  </label>

  <div class="space-y-2">
    {#each field.options || [] as option}
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={field.name}
          value={option.value}
          checked={value === option.value}
          onchange={handleChange}
          onblur={onBlur}
          onfocus={onFocus}
          disabled={field.disabled || option.disabled}
          required={field.required}
          class="w-4 h-4 text-blue-600 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:ring-2"
        />
        <span class="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
      </label>
    {/each}
  </div>

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