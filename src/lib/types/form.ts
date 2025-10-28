export type FieldType = 
  | 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch'
  | 'date' | 'time' | 'datetime-local' | 'month' | 'week'
  | 'file' | 'image' | 'color' | 'range'
  | 'custom';

export type ValidationRule = 
  | 'required' 
  | 'email' 
  | 'url' 
  | 'min' 
  | 'max' 
  | 'minLength' 
  | 'maxLength' 
  | 'pattern' 
  | 'custom';

export interface FieldValidation {
  rule: ValidationRule;
  value?: any;
  message?: string;
  validator?: (value: any, formData: Record<string, any>) => boolean | string;
}

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
  group?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: any;
  value?: any;
  
  // Layout
  span?: 1 | 2 | 3 | 4 | 6 | 12; // Bootstrap-like grid (12 columns)
  order?: number;
  
  // Validation
  validations?: FieldValidation[];
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  
  // Options for select/radio/checkbox
  options?: SelectOption[];
  multiple?: boolean; // for select
  
  // File/Image specific
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  preview?: boolean; // show image preview
  
  // Number/Range specific
  min?: number;
  max?: number;
  step?: number;
  
  // Text specific
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  rows?: number; // for textarea
  
  // Conditional rendering
  visible?: boolean | ((formData: Record<string, any>) => boolean);
  
  // Help text
  hint?: string;
  description?: string;
  
  // Custom rendering
  render?: boolean;
  
  // Events
  onChange?: (value: any, formData: Record<string, any>) => void;
  onBlur?: (value: any) => void;
  onFocus?: () => void;
}

export interface FormSection {
  title?: string;
  description?: string;
  fields: FormField[];
  columns?: 1 | 2 | 3 | 4;
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface FormOptions {
  // Submit
  action?: string; // Form action URL
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'application/json';
  
  // Handler
  onSubmit?: (data: FormData | Record<string, any>, helpers: FormHelpers) => Promise<void> | void;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  
  // Validation
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
  
  // Layout
  layout?: 'vertical' | 'horizontal';
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  
  // Styling
  submitText?: string;
  resetText?: string;
  cancelText?: string;
  showReset?: boolean;
  showCancel?: boolean;
  
  // Loading
  loadingText?: string;
  
  // Callbacks
  onCancel?: () => void;
  onReset?: () => void;
  onChange?: (field: string, value: any, formData: Record<string, any>) => void;
  onValidate?: (errors: Record<string, string>) => void;
  
  // Advanced
  autosave?: boolean;
  autosaveDelay?: number; // milliseconds
  preserveOnUnmount?: boolean;
  storageKey?: string;
}

export interface FormHelpers {
  setFieldValue: (field: string, value: any) => void;
  setFieldError: (field: string, error: string) => void;
  clearFieldError: (field: string) => void;
  resetForm: () => void;
  submitForm: () => void;
  setLoading: (loading: boolean) => void;
  getFieldValue: (field: string) => any;
  getAllValues: () => Record<string, any>;
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
  isSubmitting: boolean;
  isValidating: boolean;
  submitCount: number;
}