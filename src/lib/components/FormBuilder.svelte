<script lang="ts">
  import type { FormField } from '$lib/types/form';
  import Card from './Card.svelte';
  import Button from './Button.svelte';

  let fields = $state<FormField[]>([]);
  let showAddField = $state(false);
  let newField = $state<Partial<FormField>>({
    name: '',
    label: '',
    type: 'text',
    span: 12
  });

  const fieldTypes = [
    { label: 'Text', value: 'text' },
    { label: 'Email', value: 'email' },
    { label: 'Password', value: 'password' },
    { label: 'Number', value: 'number' },
    { label: 'Textarea', value: 'textarea' },
    { label: 'Select', value: 'select' },
    { label: 'Checkbox', value: 'checkbox' },
    { label: 'Radio', value: 'radio' },
    { label: 'Switch', value: 'switch' },
    { label: 'File', value: 'file' },
    { label: 'Image', value: 'image' },
    { label: 'Date', value: 'date' },
    { label: 'Range', value: 'range' },
    { label: 'Color', value: 'color' }
  ];

  function addField() {
    if (newField.name && newField.label) {
      fields = [...fields, { ...newField } as FormField];
      resetNewField();
      showAddField = false;
    }
  }

  function removeField(index: number) {
    fields = fields.filter((_, i) => i !== index);
  }

  function resetNewField() {
    newField = {
      name: '',
      label: '',
      type: 'text',
      span: 12
    };
  }

  function moveField(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < fields.length) {
      const temp = [...fields];
      [temp[index], temp[newIndex]] = [temp[newIndex], temp[index]];
      fields = temp;
    }
  }

  function exportConfig() {
    const config = JSON.stringify(fields, null, 2);
    console.log('Form Configuration:', config);
    
    // Download as JSON
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-config.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  export function getFields() {
    return fields;
  }
</script>

<div class="space-y-4">
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Form Builder</h3>
    <div class="flex gap-2">
      <Button variant="secondary" size="sm" onclick={exportConfig}>
        <span>📥</span>
        Export Config
      </Button>
      <Button size="sm" onclick={() => showAddField = true}>
        <span>➕</span>
        Add Field
      </Button>
    </div>
  </div>

  {#if showAddField}
    <Card padding="md">
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Field Name
            </label>
            <input
              type="text"
              bind:value={newField.name}
              placeholder="fieldName"
              class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Label
            </label>
            <input
              type="text"
              bind:value={newField.label}
              placeholder="Field Label"
              class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              bind:value={newField.type}
              class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            >
              {#each fieldTypes as type}
                <option value={type.value}>{type.label}</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Column Span
            </label>
            <select
              bind:value={newField.span}
              class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            >
              <option value={12}>Full Width (12)</option>
              <option value={6}>Half Width (6)</option>
              <option value={4}>Third Width (4)</option>
              <option value={3}>Quarter Width (3)</option>
            </select>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={newField.required}
              class="rounded border-gray-300 dark:border-gray-600 text-blue-600"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">Required</span>
          </label>
        </div>

        <div class="flex gap-2">
          <Button onclick={addField}>Add Field</Button>
          <Button variant="ghost" onclick={() => (showAddField = false, resetNewField())}>
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  {/if}

  {#if fields.length === 0}
    <div class="text-center py-12 text-gray-500 dark:text-gray-400">
      <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      <p>No fields added yet. Click "Add Field" to get started.</p>
    </div>
  {:else}
    <div class="space-y-2">
      {#each fields as field, index}
        <div class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div class="flex flex-col gap-1">
            <button
              onclick={() => moveField(index, 'up')}
              disabled={index === 0}
              class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-30"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
              </svg>
            </button>
            <button
              onclick={() => moveField(index, 'down')}
              disabled={index === fields.length - 1}
              class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-30"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">{field.name}</span>
              {#if field.required}
                <span class="px-1.5 py-0.5 text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded">Required</span>
              {/if}
              <span class="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded">{field.type}</span>
              <span class="px-1.5 py-0.5 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 rounded">Span: {field.span}</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{field.label}</p>
          </div>

          <button
            onclick={() => removeField(index)}
            class="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>