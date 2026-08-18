const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));


const getTenantId = async (req) => {
    const tenantIdHeader = req.headers['x-tenant-id'];
    if (tenantIdHeader && tenantIdHeader !== 'undefined' && tenantIdHeader !== 'null') {
        return tenantIdHeader;
    }

    const tenant = await prisma.tenant.findFirst();
    return tenant ? tenant.id : null;
};

app.post('/api/login', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) return res.status(401).json({ error: "Usuário não encontrado." });
        
        // Tenta achar tenant do dono ou pega o primeiro (modo demo)
        let tenant = await prisma.tenant.findFirst({ where: { ownerId: user.id } });
        if (!tenant) tenant = await prisma.tenant.findFirst();

        return res.json({ tenantId: tenant?.id, name: user.first_name });
    } catch (error) {
        return res.status(500).json({ error: "Erro interno" });
    }
});

app.get('/api/dashboard', async (req, res) => {
    const tenantId = await getTenantId(req);

    const osCount = await prisma.serviceOrder.count({ where: { tenantId, status: 'opened' } });
    const clientsCount = await prisma.client.count({ where: { tenantId } });

    const revenue = await prisma.serviceOrder.aggregate({
        where: { tenantId, status: 'finished' },
        _sum: { totalAmount: true }
    });

    res.json({ 
        totalOS: osCount,
        totalClients: clientsCount,
        revenue: revenue._sum.totalAmount || 0 
    });
});

app.get('/api/clients', async (req, res) => {
    const tenantId = await getTenantId(req);
    const clients = await prisma.client.findMany({ 
        where: { tenantId },
        include: { vehicles: true },
        orderBy: { createdAt: 'desc' }
    });
    res.json(clients);
});

app.post('/api/clients', async (req, res) => {
    const tenantId = await getTenantId(req);
    const { name, phone, plate, model } = req.body;
    
    try {
        const client = await prisma.client.create({
            data: {
                tenantId,
                name,
                phone,
                vehicles: {
                    create: { tenantId, plate, model, brand: 'Generica' }
                }
            }
        });
        res.json(client);
    } catch (e) {
        res.status(400).json({ error: "Erro ao criar. Verifique dados duplicados." });
    }
});

app.put('/api/clients/:id', async (req, res) => {
    const { id } = req.params;
    const { name, phone, plate, model } = req.body;
    
    const client = await prisma.client.update({
        where: { id },
        data: { name, phone },
        include: { vehicles: true }
    });

    if (client.vehicles.length > 0 && (plate || model)) {
        await prisma.vehicle.update({
            where: { id: client.vehicles[0].id },
            data: { plate, model }
        });
    }
    
    res.json(client);
});

app.delete('/api/clients/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.serviceOrder.deleteMany({ where: { clientId: id } }); // Limpa OS do cliente
        await prisma.vehicle.deleteMany({ where: { clientId: id } }); // Limpa carros
        await prisma.client.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar" });
    }
});

app.get('/api/os', async (req, res) => {
    const tenantId = await getTenantId(req);
    const os = await prisma.serviceOrder.findMany({
        where: { tenantId },
        include: { client: true, vehicle: true },
        orderBy: { createdAt: 'desc' }
    });
    res.json(os);
});

app.post('/api/os', async (req, res) => {
    const tenantId = await getTenantId(req);
    const { clientId, vehicleId, description, total } = req.body;
    const os = await prisma.serviceOrder.create({
        data: {
            tenantId, clientId, vehicleId, 
            problemDescription: description, 
            totalAmount: total || 0, 
            status: 'opened'
        }
    });
    res.json(os);
});

app.patch('/api/os/:id/finish', async (req, res) => {
    const { id } = req.params;
    const os = await prisma.serviceOrder.update({
        where: { id },
        data: { 
            status: 'finished',
            finishedAt: new Date()
        }
    });
    res.json(os);
});

app.listen(PORT, () => {
    console.log(`WorkshopHub API running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`API Documentation: http://localhost:${PORT}/doc`);
});