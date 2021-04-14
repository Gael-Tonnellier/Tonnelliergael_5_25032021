let cartOnStorage = JSON.parse(localStorage.getItem("panier"));
let allPrices = [];
let products = [];
cartOnStorage.forEach((product) => {
  allPrices.push((product.totalProduct * product.price) / 100);
  let productNumber= product.totalProduct;
  for(let i=0; i<productNumber;i++){
    products.push(product.id);
  }
  
  let productCard = `<tr id="${product.id}">
            <td class="align-middle"><img class="rounded border" src="${
              product.img
            }"  alt="${product.name}" style="max-width:100%"></td>
            <td class="align-middle">${product.name}</td>
            <td class="align-middle">${product.totalProduct}</td>
            <td class="align-middle">${
              (product.price / 100) * product.totalProduct
            }</td>
            <td class="align-middle trash"><button type="button" onClick="deleteProduct('${product.id}')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`;
  document.getElementById("table-body").innerHTML += productCard;
});

  function deleteProduct(product){
  let indexProduct = cartOnStorage.findIndex(elem=>elem.id==product);
  cartOnStorage.splice(indexProduct, 1);
  localStorage.setItem("panier", JSON.stringify(cartOnStorage));
  document.getElementById(product).remove();
};


let totalPrice = allPrices.reduce((a, b) => a + b, 0);
document.getElementById("prix-total").innerHTML ="Prix total : " + totalPrice + " €";

let forms = document.querySelectorAll(".needs-validation");
Array.prototype.slice.call(forms).forEach(function(form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      else{
        event.preventDefault();
        let contact={
          firstName: document.getElementById('first-name').value,
          lastName: document.getElementById('second-name').value,
          address:document.getElementById('first-name').value,
          city:document.getElementById('first-name').value,
          email:document.getElementById('mail').value,
          };
        //console.log(contact);
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/api/cameras/order",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify({contact,products}));
        request.onreadystatechange = function() {  
            if (this.readyState === XMLHttpRequest.DONE && this.status === 201){
              const response = this.responseText;
              console.log(response);
              localStorage.setItem('recap',response);
              window.location.pathname = ('./confirmation.html');
            }        
          };
          
      }
      event.preventDefault();
      form.classList.add("was-validated");
    },
    false
  );
});

