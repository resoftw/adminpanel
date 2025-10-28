<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Card from '$lib/components/Card.svelte';
  import SuperForm from '$lib/components/SuperForm.svelte';
  import type { FormField, FormOptions } from '$lib/types/form';

  interface UploadForm {
    title: string;
    description: string;
    category: string;
    tags: string[];
    coverImage: File | null;
    documents: FileList | null;
    featured: boolean;
  }

  const fields: FormField[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Enter title',
      required: true,
      span: 12,
      validations: [
        { rule: 'minLength', value: 5, message: 'Title must be at least 5 characters' },
        { rule: 'maxLength', value: 100, message: 'Title must not exceed 100 characters' }
      ]
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Describe your upload...',
      rows: 4,
      span: 12,
      maxLength: 500
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      span: 6,
      options: [
        { label: 'Images', value: 'images' },
        { label: 'Documents', value: 'documents' },
        { label: 'Videos', value: 'videos' },
        { label: 'Audio', value: 'audio' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'checkbox',
      span: 6,
      options: [
        { label: 'Important', value: 'important' },
        { label: 'Urgent', value: 'urgent' },
        { label: 'Public', value: 'public' },
        { label: 'Archive', value: 'archive' }
      ]
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'image',
      accept: 'image/jpeg,image/png,image/webp',
      maxSize: 5 * 1024 * 1024, // 5MB
      preview: true,
      span: 12,
      hint: 'Upload a cover image (JPG, PNG, WebP - Max 5MB)'
    },
    {
      name: 'documents',
      label: 'Documents',
      type: 'file',
      accept: '.pdf,.doc,.docx,.txt',
      multiple: true,
      maxFiles: 5,
      maxSize: 10 * 1024 * 1024, // 10MB per file
      span: 12,
      hint: 'Upload up to 5 documents (PDF, DOC, DOCX, TXT - Max 10MB each)'
    },
    {
      name: 'featured',
      label: 'Mark as Featured',
      type: 'switch',
      description: 'Show this on the homepage',
      span: 12
    }
  ];

  const options: FormOptions = {
    columns: 12,
    enctype: 'multipart/form-data',
    validateOnChange: true,
    validateOnBlur: true,
    showReset: true,
    submitText: 'Upload Files',
    async onSubmit(formData, helpers) {
      console.log('Uploading files...', formData);
      
      // Simulate upload with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        console.log(`Upload progress: ${i}%`);
      }
      
      alert('Files uploaded successfully!');
    },
    onError(error) {
      console.error('Upload failed:', error);
      alert('Failed to upload files');
    }
  };
</script>

<PageHeader 
  title="File Upload Form" 
  description="Form with file and image upload capabilities"
/>

<div class="max-w-3xl">
  <Card padding="md">
    <SuperForm {fields} {options} />
  </Card>
</div>