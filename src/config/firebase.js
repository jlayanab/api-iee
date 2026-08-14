import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import path from 'path';
import fs from 'fs';

let isFirebaseInitialized = false;
let messaging = null;

try {
    const possiblePaths = [
        process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
        path.resolve(__dirname, './serviceAccountKey.json'),
        path.resolve(__dirname, './solution-e5855-firebase-adminsdk-j9wni-5d33bfb925.json'),
        path.resolve(process.cwd(), 'src/config/serviceAccountKey.json')
    ].filter(Boolean);

    const targetPath = possiblePaths.find(p => fs.existsSync(p));

    if (targetPath) {
        const serviceAccount = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
        if (!getApps().length) {
            initializeApp({
                credential: cert(serviceAccount)
            });
        }
        messaging = getMessaging();
        isFirebaseInitialized = true;
        console.log(`[Firebase Admin] Inicializado correctamente con ${path.basename(targetPath)}`);
    } else {
        console.warn('[Firebase Admin] No se encontró el archivo de credenciales en las rutas especificadas.');
    }
} catch (error) {
    console.error('[Firebase Admin Initialization Error]:', error.message);
}

export { messaging, isFirebaseInitialized };
