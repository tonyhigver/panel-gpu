import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4 font-bold text-xl">🔥 GPU Panel</div>
      <nav className="flex flex-col gap-2 p-4">
        <Link href="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link href="/server" className="hover:bg-gray-700 p-2 rounded">Servidor</Link>
        <Link href="/gpu" className="hover:bg-gray-700 p-2 rounded">GPU Control</Link>
        <Link href="/monitor" className="hover:bg-gray-700 p-2 rounded">Monitorización</Link>
        <Link href="/terminal" className="hover:bg-gray-700 p-2 rounded">Terminal</Link>
        <Link href="/backups" className="hover:bg-gray-700 p-2 rounded">Backups</Link>
        <Link href="/network" className="hover:bg-gray-700 p-2 rounded">Red / Firewall</Link>
        <Link href="/settings" className="hover:bg-gray-700 p-2 rounded mt-auto">⚙ Configuración</Link>
      </nav>
    </aside>
  );
}
