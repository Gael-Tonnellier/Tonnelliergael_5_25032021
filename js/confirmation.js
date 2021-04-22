//RECUPERATION REPONSE ENVOYE SUR LE LOCALSTORAGE
const commandInfo=JSON.parse(sessionStorage.getItem('recap'));

// CALCUL PRIX TOTAL DE LA COMMANDE
const totalPrice= commandInfo.products.reduce(function(sum,items) {
         return sum = sum +  items.price;
},0)/100;


const orderId = commandInfo.orderId;
const firstName= commandInfo.contact.firstName;

// CREATION DE LA CARD AVEC VALEURS
function validation(){
    const confirmation = `<h2 class="card-title">Merci pour ton achat ${firstName} ! </h2>
<p class="card-text">Votre commande <strong>${orderId}</strong>
   d'un montant de <strong>${totalPrice} €</strong> a été traité.
    Un mail contenant la facture vous a été envoyé par mail.  </p>
<button class="btn btn-dark" id="btn-back">Retourner à l'accueil !</button>
`;
document.getElementById('card-body').innerHTML = confirmation;
}
validation();


const buttonBack= document.getElementById('btn-back');

// RESET DU LOCALSTORAGE ET REDIRECTION ACCUEIL 
buttonBack.addEventListener("click",function(){
    sessionStorage.removeItem('panier');
    sessionStorage.removeItem('recap');
    window.location.pathname = ('./index.html');
})