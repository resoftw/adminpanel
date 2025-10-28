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

  let { field, value = $bindable(0), error, touched, onChange, onBlur, onFocus }: Props = $props();

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.valueAsNumber;
    onChange(target.valueAsNumber);
  }
</script>

<div class="w-full">
  <div class="flex items-center justify-between mb-1.5">
    <label for={field.name} class="text-sm font-medium text-gray-700 dark:text-gray-300">
      {field.label}
      {#if field.required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
    <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">{value}</span>
  </div>

  <input
    type="range"
    id={field.name}
    name={field.name}
    bind:value
    oninput={handleInput}
    onblur={onBlur}
    onfocus={onFocus}
    min={field.min ?? 0}
    max={field.max ?? 100}
    step={field.step ?? 1}
    disabled={field.disabled}
    required={field.required}
    class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
  />

  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
    <span>{field.min ?? 0}</span>
    <span>{field.max ?? 100}</span>
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