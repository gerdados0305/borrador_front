import { useEffect, useState, useRef } from "react";
import { api } from "../config/api";

type Mensaje = {
  emisor: "alumno" | "repartidor";
  texto: string;
  fecha: string;
};

export default function ChatPedido({ pedidoId, rolUsuario }: { pedidoId: number|string, rolUsuario: "alumno"|"repartidor" }) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [texto, setTexto] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Polling simple para simular tiempo real (si no usas WebSockets aún)
  useEffect(() => {
    const fetchMensajes = () => {
      api.get(`/pedidos/${pedidoId}/chat`)
        .then(({ data }) => setMensajes(data))
        .catch(console.error);
    };
    fetchMensajes();
    const interval = setInterval(fetchMensajes, 3000); // Actualiza cada 3s
    return () => clearInterval(interval);
  }, [pedidoId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return;
    try {
      await api.post(`/pedidos/${pedidoId}/chat`, { texto });
      setTexto("");
      // Fetch inmediato para ver mi propio mensaje
      const { data } = await api.get(`/pedidos/${pedidoId}/chat`);
      setMensajes(data);
    } catch (err) {
      console.error("Error enviando mensaje");
    }
  };

  return (
    <div className="flex flex-col h-80 bg-black/20 border border-white/10 rounded-lg overflow-hidden">
      <div className="bg-white/5 p-2 border-b border-white/10 text-sm font-bold">
        Chat del Pedido #{pedidoId}
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {mensajes.length === 0 && <p className="text-xs text-gray-500 text-center">Inicia la conversación...</p>}
        {mensajes.map((m, i) => {
          const esMio = m.emisor === rolUsuario;
          return (
            <div key={i} className={`flex ${esMio ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-3 py-1.5 rounded text-sm ${
                esMio ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
              }`}>
                <p>{m.texto}</p>
                <span className="text-[10px] opacity-60 block text-right">
                  {new Date(m.fecha).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={enviar} className="p-2 border-t border-white/10 flex gap-2">
        <input
          value={texto}
          onChange={e => setTexto(e.target.value)}
          className="flex-1 bg-white/5 rounded px-2 py-1 text-sm border border-white/10 focus:border-blue-500 outline-none"
          placeholder="Escribe un mensaje..."
        />
        <button type="submit" className="bg-blue-500 px-3 py-1 rounded text-sm font-bold">→</button>
      </form>
    </div>
  );
}