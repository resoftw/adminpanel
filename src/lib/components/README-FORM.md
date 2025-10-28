# SuperForm Component

Komponen form yang powerful dan feature-rich untuk SvelteKit 5.

## Features Utama

✅ **All Field Types** - Text, email, password, number, textarea, select, checkbox, radio, switch, file, image, date, range, color, dan custom
✅ **Real-time Validation** - Validasi saat onChange, onBlur, atau onSubmit
✅ **Custom Validators** - Buat validator sendiri dengan logic kompleks
✅ **Multi-column Layout** - Grid system 12 kolom seperti Bootstrap
✅ **Conditional Fields** - Fields yang muncul/hilang berdasarkan kondisi
✅ **File Upload** - Support single/multiple files dengan preview
✅ **Form Sections** - Kelompokkan fields dalam sections
✅ **Auto-save** - Auto-save ke localStorage
✅ **Form Actions** - Support SvelteKit form actions atau custom handler
✅ **TypeScript** - Full type safety
✅ **Dark Mode** - Full dark mode support

## Quick Start

```svelte
<script lang="ts">
	import SuperForm from '$lib/components/SuperForm.svelte';
	import type { FormField, FormOptions } from '$lib/types/form';

	const fields: FormField[] = [
		{ name: 'name', label: 'Name', type: 'text', required: true },
		{ name: 'email', label: 'Email', type: 'email', required: true }
	];

	const options: FormOptions = {
		async onSubmit(data) {
			console.log(data);
		}
	};
</script>

<SuperForm {fields} {options} />
```
