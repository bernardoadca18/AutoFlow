export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) {
    console.warn('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value ?? '';
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportClientsToCSV(clients: any[]) {
  const data = clients.map(client => ({
    Nome: client.name,
    Telefone: client.phone || 'N/A',
    Veiculos: client.vehicles?.map((v: any) => `${v.model} (${v.plate})`).join('; ') || 'Nenhum',
    Data_Cadastro: new Date(client.createdAt).toLocaleDateString('pt-BR')
  }));

  exportToCSV(data, 'clientes_autoflow');
}

export function exportServiceOrdersToCSV(orders: any[]) {
  const data = orders.map(order => ({
    ID: order.id.split('-')[0],
    Cliente: order.client?.name || 'N/A',
    Veiculo: order.vehicle ? `${order.vehicle.model} (${order.vehicle.plate})` : 'N/A',
    Descricao: order.problemDescription,
    Valor: `R$ ${Number(order.totalAmount).toFixed(2)}`,
    Status: order.status === 'open' ? 'Em Aberto' : 'Concluído',
    Data_Criacao: new Date(order.createdAt).toLocaleDateString('pt-BR'),
    Data_Conclusao: order.updatedAt ? new Date(order.updatedAt).toLocaleDateString('pt-BR') : 'N/A'
  }));

  exportToCSV(data, 'ordens_servico_autoflow');
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}
