<p align="center">
  🇧🇷 Português | 🇺🇸 <a href="./README.md">English</a>
</p>

# AutoFlow Pro

## Visão Geral

O **AutoFlow Pro** é uma plataforma SaaS B2B multi-tenant desenvolvida para modernizar e otimizar a gestão de oficinas mecânicas e centros automotivos.

Construído desde sua base com forte foco em escalabilidade, segurança, isolamento entre clientes (tenants) e eficiência operacional, o sistema centraliza o fluxo principal do negócio — desde o cadastro de clientes e veículos até a gestão de Ordens de Serviço (OS), controle de assinaturas e provisionamento administrativo.

A plataforma segue uma arquitetura híbrida e conteinerizada que separa claramente as responsabilidades entre a experiência do frontend e as regras de negócio do backend, garantindo manutenção facilitada, reprodutibilidade e deploy pronto para produção.

O AutoFlow Pro também foi desenvolvido com uma sólida base de engenharia de software, combinando engenharia tradicional de requisitos com execução ágil orientada por Scrum.

---

## Funcionalidades Principais

* **Arquitetura SaaS Multi-Tenant**

  * Isolamento de tenants via roteamento por subdomínio
  * Separação lógica de dados entre oficinas
  * Fundação segura e escalável para SaaS

* **Gestão de Oficinas**

  * Cadastro e gerenciamento de clientes
  * Cadastro e rastreamento de veículos
  * Gestão completa do ciclo de Ordens de Serviço (OS)

* **Control Plane**

  * Administração centralizada de assinantes
  * Gestão de planos e assinaturas
  * Provisionamento de novos tenants e ambientes

* **Autenticação e Acesso**

  * Fluxos seguros de login
  * Estrutura de acesso administrativo
  * Proteção de fluxos operacionais

* **Produtividade Operacional**

  * Interface rápida e responsiva para mecânicos e gestores
  * Navegação orientada ao negócio
  * Módulos críticos organizados por domínio

* **Infrastructure as Code**

  * Ambiente totalmente conteinerizado com Docker
  * Reprodutibilidade entre desenvolvimento e produção
  * Builds determinísticos e estratégia resiliente de deploy

---

## Stack Tecnológica

## Backend

* **Linguagem:** Python
* **Framework:** Django
* **Camada de API:** Django REST Framework
* **Arquitetura:** SaaS Multi-Tenant
* **Banco de Dados:** PostgreSQL
* **Provisionamento:** Arquitetura de Control Plane

### Módulos Backend

* `tenants/`
* `accounts/`
* `control_plane/`

---

## Frontend

* **Framework:** Next.js 16
* **Arquitetura:** App Router
* **Linguagem:** TypeScript
* **Biblioteca UI:** React
* **Estilização:** Tailwind CSS

### Principais Fluxos

* `/app/os` → Ordens de Serviço
* `/app/clients` → Gestão de Clientes
* `/app/login` → Autenticação
* `/app/components` → Componentes compartilhados

### Componentes UI Reutilizáveis

O projeto possui uma biblioteca completa de componentes UI:

* **Button** - Botões com variantes (primary, secondary, success, danger, warning, ghost)
* **Input** - Campos de entrada com validação e estados de erro
* **Card** - Cards com diferentes estilos e bordas
* **Modal** - Modais responsivos com fechar por ESC
* **Table** - Tabelas com paginação e estados de loading
* **Badge** - Badges coloridos para status
* **Toast** - Sistema de notificações com contexto
* **Loading** - Componentes de loading animados

### Hooks Customizados

O projeto implementa hooks customizados para gerenciamento de estado:

* **useAuth** - Gerenciamento de autenticação e sessão
* **useClients** - CRUD de clientes
* **useServiceOrders** - Gestão de ordens de serviço

---

## Infraestrutura

* **Conteinerização:** Docker
* **Orquestração:** Docker Compose
* **Administração de Banco:** pgAdmin
* **Padronização de Ambiente:** Dockerfiles dedicados para frontend e backend

---

## Arquitetura

```text
AutoFlow Pro
│
├── frontend/
│   ├── app/
│   │   ├── clients/          # Gestão de Clientes
│   │   ├── login/            # Autenticação
│   │   ├── os/               # Ordens de Serviço
│   │   ├── components/       # Componentes Compartilhados
│   │   │   └── ui/           # Componentes UI Reutilizáveis
│   │   └── src/
│   │       ├── services/     # Serviços de API
│   │       ├── hooks/        # Hooks Customizados
│   │       └── types/        # Definições TypeScript
│   │
│   └── Dockerfile
│
├── backend/
│   ├── system/
│   │   ├── tenants/          # Lógica Multi-Tenant
│   │   ├── accounts/         # Gestão de Contas
│   │   └── control_plane/    # Provisionamento
│   │
│   └── Dockerfile
│
├── db/
│   ├── init.sql
│   └── schema.sql
│
├── docs/
│   ├── Engenharia de Requisitos
│   ├── Casos de Uso
│   ├── User Stories
│   ├── Product Backlog
│   ├── Scrum Setup
│   └── Canvas de Modelo de Negócio
│
└── docker-compose.yaml
```

---

## Arquitetura Multi-Tenant

Um dos aspectos mais críticos do AutoFlow Pro é sua estratégia de isolamento entre tenants.

Cada oficina opera como um tenant isolado utilizando:

* Roteamento por subdomínio
* Separação lógica de tenants
* Fluxo dedicado de provisionamento
* Controle de acesso baseado em assinatura

Isso garante que a Oficina A jamais tenha acesso aos dados operacionais da Oficina B — um requisito crítico para conformidade, segurança e confiança em aplicações SaaS.

Essa arquitetura permite escalabilidade horizontal segura, mantendo administração centralizada através do Control Plane.

---

## Gestão de Banco de Dados

O AutoFlow Pro utiliza **PostgreSQL** como banco de dados relacional principal.

Recursos incluem:

* Migrações versionadas de esquema
* Persistência preparada para multi-tenant
* Scripts de inicialização para ambientes reproduzíveis
* Inspeção administrativa via pgAdmin

A configuração é suportada por:

```text
db/init.sql
db/schema.sql
```

---

## Setup

## 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/autoflow-pro.git
cd autoflow-pro
```

---

## 2. Subir os containers

```bash
docker compose up --build
```

Esse comando provisiona:

* Banco PostgreSQL
* pgAdmin
* API Django
* Aplicação frontend Next.js

Todos os serviços são executados em uma rede bridge isolada do Docker.

---

## 3. Acessar a aplicação

Frontend:

```text
http://localhost:3000
```

Backend API:

```text
http://localhost:8000
```

pgAdmin:

```text
http://localhost:5050
```

---

## Processo de Desenvolvimento

O AutoFlow Pro não foi desenvolvido apenas como um produto de software, mas também como um projeto completo de engenharia de software.

O ciclo de desenvolvimento inclui:

### Engenharia de Requisitos

* Estudo de Viabilidade
* Documentação Funcional
* Modelagem de Casos de Uso
* Matriz de Rastreabilidade de Requisitos
* Modelagem de Banco de Dados
* Canvas de Modelo de Negócio

### Gestão Ágil

* Adoção do framework Scrum
* Mapeamento de User Stories
* Definição do Product Backlog inicial
* Priorização técnica orientada por valor de negócio

Isso garantiu alinhamento entre decisões técnicas e entrega de valor real ao negócio.

---

## Documentação

O diretório `/docs` inclui:

* Estudo de Viabilidade
* Levantamento de Requisitos
* Casos de Uso
* User Stories
* Product Backlog
* Scrum Setup
* Documentação de Arquitetura
* Modelagem de Banco
* Matriz de Rastreabilidade
* Canvas de Modelo de Negócio

Isso fornece rastreabilidade completa desde a concepção de negócio até a implementação técnica.

---

## Licença

Projeto privado.

Uso interno e acadêmico.
