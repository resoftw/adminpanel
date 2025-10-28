<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md';
    href?: string;
    onclick?: () => void;
    children: any;
    disabled?: boolean;
    type?: 'button' | 'submit';
  }

  let { 
    variant = 'primary', 
    size = 'md', 
    href, 
    onclick, 
    children,
    disabled = false,
    type = 'button'
  }: Props = $props();

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400',
    secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  const baseClass = `inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]}`;
</script>

{#if href}
  <a {href} class={baseClass}>
    {@render children()}
  </a>
{:else}
  <button {type} {onclick} {disabled} class={baseClass}>
    {@render children()}
  </button>
{/if}