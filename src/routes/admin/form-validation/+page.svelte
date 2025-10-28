<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Card from '$lib/components/Card.svelte';
  import SuperForm from '$lib/components/SuperForm.svelte';
  import type { FormField, FormOptions } from '$lib/types/form';

  const fields: FormField[] = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'johndoe',
      required: true,
      span: 12,
      validations: [
        { rule: 'minLength', value: 3, message: 'Username must be at least 3 characters' },
        { rule: 'maxLength', value: 20, message: 'Username must not exceed 20 characters' },
        { 
          rule: 'pattern', 
          value: '^[a-zA-Z0-9_]+$', 
          message: 'Username can only contain letters, numbers, and underscores' 
        },
        {
          rule: 'custom',
          message: 'Username is already taken',
          validator: async (value) => {
            // Simulate API check
            await new Promise(resolve => setTimeout(resolve, 500));
            const takenUsernames = ['admin', 'root', 'user', 'test'];
            return !takenUsernames.includes(value.toLowerCase());
          }
        }
      ]
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'user@example.com',
      required: true,
      span: 12,
      validations: [
        {
          rule: 'custom',
          validator: (value) => {
            const blockedDomains = ['tempmail.com', 'throwaway.email'];
            const domain = value.split('@')[1];
            if (blockedDomains.includes(domain)) {
              return 'Temporary email addresses are not allowed';
            }
            return true;
          }
        }
      ]
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      required: true,
      span: 12,
      validations: [
        { rule: 'minLength', value: 8, message: 'Password must be at least 8 characters' },
        {
          rule: 'custom',
          validator: (value) => {
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumbers = /\d/.test(value);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            
            if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
            if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
            if (!hasNumbers) return 'Password must contain at least one number';
            if (!hasSpecialChar) return 'Password must contain at least one special character';
            
            return true;
          }
        }
      ],
      hint: 'Must contain uppercase, lowercase, number, and special character'
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Re-enter password',
      required: true,
      span: 12,
      validations: [
        {
          rule: 'custom',
          validator: (value, formData) => {
            if (value !== formData.password) {
              return 'Passwords do not match';
            }
            return true;
          }
        }
      ]
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      span: 6,
      validations: [
        {
          rule: 'custom',
          validator: (value) => {
            if (value < 18) {
              return 'You must be at least 18 years old';
            }
            if (value > 120) {
              return 'Please enter a valid age';
            }
            return true;
          }
        }
      ]
    },
    {
      name: 'website',
      label: 'Website (Optional)',
      type: 'url',
      placeholder: 'https://example.com',
      span: 6,
      validations: [
        {
          rule: 'custom',
          validator: (value) => {
            if (!value) return true; // Optional field
            try {
              const url = new URL(value);
              if (url.protocol !== 'https:') {
                return 'Website must use HTTPS';
              }
              return true;
            } catch {
              return 'Please enter a valid URL';
            }
          }
        }
      ]
    },
    {
      name: 'termsAccepted',
      label: 'I accept the Terms and Conditions',
      type: 'checkbox',
      span: 12,
      validations: [
        {
          rule: 'custom',
          validator: (value) => {
            if (!value) {
              return 'You must accept the terms and conditions';
            }
            return true;
          }
        }
      ]
    }
  ];

  const options: FormOptions = {
    columns: 12,
    validateOnChange: true,
    validateOnBlur: true,
    showReset: true,
    submitText: 'Sign Up',
    async onSubmit(data, helpers) {
      console.log('Form submitted:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Account created successfully!');
    },
    onValidate(errors) {
      console.log('Validation errors:', errors);
    }
  };
</script>

<PageHeader 
  title="Advanced Validation Form" 
  description="Form with complex validation rules and custom validators"
/>

<div class="max-w-3xl">
  <div class="mb-6 space-y-4">
    <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
      <h3 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">🔒 Password Requirements</h3>
      <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
        <li>• Minimum 8 characters</li>
        <li>• At least one uppercase letter</li>
        <li>• At least one lowercase letter</li>
        <li>• At least one number</li>
        <li>• At least one special character (!@#$%^&*)</li>
      </ul>
    </div>

    <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <h3 class="font-semibold text-red-900 dark:text-red-100 mb-2">⚠️ Blocked Usernames</h3>
      <p class="text-sm text-red-700 dark:text-red-300">
        Try entering: admin, root, user, or test - these are already taken
      </p>
    </div>
  </div>

  <Card padding="md">
    <SuperForm {fields} {options} />
  </Card>
</div>