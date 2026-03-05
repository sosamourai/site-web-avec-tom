let isLoginMode = true;
let cart = [];
let cartIndices = []; // Stocke les index des produits pour le calcul serveur

window.onload = function () {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
        showMainSite();
    }
};

// ================= AUTHENTIFICATION =================

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById("authTitle").textContent = isLoginMode ? "Connexion" : "Créer un compte";
    document.getElementById("authButton").textContent = isLoginMode ? "Se connecter" : "Créer un compte";
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
        message.textContent = "Compte créé avec succès.";
        toggleAuthMode();
    }
}

function showMainSite() {
    document.getElementById("authContainer").style.display = "none";
    document.getElementById("mainSite").style.display = "block";
    displayProducts();
}

function logout() {
    localStorage.removeItem("loggedUser");
    location.reload();
}

// ================= DONNÉES PRODUITS =================

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


// ================= AFFICHAGE PRODUITS =================

function filterCategory(category) {
    displayProducts(category);
}

function displayProducts(filteredCategory = "all") {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        if (filteredCategory === "all" || product.category === filteredCategory) {
            const div = document.createElement("div");
            div.className = "product";

            const minPrice = Math.min(...Object.values(product.prices));
            let priceOptions = "";

            for (let store in product.prices) {
                const price = product.prices[store];
                const isCheapest = price === minPrice;
                priceOptions += `
                    <label style="color:${isCheapest ? 'green' : 'black'}">
                        <input type="radio" name="store-${index}" value="${store}">
                        ${store} - ${price} € ${isCheapest ? "✔" : ""}
                    </label><br>
                `;
            }

            div.innerHTML = `
                <strong>${product.name}</strong><br>
                ${priceOptions}
                <button onclick="addToCart(${index})">Ajouter au panier</button>
            `;
            productList.appendChild(div);
        }
    });
}

// ================= GESTION PANIER =================

function addToCart(index) {
    const selectedStore = document.querySelector(`input[name="store-${index}"]:checked`);
    if (!selectedStore) {
        alert("Veuillez sélectionner un magasin pour ce produit.");
        return;
    }

    const product = products[index];
    const store = selectedStore.value;
    const price = product.prices[store];

    cart.push({ name: product.name, store, price });
    cartIndices.push(index); // On garde l'index pour la comparaison serveur
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    cartIndices.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");
    const cartCount = document.getElementById("cartCount");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                ${item.name} (${item.store}) - ${item.price} €
                <button onclick="removeFromCart(${index})">X</button>
            </div>
        `;
    });

    totalPrice.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

function showCart() {
    document.querySelector(".cart").style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
}