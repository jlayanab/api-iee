import Notification from '../models/Notification';
import User from '../models/User';
import { messaging, isFirebaseInitialized } from '../config/firebase';

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
            
            if (isFirebaseInitialized && messaging) {
                // Convertir todos los valores de payloadData a String para evitar errores de FCM
                const stringifiedData = {
                    type: String(type),
                    title: String(title),
                    message: String(message)
                };
                for (const key of Object.keys(payloadData)) {
                    if (payloadData[key] !== undefined && payloadData[key] !== null) {
                        stringifiedData[key] = String(payloadData[key]);
                    }
                }

                const fcmMessage = {
                    token: user.fcmToken,
                    notification: {
                        title: title,
                        body: message
                    },
                    data: stringifiedData
                };

                try {
                    const response = await messaging.send(fcmMessage);
                    console.log(`[Push Notification] Notificación enviada con éxito. MessageId: ${response}`);
                } catch (fcmError) {
                    console.error(`[Push Notification Error FCM]: Error enviando mensaje a token ${user.fcmToken}:`, fcmError.message);
                }
            } else {
                console.warn('[Push Notification] Firebase Admin SDK no está inicializado. No se pudo enviar el push.');
            }
        } else {
            console.log(`[Push Notification] El usuario ${userId} no tiene fcmToken registrado. Notificación almacenada en DB.`);
        }

        return newNotification;
    } catch (error) {
        console.error('[Push Notification Error]:', error);
        return null;
    }
};
