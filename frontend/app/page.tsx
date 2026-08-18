"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./src/hooks";
import { useRouter } from "next/navigation";
import {
  Users,
  Wrench,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  AlertCircle
} from "lucide-react";

interface DashboardStats {
  clients: number;
  orders: number;
  revenue: number;
  pendingOrders: number;
  finishedOrders: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    clients: 0,
    orders: 0,
    revenue: 0,
    pendingOrders: 0,
    finishedOrders: 0
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [authLoading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const statsCards = [
    {
      title: "Clientes Cadastrados",
      value: stats.clients,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "OS em Aberto",
      value: stats.pendingOrders,
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600"
    },
    {
      title: "OS Concluídas",
      value: stats.finishedOrders,
      icon: Wrench,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Faturamento Mensal",
      value: formatCurrency(stats.revenue),
      icon: DollarSign,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      isCurrency: true
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500">Bem-vindo ao AutoFlow Pro - Visão geral da sua oficina</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.textColor}`} />
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                <p className={`text-2xl font-bold ${card.isCurrency ? 'text-gray-900' : 'text-gray-900'}`}>
                  {card.isCurrency ? card.value : card.value.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/clients"
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
            >
              <Users className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Novo Cliente</span>
            </a>
            <a
              href="/os"
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group"
            >
              <Wrench className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Nova OS</span>
            </a>
            <a
              href="/clients"
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors group"
            >
              <Calendar className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Agenda</span>
            </a>
            <a
              href="/os"
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors group"
            >
              <AlertCircle className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Relatórios</span>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Sistema</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Total de Clientes</p>
                  <p className="text-xs text-gray-500">Cadastrados no sistema</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">{stats.clients}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Ordens Pendentes</p>
                  <p className="text-xs text-gray-500">Aguardando conclusão</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Faturamento Total</p>
                  <p className="text-xs text-gray-500">Mês atual</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">{formatCurrency(stats.revenue)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
