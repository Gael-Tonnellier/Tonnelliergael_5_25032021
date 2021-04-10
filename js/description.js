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
       id: camera._id,
       img: camera.imageUrl,
       name: camera.name,
       price: camera.price,
       totalProduct:1,
   }
   //console.log(cart);
    document.getElementById('add-button').addEventListener('click',()=>{    
        let productIsInCart= cart.findIndex(product=>product.name==newProduct.name);
        if (productIsInCart != -1 ){
            cart[productIsInCart].totalProduct +=1;
            localStorage.setItem('panier',JSON.stringify(cart));
        }else{
            cart.push(newProduct);
            localStorage.setItem('panier',JSON.stringify(cart));
        }
        document.location.reload();
    });
}

  function productInCart(){
    let cartOnStorage = JSON.parse(localStorage.getItem('panier'));
    cartOnStorage.forEach((product)=>{
        let productCard = 
        `<div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-4 align-self-center">
                    <img class="rounded border" src="${product.img}"  alt="${product.name}" style="max-width:100%">
                </div>
                <div class="col-6">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Prix: ${product.price/100*product.totalProduct}€</p>
                        <p class="card-text">Nombre d'article: ${product.totalProduct} </p>
                    </div>
                </div>
                <div class="col-2 align-self-center">
                    <button type="button" id="product_${product.name}" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>`;
        document.getElementById("panier").innerHTML += productCard;
        //console.log(product);
        
        document.getElementById('product_'+ product.name).addEventListener('click',()=>{
            let indexProduct= cartOnStorage.indexOf(product);
            cartOnStorage.splice(indexProduct,1);
            localStorage.setItem('panier',JSON.stringify(cartOnStorage));
            document.location.reload();     
        }) ;
        let indexProduct= cartOnStorage.indexOf(product.name);
        console.log(indexProduct);    
    });
       
    
};
 productInCart();
 export {productInCart};
 
 
