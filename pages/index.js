import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

function formatBDT(amount){ return new Intl.NumberFormat('bn-BD',{style:'currency',currency:'BDT',maximumFractionDigits:0}).format(amount); }

export default function Home(){
  const [products,setProducts]=useState([]);
  const [filtered,setFiltered]=useState([]);
  const [cart,setCart]=useState({});
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('all');

  useEffect(()=>{ fetch('/products.json').then(r=>r.json()).then(data=>{ setProducts(data); setFiltered(data); }); 
    const saved = localStorage.getItem('classic_cart'); if(saved) setCart(JSON.parse(saved));
  },[]);

  useEffect(()=>{ localStorage.setItem('classic_cart', JSON.stringify(cart)); },[cart]);

  useEffect(()=>{ let list = products.filter(p=> (category==='all' || p.category===category) && (query.trim()==='' || p.name.toLowerCase().includes(query.toLowerCase())) ); setFiltered(list); },[products,query,category]);

  const categories = ['all', ...Array.from(new Set(products.map(p=>p.category||'')))];

  function addToCart(id){ setCart(prev=>({...prev, [id]:(prev[id]||0)+1})); }

  const cartCount = Object.values(cart).reduce((a,b)=>a+b,0);

  return (
    <div className="min-h-screen">
      <Header cartCount={cartCount} onSearch={(q)=>setQuery(q)} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 text-white p-6 md:p-10 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold">দারুন দামে পছন্দের পণ্য</h2>
          <p className="mt-1 text-white/80">Classic Cloths — Trusted online store</p>
        </section>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {categories.map(c=> <button key={c} onClick={()=>setCategory(c)} className={`px-3 py-2 rounded ${category===c?'bg-black text-white':'bg-gray-100'}`}>{c}</button>)}
          </div>
          <div className="text-sm text-gray-500">মোট {filtered.length} পণ্য</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6">
          {filtered.map(p=> <ProductCard key={p.id} p={p} onAdd={addToCart} />)}
        </div>
      </main>
    </div>
  );
}
