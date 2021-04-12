let cartOnStorage = JSON.parse(localStorage.getItem("panier"));
let allPrices = [];
let products = [];
cartOnStorage.forEach((product) => {
  allPrices.push((product.totalProduct * product.price) / 100);
  products.push(product.id);
  let productCard = `<tr>
            <td class="align-middle"><img class="rounded border" src="${
              product.img
            }"  alt="${product.name}" style="max-width:100%"></td>
            <td class="align-middle">${product.name}</td>
            <td class="align-middle">${product.totalProduct}</td>
            <td class="align-middle">${
              (product.price / 100) * product.totalProduct
            }</td>
            <td class="align-middle"><button type="button" onclick="alert('${product.name}')" id="product_${
              product.name
            }" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`;
  document.getElementById("table-body").innerHTML += productCard;
  //console.log(product);

  document
    .getElementById("product_" + product.name)
    .addEventListener("click", () => {
      let indexProduct = cartOnStorage.indexOf(product);
      cartOnStorage.splice(indexProduct, 1);
      localStorage.setItem("panier", JSON.stringify(cartOnStorage));
      document.location.reload();
    });
});

//console.log(products);

let totalPrice = allPrices.reduce((a, b) => a + b, 0);
document.getElementById("prix-total").innerHTML ="Prix total : " + totalPrice + " €";





let forms = document.querySelectorAll(".needs-validation");
Array.prototype.slice.call(forms).forEach(function (form) {
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
            const response = JSON.parse(this.responseText);
            console.log(response);
          };
      }
      event.preventDefault();
      form.classList.add("was-validated");
    },
    false
  );
});