export function cardProductInCart() {
  // RECUPERATION DU PANIER EN LOCALSTORAGE
  const cartOnStorage = JSON.parse(localStorage.getItem("panier"));

  // CREATION CARD EN PANIER

  cartOnStorage.forEach((product) => {
    const productCard = `<div class="card mb-3" id="${
      product.id
    }" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-4 align-self-center">
                    <img class="rounded border" src="${product.img}"  alt="${
      product.name
    }" style="max-width:100%">
                </div>
                <div class="col-6">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Prix: ${
                          (product.price / 100) * product.totalProduct
                        }€</p>
                        <p class="card-text">Nombre d'article: ${
                          product.totalProduct
                        } </p>
                    </div>
                </div>
                <div class="col-2 align-self-center">
                    <button type="button" onClick="deleteProduct('${
                      product.id
                    }')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>`;
    document.getElementById("panier").innerHTML += productCard;
  });
}


//SUPRESSION CARD EN PANIER HTML + LOCALSTORAGE

export function deleteProduct(id) {
  const cartOnStorage = JSON.parse(localStorage.getItem("panier"));
  const indexProduct = cartOnStorage.findIndex((elem) => elem.id == id);
  cartOnStorage.splice(indexProduct, 1);
  localStorage.setItem("panier", JSON.stringify(cartOnStorage));
  document.getElementById(id).remove();
} 
window.deleteProduct=deleteProduct;
