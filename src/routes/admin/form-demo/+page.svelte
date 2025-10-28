<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Card from '$lib/components/Card.svelte';
  import SuperForm from '$lib/components/SuperForm.svelte';
  import type { FormField, FormOptions } from '$lib/types/form';

  interface UserForm {
    name: string;
    email: string;
    age: number;
    bio: string;
    country: string;
    interests: string[];
    newsletter: boolean;
    role: string;
  }

  const fields: FormField[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true,
      span: 6,
      validations: [
        { rule: 'minLength', value: 3, message: 'Name must be at least 3 characters' }
      ]
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'user@example.com',
      required: true,
      span: 6,
      hint: 'We will never share your email'
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      min: 18,
      max: 100,
      span: 3,
      required: true
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      span: 3,
      required: true,
      options: [
        { label: 'United States', value: 'US' },
        { label: 'United Kingdom', value: 'UK' },
        { label: 'Canada', value: 'CA' },
        { label: 'Australia', value: 'AU' },
        { label: 'Germany', value: 'DE' },
        { label: 'France', value: 'FR' }
      ]
    },
    {
      name: 'bio',
      label: 'Biography',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
      rows: 4,
      span: 12,
      maxLength: 500,
      hint: 'Maximum 500 characters'
    },
    {
      name: 'interests',
      label: 'Interests',
      type: 'checkbox',
      span: 12,
      options: [
        { label: 'Technology', value: 'tech' },
        { label: 'Sports', value: 'sports' },
        { label: 'Music', value: 'music' },
        { label: 'Travel', value: 'travel' },
        { label: 'Reading', value: 'reading' }
      ]
    },
    {
      name: 'role',
      label: 'Role',
      type: 'radio',
      span: 12,
      required: true,
      options: [
        { label: 'Developer', value: 'developer' },
        { label: 'Designer', value: 'designer' },
        { label: 'Manager', value: 'manager' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      name: 'newsletter',
      label: 'Subscribe to newsletter',
      type: 'switch',
      description: 'Receive updates and news',
      span: 12
    }
  ];

  const options: FormOptions = {
    columns: 12,
    validateOnChange: true,
    validateOnBlur: true,
    showReset: true,
    submitText: 'Create Account',
    resetText: 'Clear Form',
    async onSubmit(data, helpers) {
      console.log('Form submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Form submitted successfully!');
    },
    onError(error) {
      console.error('Error:', error);
      alert('Failed to submit form');
    }
  };

  let formRef: any;
</script>

<PageHeader 
  title="Basic Form Example" 
  description="Simple multi-column form with validation"
/>

<div class="max-w-4xl">
  <Card padding="md">
    <SuperForm bind:this={formRef} {fields} {options} />
  </Card>
</div>