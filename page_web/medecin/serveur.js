const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/hopital', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connexion réussie à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Schéma Mongoose pour les collections
const VitalSchema = new mongoose.Schema({
    bed: Number,
    value: Number,
    timestamp: Date
});

const collections = {
    ecg: mongoose.model('ecg', VitalSchema, 'ecg'),
    heart_rate: mongoose.model('heart_rate', VitalSchema, 'heart_rate'),
    breath_rate: mongoose.model('breath_rate', VitalSchema, 'breath_rate'),
    spo2: mongoose.model('spo2', VitalSchema, 'spo2'),
    temperature: mongoose.model('temperature', VitalSchema, 'temperature'),
};

// Route pour récupérer les données de la collection ECG
app.get('/ecg7d', async (req, res) => {
    try {
        const data = await collections.ecg.find({ bed: parseInt(req.query.bed) }).sort({ timestamp: -1 }).limit(10).exec();
        res.json(data.map(doc => ({ value: doc.value, timestamp: doc.timestamp })));
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des données ECG');
    }
});

// Route pour récupérer les données de la collection Fréquence Cardiaque
app.get('/heart_rate7d', async (req, res) => {
    try {
        const data = await collections.heart_rate.find({ bed: parseInt(req.query.bed) }).sort({ timestamp: -1 }).limit(10).exec();
        res.json(data.map(doc => ({ value: doc.value, timestamp: doc.timestamp })));
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des données Fréquence Cardiaque');
    }
});

// Route pour récupérer les données de la collection Fréquence Respiratoire
app.get('/breath_rate7d', async (req, res) => {
    try {
        const data = await collections.breath_rate.find({ bed: parseInt(req.query.bed) }).sort({ timestamp: -1 }).limit(10).exec();
        res.json(data.map(doc => ({ value: doc.value, timestamp: doc.timestamp })));
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des données Fréquence Respiratoire');
    }
});

// Route pour récupérer les données de la collection SpO2
app.get('/spo27d', async (req, res) => {
    try {
        const data = await collections.spo2.find({ bed: parseInt(req.query.bed) }).sort({ timestamp: -1 }).limit(10).exec();
        res.json(data.map(doc => ({ value: doc.value, timestamp: doc.timestamp })));
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des données SpO2');
    }
});

// Route pour récupérer les données de la collection Température
app.get('/temperature7d', async (req, res) => {
    try {
        const data = await collections.temperature.find({ bed: parseInt(req.query.bed) }).sort({ timestamp: -1 }).limit(10).exec();
        res.json(data.map(doc => ({ value: doc.value, timestamp: doc.timestamp })));
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des données Température');
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
