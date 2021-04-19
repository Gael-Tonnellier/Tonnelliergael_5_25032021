import {deleteProduct} from './module.js';
import {cardProductInCart} from './module.js';
// APPEL API POUR TOUTES LES CAMERAS

/* function camerasRequest() {

  //REQUETE XHR
  const requestXHR = new XMLHttpRequest();
  requestXHR.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      const request = JSON.parse(this.responseText);
      //console.log(request)
      // IMPORT DES FONCTIONS QUI UTILISE LE REQUEST

      cameraShop(request);
      carousel(request);
    }else{
      alert(Erreur dans la récupération des objets);
    }
  };
  requestXHR.open("GET", "http://localhost:3000/api/cameras/");
  requestXHR.send();
}
camerasRequest(); */

// REQUETE FETCH
function requestFetch() {
  let request = fetch("http://localhost:3000/api/cameras/")
    .then((response) => response.json())
    .then((cameras) => {
      cameraShop(cameras);
      carousel(cameras);
    })
    .catch(() => console.log("erreur d'API"));
}
requestFetch();

// CAROUSEL DES CAMERAS MIS EN AVANT

function carousel(camera) {
  // ORGANISATION DU TABLEAU DU PRIX LE MOINS ELEVE AU PLUS ELEVE
  //console.log(camera)
  camera.sort((a, b) => a.price - b.price);
  //console.log(camera)

  // PREMIER PRODUIT DU TABLEAU
  const cheaperProduct = `<div class="carousel-item active">
    <img src="${camera[0].imageUrl}" class="d-block w-100" alt="${camera[0].name}">
      <div class="carousel-caption d-block d-md-block  bg-white  rounded border border-dark">
        <h5>Pour les débutants !</h5>
        <p>${camera[0].name}</p>
        <a class="link-dark" href="description.html?id=${camera[0]._id}"> En savoir plus </a>
    </div>
  </div>`;
  document.getElementById("carousel").innerHTML += cheaperProduct;

  // DERNIER PRODUIT DU TABLEAU
  const expensiveProduct = `<div class="carousel-item">
  <img src="${camera[camera.length - 1].imageUrl}" class="d-block w-100" alt="${
    camera[camera.length - 1].name
  }">
  <div class="carousel-caption d-block d-md-block bg-white rounded border border-dark">
      <h5>Pour les pros !</h5>
      <p>${camera[camera.length - 1].name}</p>
      <a class="link-dark" href="description.html?id=${
        camera[camera.length - 1]._id
      }"> En savoir plus </a>
  </div>
  </div>`;
  document.getElementById("carousel").innerHTML += expensiveProduct;

  // PRODUIT MILIEU DE TABLEAU
  const offerProduct = `<div class="carousel-item">
  <img src="${
    camera[Math.floor(camera.length / 2)].imageUrl
  }" class="d-block w-100" alt="${camera[Math.floor(camera.length / 2)].name}">
  <div class="carousel-caption d-block d-md-block bg-white rounded border border-dark">
      <h5>La meilleure offre !!</h5>
      <p>${camera[Math.floor(camera.length / 2)].name}</p>
      <a class="link-dark" href="description.html?id=${
        camera[Math.floor(camera.length / 2)]._id
      }"> En savoir plus </a>
  </div>
  </div>`;
  document.getElementById("carousel").innerHTML += offerProduct;
}

// CREATION DES CARDS

function cameraShop(obj) {
  obj.forEach((cameras) => {
    //console.log(cameras.name);
    const camerasContent = `<div class="card">
          <img src="${cameras.imageUrl}" class="card-img-top"alt= "Appareil ${
      cameras.name
    }">
          <div class="card-body">
          <h5 class="card-title">${cameras.name}</h5>
          <p class="card-text">${cameras.description}</p>
          <p class="card-price">${cameras.price / 100}€</p>
          <p class="card-choice">Lentilles disponibles pour ce produit : ${
            cameras.lenses.length
          }</p>
          <a  href="description.html?id=${
            cameras._id
          }" class="btn btn-dark">Voir la page produit</a>
          </div>
          </div>`;

    const cameraCard = document.createElement("div");
    cameraCard.className = "col-md-4 mb-3 mt-3";
    cameraCard.innerHTML = camerasContent;

    const containerCard = document.getElementById("container-card");

    containerCard.appendChild(cameraCard);
  });
}
// CREATION CARDS PRODUITS DANS LE PANIER
cardProductInCart();








