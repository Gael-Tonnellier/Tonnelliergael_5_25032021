// RECUPERATION DU PANIER EN LOCALSTORAGE
const cartOnStorage = JSON.parse(localStorage.getItem("panier"));

// CREATION TABLEAU VIDE QUI SERVIRONT AU POST API ET PRIX TOTAL
const allPrices = [];
const products = [];

// FONCTIONNALITE QUI PERMET DE CREE LES PRODUITS DANS LE TABLEAU
function recapProduct() {
  cartOnStorage.forEach((product) => {
    // PUSH DE CHAQUE PRIX D'ITEM DANS LE PANIER
    allPrices.push((product.totalProduct * product.price) / 100);

    //PUSH ID PRODUIT POUR CHAQUE NOMBRE DE PRODUIT
    const productNumber = product.totalProduct;
    for (let i = 0; i < productNumber; i++) {
      products.push(product.id);
    }

    const productCard = `<tr id="${product.id}">
              <td class="align-middle"><img class="rounded border" src="${
                product.img
              }"  alt="${product.name}" style="max-width:100%"></td>
              <td class="align-middle">${product.name}</td>
              <td class="align-middle">${product.totalProduct}</td>
              <td class="align-middle">${
                (product.price / 100) * product.totalProduct
              }</td>
              <td class="align-middle trash"><button type="button" onClick="deleteProduct('${
                product.id
              }')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
          </tr>`;
    document.getElementById("table-body").innerHTML += productCard;
  });
}
recapProduct();

//SUPRESSION CARD EN PANIER HTML + LOCALSTORAGE
function deleteProduct(product) {
  const indexProduct = cartOnStorage.findIndex((elem) => elem.id == product);
  cartOnStorage.splice(indexProduct, 1);
  localStorage.setItem("panier", JSON.stringify(cartOnStorage));
  document.getElementById(product).remove();
}

// FONCTIONNALITE QUI PERMET D'AFFICHER LE PRIX TOTAL
function totalPrices() {
  // REDUCTION DU TABLEAU ALLPRICES (ADDITION)
  const totalPrice = allPrices.reduce((a, b) => a + b, 0);
  document.getElementById("prix-total").innerHTML =
    "Prix total : " + totalPrice + " €";
}
totalPrices();

//FONCTIONNALITE QUI PERMET D'ENVOYER LE FORMULAIRE SI REMPLIS AVEC UN POST
function sendForm() {
  const forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();

          //RECUPERATION DES INFOS CLIENT A ENVOYER
          const contact = {
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("second-name").value,
            address: document.getElementById("first-name").value,
            city: document.getElementById("first-name").value,
            email: document.getElementById("mail").value,
          };

          //REQUETE XHR POUR ENVOYER CONTACT ET PRODUCT
          /* let request = new XMLHttpRequest();
          request.open("POST", "http://localhost:3000/api/cameras/order", true);
          request.setRequestHeader("Content-Type", "application/json");
          request.send(JSON.stringify({ contact, products }));
          request.onreadystatechange = function () {
            if (
              this.readyState === XMLHttpRequest.DONE &&
              this.status === 201
            ) {
              const response = this.responseText;
              console.log(response);
              localStorage.setItem("recap", response);
              window.location.pathname = "./confirmation.html";
            }
          }; */

          //REQUETE FETCH POUR ENVOYER CONTACT ET PRODUCT
          const request = fetch("http://localhost:3000/api/cameras/order",{
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({contact, products})
          })
            .then((response) => response.json())
            .then((order) => {
              console.log(order);
              (localStorage.setItem("recap", JSON.stringify(order)));
              window.location.pathname = "./confirmation.html";
            })
            .catch(() => console.log("erreur d'API"));
        }
        event.preventDefault();
        form.classList.add("was-validated");
      },
      false
    );
  });
}
sendForm();
