// Récupère le panier existant ou crée un nouveau tableau
let panier = JSON.parse(localStorage.getItem("panier")) || [];

// Fonction pour ajouter un produit au panier
function ajouterProduit(id) {
  panier.push(id);
  localStorage.setItem("panier", JSON.stringify(panier));
  afficherMessage(`✅ Produit ajouté : ${nomLisible(id)}`);
}

// Affiche un petit message animé (toast) en bas de l'écran
function afficherMessage(texte) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = texte;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// Remplace les ID techniques par des noms lisibles
function nomLisible(id) {
  const noms = {
    "burger": "Burger Classique",
    "salade": "Salade César",
    "pizza": "Pizza 4 Fromages",
    "riz": "Riz au Poisson",
    "brochette": "Brochette de Bœuf",
    "jus-ananas": "Jus d'Ananas",
    "omelette": "Omelette Nature",
    "spaghetti": "Spaghetti Bolognaise",
    "yassa": "Poulet Yassa"
  };
  return noms[id] || id;
}

//commande

// 1. Données produits
const produitsDisponibles = {
    "burger": { nom: "Burger Classique", prix: 2500 },
    "salade": { nom: "Salade César", prix: 1800 },
    "pizza": { nom: "Pizza 4 Fromages", prix: 3000 },
    "riz": { nom: "Riz au Poisson", prix: 2000 },
    "brochette": { nom: "Brochette de Bœuf", prix: 2200 },
    "jus-ananas": { nom: "Jus d'Ananas", prix: 800 },
    "omelette": { nom: "Omelette Nature", prix: 1500 },
    "spaghetti": { nom: "Spaghetti Bolognaise", prix: 2200 },
    "yassa": { nom: "Poulet Yassa", prix: 2800 }
  };
  
  // 2. Ajouter un produit (depuis menu.html)
  function ajouterProduit(id) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.push(id);
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherMessage(`✅ ${produitsDisponibles[id]?.nom || id} ajouté au panier !`);
  }
  
  // 3. Afficher un message temporaire
  function afficherMessage(texte) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = texte;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }
  
  // 4. Supprimer un plat du panier (1 occurrence)
  function supprimerDuPanier(id) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    const index = panier.indexOf(id);
    if (index !== -1) {
      panier.splice(index, 1);
      localStorage.setItem("panier", JSON.stringify(panier));
      afficherPanier();
    }
  }
  
  // 5. Vider tout le panier
  function viderPanier() {
    localStorage.removeItem("panier");
    afficherPanier();
  }
  
  // 6. Simuler validation de commande
  function validerCommande() {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    localStorage.setItem("panierSauvegarde", JSON.stringify(panier));
    localStorage.removeItem("panier");
    window.location.href = "confirmation.html";
  }
  
  // 7. Affichage dynamique du panier (dans commande.html)
  function afficherPanier() {
    const sectionPanier = document.getElementById("panier");
    const sectionTotal = document.getElementById("total");
    const boutonVider = document.getElementById("vider-btn");
    const boutonValider = document.getElementById("valider-btn");
  
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    const regroupé = {};
    panier.forEach(id => {
      regroupé[id] = (regroupé[id] || 0) + 1;
    });
  
    sectionPanier.innerHTML = "";
    sectionTotal.innerHTML = "";
  
    let total = 0;
  
    if (panier.length === 0) {
      sectionPanier.innerHTML = "<p>Aucun plat sélectionné.</p>";
      if (boutonVider) boutonVider.style.display = "none";
      if (boutonValider) boutonValider.style.display = "none";
      return;
    }
  
    if (boutonVider) boutonVider.style.display = "inline-block";
    if (boutonValider) boutonValider.style.display = "inline-block";
  
    for (let id in regroupé) {
      const produit = produitsDisponibles[id];
      const quantité = regroupé[id];
      const sousTotal = produit.prix * quantité;
      total += sousTotal;
  
      const ligne = document.createElement("div");
      ligne.className = "ligne-panier";
      ligne.innerHTML = `
        <strong>${produit.nom}</strong> — ${quantité} × ${produit.prix} = <strong>${sousTotal} FCFA</strong>
        <button onclick="supprimerDuPanier('${id}')">❌ Supprimer</button>
      `;
      sectionPanier.appendChild(ligne);
    }
  
    sectionTotal.innerHTML = `<h3>Total à payer : ${total} FCFA</h3>`;
  }
  
  // 8. Activer le panier si on est sur la bonne page
  if (window.location.pathname.includes("commande.html")) {
    document.addEventListener("DOMContentLoaded", () => {
      const viderBtn = document.getElementById("vider-btn");
      const validerBtn = document.getElementById("valider-btn");
      if (viderBtn) viderBtn.addEventListener("click", viderPanier);
      if (validerBtn) validerBtn.addEventListener("click", validerCommande);
      afficherPanier();
    });
  }
  


  /*contact*/ 

  // Activation spécifique de la page contact
  if (window.location.pathname.includes("contact.html")) {
    document.addEventListener("DOMContentLoaded", () => {
      const select = document.getElementById("langueWhatsapp");
      const lien = document.getElementById("lienWhatsapp");
  
      const numero = "229 0161697134"; // ← Ton vrai numéro ici
  
      // Déterminer l'heure
      const heure = new Date().getHours();
      const salutation = heure >= 18 ? { fr: "Bonsoir", en: "Good evening", fon: "Fiɖa yiɛ" }
                                     : { fr: "Bonjour", en: "Good morning", fon: "A fɔ" };
  
      // Corps du message selon langue
      const corps = {
        fr: ", je suis intéressé(e) par vos services",
        en: ", I’m interested in your services",
        fon: ", n mɛ yɔ gbɛ na wɛ nu gbe"
      };
  
      function actualiserLien() {
        const langue = select.value;
        const message = encodeURIComponent(salutation[langue] + corps[langue]);
        lien.href = `https://wa.me/${numero}?text=${message}`;
      }
  
      select.addEventListener("change", actualiserLien);
      actualiserLien(); // au chargement
    });
  }
  
  