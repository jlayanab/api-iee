
import swaggerJSDoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 4000;

const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: '⚡ API IEE — Documentación del Sistema',
      version: '1.0.0',
      description: 'API RESTful de alto rendimiento para la gestión integral del sistema IEE (Usuarios, Productos, Cajas, Asistencias, Invitaciones, Ítems y Códigos).',
      contact: {
        name: 'Jorge Layana B.',
        email: 'jlayanab@icloud.com',
        url: 'https://solutiondks.com',
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: 'https://api.solutiondks.com',
        description: 'Servidor Producción (HTTPS)',
      },
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor Local de Desarrollo',
      },
      {
        url: '/',
        description: 'Servidor Actual (Relativo)',
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: 'Auth', description: 'Autenticación y Registro de usuarios' },
      { name: 'Users', description: 'Gestión y administración de usuarios' },
      { name: 'Products', description: 'Gestión de catálogo de productos' },
      { name: 'Boxes', description: 'Gestión de cajas y facturas' },
      { name: 'Attendance', description: 'Control de asistencia' },
      { name: 'Invitations', description: 'Gestión de invitaciones' },
      { name: 'Items', description: 'Gestión de ítems e inventario' },
      { name: 'Codes', description: 'Gestión de códigos del sistema' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingresa tu token JWT (sin escribir "Bearer ", Swagger lo añadirá automáticamente).',
        },
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-access-token',
          description: 'Ingresa tu token JWT para el header x-access-token.',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a76009a52fc795fd619da8c' },
            username: { type: 'string', example: 'jlayanab' },
            email: { type: 'string', example: 'jlayanab@icloud.com' },
            identification: { type: 'string', example: '0920795317' },
            mobile: { type: 'string', example: '0969436080' },
            roles: {
              type: 'array',
              items: { type: 'string' },
              example: ['admin'],
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60d21b4667d0d8992e610c85' },
            name: { type: 'string', example: 'Laptop Pro' },
            category: { type: 'string', example: 'Tecnología' },
            price: { type: 'number', example: 1299.99 },
            imgURL: { type: 'string', example: 'https://example.com/img.jpg' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Code: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66b3f9d50123456789abcdef' },
            name: { type: 'string', example: 'ACCESO-PRINCIPAL' },
            status: { type: 'boolean', example: true },
            user: {
              type: 'array',
              items: { type: 'string' },
              example: ['6a76009a52fc795fd619da8c'],
            },
            locations: {
              type: 'array',
              items: { type: 'string' },
              example: ['66b3f9d50123456789abcde0'],
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Item: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66b3f9d50123456789abcde1' },
            name: { type: 'string', example: 'Cable HDMI 2.0' },
            description: { type: 'string', example: 'Cable de alta velocidad de 2 metros' },
            responsible: { type: 'string', example: 'Juan Pérez' },
            price: { type: 'number', example: 15.50 },
            project: { type: 'string', example: 'Instalación Aula A' },
            client: { type: 'string', example: 'Empresa XYZ' },
            quotation: { type: 'string', example: 'COT-2026-001' },
            invoice: { type: 'string', example: 'FAC-2026-102' },
            retencion: { type: 'boolean', example: false },
            paid: { type: 'boolean', example: true },
            datepaid: { type: 'string', format: 'date-time' },
            imgURL: { type: 'string', example: 'https://example.com/item.jpg' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Box: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66b3f9d50123456789abcde2' },
            ident: { type: 'string', example: 'CAJA-001' },
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/Item' },
            },
            total: { type: 'number', example: 150.75 },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Attendance: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66b3f9d50123456789abcde3' },
            employeeId: { type: 'string', example: 'EMP-001' },
            checkInTime: { type: 'string', format: 'date-time' },
            checkOutTime: { type: 'string', format: 'date-time' },
            totalHours: { type: 'number', example: 8.5 },
            status: { type: 'string', enum: ['on-time', 'late', 'absent'], example: 'on-time' },
            note: { type: 'string', example: 'Ingreso a tiempo' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Invitation: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66b3f9d50123456789abcde4' },
            host: { type: 'string', example: '6a76009a52fc795fd619da8c' },
            guestEmail: { type: 'string', example: 'invitado@example.com' },
            eventName: { type: 'string', example: 'Reunión de Coordinación' },
            eventDate: { type: 'string', format: 'date-time' },
            status: { type: 'string', enum: ['pending', 'accepted', 'used', 'expired'], example: 'pending' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Employee: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66b3f9d50123456789abcde5' },
            employeeId: { type: 'string', example: 'EMP-001' },
            firstName: { type: 'string', example: 'Carlos' },
            lastName: { type: 'string', example: 'Mendoza' },
            email: { type: 'string', example: 'carlos.mendoza@iee.com' },
            phoneNumber: { type: 'string', example: '0991234567' },
            department: { type: 'string', example: 'IT / Sistemas' },
            position: { type: 'string', example: 'Desarrollador Senior' },
            hireDate: { type: 'string', format: 'date-time' },
            isActive: { type: 'boolean', example: true },
            role: { type: 'string', enum: ['admin', 'user', 'employee'], example: 'employee' },
            status: { type: 'string', example: 'Ingreso' },
            entryTime: { type: 'string', format: 'date-time' },
            exitTime: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Location: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66b3f9d50123456789abcde6' },
            name: { type: 'string', example: 'Sede Principal' },
          },
        },
        Role: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66b3f9d50123456789abcde7' },
            name: { type: 'string', example: 'admin' },
          },
        },
        Notification: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66b3f9d50123456789abcde8' },
            employeeId: { type: 'string', example: '66b3f9d50123456789abcde5' },
            title: { type: 'string', example: 'Recordatorio de Turno' },
            message: { type: 'string', example: 'Tu turno comienza a las 08:00 AM' },
            type: { type: 'string', enum: ['shift-reminder', 'attendance-update', 'general'], example: 'shift-reminder' },
            isRead: { type: 'boolean', example: false },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Descripción del error' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);

