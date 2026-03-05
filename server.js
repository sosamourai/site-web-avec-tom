const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Permet à ton frontend de communiquer avec ton backend
app.use(express.json());

// On copie la liste des produits côté serveur pour garantir l'intégrité des prix lors du calcul
const products = [
    // BOUCHERIE
    { name: "Steak haché 5% MG 500g", prices: { Carrefour: 6.20, Leclerc: 5.89, Auchan: 6.45, Intermarché: 6.05 }},
    { name: "Escalope de poulet 1kg", prices: { Carrefour: 9.80, Leclerc: 9.20, Auchan: 9.95, Intermarché: 9.50 }},
    // ... (Ajoute le reste de ton tableau products ici pour que le serveur le connaisse)
    { name: "Avocats x2", prices: { Carrefour: 2.80, Leclerc: 2.55, Auchan: 2.95, Intermarché: 2.70 }}
];

// Route qui compare les prix d'une liste d'indices de produits
app.post('/compare-prices', (req, res) => {
    // On s'attend à recevoir un tableau contenant les index des produits du panier
    const { productIndices } = req.body; 

    if (!productIndices || productIndices.length === 0) {
        return res.status(400).json({ error: "Votre panier est vide." });
    }

    const stores = ['Carrefour', 'Leclerc', 'Auchan', 'Intermarché'];
    
    // Initialiser les totaux à 0 pour chaque magasin
    let storeTotals = { Carrefour: 0, Leclerc: 0, Auchan: 0, Intermarché: 0 };

    // Calcul du prix total du panier pour CHAQUE magasin
    productIndices.forEach(index => {
        const product = products[index];
        if (product) {
            stores.forEach(store => {
                storeTotals[store] += product[prices][store];
            });
        }
    });

    // Déterminer quel magasin a le total le plus bas
    let bestStore = stores[0];
    let minTotal = storeTotals[bestStore];

    stores.forEach(store => {
        if (storeTotals[store] < minTotal) {
            bestStore = store;
            minTotal = storeTotals[store];
        }
    });

    // Renvoyer le résultat au frontend
    res.json({
        bestStore: bestStore,
        total: parseFloat(minTotal.toFixed(2)),
        allTotals: storeTotals // Optionnel : pour afficher les prix des autres magasins si besoin
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});