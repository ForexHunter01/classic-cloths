import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header({cartCount, onSearch}) {
  const [q, setQ] = useState('');
  useEffect(()=>{ onSearch(q); },[q]);
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-black text-white grid place-items-center font-bold">C</div>
          <div>
            <Link href="/"><a className="text-lg font-semibold">Classic Cloths</a></Link>
            <p className="text-xs text-gray-500 -mt-0.5">Trusted online store</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="খুঁজুন..." className="pl-8 pr-3 py-2 border rounded-lg w-64" />
            <svg className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 3a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13m0-2C4.26 1 0 5.26 0 10.5S4.26 20 9.5 20s9.5-4.26 9.5-9.5S14.74 1 9.5 1z"/></svg>
          </div>

          <Link href="/checkout"><a className="px-3 py-2 border rounded-lg">Checkout</a></Link>
          <div className="px-3 py-2 border rounded-lg">Cart ({cartCount})</div>
        </div>
      </div>
    </header>
  );
}
