import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

api.interceptors.request.use((config) => {
  const tenantId = localStorage.getItem('controlcar_tenant_id');
  
  if (tenantId) {
    config.headers['x-tenant-id'] = tenantId;
  }
  return config;
});