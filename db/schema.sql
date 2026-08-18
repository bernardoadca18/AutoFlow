-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.3
-- PostgreSQL version: 15.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: control_car_db | type: DATABASE --
-- DROP DATABASE IF EXISTS control_car_db;
CREATE DATABASE workshophub_db;
-- ddl-end --


-- object: app | type: SCHEMA --
-- DROP SCHEMA IF EXISTS app CASCADE;
CREATE SCHEMA app;
-- ddl-end --
ALTER SCHEMA app OWNER TO postgres;
-- ddl-end --

SET search_path TO pg_catalog,public,app;
-- ddl-end --

-- object: public.tenants | type: TABLE --
-- DROP TABLE IF EXISTS public.tenants CASCADE;
CREATE TABLE public.tenants (
	id uuid NOT NULL,
	name varchar(255) NOT NULL,
	subdomain varchar(100) NOT NULL,
	status varchar(50) NOT NULL DEFAULT 'active',
	owner_id uuid,
	plan_id uuid,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	updated_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT tenants_pk PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.tenants.id IS E'Identificador único do tenant.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.name IS E'Nome da oficina mecânica.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.subdomain IS E'Subdomínio para acesso (ex: minhaoficina.controlcar.com).';
-- ddl-end --
COMMENT ON COLUMN public.tenants.status IS E'Status do tenant (ativo, inativo, suspenso).';
-- ddl-end --
COMMENT ON COLUMN public.tenants.owner_id IS E'Referência ao dono da conta no sistema.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.plan_id IS E'Plano de assinatura atual do tenant.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.created_at IS E'Data de criação do registro.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.updated_at IS E'Data da última atualização.';
-- ddl-end --
ALTER TABLE public.tenants OWNER TO postgres;
-- ddl-end --

-- object: public.plans | type: TABLE --
-- DROP TABLE IF EXISTS public.plans CASCADE;
CREATE TABLE public.plans (
	id uuid NOT NULL,
	name varchar(100) NOT NULL,
	price decimal(16,2) NOT NULL,
	features jsonb,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT plans_pk PRIMARY KEY (id),
	CONSTRAINT name_uq UNIQUE (name)
);
-- ddl-end --
COMMENT ON COLUMN public.plans.id IS E'Identificador único do plano.';
-- ddl-end --
COMMENT ON COLUMN public.plans.name IS E'Nome do plano (ex: Básico, Profissional).';
-- ddl-end --
COMMENT ON COLUMN public.plans.price IS E'Preço mensal do plano.';
-- ddl-end --
COMMENT ON COLUMN public.plans.features IS E'Um JSON com as características do plano.';
-- ddl-end --
COMMENT ON COLUMN public.plans.created_at IS E'Data de criação do registro.';
-- ddl-end --
ALTER TABLE public.plans OWNER TO postgres;
-- ddl-end --

-- object: app.users | type: TABLE --
-- DROP TABLE IF EXISTS app.users CASCADE;
CREATE TABLE app.users (
	id uuid NOT NULL,
	tenant_id uuid NOT NULL,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password_hash varchar(255) NOT NULL,
	role varchar(50) NOT NULL,
	is_active boolean NOT NULL DEFAULT true,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	updated_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT users_id_pk PRIMARY KEY (id),
	CONSTRAINT tenant_id_email_uq UNIQUE (tenant_id,email)
);
-- ddl-end --
COMMENT ON COLUMN app.users.id IS E'Identificador único do usuário.';
-- ddl-end --
COMMENT ON COLUMN app.users.tenant_id IS E'FK para o tenant.';
-- ddl-end --
COMMENT ON COLUMN app.users.name IS E'Nome completo do usuário.';
-- ddl-end --
COMMENT ON COLUMN app.users.email IS E'E-mail de login.';
-- ddl-end --
COMMENT ON COLUMN app.users.password_hash IS E'Senha criptografada (bcrypt).';
-- ddl-end --
COMMENT ON COLUMN app.users.role IS E'Papel do usuário (admin, receptionist, mechanic).';
-- ddl-end --
COMMENT ON COLUMN app.users.is_active IS E'Indica se o usuário está ativo.';
-- ddl-end --
COMMENT ON COLUMN app.users.created_at IS E'Data da criação do registro.';
-- ddl-end --
COMMENT ON COLUMN app.users.updated_at IS E'Data da última atualização do registro.';
-- ddl-end --
ALTER TABLE app.users OWNER TO postgres;
-- ddl-end --

-- object: app.clients | type: TABLE --
-- DROP TABLE IF EXISTS app.clients CASCADE;
CREATE TABLE app.clients (
	id uuid NOT NULL,
	tenant_id uuid NOT NULL,
	name varchar(255) NOT NULL,
	document varchar(18),
	phone varchar(20),
	email varchar(255),
	address text,
	is_active boolean NOT NULL DEFAULT true,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT id_pk PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN app.clients.id IS E'ID do cliente.';
-- ddl-end --
COMMENT ON COLUMN app.clients.tenant_id IS E'Link para o tenant.';
-- ddl-end --
COMMENT ON COLUMN app.clients.name IS E'Nome/Razão Social do cliente.';
-- ddl-end --
COMMENT ON COLUMN app.clients.document IS E'CPF ou CNPJ';
-- ddl-end --
COMMENT ON COLUMN app.clients.phone IS E'Telefone de contato';
-- ddl-end --
COMMENT ON COLUMN app.clients.email IS E'Email';
-- ddl-end --
COMMENT ON COLUMN app.clients.address IS E'Endereço';
-- ddl-end --
COMMENT ON COLUMN app.clients.is_active IS E'Indica se o cliente está ativo.';
-- ddl-end --
COMMENT ON COLUMN app.clients.created_at IS E'Data de criação do registro';
-- ddl-end --
ALTER TABLE app.clients OWNER TO postgres;
-- ddl-end --

-- object: app.vehicles | type: TABLE --
-- DROP TABLE IF EXISTS app.vehicles CASCADE;
CREATE TABLE app.vehicles (
	id uuid NOT NULL,
	tenant_id uuid NOT NULL,
	client_id uuid NOT NULL,
	plate varchar(10) NOT NULL,
	vin varchar(17),
	brand varchar(100),
	model varchar(100) NOT NULL,
	year integer,
	model_year integer,
	color varchar(50),
	engine_code varchar(50),
	fuel_type varchar(50),
	transmission_type varchar(50),
	mileage integer,
	notes text,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT vehicles_pk PRIMARY KEY (id),
	CONSTRAINT tenant_id_plate_uq UNIQUE (tenant_id,plate),
	CONSTRAINT tenant_id_vin_uq UNIQUE (tenant_id,vin)
);
-- ddl-end --
COMMENT ON COLUMN app.vehicles.id IS E'ID do veículo.';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.tenant_id IS E'Link para o tenant.';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.client_id IS E'Dono do veículo.';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.plate IS E'Placa do veículo.';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.vin IS E'Nº do Chassi.\nEssencial para peças e consultas técnicas.';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.brand IS E'Marca (ex: Volkswagen).';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.model IS E'Modelo (ex: Gol).';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.year IS E'Ano de fabricação.';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.model_year IS E'Ano do modelo do veículo.';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.color IS E'Cor do veículo.';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.engine_code IS E'Código do motor, para especificidade de peças.';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.fuel_type IS E'Combustível (Gasolina, Etanol, Flex, Diesel, Elétrico).';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.transmission_type IS E'Transmissão (Manual, Automático, CVT).';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.mileage IS E'Quilometragem atual registrada.';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.notes IS E'Observações permanentes sobre o veículo (ex: possui GNV).';
-- ddl-end --
COMMENT ON COLUMN app.vehicles.created_at IS E'Data de criação.';
-- ddl-end --
ALTER TABLE app.vehicles OWNER TO postgres;
-- ddl-end --

-- object: app.services | type: TABLE --
-- DROP TABLE IF EXISTS app.services CASCADE;
CREATE TABLE app.services (
	id uuid NOT NULL,
	tenant_id uuid NOT NULL,
	description text NOT NULL,
	category varchar(100),
	standard_price decimal(16,2),
	estimated_time integer,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT services_pk PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN app.services.id IS E'ID do serviço.';
-- ddl-end --
COMMENT ON COLUMN app.services.tenant_id IS E'Link para o tenant.';
-- ddl-end --
COMMENT ON COLUMN app.services.description IS E'Descrição do serviço (ex: Troca de óleo do motor).';
-- ddl-end --
COMMENT ON COLUMN app.services.category IS E'Categoria para organização (ex: Motor, Freios, Suspensão).';
-- ddl-end --
COMMENT ON COLUMN app.services.standard_price IS E'Preço padrão do serviço (mão de obra).';
-- ddl-end --
COMMENT ON COLUMN app.services.estimated_time IS E'Tempo estimado em minutos.';
-- ddl-end --
COMMENT ON COLUMN app.services.created_at IS E'Data de criação.';
-- ddl-end --
ALTER TABLE app.services OWNER TO postgres;
-- ddl-end --

-- object: app.service_orders | type: TABLE --
-- DROP TABLE IF EXISTS app.service_orders CASCADE;
CREATE TABLE app.service_orders (
	id uuid NOT NULL,
	tenant_id uuid NOT NULL,
	client_id uuid NOT NULL,
	vehicle_id uuid NOT NULL,
	status varchar(50) NOT NULL DEFAULT 'opened',
	problem_description text,
	technical_report text,
	total_amount decimal(16,2) NOT NULL DEFAULT 0,
	created_by_id uuid,
	assigned_mechanic_id uuid,
	finished_at timestamptz,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	updated_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT service_orders_pk PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN app.service_orders.id IS E'ID da O.S.';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.tenant_id IS E'Link para o tenant.';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.client_id IS E'Cliente da O.S.';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.vehicle_id IS E'Veículo da O.S.';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.status IS E'Status: opened, awaiting_approval, in_progress, finished, canceled.';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.problem_description IS E'Descrição do problema relatado pelo cliente.';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.technical_report IS E'Diagnóstico técnico e observações do mecânico.';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.total_amount IS E'Valor total (soma dos itens).';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.created_by_id IS E'Usuário que abriu a O.S.';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.assigned_mechanic_id IS E'Mecânico responsável pelo serviço.';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.finished_at IS E'Data de finalização da O.S.';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.created_at IS E'Data de criação.';
-- ddl-end --
COMMENT ON COLUMN app.service_orders.updated_at IS E'Data da última atualização.';
-- ddl-end --
ALTER TABLE app.service_orders OWNER TO postgres;
-- ddl-end --

-- object: owner_id_fk | type: CONSTRAINT --
-- ALTER TABLE public.tenants DROP CONSTRAINT IF EXISTS owner_id_fk CASCADE;
ALTER TABLE public.tenants ADD CONSTRAINT owner_id_fk FOREIGN KEY (owner_id)
REFERENCES app.users (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: plan_id_fk | type: CONSTRAINT --
-- ALTER TABLE public.tenants DROP CONSTRAINT IF EXISTS plan_id_fk CASCADE;
ALTER TABLE public.tenants ADD CONSTRAINT plan_id_fk FOREIGN KEY (plan_id)
REFERENCES public.plans (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: tenant_id_fk | type: CONSTRAINT --
-- ALTER TABLE app.users DROP CONSTRAINT IF EXISTS tenant_id_fk CASCADE;
ALTER TABLE app.users ADD CONSTRAINT tenant_id_fk FOREIGN KEY (tenant_id)
REFERENCES public.tenants (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: tenant_fk | type: CONSTRAINT --
-- ALTER TABLE app.clients DROP CONSTRAINT IF EXISTS tenant_fk CASCADE;
ALTER TABLE app.clients ADD CONSTRAINT tenant_fk FOREIGN KEY (tenant_id)
REFERENCES public.tenants (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: vehicles_tenant_fk | type: CONSTRAINT --
-- ALTER TABLE app.vehicles DROP CONSTRAINT IF EXISTS vehicles_tenant_fk CASCADE;
ALTER TABLE app.vehicles ADD CONSTRAINT vehicles_tenant_fk FOREIGN KEY (tenant_id)
REFERENCES public.tenants (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: vehicles_client_fk | type: CONSTRAINT --
-- ALTER TABLE app.vehicles DROP CONSTRAINT IF EXISTS vehicles_client_fk CASCADE;
ALTER TABLE app.vehicles ADD CONSTRAINT vehicles_client_fk FOREIGN KEY (client_id)
REFERENCES app.clients (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: services_tenant_id_fk | type: CONSTRAINT --
-- ALTER TABLE app.services DROP CONSTRAINT IF EXISTS services_tenant_id_fk CASCADE;
ALTER TABLE app.services ADD CONSTRAINT services_tenant_id_fk FOREIGN KEY (tenant_id)
REFERENCES public.tenants (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: service_orders_tenant_fk | type: CONSTRAINT --
-- ALTER TABLE app.service_orders DROP CONSTRAINT IF EXISTS service_orders_tenant_fk CASCADE;
ALTER TABLE app.service_orders ADD CONSTRAINT service_orders_tenant_fk FOREIGN KEY (tenant_id)
REFERENCES public.tenants (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: service_orders_client_fk | type: CONSTRAINT --
-- ALTER TABLE app.service_orders DROP CONSTRAINT IF EXISTS service_orders_client_fk CASCADE;
ALTER TABLE app.service_orders ADD CONSTRAINT service_orders_client_fk FOREIGN KEY (client_id)
REFERENCES app.clients (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: service_orders_vehicle_fk | type: CONSTRAINT --
-- ALTER TABLE app.service_orders DROP CONSTRAINT IF EXISTS service_orders_vehicle_fk CASCADE;
ALTER TABLE app.service_orders ADD CONSTRAINT service_orders_vehicle_fk FOREIGN KEY (vehicle_id)
REFERENCES app.vehicles (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: service_orders_created_by_fk | type: CONSTRAINT --
-- ALTER TABLE app.service_orders DROP CONSTRAINT IF EXISTS service_orders_created_by_fk CASCADE;
ALTER TABLE app.service_orders ADD CONSTRAINT service_orders_created_by_fk FOREIGN KEY (created_by_id)
REFERENCES app.users (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: service_orders_assigned_mechanic_id_fk | type: CONSTRAINT --
-- ALTER TABLE app.service_orders DROP CONSTRAINT IF EXISTS service_orders_assigned_mechanic_id_fk CASCADE;
ALTER TABLE app.service_orders ADD CONSTRAINT service_orders_assigned_mechanic_id_fk FOREIGN KEY (assigned_mechanic_id)
REFERENCES app.users (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


