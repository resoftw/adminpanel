<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Card from '$lib/components/Card.svelte';
</script>

<PageHeader 
  title="DataTable Documentation" 
  description="Complete guide to using the DataTable component"
/>

<div class="max-w-5xl space-y-6">
  <!-- Quick Start -->
  <Card title="Quick Start" padding="md">
    <div class="prose dark:prose-invert max-w-none">
      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<script lang="ts">
  import DataTable from '$lib/components/DataTable.svelte';
  import type { TableColumn, TableOptions } from '$lib/types/table';

  interface User {
    id: number;
    name: string;
    email: string;
  }

  const columns: TableColumn<User>[] = [
    { name: 'id', title: 'ID', sortable: true },
    { name: 'name', title: 'Name', sortable: true, resizable: true },
    { name: 'email', title: 'Email', sortable: true, resizable: true }
  ];

  const options: TableOptions<User> = {
    selectable: true,
    searchable: true,
    pagination: true
  };

  let data: User[] = [...];
<\/script>

<DataTable {columns} {data} {options} />`}</code></pre>
    </div>
  </Card>

  <!-- Column Types -->
  <Card title="Column Types" padding="md">
    <div class="space-y-4">
      <div>
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Available Types</h3>
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400">text</code>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Default text display</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400">number</code>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Formatted numbers</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400">date</code>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Date formatting</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400">boolean</code>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Check/X icons</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400">badge</code>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Colored badges</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400">avatar</code>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Avatar images</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400">custom</code>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Custom rendering</p>
          </div>
        </div>
      </div>
    </div>
  </Card>

  <!-- Resizable Columns -->
  <Card title="Resizable Columns" padding="md">
    <div class="prose dark:prose-invert max-w-none">
      <h3 class="text-lg font-semibold mb-3">How to Enable</h3>
      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>{`const columns: TableColumn[] = [
  {
    name: 'name',
    title: 'Product Name',
    width: '200px',      // Initial width
    minWidth: '120px',   // Minimum width
    resizable: true      // Enable resize
  }
]`}</code></pre>

      <h3 class="text-lg font-semibold mb-3 mt-6">Features</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        <li><strong>Drag to resize:</strong> Click and drag column borders</li>
        <li><strong>Double-click:</strong> Auto-fit to content width</li>
        <li><strong>Keyboard control:</strong> Use arrow keys while resizing</li>
        <li><strong>Min-width enforcement:</strong> Prevents columns from being too narrow</li>
        <li><strong>Visual feedback:</strong> Blue highlight during resize</li>
      </ul>

      <h3 class="text-lg font-semibold mb-3 mt-6">Keyboard Shortcuts</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center gap-3">
          <kbd class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded font-mono text-sm">←</kbd>
          <span class="text-sm">Decrease width by 1px</span>
        </div>
        <div class="flex items-center gap-3">
          <kbd class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded font-mono text-sm">→</kbd>
          <span class="text-sm">Increase width by 1px</span>
        </div>
        <div class="flex items-center gap-3">
          <kbd class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded font-mono text-sm">Shift + ←</kbd>
          <span class="text-sm">Decrease width by 10px</span>
        </div>
        <div class="flex items-center gap-3">
          <kbd class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded font-mono text-sm">Shift + →</kbd>
          <span class="text-sm">Increase width by 10px</span>
        </div>
        <div class="flex items-center gap-3">
          <kbd class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded font-mono text-sm">Esc</kbd>
          <span class="text-sm">Cancel and restore original</span>
        </div>
        <div class="flex items-center gap-3">
          <kbd class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded font-mono text-sm">Enter</kbd>
          <span class="text-sm">Apply resize</span>
        </div>
      </div>
    </div>
  </Card>

  <!-- Formatters & Styling -->
  <Card title="Custom Formatters & Styling" padding="md">
    <div class="prose dark:prose-invert max-w-none">
      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>{`const columns: TableColumn[] = [
  {
    name: 'price',
    title: 'Price',
    type: 'number',
    align: 'right',
    
    // Custom formatter
    formatter: (value) => \`$\${value.toFixed(2)}\`,
    
    // Custom cell styling
    style: (value, row) => {
      if (value > 1000) return 'font-weight: bold; color: green;';
      return '';
    },
    
    // Custom cell class
    cellClass: (value, row) => {
      if (value > 1000) return 'text-green-600 font-bold';
      return '';
    }
  }
]`}</code></pre>
    </div>
  </Card>

  <!-- AJAX Support -->
  <Card title="Server-Side Data (AJAX)" padding="md">
    <div class="prose dark:prose-invert max-w-none">
      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>{`const options: TableOptions = {
  serverSide: true,
  ajax: {
    url: '/api/users',
    method: 'GET',
    dataPath: 'data',        // Response path to data array
    totalPath: 'total',      // Response path to total count
    
    // Transform response if needed
    transform: (response) => {
      return {
        data: response.results,
        total: response.count
      };
    }
  },
  
  // Callbacks
  onSort: (column, direction) => {
    console.log('Sort changed:', column, direction);
  },
  onPageChange: (page) => {
    console.log('Page changed:', page);
  },
  onSearch: (query) => {
    console.log('Search:', query);
  }
}`}</code></pre>
    </div>
  </Card>

  <!-- Persistent Settings -->
  <Card title="Persistent Settings (LocalStorage)" padding="md">
    <div class="prose dark:prose-invert max-w-none">
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Use <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">DataTablePersistent</code> to auto-save settings:
      </p>
      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<script>
  import DataTablePersistent from '$lib/components/DataTablePersistent.svelte';
  
  let tableRef;
<\/script>

<DataTablePersistent
  bind:this={tableRef}
  {columns}
  {data}
  {options}
  storageKey="my-unique-table"
/>

<!-- Reset settings -->
<button onclick={() => tableRef.resetSettings()}>
  Reset Layout
</button>`}</code></pre>

      <h3 class="text-lg font-semibold mb-3 mt-6">What Gets Saved?</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        <li>Column widths (from resizing)</li>
        <li>Column visibility (show/hide)</li>
        <li>Items per page setting</li>
        <li>All settings stored with unique key</li>
      </ul>
    </div>
  </Card>

  <!-- All Options -->
  <Card title="Complete Options Reference" padding="md">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th class="px-4 py-2 text-left font-semibold">Option</th>
            <th class="px-4 py-2 text-left font-semibold">Type</th>
            <th class="px-4 py-2 text-left font-semibold">Default</th>
            <th class="px-4 py-2 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr>
            <td class="px-4 py-2"><code>selectable</code></td>
            <td class="px-4 py-2">boolean</td>
            <td class="px-4 py-2">false</td>
            <td class="px-4 py-2">Enable row selection</td>
          </tr>
          <tr>
            <td class="px-4 py-2"><code>searchable</code></td>
            <td class="px-4 py-2">boolean</td>
            <td class="px-4 py-2">false</td>
            <td class="px-4 py-2">Enable search box</td>
          </tr>
          <tr>
            <td class="px-4 py-2"><code>pagination</code></td>
            <td class="px-4 py-2">boolean | object</td>
            <td class="px-4 py-2">true</td>
            <td class="px-4 py-2">Enable pagination</td>
          </tr>
          <tr>
            <td class="px-4 py-2"><code>columnVisibility</code></td>
            <td class="px-4 py-2">boolean</td>
            <td class="px-4 py-2">false</td>
            <td class="px-4 py-2">Allow hide/show columns</td>
          </tr>
          <tr>
            <td class="px-4 py-2"><code>exportable</code></td>
            <td class="px-4 py-2">boolean</td>
            <td class="px-4 py-2">false</td>
            <td class="px-4 py-2">Enable CSV export</td>
          </tr>
          <tr>
            <td class="px-4 py-2"><code>striped</code></td>
            <td class="px-4 py-2">boolean</td>
            <td class="px-4 py-2">true</td>
            <td class="px-4 py-2">Alternating row colors</td>
          </tr>
          <tr>
            <td class="px-4 py-2"><code>hoverable</code></td>
            <td class="px-4 py-2">boolean</td>
            <td class="px-4 py-2">true</td>
            <td class="px-4 py-2">Highlight on hover</td>
          </tr>
          <tr>
            <td class="px-4 py-2"><code>compact</code></td>
            <td class="px-4 py-2">boolean</td>
            <td class="px-4 py-2">false</td>
            <td class="px-4 py-2">Reduce padding for compact view</td>
          </tr>
          <tr>
            <td class="px-4 py-2"><code>serverSide</code></td>
            <td class="px-4 py-2">boolean</td>
            <td class="px-4 py-2">false</td>
            <td class="px-4 py-2">Server-side processing</td>
          </tr>
          <tr>
            <td class="px-4 py-2"><code>rowActions</code></td>
            <td class="px-4 py-2">RowAction[]</td>
            <td class="px-4 py-2">[]</td>
            <td class="px-4 py-2">Actions for each row</td>
          </tr>
          <tr>
            <td class="px-4 py-2"><code>bulkActions</code></td>
            <td class="px-4 py-2">BulkAction[]</td>
            <td class="px-4 py-2">[]</td>
            <td class="px-4 py-2">Actions for selected rows</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>

  <!-- Examples -->
  <Card title="Live Examples" padding="md">
    <div class="space-y-4">
      <a 
        href="/admin/users" 
        class="block p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <span class="text-3xl">👥</span>
          <div>
            <h3 class="font-semibold text-blue-900 dark:text-blue-100">User Management</h3>
            <p class="text-sm text-blue-700 dark:text-blue-300">Basic table with filters and actions</p>
          </div>
        </div>
      </a>

      <a 
        href="/admin/super-table" 
        class="block p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <span class="text-3xl">💳</span>
          <div>
            <h3 class="font-semibold text-purple-900 dark:text-purple-100">Transaction Table</h3>
            <p class="text-sm text-purple-700 dark:text-purple-300">Advanced features with custom rendering</p>
          </div>
        </div>
      </a>

      <a 
        href="/admin/table-demo" 
        class="block p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-lg hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <span class="text-3xl">🚀</span>
          <div>
            <h3 class="font-semibold text-green-900 dark:text-green-100">Full Demo</h3>
            <p class="text-sm text-green-700 dark:text-green-300">Complete showcase with 100 records</p>
          </div>
        </div>
      </a>

      <a 
        href="/admin/employees" 
        class="block p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <span class="text-3xl">👔</span>
          <div>
            <h3 class="font-semibold text-orange-900 dark:text-orange-100">Employee Management</h3>
            <p class="text-sm text-orange-700 dark:text-orange-300">Persistent settings with progress bars</p>
          </div>
        </div>
      </a>
    </div>
  </Card>
</div>