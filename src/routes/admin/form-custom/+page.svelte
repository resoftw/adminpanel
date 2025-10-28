<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Card from '$lib/components/Card.svelte';
  import SuperForm from '$lib/components/SuperForm.svelte';
  import type { FormField, FormOptions } from '$lib/types/form';

  const fields: FormField[] = [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      required: true,
      span: 12
    },
    {
      name: 'price',
      label: 'Price',
      type: 'custom',
      required: true,
      span: 6,
      render: true
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'custom',
      span: 6,
      render: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      rows: 4,
      span: 12
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'custom',
      span: 12,
      render: true
    }
  ];

  let tagInput = $state('');
  let tags = $state<string[]>([]);

  const options: FormOptions = {
    columns: 12,
    submitText: 'Save Product',
    async onSubmit(data, helpers) {
      console.log('Product data:', { ...data, tags });
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Product saved!');
    }
  };

  function addTag() {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      tags = [...tags, tagInput.trim()];
      tagInput = '';
    }
  }

  function removeTag(index: number) {
    tags = tags.filter((_, i) => i !== index);
  }
</script>

<PageHeader 
  title="Custom Field Rendering" 
  description="Form with fully custom field components"
/>

<div class="max-w-3xl">
  <Card padding="md">
    <SuperForm {fields} {options}>
      {#snippet customField({ field, value, error, onChange })}
        {#if field.name === 'price'}
          <!-- Custom Price Field with Currency -->
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {field.label}
              {#if field.required}
                <span class="text-red-500">*</span>
              {/if}
            </label>
            
            <div class="relative">
              <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                bind:value
                oninput={(e) => onChange((e.target as HTMLInputElement).valueAsNumber)}
                step="0.01"
                min="0"
                placeholder="0.00"
                class="w-full pl-8 pr-12 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
              <span class="absolute right-3 top-2 text-gray-500 dark:text-gray-400">USD</span>
            </div>
            
            {#if value}
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Formatted: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0)}
              </p>
            {/if}
          </div>
        {:else if field.name === 'rating'}
          <!-- Custom Star Rating -->
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {field.label}
            </label>
            
            <div class="flex items-center gap-1">
              {#each [1, 2, 3, 4, 5] as star}
                <button
                  type="button"
                  onclick={() => onChange(star)}
                  class="text-3xl transition-colors hover:scale-110 transform"
                >
                  {#if star <= (value || 0)}
                    <span class="text-yellow-500">★</span>
                  {:else}
                    <span class="text-gray-300 dark:text-gray-600">★</span>
                  {/if}
                </button>
              {/each}
              {#if value}
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {value} out of 5
                </span>
              {/if}
            </div>
          </div>
        {:else if field.name === 'tags'}
          <!-- Custom Tags Input -->
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {field.label}
            </label>
            
            <div class="flex gap-2 mb-2">
              <input
                type="text"
                bind:value={tagInput}
                onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Type and press Enter..."
                class="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onclick={addTag}
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            
            {#if tags.length > 0}
              <div class="flex flex-wrap gap-2">
                {#each tags as tag, index}
                  <span class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                    {tag}
                    <button
                      type="button"
                      onclick={() => removeTag(index)}
                      class="hover:text-blue-600 dark:hover:text-blue-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </span>
                {/each}
              </div>
            {:else}
              <p class="text-xs text-gray-500 dark:text-gray-400">No tags added yet</p>
            {/if}
          </div>
        {/if}
      {/snippet}
    </SuperForm>
  </Card>
</div>