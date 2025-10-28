<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Card from '$lib/components/Card.svelte';
  import Button from '$lib/components/Button.svelte';

  const products = [
    { id: 1, name: 'Premium Widget', category: 'Electronics', price: '$299', stock: 45, image: '🖥️' },
    { id: 2, name: 'Classic Gadget', category: 'Accessories', price: '$99', stock: 120, image: '⌚' },
    { id: 3, name: 'Modern Tool', category: 'Tools', price: '$149', stock: 8, image: '🔧' },
    { id: 4, name: 'Smart Device', category: 'Electronics', price: '$399', stock: 0, image: '📱' },
  ];
</script>

<PageHeader 
  title="Products" 
  description="Manage your product inventory"
>
  {#snippet actions()}
    <Button variant="secondary" size="sm">
      <span>📊</span>
      Export
    </Button>
    <Button size="sm" href="/admin/products/new">
      <span>➕</span>
      Add Product
    </Button>
  {/snippet}
</PageHeader>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
  {#each products as product}
    <Card padding="none">
      <div class="p-3">
        <div class="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg mb-3 flex items-center justify-center text-6xl">
          {product.image}
        </div>
        
        <div class="space-y-2">
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">{product.name}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-gray-900 dark:text-white">{product.price}</span>
            <span class="text-xs px-2 py-0.5 rounded-full
              {product.stock > 20 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
              {product.stock > 0 && product.stock <= 20 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
              {product.stock === 0 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          
          <div class="flex gap-2 pt-2">
            <Button variant="secondary" size="sm">Edit</Button>
            <Button variant="ghost" size="sm">Delete</Button>
          </div>
        </div>
      </div>
    </Card>
  {/each}
</div>