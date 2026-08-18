"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
    if (pathname === "/login") {
        return null;
    }

  return (
    <aside className="w-64 bg-slate-800 text-white p-6 hidden md:block">
      <h1 className="text-2xl font-bold mb-8 text-blue-400">WorkshopHub</h1>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="hover:text-blue-300 transition-colors">
          Dashboard
        </Link>
        <Link href="/clients" className="hover:text-blue-300 transition-colors">
          Clientes
        </Link>
        <Link href="/os" className="hover:text-blue-300 transition-colors">
          Ordens de Serviço
        </Link>
      </nav>
    </aside>
  );
}