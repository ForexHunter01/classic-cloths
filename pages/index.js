import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

function formatBDT(amount) {
  return new Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(amount);
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState({});
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetch('/products.json')
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });
    const saved = localStorage.getItem('classic_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('classic_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const list = products.filter(
      p =>
        (category === 'all' || p.category === category) &&
        (query.trim() === '' || p.name.toLowerCase().includes(query.toLowerCase()))
    );
    setFiltered(list);
  }, [products, query, category]);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category || '')))];

  function addToCart(id) {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} onSearch={q => setQuery(q)} />
      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <section className="rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-700 text-white p-8 md:p-12 shadow-xl relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            দারুন দামে পছন্দের পণ্য
          </h2>
          <p className="mt-2 text-white/90 text-lg">
            Classic Cloths — Trusted online store
          </p>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full opacity-30 blur-3xl"></div>
        </section>

        {/* Category Filter */}
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  category === c ? 'bg-blue-700 text-white shadow-md' : 'bg-white border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="text-gray-600 text-sm mt-2 md:mt-0">
            মোট {filtered.length} পণ্য
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-8">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} onAdd={addToCart} />
          ))}
        </div>
      </main>
    </div>
  );
}
