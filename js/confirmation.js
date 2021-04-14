let commandInfo=JSON.parse(localStorage.getItem('recap'));
console.log(commandInfo);
let totalPrice= commandInfo.products.reduce(function(sum,items) {
         return sum = sum +  items.price;
    },0)/100;
console.log(totalPrice);
let orderId = commandInfo.orderId;
console.log(orderId);
let firstName= commandInfo.contact.firstName;
console.log(firstName);

let confirmation = `<h2 class="card-title">Merci pour ton achat ${firstName} ! </h2>
<p class="card-text">Votre commande <strong>${orderId}</strong>
   d'un montant de <strong>${totalPrice} €</strong> a été traité.
    Un mail contenant la facture vous a été envoyé par mail.  </p>
<button class="btn btn-dark" id="btn-back">Retourner à l'accueil !</button>
`;
document.getElementById('card-body').innerHTML = confirmation;

let buttonBack= document.getElementById('btn-back');
buttonBack.addEventListener("click",function(){
    localStorage.clear();
    window.location.pathname = ('./index.html');
})