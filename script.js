
let isLoginMode = true;
let cart = [];

window.onload = function () {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
        showMainSite();
    }
};

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById("authTitle").textContent = isLoginMode ? "Connexion" : "Créer un compte";
    document.getElementById("authButton").textContent = isLoginMode ? "Se connecter" : "S'inscrire";
    document.getElementById("switchAuth").textContent = isLoginMode ? "Créer un compte" : "Déjà un compte ? Se connecter";
    document.getElementById("authMessage").textContent = "";
}

function handleAuth() {
    const username = document.getElementById("authUsername").value;
    const password = document.getElementById("authPassword").value;
    const message = document.getElementById("authMessage");

    if (!username || !password) {
        message.textContent = "Veuillez remplir tous les champs.";
        return;
    }

    if (isLoginMode) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.username === username && storedUser.password === password) {
            localStorage.setItem("loggedUser", username);
            showMainSite();
        } else {
            message.textContent = "Identifiants incorrects.";
        }
    } else {
        const user = { username, password };
        localStorage.setItem("user", JSON.stringify(user));
        message.textContent = "Compte créé avec succès !";
        toggleAuthMode();
    }
}

function showMainSite() {
    document.getElementById("authContainer").style.display = "none";
    document.getElementById("mainSite").style.display = "block";
    displayProducts("all");
}

function logout() {
    localStorage.removeItem("loggedUser");
    location.reload();
}


// 2. BASE DE DONNÉES De la liste 

const products = [
    // BOUCHERIE
    { name: "Steak haché 5% MG 500g", category: "boucherie", prices: { Carrefour: 5.50, Leclerc: 5.89, Auchan: 6.10, Intermarché: 5.75 }},
    { name: "Escalope de poulet 1kg", category: "boucherie", prices: { Carrefour: 8.90, Leclerc: 9.20, Auchan: 9.95, Intermarché: 9.10 }},
    { name: "Cordon bleu x4", category: "boucherie", prices: { Carrefour: 4.90, Leclerc: 4.65, Auchan: 5.10, Intermarché: 4.50 }},
    { name: "Saucisses de Toulouse 1kg", category: "boucherie", prices: { Carrefour: 7.20, Leclerc: 7.40, Auchan: 7.10, Intermarché: 7.65 }},
    { name: "Bœuf bourguignon 1kg", category: "boucherie", prices: { Carrefour: 12.90, Leclerc: 13.10, Auchan: 13.20, Intermarché: 12.40 }},
    { name: "Lardons fumés 200g", category: "boucherie", prices: { Carrefour: 2.10, Leclerc: 2.15, Auchan: 2.45, Intermarché: 2.05 }},
    { name: "Filet de dinde 600g", category: "boucherie", prices: { Carrefour: 7.30, Leclerc: 7.50, Auchan: 7.80, Intermarché: 7.15 }},
    { name: "Chipolatas x6", category: "boucherie", prices: { Carrefour: 3.90, Leclerc: 4.10, Auchan: 4.35, Intermarché: 3.95 }},
    { name: "Côtelettes d'agneau 800g", category: "boucherie", prices: { Carrefour: 15.90, Leclerc: 16.50, Auchan: 14.80, Intermarché: 15.60 }},
    { name: "Blanc de poulet tranché 160g", category: "boucherie", prices: { Carrefour: 3.10, Leclerc: 2.90, Auchan: 3.25, Intermarché: 3.00 }},
    { name: "Jambon supérieur x4", category: "boucherie", prices: { Carrefour: 2.70, Leclerc: 2.75, Auchan: 3.10, Intermarché: 2.85 }},

    // EPICERIE
    { name: "Pâtes Spaghetti 1kg", category: "epicerie", prices: { Carrefour: 1.75, Leclerc: 1.60, Auchan: 1.55, Intermarché: 1.68 }},
    { name: "Riz Basmati 1kg", category: "epicerie", prices: { Carrefour: 3.40, Leclerc: 3.15, Auchan: 3.55, Intermarché: 3.28 }},
    { name: "Nutella 750g", category: "epicerie", prices: { Carrefour: 5.10, Leclerc: 5.20, Auchan: 4.90, Intermarché: 5.05 }},
    { name: "Farine T45 1kg", category: "epicerie", prices: { Carrefour: 1.25, Leclerc: 1.15, Auchan: 1.30, Intermarché: 1.10 }},
    { name: "Huile d'olive 1L", category: "epicerie", prices: { Carrefour: 8.50, Leclerc: 8.10, Auchan: 8.90, Intermarché: 8.40 }},
    { name: "Thon en boîte x3", category: "epicerie", prices: { Carrefour: 4.30, Leclerc: 4.35, Auchan: 4.10, Intermarché: 4.50 }},
    { name: "Céréales 500g", category: "epicerie", prices: { Carrefour: 3.90, Leclerc: 3.65, Auchan: 4.10, Intermarché: 3.80 }},
    { name: "Sucre 1kg", category: "epicerie", prices: { Carrefour: 1.40, Leclerc: 1.45, Auchan: 1.70, Intermarché: 1.55 }},
    { name: "Biscuits Prince x12", category: "epicerie", prices: { Carrefour: 2.40, Leclerc: 2.10, Auchan: 2.55, Intermarché: 2.35 }},
    { name: "Chocolat noir 200g", category: "epicerie", prices: { Carrefour: 3.60, Leclerc: 3.30, Auchan: 3.20, Intermarché: 3.50 }},
    { name: "Café moulu 250g", category: "epicerie", prices: { Carrefour: 4.80, Leclerc: 4.50, Auchan: 4.40, Intermarché: 4.70 }},
    { name: "Confiture fraise 370g", category: "epicerie", prices: { Carrefour: 2.90, Leclerc: 2.70, Auchan: 3.05, Intermarché: 2.85 }},
    { name: "Lentilles vertes 500g", category: "epicerie", prices: { Carrefour: 1.95, Leclerc: 1.80, Auchan: 1.75, Intermarché: 1.90 }},

    // ENTRETIEN
    { name: "Lessive liquide 2L", category: "entretien", prices: { Carrefour: 8.90, Leclerc: 8.45, Auchan: 8.20, Intermarché: 8.15 }},
    { name: "Liquide vaisselle 750ml", category: "entretien", prices: { Carrefour: 1.85, Leclerc: 1.95, Auchan: 2.25, Intermarché: 1.90 }},
    { name: "Papier toilette x12", category: "entretien", prices: { Carrefour: 6.90, Leclerc: 6.50, Auchan: 6.30, Intermarché: 6.75 }},
    { name: "Essuie-tout x6", category: "entretien", prices: { Carrefour: 4.40, Leclerc: 4.10, Auchan: 4.60, Intermarché: 3.95 }},
    { name: "Nettoyant multi-usage 1L", category: "entretien", prices: { Carrefour: 3.20, Leclerc: 2.95, Auchan: 2.80, Intermarché: 3.10 }},

    // BOISSONS
    { name: "Coca-Cola 1.5L", category: "boisson", prices: { Carrefour: 1.65, Leclerc: 1.70, Auchan: 1.80, Intermarché: 1.75 }},
    { name: "Eau Evian 6x1.5L", category: "boisson", prices: { Carrefour: 4.50, Leclerc: 4.20, Auchan: 4.10, Intermarché: 4.35 }},
    { name: "Lait demi-écrémé 1L", category: "boisson", prices: { Carrefour: 1.10, Leclerc: 1.15, Auchan: 1.25, Intermarché: 1.05 }},

    // FRUITS & LEGUMES
    { name: "Pommes Golden 1kg", category: "fruit", prices: { Carrefour: 2.10, Leclerc: 2.20, Auchan: 2.55, Intermarché: 2.25 }},
    { name: "Bananes 1kg", category: "fruit", prices: { Carrefour: 1.70, Leclerc: 1.75, Auchan: 2.00, Intermarché: 1.85 }},
    { name: "Tomates 1kg", category: "fruit", prices: { Carrefour: 2.80, Leclerc: 2.50, Auchan: 2.40, Intermarché: 2.65 }}
];


function filterCategory(category) {
    displayProducts(category);
}

function displayProducts(filteredCategory = "all") {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        if (filteredCategory === "all" || product.category === filteredCategory) {
            const div = document.createElement("div");
            div.className = "product-card";

            const pricesArr = Object.values(product.prices);
            const minPrice = Math.min(...pricesArr);
            const maxPrice = Math.max(...pricesArr);

            div.innerHTML = `
                <strong>${product.name}</strong>
                <small>Prix de ${minPrice.toFixed(2)}€ à ${maxPrice.toFixed(2)}€</small>
                <button onclick="addToCart(${index})">🛒 Ajouter</button>
            `;
            productList.appendChild(div);
        }
    });
}

// organisation du panier 
function addToCart(productIndex) {
    const product = products[productIndex];
    cart.push(product);
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    document.getElementById("comparisonResults").style.display = "none";
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Le panier est vide.</p>";
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `
                <span>${item.name}</span>
                <button onclick="removeFromCart(${index})">✕</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
    cartCount.textContent = cart.length;
}

function showCart() {
    document.querySelector(".cart").scrollIntoView({ behavior: 'smooth' });
}

// comparateur des prix
function comparePrices() {
    if (cart.length === 0) {
        alert("Ajoutez des articles à votre panier pour comparer !");
        return;
    }
    const storeNames = ["Carrefour", "Leclerc", "Auchan", "Intermarché"];
    let totals = { Carrefour: 0, Leclerc: 0, Auchan: 0, Intermarché: 0 };

    // Calcul du cumul pour chaque enseigne
    cart.forEach(item => {
        storeNames.forEach(store => {
            totals[store] += item.prices[store];
        });
    });

    // Transformation en tableau pour trier les résultats
    const sortedResults = Object.keys(totals)
        .map(store => ({ name: store, total: totals[store] }))
        .sort((a, b) => a.total - b.total);

    // Affichage des résultats
    const resultsSection = document.getElementById("comparisonResults");
    const rankingsDiv = document.getElementById("storeRankings");
    const bestMsg = document.getElementById("bestStoreMessage");

    rankingsDiv.innerHTML = "";
    sortedResults.forEach((result, index) => {
        const row = document.createElement("p");
        row.style.padding = "10px";
        row.style.background = index === 0 ? "#eaffea" : "#f9f9f9";
        row.style.borderRadius = "8px";
        row.style.margin = "5px 0";
        row.innerHTML = `<strong>${index + 1}. ${result.name}</strong> : ${result.total.toFixed(2)} €`;
        rankingsDiv.appendChild(row);
    });

    bestMsg.innerHTML = `🏆 C'est chez <strong>${sortedResults[0].name}</strong> que vous économisez le plus (${sortedResults[0].total.toFixed(2)} €) !`;
    resultsSection.style.display = "block";
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}