import { useState, useCallback, useEffect } from 'react';
import { api } from '../services/api';
import { ServiceOrder } from '../types';

interface UseServiceOrdersReturn {
  orders: ServiceOrder[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  createOrder: (data: { clientId: string; vehicleId: string; description: string; total: number }) => Promise<void>;
  finishOrder: (id: string) => Promise<void>;
  stats: {
    total: number;
    pending: number;
    finished: number;
    totalRevenue: number;
  };
}

export function useServiceOrders(): UseServiceOrdersReturn {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/api/os');
      setOrders(res.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar ordens de serviço');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (data: { clientId: string; vehicleId: string; description: string; total: number }) => {
    try {
      setError(null);
      await api.post('/api/os', data);
      await fetchOrders();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar ordem de serviço');
      throw err;
    }
  }, [fetchOrders]);

  const finishOrder = useCallback(async (id: string) => {
    try {
      setError(null);
      await api.patch(`/api/os/${id}/finish`);
      await fetchOrders();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao finalizar ordem de serviço');
      throw err;
    }
  }, [fetchOrders]);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'open').length,
    finished: orders.filter(o => o.status === 'finished').length,
    totalRevenue: orders
      .filter(o => o.status === 'finished')
      .reduce((sum, o) => sum + Number(o.totalAmount), 0)
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    finishOrder,
    stats
  };
}
