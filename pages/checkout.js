import { useEffect, useState } from 'react';
import Header from '../components/Header';

function formatBDT(amount){ return new Intl.NumberFormat('bn-BD',{style:'currency',currency:'BDT',maximumFractionDigits:0}).format(amount); }

export default function Checkout(){
  const [cart,setCart]=useState({});
  const [items,setItems]=useState([]);
  const [formAction, setFormAction] = useState(process.env.NEXT_PUBLIC_FORMSPREE_ACTION || '');

  useEffect(()=>{ const saved = localStorage.getItem('classic_cart'); if(saved) setCart(JSON.parse(saved)); fetch('/products.json').then(r=>r.json()).then(all=>{ const ids = Object.keys(JSON.parse(localStorage.getItem('classic_cart')||'{}')); setItems(ids.map(id=> ({...all.find(p=>p.id===id), qty: JSON.parse(localStorage.getItem('classic_cart')||'{}')[id]}))); }); },[]);

  const subtotal = items.reduce((s,i)=> s + i.price * i.qty, 0);

  return (
    <div>
      <Header cartCount={Object.values(cart).reduce((a,b)=>a+b,0)} onSearch={()=>{}} />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <div className="mt-4 bg-white rounded-lg p-4 shadow">
          <h2 className="font-medium">Order Summary</h2>
          <div className="mt-3 space-y-2">
            {items.length===0 && <div className="text-sm text-gray-500">আপনার কার্ট খালি।</div>}
            {items.map(it=> (
              <div key={it.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs text-gray-500">{it.qty} × ৳{it.price}</div>
                </div>
                <div className="font-semibold">৳{it.price * it.qty}</div>
              </div>
            ))}
            <div className="flex justify-between mt-2 font-semibold">Subtotal <div>৳{subtotal}</div></div>
          </div>
        </div>

        <form action={formAction || 'https://formspree.io/f/your-id'} method="POST" className="mt-6 space-y-4 bg-white p-4 rounded shadow">
          <h2 className="font-medium">Customer Details</h2>
          <input type="hidden" name="order_summary" value={JSON.stringify(items)} />
          <div className="grid gap-2 md:grid-cols-2">
            <input name="name" required placeholder="নাম" className="p-2 border rounded" />
            <input name="phone" required placeholder="ফোন" className="p-2 border rounded" />
          </div>
          <textarea name="address" required placeholder="ডেলিভারি ঠিকানা" className="w-full p-2 border rounded" />
          <div className="flex items-center gap-2">
            <input type="email" name="email" placeholder="ইমেইল (ঐচ্ছিক)" className="p-2 border rounded flex-1" />
            <button type="submit" className="px-4 py-2 bg-black text-white rounded">Place Order</button>
          </div>
          <p className="text-xs text-gray-500">আপনি Formspree / Netlify Forms ব্যবহার করে অর্ডার সাপ্লাই করতে পারেন।</p>
        </form>
      </main>
    </div>
  );
}
