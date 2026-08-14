import { messaging, isFirebaseInitialized } from '../config/firebase';

async function testFirebase() {
    console.log('=== TEST DE VERIFICACIÓN DE NOTIFICACIONES FIREBASE FCM ===');
    console.log('1. Estado de Inicialización de Firebase:', isFirebaseInitialized ? '✅ SÍ' : '❌ NO');

    if (!isFirebaseInitialized || !messaging) {
        console.error('❌ Firebase Admin SDK no fue inicializado correctamente.');
        process.exit(1);
    }

    try {
        const dummyToken = 'fcm_dummy_token_for_dry_run_verification_123456789';
        const message = {
            token: dummyToken,
            notification: {
                title: 'Prueba de Notificación API-IEE',
                body: 'Verificando conectividad con Firebase FCM'
            },
            data: {
                type: 'test',
                timestamp: String(Date.now())
            }
        };

        console.log('2. Validando credenciales y conectividad con servidores de Google Firebase (dryRun)...');
        await messaging.send(message, true);
        console.log('✅ ¡Conexión y credenciales con Firebase FCM verificadas exitosamente!');
    } catch (error) {
        if (
            error.code === 'messaging/invalid-argument' || 
            error.code === 'messaging/registration-token-not-registered' || 
            error.code === 'messaging/invalid-registration-token'
        ) {
            console.log('✅ ¡Credenciales y conexión con Firebase FCM verificadas exitosamente!');
            console.log(`ℹ️ [Respuesta Servidores Google FCM]: Código de respuesta: "${error.code}". La API de Google Firebase autenticó exitosamente el Service Account con OAuth2 y procesó la solicitud.`);
        } else {
            console.error('❌ Error al comunicarse con Firebase FCM:', error.code || error.message, error);
        }
    }
}

testFirebase();
