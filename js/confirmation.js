let commandInfo=JSON.parse(localStorage.getItem('recap'));
//console.log(commandInfo);
let totalPrice= commandInfo.products.reduce(function(sum,items) {
         return sum = sum +  items.price;
    },0)/100;
//console.log(totalPrice);
let orderId = commandInfo.orderId;
//console.log(orderId);
let firstName= commandInfo.contact.firstName;
//console.log(firstName);

let confirmation = `<h5 class="card-title">Merci pour ton achat ${firstName} ! </h5>
<p class="card-text">Votre commande <strong>${orderId}</strong>
   d'un montant de <strong>${totalPrice} €</strong> a été traité.
    Un mail contenant la facture vous a été envoyé par mail.  </p>
<a href="index.html" class="btn btn-dark">Retourner à l'accueil !</a>
`;
document.getElementById('card-body').innerHTML = confirmation;