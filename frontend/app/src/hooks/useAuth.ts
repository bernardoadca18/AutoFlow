import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  tenantId: string;
  name: string;
  email: string;
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (tenantId: string, name?: string, email?: string) => void;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tenantId = localStorage.getItem('controlcar_tenant_id');
    const name = localStorage.getItem('controlcar_user_name');
    const email = localStorage.getItem('controlcar_user_email');

    if (tenantId) {
      setUser({
        tenantId,
        name: name || 'Usuário',
        email: email || 'usuario@email.com'
      });
    }

    setLoading(false);
  }, []);

  const login = useCallback((tenantId: string, name?: string, email?: string) => {
    localStorage.setItem('controlcar_tenant_id', tenantId);
    if (name) localStorage.setItem('controlcar_user_name', name);
    if (email) localStorage.setItem('controlcar_user_email', email);

    setUser({
      tenantId,
      name: name || 'Usuário',
      email: email || 'usuario@email.com'
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('controlcar_tenant_id');
    localStorage.removeItem('controlcar_user_name');
    localStorage.removeItem('controlcar_user_email');
    setUser(null);
    router.push('/login');
  }, [router]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout
  };
}
