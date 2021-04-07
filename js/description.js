var id = document.location.search.substring(4);
var requestXHR = new XMLHttpRequest();
requestXHR.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          const request = JSON.parse(this.responseText);                
          
          cameraProduct(request);
          addCart(request);
          
      }
  };
  requestXHR.open("GET", "http://localhost:3000/api/cameras/" + id);
  requestXHR.send();

function cameraProduct(camera) {
    document.querySelector('title').innerText = `Fiche Produit : ${camera.name}`;
    let cameraContent =
        `<div class="row justify-content-around mb-5" style="background-color:gray">
            <div class="col-lg-6 col-sm-10 py-5" >
            <img src="${camera.imageUrl}" class="img-fluid img-thumbnail  rounded-pill" alt="Appareil ${camera.name}">
            </div>
        </div>
        <div class="row justify-content-around mt-5">
            <h2 class="col-10 mt-5">${camera.name}</h2>
            <p class="lead col-10 mt-5">${camera.description}</p>
            <p class="col-10 mt-5">Lentilles: 
                <select class="form-select " aria-label="Default select example" id="formulary">
                <option selected>Choissisez la taille ici</option>           
                </select></p>
            <p class="col-10 mt-5"><strong>Prix : ${camera.price/100} €</strong></p>
            <div class="col-10 mt-5 d-flex justify-content-end">
                <button id="add-button" class="btn btn-dark">Ajouter au panier</button>
            </div>
        </div>`;
    document.getElementById('container-product').innerHTML=cameraContent;
    camera.lenses.forEach((lense) => {
        let optionLense = `<option value="${lense}"> ${lense}</option>`;
        //console.log(optionLense);
        let form = document.getElementById("formulary"); 
        //console.log(form);
        form.innerHTML += optionLense;
        //console.log(lense);
    });    
};
function addCart(camera){

    if (JSON.parse(localStorage.getItem('panier'))){
        var cart = JSON.parse(localStorage.getItem('panier'))
    } else {
        var cart = []; 
    }
   
   let newProduct = {
       img: camera.imageUrl,
       name: camera.name,
       price: camera.price,
       totalProduct:1,
   }
   console.log(cart);
    document.getElementById('add-button').addEventListener('click',()=>{

        
        let productIsInCart= cart.findIndex(product=>product.name==newProduct.name);
        if (productIsInCart != -1 ){
            cart[productIsInCart].totalProduct +=1;
            localStorage.setItem('panier',JSON.stringify(cart));
        }else{
            cart.push(newProduct);
            localStorage.setItem('panier',JSON.stringify(cart));
        }     
    });
}