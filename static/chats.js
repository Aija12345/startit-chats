const ATJAUNOT = 500;


/*
pē 5000 milisekundeēm atjaunosies
Ielādē tērzēšanas datus no servera
Uzstāda laiku pēc kāda atkārtoti izsaukt šo pašu funkciju
await - sagaida kad serveris atbild
atbilse būs kā js datu objekts
izsauc funkciju ar raadi chatu vienkarsi
async ir kopā tika iar await
*/
async function lasiChatu() {
    const atbilde = await fetch('/chats/lasi');
    const datuObjekts = await atbilde.json();
    raadiChatuVienkarsi(datuObjekts);
    await new Promise(resolve => setTimeout(resolve, ATJAUNOT));
    await lasiChatu();
  
    
}


function raadiChatuVienkarsi(dati) {
    const jaunaRinda = "<br/>";
    let chats = "";
    let chataDiv = document.getElementById("chats");
    for (let rinda of dati["chats"]) {
        chats = chats + rinda + jaunaRinda;
    }
    chataDiv.innerHTML = chats;
}


/*
chataDiv.innerHTML = chats; - ieliek htmlā
Augša izveidota čata vieta, kur tiek ielikta inf katrā rindāS
Publicē tērzēšanas ziņas datus uz serveri
*/
async function suutiZinju() {
    // Nolasa ievades lauka saturu

    let zinjasElements = document.getElementById("zinja");
    let zinja = zinjasElements.value;
    // izdzēš ievades lauku
    zinjasElements.value = "";

    const atbilde = await fetch('/chats/suuti', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "chats": zinja })
    });
    const datuObjekts = await atbilde.json();
    
    
    // Metode Post - kā veikt pieprasījumu un kādā veidā sūtīsim
    // parāda jauno chata saturu  
    //kas ir fetch??  - vēršas pie chats 
   
    raadiChatuVienkarsi(datuObjekts);
}


// Ērtības funkcionalitāte
// Atrod ievades lauku
var ievadesLauks = document.getElementById("zinja");
// Gaida signālu no klaviatūras, ka ir nospiests Enter taustiņš
ievadesLauks.addEventListener("keyup", function(event) {
  // Numur 13 ir "Enter" taustiņš
  if (event.keyCode === 13) {
    suutiZinju();
  }
});