import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { listarTiendas, type Tienda } from "../../services/TiendasService";

const norm = (s:string)=>s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"");

export default function TiendasList(){
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");

  useEffect(()=>{ listarTiendas().then(setTiendas); },[]);
  useEffect(()=>{
    const p = new URLSearchParams(sp);
    if(q) p.set("q", q); else p.delete("q");
    setSp(p, { replace:true });
  },[q]);

  const results = useMemo(()=> !q ? tiendas :
    tiendas.filter(t=> norm(t.nombre).includes(norm(q)) || norm(t.ubicacion).includes(norm(q))), [tiendas,q]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Tiendas</h1>
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          className="border border-white/20 bg-transparent rounded px-3 py-2 w-full max-w-md"
          placeholder="Buscar: dunkin, starbucks, edificio..."
        />
      </div>
      {results.length===0 ? (
        <p className="text-gray-400">No encontramos tiendas para “{q}”.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map(t=>(
            <Link key={t.idTienda} to={`/tiendas/${t.idTienda}`}
              className="group rounded-xl overflow-hidden border border-white/10 hover:border-white/20 hover:shadow-lg transition">
              <img src={t.logo} alt={t.nombre} className="h-40 w-full object-cover group-hover:scale-[1.02] transition-transform duration-200"/>
              <div className="p-4">
                <h3 className="font-semibold">{t.nombre}</h3>
                <p className="text-sm text-gray-400">{t.ubicacion}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
