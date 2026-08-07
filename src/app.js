import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cron from 'node-cron';
import pkg from '../package.json'
import productsRoutes from './routes/products.routes'
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import codeRoutes from './routes/codes.routes';
import itemRoutes from './routes/item.routes';
import boxRoutes from './routes/box.routes';
import attendanceRoutes from './routes/attendance.routes';
import invitationRoutes from './routes/invitation.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './libs/swagger.js';
import { createLocations, createRoles, createSampleData } from './libs/initialSetup';

const app = express()
createRoles();
createLocations();
createSampleData();
app.set('pkg', pkg);
app.use(express.json());

app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
   res.json({
      name: app.get('pkg').name,
      author: app.get('pkg').author,
      description: app.get('pkg').description,
      version: app.get('pkg').version
   })
})

app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/codes', codeRoutes)
app.use('/api/item', itemRoutes)
app.use('/api/box', boxRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/invitations', invitationRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
   customSiteTitle: "API IEE - Documentación Swagger",
   swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      displayRequestDuration: true,
   }
}));

// Programar tareas
// Enviar recordatorios de turno cada día a las 18:00
cron.schedule('0 18 * * *', () => {
   notificationService.sendShiftReminders();
});

export default app