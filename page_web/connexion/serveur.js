// const express = require('express');
// const { MongoClient } = require('mongodb');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // MongoDB Connection String
// const uri = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(uri);

// // Mongoose connection
// mongoose.connect('mongodb://127.0.0.1:27017/hopital', { useNewUrlParser: true, useUnifiedTopology: true });

// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     nom: String,
//     prenom: String,
//     email: String,
//     service: String,
//     password: String
// });

// const PatientSchema = new Schema({
//     nom: { type: String, required: true },
//     prenom: { type: String, required: true },
//     date_naissance: { type: Date, required: true },
//     bed_number: Number,
//     date_hospitalisation: { type: Date, default: Date.now },
//     cout: Number
// });

// const Medecin = mongoose.model('Medecins', UserSchema);
// const Paramedical = mongoose.model('infermiers', UserSchema);
// const Patient = mongoose.model('Patient', PatientSchema);

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// let db;

// async function connectToMongoDB() {
//     try {
//         await client.connect();
//         db = client.db('hopital');
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Error connecting to MongoDB', error);
//     }
// }

// connectToMongoDB().catch(console.error);

// app.post('/login', async (req, res) => {
//     const { email, password, role } = req.body;
//     console.log(`Tentative de connexion avec l'email: ${email} et le rôle: ${role}`);

//     let collectionName;
//     if (role === 'admin') {
//         collectionName = 'administrateur';
//     } else if (role === 'infermiers') {
//         collectionName = 'infermiers';
//     } else if (role === 'medecins') {
//         collectionName = 'medecins';
//     } else {
//         res.status(400).send('Rôle non valide.');
//         return;
//     }

//     try {
//         const userDocument = await db.collection(collectionName).findOne({ email: email });
//         if (!userDocument) {
//             console.log(`Utilisateur non trouvé dans la collection ${collectionName} pour l'email: ${email}`);
//             res.status(404).send('Aucun utilisateur avec cet email trouvé.');
//             return;
//         }

//         if (userDocument.password !== password) {
//             console.log(`Mot de passe incorrect pour l'email: ${email}`);
//             res.status(401).send('Mot de passe incorrect.');
//             return;
//         }

//         console.log(`Connexion réussie pour l'email: ${email} et le rôle: ${role}`);
//         res.status(200).send('Connexion réussie');
//     } catch (error) {
//         console.error('Erreur lors de la connexion:', error);
//         res.status(500).send('Erreur interne du serveur');
//     }
// });

// app.get('/medecins', async (req, res) => {
//     try {
//         const medecins = await Medecin.find();
//         res.json(medecins);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.post('/medecins', async (req, res) => {
//     const { nom, prenom, email, service, password } = req.body;
//     if (!nom || !prenom || !email || !service || !password) {
//         return res.status(400).send('Tous les champs sont obligatoires');
//     }
//     try {
//         const newMedecin = new Medecin({ nom, prenom, email, service, password });
//         await newMedecin.save();
//         res.status(201).json(newMedecin);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.put('/medecins/:id', async (req, res) => {
//     const { id } = req.params;
//     const { nom, prenom, email, service, password } = req.body;

//     if (!nom || !prenom || !email || !service || !password) {
//         return res.status(400).send('Tous les champs sont obligatoires');
//     }

//     try {
//         const updatedMedecin = await Medecin.findByIdAndUpdate(id, { nom, prenom, email, service, password }, { new: true });
//         if (!updatedMedecin) {
//             return res.status(404).send('Médecin non trouvé');
//         }
//         res.json(updatedMedecin);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.delete('/medecins/:id', async (req, res) => {
//     try {
//         await Medecin.findByIdAndDelete(req.params.id);
//         res.status(204).send();
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.get('/infermiers', async (req, res) => {
//     try {
//         const paramedicals = await Paramedical.find();
//         res.json(paramedicals);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.post('/infermiers', async (req, res) => {
//     const { nom, prenom, email, service, password } = req.body;
//     if (!nom || !prenom || !email || !service || !password) {
//         return res.status(400).send('Tous les champs sont obligatoires');
//     }
//     try {
//         const newParamedical = new Paramedical({ nom, prenom, email, service, password });
//         await newParamedical.save();
//         res.status(201).json(newParamedical);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.put('/infermiers/:id', async (req, res) => {
//     const { id } = req.params;
//     const { nom, prenom, email, service, password } = req.body;

//     if (!nom || !prenom || !email || !service || !password) {
//         return res.status(400).send('Tous les champs sont obligatoires');
//     }

//     try {
//         const updatedInfermier = await Paramedical.findByIdAndUpdate(id, { nom, prenom, email, service, password }, { new: true });
//         if (!updatedInfermier) {
//             return res.status(404).send('Infirmier non trouvé');
//         }
//         res.json(updatedInfermier);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.delete('/infermiers/:id', async (req, res) => {
//     try {
//         await Paramedical.findByIdAndDelete(req.params.id);
//         res.status(204).send();
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.get('/patients', async (req, res) => {
//     try {
//         const patients = await Patient.find();
//         res.json(patients);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.post('/patients', async (req, res) => {
//     const { nom, prenom, date_naissance, bed_number, date_hospitalisation, cout } = req.body;
//     if (!nom || !prenom || !date_naissance || !bed_number || !date_hospitalisation || !cout) {
//         return res.status(400).send('Tous les champs sont obligatoires');
//     }
//     try {
//         const newPatient = new Patient({ nom, prenom, date_naissance, bed_number, date_hospitalisation, cout });
//         await newPatient.save();
//         res.status(201).json(newPatient);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.put('/patients/:id', async (req, res) => {
//     const { id } = req.params;
//     const { nom, prenom, date_hospitalisation, cout } = req.body;

//     if (!nom || !prenom || !date_hospitalisation || !cout) {
//         return res.status(400).send('Tous les champs sont obligatoires');
//     }

//     try {
//         const updatedPatient = await Patient.findByIdAndUpdate(id, { nom, prenom, date_hospitalisation, cout }, { new: true });
//         if (!updatedPatient) {
//             return res.status(404).send('Patient non trouvé');
//         }
//         res.json(updatedPatient);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.delete('/patients/:id', async (req, res) => {
//     try {
//         await Patient.findByIdAndDelete(req.params.id);
//         res.status(204).send();
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('C:/Users/dell/OneDrive/Bureau/mastere2/projet_fin_etude/page web/page daccueil'))

// MongoDB Connection String
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

// Mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/hopital', { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nom: String,
    prenom: String,
    email: String,
    service: String,
    password: String
});

const PatientSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    date_naissance: { type: Date, required: true },
    bed_number: Number,
    date_hospitalisation: { type: Date, default: Date.now },
    cout: Number
});

const VitalSchema = new Schema({
    bed: Number,
    value: Number,
    timestamp: Date
});

const Medecin = mongoose.model('Medecins', UserSchema);
const Paramedical = mongoose.model('infermiers', UserSchema);
const Patient = mongoose.model('Patients', PatientSchema);
const Ecg = mongoose.model('ecg', VitalSchema, 'ecg');
const HeartRate = mongoose.model('heart_rate', VitalSchema, 'heart_rate');
const BreathRate = mongoose.model('breath_rate', VitalSchema, 'breath_rate');
const Spo2 = mongoose.model('spo2', VitalSchema, 'spo2');
const Temperature = mongoose.model('temperature', VitalSchema, 'temperature');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

let db;

async function connectToMongoDB() {
    try {
        await client.connect();
        db = client.db('hopital');
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
    } else if (role === 'infermiers') {
        collectionName = 'infermiers';
    } else if (role === 'medecins') {
        collectionName = 'medecins';
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

app.get('/medecins', async (req, res) => {
    try {
        const medecins = await Medecin.find();
        res.json(medecins);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/medecins', async (req, res) => {
    const { nom, prenom, email, service, password } = req.body;
    if (!nom || !prenom || !email || !service || !password) {
        return res.status(400).send('Tous les champs sont obligatoires');
    }
    try {
        const newMedecin = new Medecin({ nom, prenom, email, service, password });
        await newMedecin.save();
        res.status(201).json(newMedecin);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/medecins/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, email, service, password } = req.body;

    if (!nom || !prenom || !email || !service || !password) {
        return res.status(400).send('Tous les champs sont obligatoires');
    }

    try {
        const updatedMedecin = await Medecin.findByIdAndUpdate(id, { nom, prenom, email, service, password }, { new: true });
        if (!updatedMedecin) {
            return res.status(404).send('Médecin non trouvé');
        }
        res.json(updatedMedecin);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/medecins/:id', async (req, res) => {
    try {
        await Medecin.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/infermiers', async (req, res) => {
    try {
        const paramedicals = await Paramedical.find();
        res.json(paramedicals);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/infermiers', async (req, res) => {
    const { nom, prenom, email, service, password } = req.body;
    if (!nom || !prenom || !email || !service || !password) {
        return res.status(400).send('Tous les champs sont obligatoires');
    }
    try {
        const newParamedical = new Paramedical({ nom, prenom, email, service, password });
        await newParamedical.save();
        res.status(201).json(newParamedical);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/infermiers/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, email, service, password } = req.body;

    if (!nom || !prenom || !email || !service || !password) {
        return res.status(400).send('Tous les champs sont obligatoires');
    }

    try {
        const updatedInfermier = await Paramedical.findByIdAndUpdate(id, { nom, prenom, email, service, password }, { new: true });
        if (!updatedInfermier) {
            return res.status(404).send('Infirmier non trouvé');
        }
        res.json(updatedInfermier);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/infermiers/:id', async (req, res) => {
    try {
        await Paramedical.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/patients', async (req, res) => {
    const { nom, prenom, date_naissance, bed_number, date_hospitalisation, cout } = req.body;
    if (!nom || !prenom || !date_naissance || !bed_number || !date_hospitalisation || !cout) {
        return res.status(400).send('Tous les champs sont obligatoires');
    }
    try {
        const newPatient = new Patient({ nom, prenom, date_naissance, bed_number, date_hospitalisation, cout });
        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, date_hospitalisation, cout } = req.body;

    if (!nom || !prenom || !date_hospitalisation || !cout) {
        return res.status(400).send('Tous les champs sont obligatoires');
    }

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, { nom, prenom, date_hospitalisation, cout }, { new: true });
        if (!updatedPatient) {
            return res.status(404).send('Patient non trouvé');
        }
        res.json(updatedPatient);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/patients/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/patients/:bed_number', async (req, res) => {
    try {
        const bedNumber = parseInt(req.params.bed_number, 10);
        const patient = await Patient.findOne({ bed_number: bedNumber });
        if (!patient) {
            console.log(`Aucun patient trouvé pour le lit numéro ${bedNumber}`);
            res.status(404).json({ error: 'Patient non trouvé' });
            return;
        }

        console.log(`Recherche des données des signes vitaux pour le lit numéro ${bedNumber}`);

        // Récupérer les données pour le numéro de lit spécifique
        const [ecgData, heartRateData, breathRateData, spo2Data, temperatureData] = await Promise.all([
            Ecg.find({ bed: bedNumber }).sort({ timestamp: -1 }).limit(1),
            HeartRate.find({ bed: bedNumber }).sort({ timestamp: -1 }).limit(1),
            BreathRate.find({ bed: bedNumber }).sort({ timestamp: -1 }).limit(1),
            Spo2.find({ bed: bedNumber }).sort({ timestamp: -1 }).limit(1),
            Temperature.find({ bed: bedNumber }).sort({ timestamp: -1 }).limit(1)
        ]);

        // Filtrer uniquement le spo2Data
        const spo2 = spo2Data.length > 0 ? spo2Data[0] : null;

        console.log(`Données du signe vital 'spo2' pour le lit numéro ${bedNumber} :`, spo2);

        res.json({
            patient,
            ecg: ecgData.length > 0 ? ecgData[0] : null,
            heart_rate: heartRateData.length > 0 ? heartRateData[0] : null,
            breath_rate: breathRateData.length > 0 ? breathRateData[0] : null,
            spo2,
            temperature: temperatureData.length > 0 ? temperatureData[0] : null
        });
    } catch (err) {
        console.error('Erreur lors de la récupération des données des signes vitaux :', err);
        res.status(500).json({ error: err.message });
    }
});

// Route pour récupérer uniquement les données SPO2 par numéro de lit
app.get('/spo2', async (req, res) => {
    try {
        const bedNumber = parseInt(req.query.bed, 10);
        const spo2Data = await Spo2.find({ bed: bedNumber }).sort({ timestamp: -1 }).limit(1);
        res.json(spo2Data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route pour récupérer uniquement les données ECG par numéro de lit
app.get('/ecg', async (req, res) => {
    try {
        const bedNumber = parseInt(req.query.bed, 10);
        const ecgData = await Ecg.find({ bed: bedNumber }).sort({ timestamp: -1 }).limit(1);
        res.json(ecgData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route pour récupérer uniquement les données Heart Rate par numéro de lit
app.get('/heart_rate', async (req, res) => {
    try {
        const bedNumber = parseInt(req.query.bed, 10);
        const heartRateData = await HeartRate.find({ bed: bedNumber }).sort({ timestamp: -1 }).limit(1);
        res.json(heartRateData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route pour récupérer uniquement les données Breath Rate par numéro de lit
app.get('/breath_rate', async (req, res) => {
    try {
        const bedNumber = parseInt(req.query.bed, 10);
        const breathRateData = await BreathRate.find({ bed: bedNumber }).sort({ timestamp: -1 }).limit(1);
        res.json(breathRateData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route pour récupérer uniquement les données Temperature par numéro de lit
app.get('/temperature', async (req, res) => {
    try {
        const bedNumber = parseInt(req.query.bed, 10);
        const temperatureData = await Temperature.find({ bed: bedNumber }).sort({ timestamp: -1 }).limit(1);
        console.log('la temperature',temperatureData)
        res.json(temperatureData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});






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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


