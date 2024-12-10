/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const { onRequest } = require("firebase-functions/v2/https");
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.deleteUser = onRequest((req, res) => {
    cors(req, res, async () => {
        res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Autoriser les demandes depuis votre site web local
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            res.status(204).send('');
            return;
        }

        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Méthode HTTP non autorisée.' });
        }

        const uid = req.body.uid;
        if (!uid) {
            return res.status(400).json({ error: 'UID manquant dans le corps de la demande.' });
        }

        try {
            await admin.auth().deleteUser(uid);
            return res.status(200).json({ message: `Utilisateur avec l'UID: ${uid} supprimé avec succès.` });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            return res.status(500).json({ error: `Erreur lors de la suppression de l'utilisateur avec l'UID: ${uid}` });
        }
    });
});





// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



