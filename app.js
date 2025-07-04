  const express = require('express');
  const path = require('path');

  const app = express();

  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));

  const livres = {
    "vampyria": { titre: "vampyria", statut: "disponible" },
    "Dracula": { titre: "Dracula", statut: "disponible" },
    "serpent & dove": { titre: "serpent & dove", statut: "disponible" }, 
    "inscienta": { titre: "inscienta", statut: "disponible" }, 
    "shadowhunter": { titre: "shadowhunter", statut: "pas disponible" },
    "confess": { titre: "confess", statut: "pas disponible" }
  };

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // Route pour emprunter un livre, recherche insensible à la casse
  app.post('/emprunter/:titre', (req, res) => {
    const titreRecherche = req.params.titre.toLowerCase();

    // Trouve la clé dans livres (insensible à la casse)
    const livreKey = Object.keys(livres).find(key => key.toLowerCase() === titreRecherche);

    if (!livreKey) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    const livre = livres[livreKey];

    if (livre.statut === "pas disponible") {
      return res.status(400).json({ message: 'Livre déjà emprunté' });
    }

    // Emprunter le livre
    livre.statut = "pas disponible";

    return res.status(200).json({ message: `Livre "${livreKey}" emprunté avec succès` });
  });

  module.exports = { app, livres };
