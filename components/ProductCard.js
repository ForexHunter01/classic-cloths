export default function ProductCard({p, onAdd}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="relative">
        <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
        <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded">{p.category}</div>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{p.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-500">Rating {p.rating.toFixed(1)}</div>
          <div className="font-semibold">৳{p.price}</div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {p.tags.slice(0,2).map(t=> <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>)}
          </div>
          <button onClick={()=>onAdd(p.id)} className="px-3 py-2 bg-black text-white rounded-xl">Add</button>
        </div>
      </div>
    </div>
  );
}
