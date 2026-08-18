<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-Private-red" alt="License">
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js">
  <img src="https://img.shields.io/badge/Django-5.2-green" alt="Django">
</p>

<p align="center">
  🇧🇷 Português | 🇺🇸 <a href="./README.md">English</a>
</p>

<h1 align="center">
  <img src="https://img.shields.io/badge/AutoFlow%20Pro-SaaS%20Platform-blue?style=for-the-badge&logo=car&logoColor=white" alt="AutoFlow Pro">
</h1>

<p align="center">
  <strong>Plataforma SaaS Multi-Tenant Profissional para Gestão de Oficinas Mecânicas</strong>
</p>

<p align="center">
  Sistema completo para modernização e otimização de gestão de oficinas automotivas,
  <br />
  com foco em escalabilidade, segurança e eficiência operacional.
</p>

---

## 📋 Visão Geral

**AutoFlow Pro** é uma plataforma B2B multi-tenant SaaS projetada para transformar a gestão de oficinas mecânicas e centros automotivos. Com uma arquitetura moderna e escalável, o sistema oferece:

- ✅ **Isolamento total de dados** entre tenants
- ✅ **Interface responsiva** e intuitiva
- ✅ **API RESTful** documentada
- ✅ **Arquitetura preparada para produção**
- ✅ **Infraestrutura como código**

---

## 🚀 Funcionalidades Principais

### Arquitetura SaaS Multi-Tenant
- Isolamento de tenants via roteamento por subdomínio
- Separação lógica de dados entre oficinas
- Provisionamento automatizado de novos tenants
- Controle de assinaturas e planos

### Gestão de Oficina
- Cadastro e gerenciamento de clientes
- Registro e rastreamento de veículos
- Ciclo de vida completo de Ordens de Serviço (OS)
- Dashboard com métricas em tempo real

### Control Plane
- Administração centralizada de assinantes
- Gestão de planos e cobranças
- Provisionamento de novos ambientes
- Monitoramento de tenants

### Autenticação & Segurança
- Fluxos de login seguros
- Estrutura de acesso administrativo
- Workflows operacionais protegidos
- Autenticação JWT

### Produtividade Operacional
- Interface rápida e responsiva
- Navegação focada no negócio
- Busca e filtros avançados
- Notificações em tempo real

---

## 🛠️ Stack Tecnológica

### Backend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Python** | 3.11+ | Linguagem principal |
| **Django** | 5.2 | Framework web |
| **Django REST Framework** | 3.14 | API RESTful |
| **PostgreSQL** | 16 | Banco de dados relacional |
| **Prisma** | 5.22 | ORM para API Node.js |

#### Módulos Backend
```
backend/
├── system/           # Django Control Plane
│   ├── tenants/      # Gestão de tenants
│   ├── accounts/     # Autenticação e usuários
│   └── control_plane/ # Configurações centrais
└── app/              # API Node.js Principal
    └── src/
        ├── server.js
        └── prisma/
```

### Frontend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Next.js** | 16.0 | Framework React |
| **React** | 19.2 | Biblioteca UI |
| **TypeScript** | 5.x | Tipagem estática |
| **Tailwind CSS** | 4.x | Framework CSS |
| **Lucide React** | 0.555 | Ícones SVG |

#### Estrutura Frontend
```
frontend/
├── app/
│   ├── os/           # Ordens de Serviço
│   ├── clients/      # Gestão de Clientes
│   ├── login/        # Autenticação
│   ├── components/   # Componentes reutilizáveis
│   │   ├── ui/       # Design System
│   │   └── Sidebar.tsx
│   └── src/
│       ├── services/ # API clients
│       └── types/    # Tipos TypeScript
└── package.json
```

### Infraestrutura

| Serviço | Tecnologia |
|---------|------------|
| **Conteinerização** | Docker |
| **Orquestração** | Docker Compose |
| **Administração de Banco** | pgAdmin 4 |
| **Reverse Proxy** | Nginx (produção) |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        AutoFlow Pro                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐        ┌──────────────────────────────┐  │
│  │   Frontend    │◄──────►│     Backend APIs             │  │
│  │   Next.js     │        │                              │  │
│  │   Port: 3000  │        │  ┌──────────┐ ┌───────────┐ │  │
│  └──────────────┘        │  │ Node.js  │ │  Django   │ │  │
│                          │  │ API      │ │  Control  │ │  │
│                          │  │ Port     │ │  Plane    │ │  │
│                          │  │ 3001     │ │  Port 8000│ │  │
│                          │  └──────────┘ └───────────┘ │  │
│                          └──────────┬───────────────────┘  │
│                                     │                        │
│                          ┌──────────▼───────────┐           │
│                          │   PostgreSQL         │           │
│                          │   Database           │           │
│                          │   Port: 5433         │           │
│                          └──────────────────────┘           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Arquitetura Multi-Tenant

O AutoFlow Pro implementa uma estratégia robusta de isolamento de tenants:

- **Roteamento por subdomínio** para identificação de tenants
- **Separação lógica** de dados entre oficinas
- **Flow de provisionamento** dedicado
- **Controle de acesso** baseado em assinatura

**Resultado**: Cada oficina opera em um ambiente completamente isolado, garantindo segurança e conformidade com LGPD/GDPR.

---

## 💾 Banco de Dados

O sistema utiliza **PostgreSQL** como banco de dados primário:

- Migrações versionadas
- Estratégia de persistência tenant-aware
- Scripts de inicialização para ambientes reproduzíveis
- Administração via pgAdmin

```bash
db/
├── init.sql      # Inicialização
└── schema.sql    # Schema principal
```

---

## 🚀 Quick Start

### Pré-requisitos

- Docker 24.0+
- Docker Compose 2.20+
- Git

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/autoflow-pro.git
cd autoflow-pro

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 3. Inicie os containers
docker compose up --build -d
```

### Acessos

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:3000 | Interface web |
| **Node API** | http://localhost:3001 | API principal |
| **Django API** | http://localhost:8000 | Control Plane API |
| **pgAdmin** | http://localhost:5050 | Admin do banco |

### Credenciais pgAdmin

```
Email: admin@autoflowpro.com
Senha: (definida no .env)
```

---

## 📝 Variáveis de Ambiente

```env
# Database
POSTGRES_DB=autoflow_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha_segura
POSTGRES_PORT=5433

# Backend Node.js
NODE_API_PORT=3001
DATABASE_URL=postgresql://postgres:senha@db:5432/autoflow_db
JWT_SECRET=seu_jwt_secret_minimo_32_chars

# Backend Django
DJANGO_SECRET_KEY=sua_django_secret_key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=*

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=AutoFlow Pro
```

---

## 📚 Documentação

A documentação completa está disponível no diretório `/docs`:

- ✅ Estudo de Viabilidade
- ✅ Levantamento de Requisitos
- ✅ Casos de Uso
- ✅ User Stories
- ✅ Product Backlog
- ✅ Setup Scrum
- ✅ Modelagem de Banco de Dados
- ✅ Matriz de Rastreabilidade
- ✅ Business Model Canvas

---

## 🧪 Testes

```bash
# Backend tests
cd backend/system
python manage.py test

# Frontend tests
cd frontend
npm test
```

---

## 🤝 Contribuição

Este é um projeto privado para uso interno e acadêmico.

---

## 📄 Licença

**Projeto Privado** - Uso interno e acadêmico apenas.

---

## 👨‍💻 Autor

Desenvolvido como projeto de engenharia de software com fundamentação sólida em:

- Requirements Engineering
- Agile Methodologies (Scrum)
- Clean Architecture
- DevOps Best Practices
- Multi-Tenant SaaS Patterns

---

<p align="center">
  <strong>AutoFlow Pro</strong> - Transformando a gestão de oficinas mecânicas
  <br />
  <sub>© 2024 Todos os direitos reservados</sub>
</p>
