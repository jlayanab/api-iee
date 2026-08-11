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
import locationRoutes from './routes/location.routes';
import roleRoutes from './routes/role.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './libs/swagger.js';
import { customCss } from './libs/swagger-theme.js';
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
app.use('/api/locations', locationRoutes)
app.use('/api/roles', roleRoutes)

app.use('/api-docs', (req, res, next) => {
   res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
   res.setHeader('Pragma', 'no-cache');
   res.setHeader('Expires', '0');
   res.setHeader('Surrogate-Control', 'no-store');
   next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
   customSiteTitle: "API IEE — Documentación de la Plataforma",
   customCss: customCss,
   swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      displayRequestDuration: true,
      persistAuthorization: true,
      tryItOutEnabled: true,
      defaultModelsExpandDepth: 2,
      showExtensions: true,
      showCommonExtensions: true
   }
}));

// Programar tareas
// Enviar recordatorios de turno cada día a las 18:00
cron.schedule('0 18 * * *', () => {
   notificationService.sendShiftReminders();
});

export default app