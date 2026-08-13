import Notification from '../models/Notification';
import User from '../models/User';

/**
 * Envia una notificación push a un usuario y la registra en la base de datos
 * @param {Object} params
 * @param {string} params.userId ID del usuario receptor
 * @param {string} params.title Título de la notificación
 * @param {string} params.message Cuerpo del mensaje
 * @param {string} params.type Tipo ('code-received', 'access-verified', etc.)
 * @param {Object} [params.payloadData] Datos adicionales clave-valor
 */
export const sendNotificationToUser = async ({ userId, title, message, type = 'general', payloadData = {} }) => {
    try {
        // 1. Guardar notificación interna en la base de datos
        const newNotification = new Notification({
            user: userId,
            title,
            message,
            type,
            data: payloadData,
            isRead: false
        });
        await newNotification.save();

        // 2. Buscar usuario para obtener su fcmToken
        const user = await User.findById(userId);
        if (user && user.fcmToken) {
            console.log(`[Push Notification] Enviando alerta FCM a usuario ${user.username} (${user.email}) Token: ${user.fcmToken}`);
            // Si el proyecto configura Firebase Admin SDK o FCM HTTP API Key, se envía la notificación push directa aquí.
        } else {
            console.log(`[Push Notification] El usuario ${userId} no tiene fcmToken registrado. Notificación almacenada en DB.`);
        }

        return newNotification;
    } catch (error) {
        console.error('[Push Notification Error]:', error);
        return null;
    }
};
