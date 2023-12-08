let scannerQR;
const sectionResultats = document.querySelector("#results");

// scannerQR = new QrScanner((resultat) => {
//     sectionResultats.innerHTML = `Contenu du QR Code : ${resultat}`;
//     appelerApi(resultat);
// });

const fileSelector = document.getElementById('file-selector');
const fileQrResult = document.getElementById('file-qr-result');
function setResult(label, result) {
    console.log(result.data);
    label.textContent = result.data;
    label.style.color = 'teal';
    clearTimeout(label.highlightTimeout);
    label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
}
// ####### File Scanning #######
fileSelector.addEventListener('change', event => {
    const file = fileSelector.files[0];
    if (!file) {
        return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
        .then(result => setResult(fileQrResult, result))
        .catch(e => setResult(fileQrResult, { data: e || 'No QR code found.' }));
});

const appelerApi = (idticket) => {
    fetch(`http://127.0.0.1:8000/api/tickets/${idticket}`)
        .then(response => response.json())
        .then(data => {
            afficherInfosBillet(data);
        })
        .catch(erreur => {
            console.error('Erreur lors de l\'appel API :', erreur);
            sectionResultats.innerHTML = `Erreur lors de l'appel API : ${erreur}`;
        });
};

const afficherInfosBillet = (infosBillet) => {
    const ticketFields = infosBillet[0].fields;
    
    sectionResultats.innerHTML = `
        <p>Catégorie : ${ticketFields.category}</p>
        <p>Siège : ${ticketFields.seat}</p>
        <p>Prix : ${ticketFields.price} ${ticketFields.currency}</p>
    `;
};
//pr le file reader et le onload mettre un documetn.queryselec (#fileInput).addeventlistener("change"),()=>{
   // lancer fonction}