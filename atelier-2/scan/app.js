const fileSelector = document.getElementById('file-selector');
const fileQrResult = document.getElementById('file-qr-result');
const sectionResultats = document.getElementById('results'); // Ajout

function setResult(label, result) {
    console.log(result.data);
    label.textContent = result.data;
    label.style.color = 'teal';
    clearTimeout(label.highlightTimeout);
    label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);

    appelerApi(result.data);
}

const appelerApi = (idticket) => {
    fetch(`http://127.0.0.1:8000/api/tickets/${idticket}`)
        .then(response => response.json())
        .then(data => {
            afficherInfosBillet(data);
        })
        .catch(erreur => {
            console.error('Erreur lors de l\'appel API :', erreur);
            sectionResultats.innerHTML = `VEUILLEZ ENTRER UN QR CODE CORRECT`;
        });
};

const afficherInfosBillet = (infosBillet) => {
    const ticketFields = infosBillet[0].fields;

    document.getElementById('category').textContent = ticketFields.category;
    document.getElementById('seat').textContent = ticketFields.seat;
    document.getElementById('price').textContent = ticketFields.price;
    document.getElementById('currency').textContent = ticketFields.currency;
};

fileSelector.addEventListener('change', event => {
    const file = fileSelector.files[0];
    if (!file) {
        return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
        .then(result => setResult(fileQrResult, result))
        .catch(e => setResult(fileQrResult, { data: e || 'No QR code found.' }));
});
