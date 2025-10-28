import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Mock data
const allProducts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Books', 'Food'][Math.floor(Math.random() * 4)],
  price: Math.floor(Math.random() * 1000) + 10,
  stock: Math.floor(Math.random() * 100),
  status: ['published', 'draft', 'archived'][Math.floor(Math.random() * 3)]
}));

export const GET: RequestHandler = async ({ url }) => {
  const page = parseInt(url.searchParams.get('page') || '1');
  const perPage = parseInt(url.searchParams.get('perPage') || '10');
  const search = url.searchParams.get('search') || '';
  const sortBy = url.searchParams.get('sortBy') || '';
  const sortDir = url.searchParams.get('sortDir') || 'asc';

  // Filter
  let filtered = allProducts;
  if (search) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort
  if (sortBy) {
    filtered.sort((a, b) => {
      const aVal = (a as any)[sortBy];
      const bVal = (b as any)[sortBy];
      const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return sortDir === 'asc' ? comparison : -comparison;
    });
  }

  // Paginate
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginated = filtered.slice(start, end);

  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return json({
    data: paginated,
    total: filtered.length,
    page,
    perPage
  });
};