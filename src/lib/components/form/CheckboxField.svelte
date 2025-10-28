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

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    
    if (field.options) {
      // Multiple checkboxes
      const currentValues = Array.isArray(value) ? value : [];
      const optionValue = target.value;
      
      if (target.checked) {
        value = [...currentValues, optionValue];
      } else {
        value = currentValues.filter(v => v !== optionValue);
      }
      onChange(value);
    } else {
      // Single checkbox
      value = target.checked;
      onChange(target.checked);
    }
  }
</script>

<div class="w-full">
  {#if field.options}
    <!-- Multiple checkboxes -->
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {field.label}
      {#if field.required}
        <span class="text-red-500">*</span>
      {/if}
    </label>

    <div class="space-y-2">
      {#each field.options as option}
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name={field.name}
            value={option.value}
            checked={Array.isArray(value) && value.includes(option.value)}
            onchange={handleChange}
            disabled={field.disabled || option.disabled}
            class="w-4 h-4 text-blue-600 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span class="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
        </label>
      {/each}
    </div>
  {:else}
    <!-- Single checkbox -->
    <label class="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        id={field.name}
        name={field.name}
        bind:checked={value}
        onchange={handleChange}
        onblur={onBlur}
        onfocus={onFocus}
        disabled={field.disabled}
        required={field.required}
        class="w-4 h-4 text-blue-600 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
      />
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {field.label}
        {#if field.required}
          <span class="text-red-500">*</span>
        {/if}
      </span>
    </label>
  {/if}

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