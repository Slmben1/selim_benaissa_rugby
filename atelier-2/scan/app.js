const startScanner = (event) => {
    // Empêcher le comportement par défaut du bouton
    event.preventDefault();

    const fileInput = document.querySelector("#fileInput");
    const uploadedImage = document.querySelector("#uploadedImage");

    // Ajout d'un gestionnaire d'événements pour l'événement "change" du champ d'entrée de fichier
    fileInput.addEventListener("change", handleFileUpload);

    // Simuler un clic sur le champ d'entrée de fichier
    fileInput.click();
};

const handleFileUpload = () => {
    const fileInput = document.querySelector("#fileInput");
    const uploadedImage = document.querySelector("#uploadedImage");
    const resultsSection = document.querySelector("#results");

    const file = fileInput.files[0];

    // Charger l'image dans la balise img
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImage.src = e.target.result;
        uploadedImage.style.display = "block";
    };
    reader.readAsDataURL(file);

    const qrScanner = new QrScanner();

    qrScanner.scanImage(uploadedImage)
        .then(result => {
            console.log('Contenu du QR Code :', result);
            resultsSection.innerHTML = `Contenu du QR Code : ${result}`;
            callApi(result);
        })
        .catch(error => {
            console.error('Erreur lors de la lecture du QR Code :', error);
            resultsSection.innerHTML = `Erreur : ${error}`;
        });
};


// Fonction pour appeler l'API avec l'ID du ticket
const callApi = (ticketId) => {
    fetch(`http://127.0.0.1:8000/api/tickets/${ticketId}`)
        .then(response => response.json())
        .then(data => {
            displayTicketInfo(data);
        })
        .catch(error => {
            console.error('Erreur lors de l\'appel API :', error);
            resultsSection.innerHTML = `Erreur lors de l'appel API : ${error}`;
        });
};

// Fonction pour afficher les informations du ticket
const displayTicketInfo = (ticketInfo) => {
    const resultsSection = document.querySelector("#results");
    
    resultsSection.innerHTML = `
        <p>Nom du stade : ${ticketInfo.stadium_name}</p>
        <p>Date du match : ${ticketInfo.match_date}</p>
        <p>Équipes : ${ticketInfo.team_home} vs ${ticketInfo.team_away}</p>
    `;
};

// Appel de la fonction startScanner lors du chargement complet du DOM
document.addEventListener("DOMContentLoaded", startScanner);
