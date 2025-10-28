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

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    let newValue: any = target.value;

    if (field.type === 'number') {
      newValue = target.valueAsNumber;
    }

    value = newValue;
    onChange(newValue);
  }
</script>

<div class="w-full">
  <label for={field.name} class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
    {field.label}
    {#if field.required}
      <span class="text-red-500">*</span>
    {/if}
  </label>

  <input
    id={field.name}
    name={field.name}
    type={field.type}
    bind:value
    oninput={handleInput}
    onblur={onBlur}
    onfocus={onFocus}
    placeholder={field.placeholder}
    disabled={field.disabled}
    readonly={field.readonly}
    required={field.required}
    min={field.min}
    max={field.max}
    step={field.step}
    minlength={field.minLength}
    maxlength={field.maxLength}
    pattern={field.pattern}
    class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border rounded-lg 
      focus:outline-none focus:ring-2 transition-colors
      text-gray-900 dark:text-white
      placeholder:text-gray-500 dark:placeholder:text-gray-400
      disabled:opacity-50 disabled:cursor-not-allowed
      {error && touched 
        ? 'border-red-500 focus:ring-red-500' 
        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'}"
  />

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