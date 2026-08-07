
import swaggerJSDoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 4000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API IEE - Documentación del Sistema',
      version: '1.0.0',
      description: 'API RESTful para la gestión del sistema IEE (Usuarios, Productos, Cajas, Asistencias, Invitaciones, Ítems y Códigos).',
      contact: {
        name: 'Jorge Layana B.',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor Local de Desarrollo',
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
          description: 'Introduce el token JWT precedido de "Bearer "',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a76009a52fc795fd619da8c' },
            username: { type: 'string', example: 'johndoe' },
            email: { type: 'string', example: 'john@example.com' },
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

