<p align="center">
  🇺🇸 English | 🇧🇷 <a href="./README.pt-BR.md">Português</a>
</p>

# ControlCar

## Overview

**ControlCar** is a B2B multi-tenant SaaS platform designed to modernize and optimize the management of automotive repair shops and mechanical workshops.

Built from the ground up with a strong focus on scalability, security, tenant isolation, and operational efficiency, the platform centralizes the core business workflow — from customer and vehicle registration to service order (Work Order) management, subscription control, and administrative provisioning.

The system follows a hybrid and containerized architecture that clearly separates responsibilities between the frontend experience and backend business logic, ensuring maintainability, reproducibility, and production-ready deployment.

ControlCar was also developed with a strong software engineering foundation, combining traditional requirements engineering with agile product execution using Scrum.

---

## Core Features

* **Multi-Tenant SaaS Architecture**

  * Tenant isolation using subdomain-based routing
  * Logical data separation between workshops
  * Secure and scalable SaaS foundation

* **Workshop Management**

  * Customer registration and management
  * Vehicle registration and tracking
  * Service Order (OS / Work Orders) lifecycle management

* **Control Plane**

  * Centralized subscriber administration
  * Subscription and plan management
  * New tenant provisioning and environment control

* **Authentication & Access**

  * Secure login flows
  * Administrative access structure
  * Protected operational workflows

* **Operational Productivity**

  * Fast and responsive interface for mechanics and managers
  * Business-focused navigation and workflows
  * High-priority modules isolated by domain

* **Infrastructure as Code**

  * Fully containerized environment with Docker
  * Reproducible local and production environments
  * Deterministic builds and resilient deployment strategy

---

## Tech Stack

## Backend

* **Language:** Python
* **Framework:** Django
* **API Layer:** Django REST Framework
* **Architecture:** Multi-Tenant SaaS
* **Database:** PostgreSQL
* **Provisioning:** Control Plane architecture

### Backend Modules

* `tenants/`
* `accounts/`
* `control_plane/`

---

## Frontend

* **Framework:** Next.js 15
* **Architecture:** App Router
* **Language:** TypeScript
* **UI Library:** React
* **Styling:** Tailwind CSS

### Main Frontend Flows

* `/app/os` → Service Orders
* `/app/clients` → Client Management
* `/app/login` → Authentication
* `/app/components` → Shared UI components

---

## Infrastructure

* **Containerization:** Docker
* **Orchestration:** Docker Compose
* **Database Admin:** pgAdmin
* **Environment Standardization:** Dockerfiles for both frontend and backend

---

## Architecture

```text
ControlCar
│
├── frontend/
│   ├── app/
│   │   ├── clients/
│   │   ├── login/
│   │   ├── os/
│   │   ├── components/
│   │   └── src/
│   │       ├── services/
│   │       └── types/
│   │
│   └── Dockerfile
│
├── backend/
│   ├── system/
│   │   ├── tenants/
│   │   ├── accounts/
│   │   └── control_plane/
│   │
│   └── Dockerfile
│
├── db/
│   ├── init.sql
│   └── schema.sql
│
├── docs/
│   ├── Requirements Engineering
│   ├── Use Cases
│   ├── User Stories
│   ├── Product Backlog
│   ├── Scrum Setup
│   └── Business Model Canvas
│
└── docker-compose.yaml
```

---

## Multi-Tenant Architecture

One of the most critical aspects of ControlCar is its **tenant isolation strategy**.

Each workshop operates as an isolated tenant using:

* Subdomain-based tenant routing
* Logical tenant separation
* Dedicated provisioning flow
* Subscription-aware access control

This ensures that Workshop A can never access Workshop B’s operational data — a critical requirement for SaaS compliance, security, and trust.

This architecture enables safe horizontal scaling while preserving centralized administration through the Control Plane.

---

## Database Management

ControlCar uses **PostgreSQL** as its primary relational database.

Features include:

* Versioned schema migrations
* Tenant-aware persistence strategy
* Initialization scripts for reproducible environments
* Administrative inspection through pgAdmin

Database setup is supported by:

```text
db/init.sql
db/schema.sql
```

---

## Setup

## 1. Clone the repository

```bash
git clone https://github.com/your-username/controlcar.git
cd controlcar
```

---

## 2. Start containers

```bash
docker compose up --build
```

This command provisions:

* PostgreSQL database
* pgAdmin
* Django backend API
* Next.js frontend application

All services run inside an isolated Docker bridge network.

---

## 3. Access the application

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

## Development Process

ControlCar was not built only as a software product, but also as a complete software engineering project.

The development lifecycle includes:

### Requirements Engineering

* Feasibility Study
* Functional Documentation
* Use Case Modeling
* Requirements Traceability Matrix
* Database Modeling
* Business Model Canvas

### Agile Management

* Scrum framework adoption
* User Story mapping
* Initial Product Backlog definition
* Business-driven technical prioritization

This ensured alignment between implementation decisions and business value delivery.

---

## Documentation

The `/docs` directory includes:

* Feasibility Study
* Requirements Survey
* Use Cases
* User Stories
* Product Backlog
* Scrum Setup
* Architecture Documentation
* Database Modeling
* Traceability Matrix
* Business Model Canvas

This provides complete project traceability from business conception to technical implementation.

---

## License

Private project.

Internal and academic use only.
