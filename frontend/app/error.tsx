"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative text-center max-w-md">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-full shadow-lg shadow-red-500/30 mb-8">
          <AlertTriangle className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-6xl font-bold text-white mb-4">Erro</h1>
        <h2 className="text-2xl font-semibold text-white mb-2">Algo deu errado</h2>
        <p className="text-slate-400 mb-8">
          Ocorreu um erro inesperado. Por favor, tente novamente ou entre em contato com o suporte.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all"
          >
            <RefreshCw size={20} />
            Tentar Novamente
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all"
          >
            <Home size={20} />
            Ir para Dashboard
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left">
            <p className="text-red-300 text-xs font-mono break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
