"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Wrench,
  LogOut,
  Menu,
  X,
  Car,
  User
} from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Visão geral do sistema"
  },
  {
    href: "/clients",
    label: "Clientes",
    icon: Users,
    description: "Gerenciar clientes e veículos"
  },
  {
    href: "/os",
    label: "Ordens de Serviço",
    icon: Wrench,
    description: "Gerenciar OS"
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Usuário");
  const [userEmail, setUserEmail] = useState("usuario@email.com");

  useEffect(() => {
    const storedName = localStorage.getItem('controlcar_user_name');
    const storedEmail = localStorage.getItem('controlcar_user_email');
    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  if (pathname === "/login") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('controlcar_tenant_id');
    localStorage.removeItem('controlcar_user_name');
    localStorage.removeItem('controlcar_user_email');
    router.push('/login');
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-slate-800 text-white p-2 rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-72 bg-gradient-to-b from-slate-900 to-slate-800
          text-white flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Car size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AutoFlow Pro</h1>
              <p className="text-xs text-slate-400">Sistema de Gestão</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg">
            <div className="bg-blue-500 p-2 rounded-full">
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-slate-400 truncate">{userEmail}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-xs uppercase text-slate-500 font-semibold mb-3 px-3">
            Menu Principal
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200 group relative
                  ${active
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }
                `}
                title={item.description}
              >
                <Icon
                  size={20}
                  className={active ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                />
                <span className="font-medium">{item.label}</span>

                {active && (
                  <div className="absolute right-2 w-1.5 h-8 bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-slate-300 hover:bg-red-500/10 hover:text-red-400
              transition-all duration-200
            "
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>

          <div className="mt-4 px-4 py-2 bg-slate-800/50 rounded-lg">
            <p className="text-xs text-slate-500 text-center">
              © 2024 AutoFlow Pro
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
