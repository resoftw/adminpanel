import type { FieldValidation, FormField } from '$lib/types/form';

export function validateField(
  value: any,
  field: FormField,
  formData: Record<string, any>
): string | null {
  // Required validation
  if (field.required && (value === null || value === undefined || value === '')) {
    return `${field.label} is required`;
  }

  // Skip other validations if empty and not required
  if (!value && !field.required) return null;

  // Built-in validations
  if (field.validations) {
    for (const validation of field.validations) {
      const error = runValidation(value, validation, field, formData);
      if (error) return error;
    }
  }

  // Type-specific validations
  switch (field.type) {
    case 'email':
      if (!isValidEmail(value)) {
        return 'Please enter a valid email address';
      }
      break;
    
    case 'url':
      if (!isValidUrl(value)) {
        return 'Please enter a valid URL';
      }
      break;
    
    case 'number':
      if (field.min !== undefined && value < field.min) {
        return `Minimum value is ${field.min}`;
      }
      if (field.max !== undefined && value > field.max) {
        return `Maximum value is ${field.max}`;
      }
      break;
    
    case 'text':
    case 'textarea':
      if (field.minLength !== undefined && value.length < field.minLength) {
        return `Minimum length is ${field.minLength} characters`;
      }
      if (field.maxLength !== undefined && value.length > field.maxLength) {
        return `Maximum length is ${field.maxLength} characters`;
      }
      if (field.pattern && !new RegExp(field.pattern).test(value)) {
        return `Please match the requested format`;
      }
      break;
    
    case 'file':
    case 'image':
      if (value instanceof File || value instanceof FileList) {
        const files = value instanceof FileList ? Array.from(value) : [value];
        
        if (field.maxFiles && files.length > field.maxFiles) {
          return `Maximum ${field.maxFiles} files allowed`;
        }
        
        for (const file of files) {
          if (field.maxSize && file.size > field.maxSize) {
            return `File size must not exceed ${formatFileSize(field.maxSize)}`;
          }
          
          if (field.accept) {
            const acceptedTypes = field.accept.split(',').map(t => t.trim());
            const fileType = file.type;
            const fileExt = '.' + file.name.split('.').pop();
            
            const isAccepted = acceptedTypes.some(type => {
              if (type.startsWith('.')) {
                return fileExt.toLowerCase() === type.toLowerCase();
              }
              if (type.endsWith('/*')) {
                return fileType.startsWith(type.replace('/*', ''));
              }
              return fileType === type;
            });
            
            if (!isAccepted) {
              return `File type not accepted. Allowed: ${field.accept}`;
            }
          }
        }
      }
      break;
  }

  return null;
}

function runValidation(
  value: any,
  validation: FieldValidation,
  field: FormField,
  formData: Record<string, any>
): string | null {
  const { rule, value: validationValue, message, validator } = validation;

  switch (rule) {
    case 'required':
      if (!value || (typeof value === 'string' && !value.trim())) {
        return message || `${field.label} is required`;
      }
      break;
    
    case 'email':
      if (!isValidEmail(value)) {
        return message || 'Please enter a valid email address';
      }
      break;
    
    case 'url':
      if (!isValidUrl(value)) {
        return message || 'Please enter a valid URL';
      }
      break;
    
    case 'min':
      if (typeof value === 'number' && value < validationValue) {
        return message || `Minimum value is ${validationValue}`;
      }
      break;
    
    case 'max':
      if (typeof value === 'number' && value > validationValue) {
        return message || `Maximum value is ${validationValue}`;
      }
      break;
    
    case 'minLength':
      if (typeof value === 'string' && value.length < validationValue) {
        return message || `Minimum length is ${validationValue} characters`;
      }
      break;
    
    case 'maxLength':
      if (typeof value === 'string' && value.length > validationValue) {
        return message || `Maximum length is ${validationValue} characters`;
      }
      break;
    
    case 'pattern':
      if (typeof value === 'string' && !new RegExp(validationValue).test(value)) {
        return message || 'Please match the requested format';
      }
      break;
    
    case 'custom':
      if (validator) {
        const result = validator(value, formData);
        if (typeof result === 'string') {
          return result;
        }
        if (result === false) {
          return message || 'Validation failed';
        }
      }
      break;
  }

  return null;
}

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function validateAllFields(
  fields: FormField[],
  formData: Record<string, any>
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const error = validateField(formData[field.name], field, formData);
    if (error) {
      errors[field.name] = error;
    }
  }

  return errors;
}