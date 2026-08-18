<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-Private-red" alt="License">
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js">
  <img src="https://img.shields.io/badge/Django-5.2-green" alt="Django">
</p>

<p align="center">
  English | <a href="./README.pt-BR.md">Português</a>
</p>

<h1 align="center">
  <img src="https://img.shields.io/badge/AutoFlow%20Pro-SaaS%20Platform-blue?style=for-the-badge&logo=car&logoColor=white" alt="AutoFlow Pro">
</h1>

<p align="center">
  <strong>Professional Multi-Tenant SaaS Platform for Auto Shop Management</strong>
</p>

<p align="center">
  A complete system for modernizing and optimizing automotive shop management,
  <br />
  focused on scalability, security, and operational efficiency.
</p>

---

## Overview

**AutoFlow Pro** is a B2B multi-tenant SaaS platform designed to transform auto shop and automotive center management. With a modern and scalable architecture, the system offers:

- **Complete data isolation** between tenants
- **Responsive and intuitive** interface
- **Documented RESTful API**
- **Production-ready architecture**
- **Infrastructure as Code**

---

## Key Features

### Multi-Tenant SaaS Architecture
- Tenant isolation via subdomain-based routing
- Logical data separation between shops
- Automated provisioning of new tenants
- Subscription and plan control

### Shop Management
- Customer registration and management
- Vehicle registration and tracking
- Complete Service Order (SO) lifecycle
- Dashboard with real-time metrics

### Control Plane
- Centralized subscriber administration
- Plan and billing management
- New environment provisioning
- Tenant monitoring

### Authentication & Security
- Secure login flows
- Administrative access structure
- Protected operational workflows
- JWT Authentication

### Operational Productivity
- Fast and responsive interface
- Business-focused navigation
- Advanced search and filters
- Real-time notifications

---

## Technology Stack

### Backend

| Technology | Version | Description |
|------------|---------|-------------|
| **Python** | 3.11+ | Main language |
| **Django** | 5.2 | Web framework |
| **Django REST Framework** | 3.14 | RESTful API |
| **PostgreSQL** | 16 | Relational database |
| **Prisma** | 5.22 | ORM for Node.js API |

#### Backend Modules
```
backend/
├── system/           # Django Control Plane
│   ├── tenants/      # Tenant management
│   ├── accounts/     # Authentication and users
│   └── control_plane/ # Central settings
└── app/              # Main Node.js API
    └── src/
        ├── server.js
        └── prisma/
```

### Frontend

| Technology | Version | Description |
|------------|---------|-------------|
| **Next.js** | 16.0 | React framework |
| **React** | 19.2 | UI library |
| **TypeScript** | 5.x | Static typing |
| **Tailwind CSS** | 4.x | CSS framework |
| **Lucide React** | 0.555 | SVG icons |

#### Frontend Structure
```
frontend/
├── app/
│   ├── os/           # Service Orders
│   ├── clients/      # Client Management
│   ├── login/        # Authentication
│   ├── components/   # Reusable components
│   │   ├── ui/       # Design System
│   │   └── Sidebar.tsx
│   └── src/
│       ├── services/ # API clients
│       └── types/    # TypeScript types
└── package.json
```

### Infrastructure

| Service | Technology |
|---------|------------|
| **Containerization** | Docker |
| **Orchestration** | Docker Compose |
| **Database Admin** | pgAdmin 4 |
| **Reverse Proxy** | Nginx (production) |

---

## Architecture

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

## Multi-Tenant Architecture

AutoFlow Pro implements a robust tenant isolation strategy:

- **Subdomain-based routing** for tenant identification
- **Logical separation** of data between shops
- **Dedicated provisioning** flow
- **Subscription-based** access control

**Result**: Each shop operates in a completely isolated environment, ensuring security and compliance with GDPR/LGPD.

---

## Database

The system uses **PostgreSQL** as the primary database:

- Versioned migrations
- Tenant-aware persistence strategy
- Initialization scripts for reproducible environments
- Administration via pgAdmin

```bash
db/
├── init.sql      # Initialization
└── schema.sql    # Main schema
```

---

## Quick Start

### Prerequisites

- Docker 24.0+
- Docker Compose 2.20+
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/autoflow-pro.git
cd autoflow-pro

# 2. Configure environment variables
cp .env.example .env
# Edit the .env file with your settings

# 3. Start the containers
docker compose up --build -d
```

### Access

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Web interface |
| **Node API** | http://localhost:3001 | Main API |
| **Django API** | http://localhost:8000 | Control Plane API |
| **pgAdmin** | http://localhost:5050 | Database admin |

### pgAdmin Credentials

```
Email: admin@autoflowpro.com
Password: (defined in .env)
```

---

## Environment Variables

```env
# Database
POSTGRES_DB=autoflow_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_PORT=5433

# Backend Node.js
NODE_API_PORT=3001
DATABASE_URL=postgresql://postgres:password@db:5432/autoflow_db
JWT_SECRET=your_jwt_secret_minimum_32_chars

# Backend Django
DJANGO_SECRET_KEY=your_django_secret_key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=*

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=AutoFlow Pro
```

---

## Documentation

Complete documentation is available in the `/docs` directory:

- Feasibility Study
- Requirements Gathering
- Use Cases
- User Stories
- Product Backlog
- Scrum Setup
- Database Modeling
- Traceability Matrix
- Business Model Canvas

---

## Testing

```bash
# Backend tests
cd backend/system
python manage.py test

# Frontend tests
cd frontend
npm test
```

---

## Contributing

This is a private project for internal and academic use.

---

## License

**Private Project** - Internal and academic use only.

---

## Author

Developed as a software engineering project with solid foundations in:

- Requirements Engineering
- Agile Methodologies (Scrum)
- Clean Architecture
- DevOps Best Practices
- Multi-Tenant SaaS Patterns

---

<p align="center">
  <strong>AutoFlow Pro</strong> - Transforming auto shop management
  <br />
  <sub>© 2024 All rights reserved</sub>
</p>
