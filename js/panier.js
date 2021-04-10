let cartOnStorage = JSON.parse(localStorage.getItem('panier'));
var allPrice=[];
var productId=[];
    cartOnStorage.forEach((product)=>{
        allPrice.push(product.totalProduct * product.price/100)
        productId.push(product.id)
        let productCard = 
        `<tr>
            <td class="align-middle"><img class="rounded border" src="${product.img}"  alt="${product.name}" style="max-width:100%"></td>
            <td class="align-middle">${product.name}</td>
            <td class="align-middle">${product.totalProduct}</td>
            <td class="align-middle">${product.price/100 * product.totalProduct}</td>
            <td class="align-middle"><button type="button" id="product_${product.name}" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`;
        document.getElementById("table-body").innerHTML += productCard;
        //console.log(product);
        
        document.getElementById('product_'+ product.name).addEventListener('click',()=>{
            let indexProduct= cartOnStorage.indexOf(product);
            cartOnStorage.splice(indexProduct,1);
            localStorage.setItem('panier',JSON.stringify(cartOnStorage));
            document.location.reload();     
        }) ;
    });
let totalPrice = allPrice.reduce((a,b)=>a + b,0);
document.getElementById('prix-total').innerHTML='Prix total : '+totalPrice+' €';

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()