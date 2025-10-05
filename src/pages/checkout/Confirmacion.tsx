import { CheckoutFacade } from "../../services/Facade/CheckoutFacade";

export default function Confirmacion(){
  const confirmar = async ()=>{
    const pedido = await new CheckoutFacade().confirmar();
    alert(`Pedido ${pedido.id} confirmado por S/ ${pedido.total}`);
    location.href="/";
  };
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Confirmar pedido</h1>
      <button className="bg-green-600 text-white rounded px-4 py-2" onClick={confirmar}>Confirmar</button>
    </div>
  );
}
