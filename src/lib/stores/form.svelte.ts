import type { FormField, FormState, FormHelpers } from '$lib/types/form';
import { validateField } from '$lib/utils/validation';

export function createFormStore(fields: FormField[]) {
  // Initialize state
  const initialValues: Record<string, any> = {};
  fields.forEach(field => {
    initialValues[field.name] = field.defaultValue ?? field.value ?? getDefaultValue(field.type);
  });

  let state = $state<FormState>({
    values: { ...initialValues },
    errors: {},
    touched: {},
    dirty: {},
    isSubmitting: false,
    isValidating: false,
    submitCount: 0
  });

  function getDefaultValue(type: string): any {
    switch (type) {
      case 'checkbox':
      case 'switch':
        return false;
      case 'number':
      case 'range':
        return 0;
      case 'file':
      case 'image':
        return null;
      default:
        return '';
    }
  }

  const helpers: FormHelpers = {
    setFieldValue(field: string, value: any) {
      state.values[field] = value;
      state.dirty[field] = true;
      state.values = { ...state.values };
    },

    setFieldError(field: string, error: string) {
      state.errors[field] = error;
      state.errors = { ...state.errors };
    },

    clearFieldError(field: string) {
      delete state.errors[field];
      state.errors = { ...state.errors };
    },

    resetForm() {
      state.values = { ...initialValues };
      state.errors = {};
      state.touched = {};
      state.dirty = {};
      state.submitCount = 0;
    },

    submitForm() {
      // Implement in component
    },

    setLoading(loading: boolean) {
      state.isSubmitting = loading;
    },

    getFieldValue(field: string) {
      return state.values[field];
    },

    getAllValues() {
      return { ...state.values };
    }
  };

  return {
    get state() { return state; },
    helpers,

    setFieldValue(field: string, value: any) {
      helpers.setFieldValue(field, value);
    },

    setFieldTouched(field: string) {
      state.touched[field] = true;
      state.touched = { ...state.touched };
    },

    validateField(field: FormField) {
      const error = validateField(state.values[field.name], field, state.values);
      if (error) {
        helpers.setFieldError(field.name, error);
      } else {
        helpers.clearFieldError(field.name);
      }
      return !error;
    },

    validateAll(fields: FormField[]): boolean {
      state.isValidating = true;
      const newErrors: Record<string, string> = {};

      for (const field of fields) {
        const error = validateField(state.values[field.name], field, state.values);
        if (error) {
          newErrors[field.name] = error;
        }
      }

      state.errors = newErrors;
      state.isValidating = false;

      return Object.keys(newErrors).length === 0;
    },

    reset() {
      helpers.resetForm();
    }
  };
}

function getDefaultValue(type: string): any {
  switch (type) {
    case 'checkbox':
    case 'switch':
      return false;
    case 'number':
    case 'range':
      return 0;
    case 'file':
    case 'image':
      return null;
    default:
      return '';
  }
}