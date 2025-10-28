<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import SuperForm from '$lib/components/SuperForm.svelte';
  import type { FormSection, FormOptions } from '$lib/types/form';

  interface AdvancedForm {
    // Personal Info
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    avatar: File | null;
    
    // Address
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    
    // Preferences
    theme: string;
    notifications: boolean;
    emailDigest: string;
    language: string;
    timezone: string;
    
    // Settings
    visibility: string;
    twoFactor: boolean;
    sessionTimeout: number;
    favoriteColor: string;
  }

  const sections: FormSection[] = [
    {
      title: 'Personal Information',
      description: 'Basic information about yourself',
      columns: 2,
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'John',
          required: true,
          span: 6
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Doe',
          required: true,
          span: 6
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'john.doe@example.com',
          required: true,
          span: 6
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '+1 (555) 000-0000',
          span: 6,
          pattern: '^[+]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[0-9]{1,9}$'
        },
        {
          name: 'birthDate',
          label: 'Birth Date',
          type: 'date',
          required: true,
          span: 6
        },
        {
          name: 'avatar',
          label: 'Profile Picture',
          type: 'image',
          accept: 'image/*',
          maxSize: 2 * 1024 * 1024, // 2MB
          preview: true,
          span: 6,
          hint: 'Max 2MB, JPG or PNG'
        }
      ]
    },
    {
      title: 'Address Details',
      description: 'Where do you live?',
      columns: 2,
      fields: [
        {
          name: 'street',
          label: 'Street Address',
          type: 'text',
          placeholder: '123 Main St',
          required: true,
          span: 12
        },
        {
          name: 'city',
          label: 'City',
          type: 'text',
          placeholder: 'New York',
          required: true,
          span: 4
        },
        {
          name: 'state',
          label: 'State/Province',
          type: 'text',
          placeholder: 'NY',
          span: 4
        },
        {
          name: 'zipCode',
          label: 'ZIP/Postal Code',
          type: 'text',
          placeholder: '10001',
          required: true,
          span: 4
        },
        {
          name: 'country',
          label: 'Country',
          type: 'select',
          required: true,
          span: 12,
          options: [
            { label: 'United States', value: 'US', group: 'North America' },
            { label: 'Canada', value: 'CA', group: 'North America' },
            { label: 'Mexico', value: 'MX', group: 'North America' },
            { label: 'United Kingdom', value: 'UK', group: 'Europe' },
            { label: 'Germany', value: 'DE', group: 'Europe' },
            { label: 'France', value: 'FR', group: 'Europe' },
            { label: 'Japan', value: 'JP', group: 'Asia' },
            { label: 'China', value: 'CN', group: 'Asia' },
            { label: 'Australia', value: 'AU', group: 'Oceania' }
          ]
        }
      ]
    },
    {
      title: 'Preferences',
      description: 'Customize your experience',
      columns: 2,
      fields: [
        {
          name: 'theme',
          label: 'Theme',
          type: 'select',
          defaultValue: 'system',
          span: 6,
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'System', value: 'system' }
          ]
        },
        {
          name: 'language',
          label: 'Language',
          type: 'select',
          defaultValue: 'en',
          span: 6,
          options: [
            { label: 'English', value: 'en' },
            { label: 'Spanish', value: 'es' },
            { label: 'French', value: 'fr' },
            { label: 'German', value: 'de' },
            { label: 'Japanese', value: 'ja' }
          ]
        },
        {
          name: 'timezone',
          label: 'Timezone',
          type: 'select',
          span: 12,
          options: [
            { label: 'UTC-8 (Pacific)', value: 'America/Los_Angeles' },
            { label: 'UTC-5 (Eastern)', value: 'America/New_York' },
            { label: 'UTC+0 (London)', value: 'Europe/London' },
            { label: 'UTC+1 (Paris)', value: 'Europe/Paris' },
            { label: 'UTC+9 (Tokyo)', value: 'Asia/Tokyo' }
          ]
        },
        {
          name: 'notifications',
          label: 'Enable Notifications',
          type: 'switch',
          description: 'Receive push notifications',
          defaultValue: true,
          span: 6
        },
        {
          name: 'emailDigest',
          label: 'Email Digest',
          type: 'radio',
          span: 6,
          defaultValue: 'weekly',
          options: [
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Never', value: 'never' }
          ]
        }
      ]
    },
    {
      title: 'Security & Privacy',
      description: 'Manage your security settings',
      columns: 2,
      fields: [
        {
          name: 'visibility',
          label: 'Profile Visibility',
          type: 'select',
          defaultValue: 'public',
          span: 6,
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Friends Only', value: 'friends' },
            { label: 'Private', value: 'private' }
          ]
        },
        {
          name: 'twoFactor',
          label: 'Two-Factor Authentication',
          type: 'switch',
          description: 'Add extra security to your account',
          span: 6
        },
        {
          name: 'sessionTimeout',
          label: 'Session Timeout (minutes)',
          type: 'range',
          min: 15,
          max: 480,
          step: 15,
          defaultValue: 60,
          span: 6
        },
        {
          name: 'favoriteColor',
          label: 'Favorite Color',
          type: 'color',
          defaultValue: '#3b82f6',
          span: 6,
          hint: 'Used for personalization'
        }
      ]
    }
  ];

  const options: FormOptions = {
    validateOnChange: true,
    validateOnBlur: true,
    showReset: true,
    submitText: 'Save Settings',
    resetText: 'Reset to Default',
    loadingText: 'Saving...',
    autosave: true,
    autosaveDelay: 2000,
    storageKey: 'advanced-form',
    async onSubmit(data, helpers) {
      console.log('Form Data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Settings saved successfully!');
    },
    onChange(field, value, formData) {
      console.log(`Field ${field} changed to:`, value);
    },
    onValidate(errors) {
      if (Object.keys(errors).length > 0) {
        console.log('Validation errors:', errors);
      }
    }
  };

  let formRef: any;

  // Example: Programmatically set values
  function fillSampleData() {
    formRef?.setValues({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      birthDate: '1990-01-15',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      theme: 'dark',
      language: 'en',
      notifications: true,
      visibility: 'public'
    });
  }
</script>

<PageHeader 
  title="Advanced Form with Sections" 
  description="Multi-section form with complex layouts and all field types"
>
  {#snippet actions()}
    <button
      onclick={fillSampleData}
      class="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
    >
      Fill Sample Data
    </button>
  {/snippet}
</PageHeader>

<div class="max-w-5xl">
  <SuperForm bind:this={formRef} {sections} {options} />
</div>