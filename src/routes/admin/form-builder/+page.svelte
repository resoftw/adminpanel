<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Card from '$lib/components/Card.svelte';
  import SuperForm from '$lib/components/SuperForm.svelte';
  import FormBuilder from '$lib/components/FormBuilder.svelte';
  import type { FormOptions } from '$lib/types/form';

  let builderRef: any;
  let showPreview = $state(false);

  const options: FormOptions = {
    columns: 12,
    validateOnChange: true,
    showReset: true,
    submitText: 'Submit Form',
    async onSubmit(data) {
      console.log('Form Data:', data);
      alert('Form submitted! Check console for data.');
    }
  };
</script>

<PageHeader 
  title="Form Builder" 
  description="Visual form builder - create forms without code"
>
  {#snippet actions()}
    <button
      onclick={() => showPreview = !showPreview}
      class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
    >
      {showPreview ? 'Hide Preview' : 'Show Preview'}
    </button>
  {/snippet}
</PageHeader>

<div class="grid grid-cols-1 {showPreview ? 'lg:grid-cols-2' : ''} gap-6">
  <!-- Builder -->
  <div>
    <Card padding="md">
      <FormBuilder bind:this={builderRef} />
    </Card>
  </div>

  <!-- Preview -->
  {#if showPreview}
    <div>
      <Card title="Form Preview" padding="md">
        {#if builderRef}
          {@const fields = builderRef.getFields()}
          {#if fields.length > 0}
            <SuperForm {fields} {options} />
          {:else}
            <div class="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>Add fields to see preview</p>
            </div>
          {/if}
        {/if}
      </Card>
    </div>
  {/if}
</div>