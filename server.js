const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Permet à ton frontend de communiquer avec ton backend
app.use(express.json());

// On copie la liste des produits côté serveur pour garantir l'intégrité des prix lors du calcul
const products = [
    // BOUCHERIE
    { name: "Steak haché 5% MG 500g", category: "boucherie", prices: { Carrefour: 6.20, Leclerc: 5.89, Auchan: 6.45, Intermarché: 6.05 }},
    { name: "Escalope de poulet 1kg", category: "boucherie", prices: { Carrefour: 9.80, Leclerc: 9.20, Auchan: 9.95, Intermarché: 9.50 }},
    { name: "Cordon bleu x4", category: "boucherie", prices: { Carrefour: 4.90, Leclerc: 4.65, Auchan: 5.10, Intermarché: 4.80 }},
    { name: "Saucisses de Toulouse 1kg", category: "boucherie", prices: { Carrefour: 7.80, Leclerc: 7.40, Auchan: 8.10, Intermarché: 7.65 }},
    { name: "Bœuf bourguignon 1kg", category: "boucherie", prices: { Carrefour: 12.90, Leclerc: 12.40, Auchan: 13.20, Intermarché: 12.70 }},
    { name: "Lardons fumés 200g", category: "boucherie", prices: { Carrefour: 2.30, Leclerc: 2.10, Auchan: 2.45, Intermarché: 2.20 }},
    { name: "Filet de dinde 600g", category: "boucherie", prices: { Carrefour: 7.90, Leclerc: 7.50, Auchan: 8.10, Intermarché: 7.70 }},
    { name: "Chipolatas x6", category: "boucherie", prices: { Carrefour: 4.20, Leclerc: 3.95, Auchan: 4.35, Intermarché: 4.05 }},
    { name: "Côtelettes d'agneau 800g", category: "boucherie", prices: { Carrefour: 15.90, Leclerc: 15.20, Auchan: 16.30, Intermarché: 15.60 }},
    { name: "Blanc de poulet tranché 160g", category: "boucherie", prices: { Carrefour: 3.10, Leclerc: 2.90, Auchan: 3.25, Intermarché: 3.00 }},
    { name: "Jambon supérieur x4", category: "boucherie", prices: { Carrefour: 2.95, Leclerc: 2.75, Auchan: 3.10, Intermarché: 2.85 }},

    // EPICERIE
    { name: "Pâtes Spaghetti 1kg", category: "epicerie", prices: { Carrefour: 1.75, Leclerc: 1.60, Auchan: 1.85, Intermarché: 1.68 }},
    { name: "Riz Basmati 1kg", category: "epicerie", prices: { Carrefour: 3.40, Leclerc: 3.15, Auchan: 3.55, Intermarché: 3.28 }},
    { name: "Nutella 750g", category: "epicerie", prices: { Carrefour: 5.10, Leclerc: 4.95, Auchan: 5.25, Intermarché: 5.05 }},
    { name: "Farine T45 1kg", category: "epicerie", prices: { Carrefour: 1.25, Leclerc: 1.15, Auchan: 1.30, Intermarché: 1.20 }},
    { name: "Huile d'olive 1L", category: "epicerie", prices: { Carrefour: 8.50, Leclerc: 8.10, Auchan: 8.90, Intermarché: 8.40 }},
    { name: "Thon en boîte x3", category: "epicerie", prices: { Carrefour: 4.60, Leclerc: 4.35, Auchan: 4.80, Intermarché: 4.50 }},
    { name: "Céréales 500g", category: "epicerie", prices: { Carrefour: 3.90, Leclerc: 3.65, Auchan: 4.10, Intermarché: 3.80 }},
    { name: "Sucre 1kg", category: "epicerie", prices: { Carrefour: 1.60, Leclerc: 1.45, Auchan: 1.70, Intermarché: 1.55 }},
    { name: "Biscuits Prince x12", category: "epicerie", prices: { Carrefour: 2.40, Leclerc: 2.20, Auchan: 2.55, Intermarché: 2.35 }},
    { name: "Chocolat noir 200g", category: "epicerie", prices: { Carrefour: 3.60, Leclerc: 3.30, Auchan: 3.75, Intermarché: 3.50 }},
    { name: "Café moulu 250g", category: "epicerie", prices: { Carrefour: 4.80, Leclerc: 4.50, Auchan: 5.00, Intermarché: 4.70 }},
    { name: "Confiture fraise 370g", category: "epicerie", prices: { Carrefour: 2.90, Leclerc: 2.70, Auchan: 3.05, Intermarché: 2.85 }},
    { name: "Lentilles vertes 500g", category: "epicerie", prices: { Carrefour: 1.95, Leclerc: 1.80, Auchan: 2.05, Intermarché: 1.90 }},

    // ENTRETIEN
    { name: "Lessive liquide 2L", category: "entretien", prices: { Carrefour: 8.90, Leclerc: 8.45, Auchan: 9.10, Intermarché: 8.70 }},
    { name: "Liquide vaisselle 750ml", category: "entretien", prices: { Carrefour: 2.10, Leclerc: 1.95, Auchan: 2.25, Intermarché: 2.05 }},
    { name: "Papier toilette x12", category: "entretien", prices: { Carrefour: 6.90, Leclerc: 6.50, Auchan: 7.10, Intermarché: 6.75 }},
    { name: "Essuie-tout x6", category: "entretien", prices: { Carrefour: 4.40, Leclerc: 4.10, Auchan: 4.60, Intermarché: 4.25 }},
    { name: "Nettoyant multi-usage 1L", category: "entretien", prices: { Carrefour: 3.20, Leclerc: 2.95, Auchan: 3.35, Intermarché: 3.10 }},
    { name: "Tablettes lave-vaisselle x30", category: "entretien", prices: { Carrefour: 9.50, Leclerc: 9.10, Auchan: 9.80, Intermarché: 9.30 }},
    { name: "Eponge grattante x6", category: "entretien", prices: { Carrefour: 3.10, Leclerc: 2.90, Auchan: 3.25, Intermarché: 3.00 }},
    { name: "Sac poubelle 30L x20", category: "entretien", prices: { Carrefour: 4.20, Leclerc: 3.95, Auchan: 4.40, Intermarché: 4.05 }},
    { name: "Gel WC 750ml", category: "entretien", prices: { Carrefour: 2.60, Leclerc: 2.40, Auchan: 2.75, Intermarché: 2.50 }},
    { name: "Désinfectant spray 500ml", category: "entretien", prices: { Carrefour: 3.90, Leclerc: 3.65, Auchan: 4.10, Intermarché: 3.80 }},
    { name: "Adoucissant 1.5L", category: "entretien", prices: { Carrefour: 3.40, Leclerc: 3.15, Auchan: 3.55, Intermarché: 3.30 }},

    // BOISSONS
    { name: "Coca-Cola 1.5L", category: "boisson", prices: { Carrefour: 1.85, Leclerc: 1.70, Auchan: 1.95, Intermarché: 1.80 }},
    { name: "Eau Evian 6x1.5L", category: "boisson", prices: { Carrefour: 4.50, Leclerc: 4.20, Auchan: 4.65, Intermarché: 4.35 }},
    { name: "Jus d'orange 1L", category: "boisson", prices: { Carrefour: 2.50, Leclerc: 2.35, Auchan: 2.60, Intermarché: 2.45 }},
    { name: "Ice Tea 1.5L", category: "boisson", prices: { Carrefour: 1.95, Leclerc: 1.80, Auchan: 2.05, Intermarché: 1.90 }},
    { name: "Lait demi-écrémé 1L", category: "boisson", prices: { Carrefour: 1.20, Leclerc: 1.10, Auchan: 1.25, Intermarché: 1.15 }},
    { name: "Red Bull 250ml", category: "boisson", prices: { Carrefour: 1.70, Leclerc: 1.60, Auchan: 1.80, Intermarché: 1.65 }},
    { name: "Pepsi 1.5L", category: "boisson", prices: { Carrefour: 1.75, Leclerc: 1.60, Auchan: 1.85, Intermarché: 1.70 }},
    { name: "Fanta Orange 1.5L", category: "boisson", prices: { Carrefour: 1.85, Leclerc: 1.70, Auchan: 1.95, Intermarché: 1.80 }},
    { name: "Volvic 6x1.5L", category: "boisson", prices: { Carrefour: 4.30, Leclerc: 4.00, Auchan: 4.50, Intermarché: 4.15 }},
    { name: "Bière 1664 x6", category: "boisson", prices: { Carrefour: 5.90, Leclerc: 5.60, Auchan: 6.10, Intermarché: 5.75 }},
    { name: "Sirop grenadine 75cl", category: "boisson", prices: { Carrefour: 3.10, Leclerc: 2.90, Auchan: 3.25, Intermarché: 3.00 }},

    // FRUITS & LEGUMES
    { name: "Pommes Golden 1kg", category: "fruit", prices: { Carrefour: 2.40, Leclerc: 2.10, Auchan: 2.55, Intermarché: 2.25 }},
    { name: "Bananes 1kg", category: "fruit", prices: { Carrefour: 1.90, Leclerc: 1.75, Auchan: 2.00, Intermarché: 1.85 }},
    { name: "Tomates 1kg", category: "fruit", prices: { Carrefour: 2.80, Leclerc: 2.50, Auchan: 2.95, Intermarché: 2.65 }},
    { name: "Pommes de terre 2kg", category: "fruit", prices: { Carrefour: 3.40, Leclerc: 3.10, Auchan: 3.60, Intermarché: 3.25 }},
    { name: "Carottes 1kg", category: "fruit", prices: { Carrefour: 1.90, Leclerc: 1.75, Auchan: 2.00, Intermarché: 1.85 }},
    { name: "Salade laitue", category: "fruit", prices: { Carrefour: 1.30, Leclerc: 1.20, Auchan: 1.40, Intermarché: 1.25 }},
    { name: "Oranges 1kg", category: "fruit", prices: { Carrefour: 2.60, Leclerc: 2.35, Auchan: 2.75, Intermarché: 2.50 }},
    { name: "Courgettes 1kg", category: "fruit", prices: { Carrefour: 2.70, Leclerc: 2.45, Auchan: 2.85, Intermarché: 2.60 }},
    { name: "Poivrons x3", category: "fruit", prices: { Carrefour: 3.20, Leclerc: 2.95, Auchan: 3.35, Intermarché: 3.10 }},
    { name: "Kiwi x6", category: "fruit", prices: { Carrefour: 2.50, Leclerc: 2.30, Auchan: 2.65, Intermarché: 2.45 }},
    { name: "Raisins 1kg", category: "fruit", prices: { Carrefour: 3.60, Leclerc: 3.30, Auchan: 3.80, Intermarché: 3.50 }},
    { name: "Avocats x2", category: "fruit", prices: { Carrefour: 2.80, Leclerc: 2.55, Auchan: 2.95, Intermarché: 2.70 }}
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
// Calcul du prix total du panier pour CHAQUE magasin
    productIndices.forEach(index => {
        const product = products[index];
        if (product) {
            stores.forEach(store => {
                // CORRECTION : On utilise product.prices
                storeTotals[store] += product.prices[store];
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
    console.log(`Serveur démarré sur http://localhost:3000`);
});