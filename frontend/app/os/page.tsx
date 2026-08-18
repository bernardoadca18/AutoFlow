"use client";

import { useState } from "react";
import { useServiceOrders } from "../src/hooks";
import {
  Wrench,
  Plus,
  Search,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  Car,
  AlertCircle,
  FileText,
  Download
} from "lucide-react";
import { exportServiceOrdersToCSV } from "../src/utils/export";

export default function OSPage() {
  const { orders, loading, error, createOrder, finishOrder, stats } = useServiceOrders();
  const [formData, setFormData] = useState({
    clientId: "",
    vehicleId: "",
    description: "",
    total: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'finished'>('all');

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder({
        clientId: formData.clientId,
        vehicleId: formData.vehicleId,
        description: formData.description,
        total: Number(formData.total)
      });
      showNotification('success', 'Ordem de Serviço criada com sucesso!');
      setFormData({ clientId: "", vehicleId: "", description: "", total: "" });
    } catch (err) {
      showNotification('error', 'Erro ao criar OS. Verifique se os IDs de Cliente e Veículo existem.');
    }
  };

  const handleFinish = async (id: string) => {
    if (!confirm("Confirmar conclusão do serviço? O valor entrará no faturamento mensal.")) return;
    try {
      await finishOrder(id);
      showNotification('success', 'Serviço concluído com sucesso!');
    } catch (err) {
      showNotification('error', 'Erro ao finalizar serviço');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const filteredOrders = orders
    .filter(os => {
      const matchesSearch =
        os.problemDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        os.client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        os.vehicle?.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        os.vehicle?.plate.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filter === 'all' ||
        (filter === 'pending' && os.status === 'open') ||
        (filter === 'finished' && os.status === 'finished');

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="animate-fadeIn">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Wrench className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Ordens de Serviço</h1>
        </div>
        <p className="text-gray-500">Gerencie e acompanhe todas as ordens de serviço</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de OS</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Concluídas</p>
              <p className="text-2xl font-bold text-green-600">{stats.finished}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Faturamento</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* New OS Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Plus className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Nova Ordem de Serviço</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID do Cliente</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  placeholder="UUID do cliente"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={formData.clientId}
                  onChange={e => setFormData({ ...formData, clientId: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID do Veículo</label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  placeholder="UUID do veículo"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={formData.vehicleId}
                  onChange={e => setFormData({ ...formData, vehicleId: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição do Serviço</label>
              <textarea
                placeholder="Descreva o defeito ou serviço a ser realizado..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Valor do Serviço (R$)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={formData.total}
                  onChange={e => setFormData({ ...formData, total: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
          >
            Abrir Ordem de Serviço
          </button>
        </form>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por descrição, cliente, veículo ou placa..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFilter('finished')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'finished'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Concluídas
            </button>
            <button
              onClick={() => exportServiceOrdersToCSV(filteredOrders)}
              disabled={filteredOrders.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              Exportar CSV
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando ordens de serviço...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhuma ordem de serviço encontrada</p>
            <p className="text-gray-400 text-sm">Abra sua primeira OS acima</p>
          </div>
        ) : (
          filteredOrders.map((os) => {
            const isFinished = os.status === 'finished';

            return (
              <div
                key={os.id}
                className={`bg-white rounded-xl shadow-sm border p-6 card-hover ${
                  isFinished ? 'border-gray-300 opacity-75' : 'border-blue-500'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                        isFinished
                          ? 'bg-gray-200 text-gray-600'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {isFinished ? 'Concluído' : 'Em Aberto'}
                      </span>
                      <span className="text-xs text-gray-400">#{os.id.split('-')[0]}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {os.problemDescription}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{os.client?.name || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-gray-400" />
                        <span>{os.vehicle?.model || "N/A"} ({os.vehicle?.plate || "N/A"})</span>
                      </div>
                    </div>

                    {isFinished && os.updatedAt && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <CheckCircle size={14} />
                        Faturado em {new Date(os.updatedAt).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Valor</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(Number(os.totalAmount))}
                      </p>
                    </div>

                    {!isFinished && (
                      <button
                        onClick={() => handleFinish(os.id)}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
                      >
                        <CheckCircle size={18} />
                        Concluir Serviço
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
