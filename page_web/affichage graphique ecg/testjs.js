// // const express = require('express');
// // const { MongoClient } = require('mongodb');

// // const app = express();
// // const port = 3000;

// // const uri = 'mongodb://127.0.0.1:27017';  // Remplacez par l'URI de votre base de données MongoDB
// // const dbName = 'hopital';
// // const collectionName = 'ecg';

// // async function fetchLatestEcgData() {
// //     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// //     try {
// //         await client.connect();
// //         const db = client.db(dbName);
// //         const collection = db.collection(collectionName);

// //         // Récupérer le dernier document de la collection `ecg`
// //         const latestEcgData = await collection.find({}).sort({ _id: -1 }).limit(1).toArray();
// //         return latestEcgData;
// //     } catch (error) {
// //         console.error('Error fetching latest ECG data:', error);
// //         throw error;
// //     } finally {
// //         await client.close();
// //     }
// // }

// // app.get('/ecg', async (req, res) => {
// //     try {
// //         const ecgData = await fetchLatestEcgData();
// //         res.json(ecgData);
// //     } catch (error) {
// //         res.status(500).send('Error fetching ECG data');
// //     }
// // });

// // app.listen(port, () => {
// //     console.log(`Server is running on http://localhost:${port}`);
// // });
// const express = require('express');
// const { MongoClient } = require('mongodb');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// const uri = 'mongodb://127.0.0.1:27017'; // Remplacez par l'URI de votre base de données MongoDB
// const dbName = 'hopital';
// const collectionName = 'ecg';

// app.use(cors());

// async function fetchLatestEcgData() {
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         // Récupérer le dernier document de la collection `ecg`
//         const latestEcgData = await collection.find({}).sort({ _id: -1 }).limit(1).toArray();
//         return latestEcgData[0].value;
//     } catch (error) {
//         console.error('Error fetching latest ECG data:', error);
//         throw error;
//     } finally {
//         await client.close();
//     }
// }

// app.get('/ecg', async (req, res) => {
//     try {
//         const ecgData = await fetchLatestEcgData();
//         res.json(ecgData);
//     } catch (error) {
//         res.status(500).send('Error fetching ECG data');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
/////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB Connection String
const uri = 'mongodb://127.0.0.1:27017/hopital';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Schema for Blood Pressure Systolic
const BloodPressureSSchema = new mongoose.Schema({
    bed: Number,
    value: Number,
    timestamp: { type: Date, default: Date.now }
});

// Schema for Blood Pressure Diastolic
const BloodPressureDSchema = new mongoose.Schema({
    bed: Number,
    value: Number,
    timestamp: { type: Date, default: Date.now }
});

// Models for Blood Pressure Systolic and Diastolic
const BloodPressureS = mongoose.model('blood_pressure_s', BloodPressureSSchema);
const BloodPressureD = mongoose.model('blood_pressure_d', BloodPressureDSchema);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Route to add a new blood pressure systolic value
app.post('/blood_pressure_s', async (req, res) => {
    const { bed, systolic } = req.body;

    if (!bed || !systolic) {
        return res.status(400).send('Bed and systolic value are required');
    }

    try {
        const newBloodPressureS = new BloodPressureS({ bed, value: systolic });
        await newBloodPressureS.save();

        res.status(201).send('Blood pressure systolic value added successfully');
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

// // Route to add a new blood pressure diastolic value
// app.post('/blood_pressure_d', async (req, res) => {
//     const { bed, diastolic } = req.body;

//     if (!bed || !diastolic) {
//         return res.status(400).send('Bed and diastolic value are required');
//     }

//     try {
//         const newBloodPressureD = new BloodPressureD({ bed, value: diastolic });
//         await newBloodPressureD.save();

//         res.status(201).send('Blood pressure diastolic value added successfully');
//     } catch (error) {
//         res.status(500).send('Server error: ' + error.message);
//     }
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


////////////////////////////////////////////////////////////////////:

// const mongoose = require('mongoose');

// // MongoDB Connection String
// const uri = 'mongodb://127.0.0.1:27017/hopital';

// async function listCollections() {
//     try {
//         // Connect to the MongoDB database
//         await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//         // Get the database object
//         const db = mongoose.connection.db;

//         // List all collections in the database
//         const collections = await db.listCollections().toArray();

//         // Log the collections to the terminal
//         console.log('Collections in the hopital database:');
//         collections.forEach(collection => console.log(collection.name));
//     } catch (error) {
//         console.error('Error listing collections:', error);
//     } finally {
//         // Close the connection to the database
//         mongoose.connection.close();
//     }
// }

// // Run the function to list collections
// listCollections();
