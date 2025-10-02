export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4 font-bold text-xl">🔥 GPU Panel</div>
      <nav className="flex flex-col gap-2 p-4">
        <a href="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</a>
        <a href="/server" className="hover:bg-gray-700 p-2 rounded">Servidor</a>
        <a href="/gpu" className="hover:bg-gray-700 p-2 rounded">GPU Control</a>
        <a href="/monitor" className="hover:bg-gray-700 p-2 rounded">Monitorización</a>
        <a href="/terminal" className="hover:bg-gray-700 p-2 rounded">Terminal</a>
        <a href="/backups" className="hover:bg-gray-700 p-2 rounded">Backups</a>
        <a href="/network" className="hover:bg-gray-700 p-2 rounded">Red / Firewall</a>
        <a href="/settings" className="hover:bg-gray-700 p-2 rounded mt-auto">⚙ Configuración</a>
      </nav>
    </aside>
  );
}
