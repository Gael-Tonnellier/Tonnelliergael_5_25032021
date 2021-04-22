import {deleteProduct} from './module.js';
import {cardProductInCart} from './module.js';
import {cartCount} from './module.js';
// APPEL API D'UNE SEULE CAMERA

/* function cameraRequest(){


//REQUETE XHR
const requestXHR = new XMLHttpRequest();
requestXHR.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    const request = JSON.parse(this.responseText);

    // IMPORT DES FONCTIONS QUI UTILISE LE REQUEST

    cameraProduct(request);
    addCart(request);
  }
};
// AJOUT DE L'ID A L'ADRESSE API
requestXHR.open("GET", "http://localhost:3000/api/cameras/" + id);
requestXHR.send();
}
cameraRequest(); */

// REQUETE FETCH
function requestFetch() {
  const id = document.location.search.substring(4);
  // RECUPERATION DE L'ID PRODUIT VIA URL
  const request = fetch("http://localhost:3000/api/cameras/" + id)
    .then((response) => response.json())
    .then((camera) => {
      //console.log(camera);
      cameraProduct(camera);
      addCart(camera);
    })
    .catch(() =>{
      alert("Désolé nous ne trouvons pas votre produit, vous allez être redirigé");
      window.location.pathname = ('./index.html');
    });
}
requestFetch();

// CREATION PAGE DE LA CAMERA
function cameraProduct(camera) {
  document.querySelector("title").innerText = `Fiche Produit : ${camera.name}`;
  const cameraContent = `<div class="row justify-content-around mb-5" style="background-color:gray">
            <div class="col-lg-6 col-sm-10 py-5" >
            <img src="${
              camera.imageUrl
            }" class="img-fluid img-thumbnail  rounded-pill" alt="Appareil ${
    camera.name
  }">
            </div>
        </div>
        <div class="row justify-content-around mt-5">
            <h2 class="col-10 mt-5">${camera.name}</h2>
            <p class="lead col-10 mt-5">${camera.description}</p>
            <p class="col-10 mt-5">Lentilles: 
                <select class="form-select " aria-label="Default select example" id="formulary">
                <option selected>Choissisez la taille ici</option>           
                </select></p>
            <p class="col-10 mt-5"><strong>Prix : ${
              camera.price / 100
            } €</strong></p>
            <div class="col-10 mt-5 d-flex justify-content-end">
                <button id="add-button" class="btn btn-dark">Ajouter au panier</button>
            </div>
        </div>`;
  document.getElementById("container-product").innerHTML = cameraContent;

  // AJOUT DES VARIABLES PRODUIT
  camera.lenses.forEach((lense) => {
    const optionLense = `<option value="${lense}"> ${lense}</option>`;
    const form = document.getElementById("formulary");
    form.innerHTML += optionLense;
  });
}

// FONCTIONALITE AJOUT AU PANIER
function addCart(camera) {
  // CHECK SI UN PANIER EXISTE DEJA
  const cart = JSON.parse(sessionStorage.getItem("panier"))
    ? JSON.parse(sessionStorage.getItem("panier"))
    : [];

  let newProduct = {
    id: camera._id,
    img: camera.imageUrl,
    name: camera.name,
    price: camera.price,
    totalProduct: 1,
  };

  //AJOUT PRODUIT AU PANIER - INCREMENTE SI DEJA EN PANIER
  document.getElementById("add-button").addEventListener("click", () => {
    const productIsInCart = cart.findIndex(
      (product) => product.name == newProduct.name
    );
    if (productIsInCart != -1) {
      cart[productIsInCart].totalProduct += 1;
      sessionStorage.setItem("panier", JSON.stringify(cart));
    } else {
      cart.push(newProduct);
      sessionStorage.setItem("panier", JSON.stringify(cart));
    }
    document.location.reload();
  });
}

cardProductInCart();
cartCount();

