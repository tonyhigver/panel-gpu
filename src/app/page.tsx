export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Título */}
      <h1 className="text-2xl font-bold">📊 Dashboard del Servidor</h1>
      <p className="text-gray-600">
        Aquí verás un resumen del estado de tu servidor Hetzner + GPU dinámica.
      </p>

      {/* Tarjetas de estado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-sm text-gray-500">CPU Usage</h2>
          <p className="text-xl font-bold">-- %</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-sm text-gray-500">RAM Usage</h2>
          <p className="text-xl font-bold">-- GB</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-sm text-gray-500">GPU Estado</h2>
          <p className="text-xl font-bold">🟡 En espera</p>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">⚡ Acciones rápidas</h2>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Encender GPU
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            Reiniciar servidor
          </button>
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded">
            Abrir terminal
          </button>
        </div>
      </div>

    </div>
  );
}
