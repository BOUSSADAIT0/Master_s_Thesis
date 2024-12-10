const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

const uri = 'mongodb://127.0.0.1:27017'; // Vérifiez que l'URI est correct
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

let db;

async function connectToMongoDB() {
    try {
        await client.connect();
        db = client.db('hopital'); // Remplacez par le nom de votre base de données
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

connectToMongoDB().catch(console.error);

app.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    console.log(`Tentative de connexion avec l'email: ${email} et le rôle: ${role}`);

    let collectionName;
    if (role === 'admin') {
        collectionName = 'administrateur';
    } else if (role === 'infermier') {
        collectionName = 'infermier';
    } else if (role === 'medecin') {
        collectionName = 'medecin';
    } else {
        res.status(400).send('Rôle non valide.');
        return;
    }

    try {
        const userDocument = await db.collection(collectionName).findOne({ email: email });
        if (!userDocument) {
            console.log(`Utilisateur non trouvé dans la collection ${collectionName} pour l'email: ${email}`);
            res.status(404).send('Aucun utilisateur avec cet email trouvé.');
            return;
        }

        if (userDocument.password !== password) {
            console.log(`Mot de passe incorrect pour l'email: ${email}`);
            res.status(401).send('Mot de passe incorrect.');
            return;
        }

        console.log(`Connexion réussie pour l'email: ${email} et le rôle: ${role}`);
        res.status(200).send('Connexion réussie');
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
