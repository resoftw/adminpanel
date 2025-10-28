<script lang="ts" generics="T extends Record<string, any>">
  import type { Snippet } from 'svelte';
  import type { FormField, FormSection, FormOptions, FormHelpers } from '$lib/types/form';
  import { createFormStore } from '$lib/stores/form.svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  // Field components
  import TextField from './form/TextField.svelte';
  import TextareaField from './form/TextareaField.svelte';
  import SelectField from './form/SelectField.svelte';
  import CheckboxField from './form/CheckboxField.svelte';
  import RadioField from './form/RadioField.svelte';
  import SwitchField from './form/SwitchField.svelte';
  import FileField from './form/FileField.svelte';
  import RangeField from './form/RangeField.svelte';
  import ColorField from './form/ColorField.svelte';

  interface Props {
    fields?: FormField[];
    sections?: FormSection[];
    options?: FormOptions;
    initialValues?: T;
    customField?: Snippet<[{ field: FormField; value: any; error?: string; onChange: (v: any) => void }]>;
  }

  let {
    fields = [],
    sections = [],
    options = {},
    initialValues = {} as T,
    customField
  }: Props = $props();

  // Merge default options
  const opts = $derived({
    method: 'POST',
    enctype: 'application/x-www-form-urlencoded',
    validateOnChange: true,
    validateOnBlur: true,
    validateOnSubmit: true,
    layout: 'vertical',
    columns: 1,
    gap: 'md',
    submitText: 'Submit',
    resetText: 'Reset',
    cancelText: 'Cancel',
    showReset: false,
    showCancel: false,
    loadingText: 'Submitting...',
    autosave: false,
    autosaveDelay: 1000,
    ...options
  } as Required<FormOptions>);

  // Get all fields (flat array)
  let allFields = $derived(
    sections.length > 0
      ? sections.flatMap(section => section.fields)
      : fields
  );

  // Create form store
  const formStore = createFormStore(allFields);

  // Set initial values
  $effect(() => {
    if (Object.keys(initialValues).length > 0) {
      Object.entries(initialValues).forEach(([key, value]) => {
        formStore.setFieldValue(key, value);
      });
    }
  });

  // Create helpers
  const helpers: FormHelpers = {
    ...formStore.helpers,
    submitForm: () => handleSubmit(new Event('submit'))
  };

  // Autosave
  let autosaveTimeout: any;
  $effect(() => {
    if (opts.autosave && browser) {
      clearTimeout(autosaveTimeout);
      autosaveTimeout = setTimeout(() => {
        if (opts.storageKey) {
          localStorage.setItem(
            `form-${opts.storageKey}`,
            JSON.stringify(formStore.state.values)
          );
        }
      }, opts.autosaveDelay);
    }
  });

  // Load from storage
  onMount(() => {
    if (opts.storageKey && browser) {
      const saved = localStorage.getItem(`form-${opts.storageKey}`);
      if (saved) {
        try {
          const values = JSON.parse(saved);
          Object.entries(values).forEach(([key, value]) => {
            formStore.setFieldValue(key, value as any);
          });
        } catch (e) {
          console.error('Failed to load form data:', e);
        }
      }
    }
  });

  // Handle field change
  function handleFieldChange(field: FormField, value: any) {
    formStore.setFieldValue(field.name, value);

    if (field.onChange) {
      field.onChange(value, formStore.state.values);
    }

    if (opts.onChange) {
      opts.onChange(field.name, value, formStore.state.values);
    }

    if (opts.validateOnChange) {
      formStore.validateField(field);
    }
  }

  // Handle field blur
  function handleFieldBlur(field: FormField) {
    formStore.setFieldTouched(field.name);

    if (field.onBlur) {
      field.onBlur(formStore.state.values[field.name]);
    }

    if (opts.validateOnBlur) {
      formStore.validateField(field);
    }
  }

  // Handle field focus
  function handleFieldFocus(field: FormField) {
    if (field.onFocus) {
      field.onFocus();
    }
  }

  // Handle submit
  async function handleSubmit(e: Event) {
    e.preventDefault();

    // Validate
    if (opts.validateOnSubmit) {
      const isValid = formStore.validateAll(allFields);
      
      if (opts.onValidate) {
        opts.onValidate(formStore.state.errors);
      }

      if (!isValid) {
        return;
      }
    }

    formStore.state.isSubmitting = true;
    formStore.state.submitCount++;

    try {
      if (opts.onSubmit) {
        // Custom handler
        const formData = prepareFormData();
        await opts.onSubmit(formData, helpers);
        
        if (opts.onSuccess) {
          opts.onSuccess(formStore.state.values);
        }
      } else if (opts.action) {
        // Native form submission will happen
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (opts.onError) {
        opts.onError(error);
      }
    } finally {
      formStore.state.isSubmitting = false;
    }
  }

  // Prepare form data
  function prepareFormData(): FormData | Record<string, any> {
    if (opts.enctype === 'multipart/form-data') {
      const formData = new FormData();
      Object.entries(formStore.state.values).forEach(([key, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach(file => formData.append(key, file));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach(v => formData.append(key, v));
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });
      return formData;
    }

    return formStore.state.values;
  }

  // Handle reset
  function handleReset() {
    formStore.reset();
    
    if (opts.storageKey && browser) {
      localStorage.removeItem(`form-${opts.storageKey}`);
    }

    if (opts.onReset) {
      opts.onReset();
    }
  }

  // Handle cancel
  function handleCancel() {
    if (opts.onCancel) {
      opts.onCancel();
    }
  }

  // Check if field is visible
  function isFieldVisible(field: FormField): boolean {
    if (typeof field.visible === 'boolean') {
      return field.visible;
    }
    if (typeof field.visible === 'function') {
      return field.visible(formStore.state.values);
    }
    return true;
  }

  // Get grid column span class
  function getColumnSpan(span?: number): string {
    const spanMap: Record<number, string> = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      6: 'col-span-6',
      12: 'col-span-12'
    };
    return spanMap[span || 12] || 'col-span-12';
  }

  // Get grid columns class
  function getGridColumns(columns: number): string {
    const colMap: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };
    return colMap[columns] || 'grid-cols-1';
  }

  // Get gap class
  function getGapClass(gap: string): string {
    const gapMap: Record<string, string> = {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6'
    };
    return gapMap[gap] || 'gap-4';
  }

  // Render field component
  function renderField(field: FormField) {
    const value = formStore.state.values[field.name];
    const error = formStore.state.errors[field.name];
    const touched = formStore.state.touched[field.name];

    const commonProps = {
      field,
      value,
      error,
      touched,
      onChange: (v: any) => handleFieldChange(field, v),
      onBlur: () => handleFieldBlur(field),
      onFocus: () => handleFieldFocus(field)
    };

    return { type: field.type, props: commonProps };
  }

  // Export helpers
  export const formHelpers = helpers;
  export function getValues() {
    return formStore.state.values;
  }
  export function setValues(values: Partial<T>) {
    Object.entries(values).forEach(([key, value]) => {
      formStore.setFieldValue(key, value);
    });
  }
  export function resetForm() {
    handleReset();
  }
</script>

<form
  action={opts.action}
  method={opts.method}
  enctype={opts.enctype}
  onsubmit={handleSubmit}
  class="w-full"
>
  {#if sections.length > 0}
    <!-- Sections Layout -->
    <div class="space-y-6">
      {#each sections as section, sectionIndex}
        {@const sectionFields = section.fields.filter(isFieldVisible)}
        
        {#if sectionFields.length > 0}
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {#if section.title || section.description}
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                {#if section.title}
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                {/if}
                {#if section.description}
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{section.description}</p>
                {/if}
              </div>
            {/if}

            <div class="p-6">
              <div class="grid {getGridColumns(section.columns || opts.columns)} {getGapClass(opts.gap)}">
                {#each sectionFields as field}
                  {@const rendered = renderField(field)}
                  
                  <div class="{getColumnSpan(field.span)}" style={field.order ? `order: ${field.order}` : ''}>
                    {#if field.render && customField}
                      {@render customField({ 
                        field, 
                        value: rendered.props.value, 
                        error: rendered.props.error,
                        onChange: rendered.props.onChange 
                      })}
                    {:else if rendered.type === 'text' || rendered.type === 'email' || rendered.type === 'password' || rendered.type === 'number' || rendered.type === 'tel' || rendered.type === 'url' || rendered.type === 'date' || rendered.type === 'time' || rendered.type === 'datetime-local' || rendered.type === 'month' || rendered.type === 'week'}
                      <TextField {...rendered.props} />
                    {:else if rendered.type === 'textarea'}
                      <TextareaField {...rendered.props} />
                    {:else if rendered.type === 'select'}
                      <SelectField {...rendered.props} />
                    {:else if rendered.type === 'checkbox'}
                      <CheckboxField {...rendered.props} />
                    {:else if rendered.type === 'radio'}
                      <RadioField {...rendered.props} />
                    {:else if rendered.type === 'switch'}
                      <SwitchField {...rendered.props} />
                    {:else if rendered.type === 'file' || rendered.type === 'image'}
                      <FileField {...rendered.props} />
                    {:else if rendered.type === 'range'}
                      <RangeField {...rendered.props} />
                    {:else if rendered.type === 'color'}
                      <ColorField {...rendered.props} />
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {:else}
    <!-- Simple Fields Layout -->
    <div class="grid {getGridColumns(opts.columns)} {getGapClass(opts.gap)}">
      {#each allFields.filter(isFieldVisible) as field}
        {@const rendered = renderField(field)}
        
        <div class="{getColumnSpan(field.span)}" style={field.order ? `order: ${field.order}` : ''}>
          {#if field.render && customField}
            {@render customField({ 
              field, 
              value: rendered.props.value, 
              error: rendered.props.error,
              onChange: rendered.props.onChange 
            })}
          {:else if rendered.type === 'text' || rendered.type === 'email' || rendered.type === 'password' || rendered.type === 'number' || rendered.type === 'tel' || rendered.type === 'url' || rendered.type === 'date' || rendered.type === 'time' || rendered.type === 'datetime-local' || rendered.type === 'month' || rendered.type === 'week'}
            <TextField {...rendered.props} />
          {:else if rendered.type === 'textarea'}
            <TextareaField {...rendered.props} />
          {:else if rendered.type === 'select'}
            <SelectField {...rendered.props} />
          {:else if rendered.type === 'checkbox'}
            <CheckboxField {...rendered.props} />
          {:else if rendered.type === 'radio'}
            <RadioField {...rendered.props} />
          {:else if rendered.type === 'switch'}
            <SwitchField {...rendered.props} />
          {:else if rendered.type === 'file' || rendered.type === 'image'}
            <FileField {...rendered.props} />
          {:else if rendered.type === 'range'}
            <RangeField {...rendered.props} />
          {:else if rendered.type === 'color'}
            <ColorField {...rendered.props} />
          {/if}
        </div>
      {/each}
    </div>
  {/if}

  <!-- Form Actions -->
  <div class="mt-6 flex items-center justify-end gap-3">
    {#if opts.showCancel}
      <button
        type="button"
        onclick={handleCancel}
        disabled={formStore.state.isSubmitting}
        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {opts.cancelText}
      </button>
    {/if}

    {#if opts.showReset}
      <button
        type="button"
        onclick={handleReset}
        disabled={formStore.state.isSubmitting}
        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {opts.resetText}
      </button>
    {/if}

    <button
      type="submit"
      disabled={formStore.state.isSubmitting}
      class="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
    >
      {#if formStore.state.isSubmitting}
        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {opts.loadingText}
      {:else}
        {opts.submitText}
      {/if}
    </button>
  </div>

  <!-- Debug Info (Development only) -->
  {#if import.meta.env.DEV}
    <details class="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-xs">
      <summary class="cursor-pointer font-semibold text-gray-700 dark:text-gray-300">Debug Info</summary>
      <div class="mt-2 space-y-2">
        <div>
          <strong>Values:</strong>
          <pre class="mt-1 p-2 bg-white dark:bg-gray-800 rounded overflow-auto">{JSON.stringify(formStore.state.values, null, 2)}</pre>
        </div>
        <div>
          <strong>Errors:</strong>
          <pre class="mt-1 p-2 bg-white dark:bg-gray-800 rounded overflow-auto">{JSON.stringify(formStore.state.errors, null, 2)}</pre>
        </div>
        <div>
          <strong>State:</strong>
          <pre class="mt-1 p-2 bg-white dark:bg-gray-800 rounded overflow-auto">{JSON.stringify({
            isSubmitting: formStore.state.isSubmitting,
            isValidating: formStore.state.isValidating,
            submitCount: formStore.state.submitCount,
            dirty: formStore.state.dirty,
            touched: formStore.state.touched
          }, null, 2)}</pre>
        </div>
      </div>
    </details>
  {/if}
</form>