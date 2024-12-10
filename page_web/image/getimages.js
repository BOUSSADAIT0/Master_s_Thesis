const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Remplacez par votre URL de connexion MongoDB
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

client.connect(err => {
  if (err) {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1);
  }

  console.log('Connecté à MongoDB');
  const db = client.db('hopital');
  const collection = db.collection('video');

  app.get('/images', async (req, res, next) => {
    try {
      console.log('Requête reçue pour /images');
      const images = await collection.find().toArray();
      console.log('Images récupérées:', images);

      if (!images.length) {
        res.status(404).send('Aucune image trouvée');
        return;
      }

      let html = '<html><body>';
      images.forEach(imageDoc => {
        const imageBuffer = Buffer.from(imageDoc.image.buffer);
        const base64Image = imageBuffer.toString('base64');
        const imgSrcString = `data:image/jpeg;base64,${base64Image}`;
        html += `<img src="${imgSrcString}" alt="Image from MongoDB" style="margin: 10px; max-width: 200px;" />`;
      });
      html += '</body></html>';

      res.send(html);
    } catch (err) {
      console.error('Erreur lors de la récupération des images:', err);
      next(err); // Passez l'erreur au middleware de gestion des erreurs
    }
  });

  // Middleware pour gérer les erreurs
  app.use((err, req, res, next) => {
    console.error('Erreur middleware:', err);
    res.status(500).send('Erreur interne du serveur');
  });

  app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });
});
