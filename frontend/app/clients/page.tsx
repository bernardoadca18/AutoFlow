"use client";

import { useState } from "react";
import { useClients } from "../src/hooks";
import { Client } from "../src/types";
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Car,
  Phone,
  User,
  AlertCircle,
  CheckCircle,
  Download
} from "lucide-react";
import { exportClientsToCSV } from "../src/utils/export";

export default function ClientsPage() {
  const { clients, loading, error, createClient, updateClient, deleteClient } = useClients();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", plate: "", model: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateClient(editingId, formData);
        showNotification('success', 'Cliente atualizado com sucesso!');
        setEditingId(null);
      } else {
        await createClient(formData);
        showNotification('success', 'Cliente cadastrado com sucesso!');
      }
      setFormData({ name: "", phone: "", plate: "", model: "" });
    } catch (err) {
      showNotification('error', 'Erro ao salvar cliente');
    }
  };

  const handleEdit = (client: Client) => {
    setEditingId(client.id);
    const car = client.vehicles[0] || {};
    setFormData({
      name: client.name,
      phone: client.phone || "",
      plate: car.plate || "",
      model: car.model || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este cliente? Isso apagará todo o histórico relacionado.")) return;
    try {
      await deleteClient(id);
      showNotification('success', 'Cliente excluído com sucesso');
    } catch (err) {
      showNotification('error', 'Erro ao excluir cliente');
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone?.includes(searchTerm) ||
    client.vehicles.some(v =>
      v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
          <Users className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Clientes</h1>
        </div>
        <p className="text-gray-500">Cadastre e gerencie clientes e seus veículos</p>
      </div>

      {/* Form Card */}
      <div className={`bg-white rounded-xl shadow-sm border mb-8 p-6 ${editingId ? 'border-blue-500 border-2' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${editingId ? 'bg-blue-100' : 'bg-green-100'}`}>
              {editingId ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-green-600" />}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {editingId ? "Editar Cliente" : "Cadastrar Novo Cliente"}
            </h2>
          </div>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ name: "", phone: "", plate: "", model: "" });
              }}
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
            >
              <X size={16} /> Cancelar
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Cliente</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  placeholder="Nome completo"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  placeholder="(00) 00000-0000"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Placa do Veículo</label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  placeholder="ABC-1234"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all uppercase"
                  value={formData.plate}
                  onChange={e => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modelo do Veículo</label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  placeholder="Ex: Honda Civic EXL 2.0"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={formData.model}
                  onChange={e => setFormData({ ...formData, model: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-all ${
              editingId
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {editingId ? "Salvar Alterações" : "Cadastrar Cliente"}
          </button>
        </form>
      </div>

      {/* Search and List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Search Bar */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, telefone, placa ou modelo..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => exportClientsToCSV(filteredClients)}
              disabled={filteredClients.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Clients List */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Carregando clientes...</p>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Nenhum cliente encontrado</p>
              <p className="text-gray-400 text-sm">Cadastre seu primeiro cliente acima</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Veículo</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{client.name}</p>
                          <p className="text-sm text-gray-500">{client.phone || "Sem telefone"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {client.vehicles.length > 0 ? (
                        <div className="space-y-2">
                          {client.vehicles.map(v => (
                            <div key={v.id} className="flex items-center gap-2">
                              <Car className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-800">{v.model}</p>
                                <p className="text-sm text-gray-500">{v.plate}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Sem veículo cadastrado</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(client)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Count */}
        {!loading && filteredClients.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-semibold">{filteredClients.length}</span> de{' '}
              <span className="font-semibold">{clients.length}</span> clientes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
