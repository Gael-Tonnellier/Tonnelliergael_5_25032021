export function cardProductInCart() {
  // RECUPERATION DU PANIER EN LOCALSTORAGE
  const cartOnStorage = JSON.parse(sessionStorage.getItem("panier"));

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
                        <h2 class="card-title">${product.name}</h5>
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
  const cartOnStorage = JSON.parse(sessionStorage.getItem("panier"));
  const indexProduct = cartOnStorage.findIndex((elem) => elem.id == id);
  cartOnStorage.splice(indexProduct, 1);
  sessionStorage.setItem("panier", JSON.stringify(cartOnStorage));
  document.getElementById(id).remove();
  cartCount();
} 
window.deleteProduct=deleteProduct;

export function cartCount(){
  const totalProductInCart=[];
const cartOnStorage = JSON.parse(sessionStorage.getItem("panier"));
cartOnStorage.forEach ((product)=>{
  totalProductInCart.push(product.totalProduct);
});
const sumTotalProductIncart=totalProductInCart.reduce((a, b) => a + b, 0);
//console.log(sumTotalProductIncart);
document.getElementById('cartCount').innerHTML =sumTotalProductIncart;
}