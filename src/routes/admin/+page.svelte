<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Card from '$lib/components/Card.svelte';
  import Button from '$lib/components/Button.svelte';

  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', trend: 'up', icon: '👥' },
    { label: 'Revenue', value: '$45,231', change: '+23%', trend: 'up', icon: '💰' },
    { label: 'Orders', value: '892', change: '-5%', trend: 'down', icon: '🛒' },
    { label: 'Products', value: '456', change: '+8%', trend: 'up', icon: '📦' },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', product: 'Product A', amount: '$125', status: 'completed' },
    { id: '#1235', customer: 'Jane Smith', product: 'Product B', amount: '$89', status: 'pending' },
    { id: '#1236', customer: 'Bob Johnson', product: 'Product C', amount: '$210', status: 'processing' },
    { id: '#1237', customer: 'Alice Brown', product: 'Product D', amount: '$156', status: 'completed' },
  ];

  const statusColors = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  };
</script>

<PageHeader 
  title="Dashboard" 
  description="Welcome back! Here's what's happening today."
>
  {#snippet actions()}
    <Button variant="secondary" size="sm">
      <span>📅</span>
      Last 30 days
    </Button>
    <Button size="sm">
      <span>📊</span>
      Export
    </Button>
  {/snippet}
</PageHeader>

<!-- Stats Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
  {#each stats as stat}
    <Card padding="sm">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          <p class="text-xs mt-1 {stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
            {stat.change} from last month
          </p>
        </div>
        <div class="text-3xl opacity-50">{stat.icon}</div>
      </div>
    </Card>
  {/each}
</div>

<!-- Recent Orders -->
<Card title="Recent Orders" padding="none">
  {#snippet actions()}
    <Button variant="ghost" size="sm">View all</Button>
  {/snippet}
  
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead class="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
        <tr>
          <th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">Order ID</th>
          <th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">Customer</th>
          <th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">Product</th>
          <th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">Amount</th>
          <th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">Status</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        {#each recentOrders as order}
          <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-4 py-2.5 text-gray-900 dark:text-white font-medium">{order.id}</td>
            <td class="px-4 py-2.5 text-gray-600 dark:text-gray-400">{order.customer}</td>
            <td class="px-4 py-2.5 text-gray-600 dark:text-gray-400">{order.product}</td>
            <td class="px-4 py-2.5 text-gray-900 dark:text-white font-medium">{order.amount}</td>
            <td class="px-4 py-2.5">
              <span class="px-2 py-0.5 text-xs rounded-full {statusColors[order.status]}">
                {order.status}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</Card>