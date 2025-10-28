<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Card from '$lib/components/Card.svelte';
  import SuperForm from '$lib/components/SuperForm.svelte';
  import type { FormField, FormOptions } from '$lib/types/form';

  const fields: FormField[] = [
    {
      name: 'userType',
      label: 'User Type',
      type: 'radio',
      required: true,
      span: 12,
      options: [
        { label: 'Individual', value: 'individual' },
        { label: 'Business', value: 'business' },
        { label: 'Organization', value: 'organization' }      ]
    },
    // Individual fields
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'John',
      required: true,
      span: 6,
      visible: (data) => data.userType === 'individual'
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Doe',
      required: true,
      span: 6,
      visible: (data) => data.userType === 'individual'
    },
    // Business fields
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      placeholder: 'Acme Corp',
      required: true,
      span: 12,
      visible: (data) => data.userType === 'business'
    },
    {
      name: 'taxId',
      label: 'Tax ID',
      type: 'text',
      placeholder: '12-3456789',
      span: 6,
      visible: (data) => data.userType === 'business'
    },
    {
      name: 'industry',
      label: 'Industry',
      type: 'select',
      span: 6,
      visible: (data) => data.userType === 'business',
      options: [
        { label: 'Technology', value: 'tech' },
        { label: 'Finance', value: 'finance' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Retail', value: 'retail' },
        { label: 'Other', value: 'other' }
      ]
    },
    // Organization fields
    {
      name: 'organizationName',
      label: 'Organization Name',
      type: 'text',
      placeholder: 'Red Cross',
      required: true,
      span: 12,
      visible: (data) => data.userType === 'organization'
    },
    {
      name: 'registrationNumber',
      label: 'Registration Number',
      type: 'text',
      span: 6,
      visible: (data) => data.userType === 'organization'
    },
    {
      name: 'organizationType',
      label: 'Organization Type',
      type: 'select',
      span: 6,
      visible: (data) => data.userType === 'organization',
      options: [
        { label: 'Non-Profit', value: 'nonprofit' },
        { label: 'Government', value: 'government' },
        { label: 'Educational', value: 'educational' },
        { label: 'Other', value: 'other' }
      ]
    },
    // Common fields
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'user@example.com',
      required: true,
      span: 6
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 000-0000',
      span: 6
    },
    {
      name: 'hasCustomDomain',
      label: 'Use Custom Domain',
      type: 'switch',
      description: 'Connect your own domain',
      span: 12
    },
    {
      name: 'customDomain',
      label: 'Custom Domain',
      type: 'url',
      placeholder: 'https://yourdomain.com',
      span: 12,
      visible: (data) => data.hasCustomDomain === true,
      validations: [
        {
          rule: 'custom',
          validator: (value) => {
            if (!value) return true;
            try {
              new URL(value);
              return true;
            } catch {
              return 'Please enter a valid URL';
            }
          }
        }
      ]
    },
    {
      name: 'newsletter',
      label: 'Subscribe to newsletter',
      type: 'checkbox',
      span: 12,
      options: [
        { label: 'Product updates', value: 'product' },
        { label: 'Marketing emails', value: 'marketing' },
        { label: 'Weekly digest', value: 'digest' }
      ]
    }
  ];

  const options: FormOptions = {
    columns: 12,
    validateOnChange: true,
    validateOnBlur: true,
    showReset: true,
    submitText: 'Register',
    async onSubmit(data, helpers) {
      console.log('Registration data:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Registration successful!');
    }
  };
</script>

<PageHeader 
  title="Conditional Fields Form" 
  description="Form with dynamic fields based on selections"
/>

<div class="max-w-3xl">
  <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Dynamic Fields</h3>
    <p class="text-sm text-blue-700 dark:text-blue-300">
      Select different user types to see fields appear and disappear dynamically. Toggle "Use Custom Domain" to see conditional validation.
    </p>
  </div>

  <Card padding="md">
    <SuperForm {fields} {options} />
  </Card>
</div>