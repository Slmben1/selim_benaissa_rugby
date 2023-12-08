let scannerQR;
const sectionResultats = document.querySelector("#results");

// scannerQR = new QrScanner((resultat) => {
//     sectionResultats.innerHTML = `Contenu du QR Code : ${resultat}`;
//     appelerApi(resultat);
// });

const gestionnaireChargementFichier = () => {
    const champFichier = document.querySelector("#fileInput");
    const imageTelechargee = document.querySelector("#uploadedImage");

    const fichier = champFichier.files[0];

    const lecteur = new FileReader();
    lecteur.onload = (e) => {
        imageTelechargee.src = e.target.result;
        imageTelechargee.style.display = "block";

        scannerQR.scanImage(imageTelechargee)
            .catch(erreur => {
                console.error('Non, je ne lis pas ton QR là :', erreur);
                sectionResultats.innerHTML = `Erreur : ${erreur}`;
            });
    };
    lecteur.readAsDataURL(fichier);
};

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
