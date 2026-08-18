import { useState, useCallback, useEffect } from 'react';
import { api } from '../services/api';
import { Client } from '../types';

interface UseClientsReturn {
  clients: Client[];
  loading: boolean;
  error: string | null;
  fetchClients: () => Promise<void>;
  createClient: (data: { name: string; phone?: string; plate?: string; model?: string }) => Promise<void>;
  updateClient: (id: string, data: { name: string; phone?: string; plate?: string; model?: string }) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
}

export function useClients(): UseClientsReturn {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/api/clients');
      setClients(res.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar clientes');
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createClient = useCallback(async (data: { name: string; phone?: string; plate?: string; model?: string }) => {
    try {
      setError(null);
      await api.post('/api/clients', data);
      await fetchClients();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar cliente');
      throw err;
    }
  }, [fetchClients]);

  const updateClient = useCallback(async (id: string, data: { name: string; phone?: string; plate?: string; model?: string }) => {
    try {
      setError(null);
      await api.put(`/api/clients/${id}`, data);
      await fetchClients();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar cliente');
      throw err;
    }
  }, [fetchClients]);

  const deleteClient = useCallback(async (id: string) => {
    try {
      setError(null);
      await api.delete(`/api/clients/${id}`);
      await fetchClients();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao excluir cliente');
      throw err;
    }
  }, [fetchClients]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient
  };
}
