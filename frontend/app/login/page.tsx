"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../src/services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/login', { email });
      
      const { tenantId, name } = response.data;

      localStorage.setItem('controlcar_tenant_id', tenantId);
      
      if(name) localStorage.setItem('controlcar_user_name', name);

      router.push('/');
      
    } catch (error) {
      console.error("Erro no login", error);
      alert("Login falhou! Verifique se o e-mail está cadastrado no sistema.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-t-4 border-blue-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">WorkshopHub</h1>
          <p className="text-gray-500">Acesse sua oficina</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-mail Corporativo
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Entrando..." : "Acessar Sistema"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Demo para Apresentação Acadêmica</p>
        </div>
      </div>
    </div>
  );
}