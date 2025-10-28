<script lang="ts">
  import type { FormField } from '$lib/types/form';
  import { browser } from '$app/environment';

  interface Props {
    field: FormField;
    value: any;
    error?: string;
    touched?: boolean;
    onChange: (value: any) => void;
    onBlur: () => void;
    onFocus: () => void;
  }

  let { field, value = $bindable(null), error, touched, onChange, onBlur, onFocus }: Props = $props();

  let previews = $state<string[]>([]);
  let isDragging = $state(false);

  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    
    if (files && files.length > 0) {
      if (field.multiple) {
        value = files;
      } else {
        value = files[0];
      }
      onChange(value);
      generatePreviews(files);
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      if (field.multiple) {
        value = files;
      } else {
        value = files[0];
      }
      onChange(value);
      generatePreviews(files);
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    isDragging = true;
  }

  function handleDragLeave() {
    isDragging = false;
  }

  function removeFile(index: number) {
    if (field.multiple && value instanceof FileList) {
      const dt = new DataTransfer();
      const files = Array.from(value);
      files.splice(index, 1);
      files.forEach(file => dt.items.add(file));
      value = dt.files;
    } else {
      value = null;
    }
    onChange(value);
    previews.splice(index, 1);
    previews = [...previews];
  }

  function generatePreviews(files: FileList) {
    if (!field.preview || field.type !== 'image') return;

    previews = [];
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previews = [...previews, e.target?.result as string];
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  let files = $derived.by(() => {
    if (!value) return [];
    if (value instanceof FileList) return Array.from(value);
    if (value instanceof File) return [value];
    return [];
  });
</script>

<div class="w-full">
  <label for={field.name} class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
    {field.label}
    {#if field.required}
      <span class="text-red-500">*</span>
    {/if}
  </label>

  <div
    class="relative border-2 border-dashed rounded-lg p-6 transition-colors
      {isDragging 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
        : error && touched
          ? 'border-red-300 dark:border-red-700'
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}"
    ondrop={handleDrop}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
  >
    <input
      type="file"
      id={field.name}
      name={field.name}
      onchange={handleFileChange}
      onblur={onBlur}
      onfocus={onFocus}
      accept={field.accept}
      multiple={field.multiple}
      disabled={field.disabled}
      required={field.required}
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
    />

    <div class="text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span class="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span>
        or drag and drop
      </p>
      {#if field.accept || field.maxSize}
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {#if field.accept}
            {field.accept}
          {/if}
          {#if field.maxSize}
            {#if field.accept} • {/if}
            Max {formatFileSize(field.maxSize)}
          {/if}
        </p>
      {/if}
    </div>
  </div>

  <!-- File List -->
  {#if files.length > 0}
    <div class="mt-3 space-y-2">
      {#each files as file, index}
        <div class="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {#if field.preview && previews[index]}
            <img src={previews[index]} alt="" class="w-12 h-12 object-cover rounded" />
          {:else}
            <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
              </svg>
            </div>
          {/if}

          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
          </div>

          <button
            type="button"
            onclick={() => removeFile(index)}
            class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      {/each}
    </div>
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