// Attente du chargement complet du DOM avant d'exécuter le code
document.addEventListener('DOMContentLoaded', () => {
    // Récupération des données depuis l'API
    fetch('http://127.0.0.1:8000/api/events')
        .then(response => response.json()) // Conversion de la réponse en JSON
        .then(data => {
            renderEvents(data); // Appel de la fonction pour afficher les événements
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
});

// Fonction pour afficher les événements
function renderEvents(events) {
    const eventsSection = document.getElementById('events'); // Sélection de la section pour afficher les événements

    // Parcours de chaque événement pour les afficher
    events.forEach(event => {
        const eventDiv = document.createElement('div'); // Création d'une nouvelle division pour chaque événement
        eventDiv.classList.add('event-item'); // Ajout de classe pour le style CSS

        // Transformation de la date au format texte en objet Date
        const start = new Date(event.fields.start);

        // Formatage de la date et de l'heure
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = start.toLocaleDateString('fr-FR', options); // Formattage de la date
        const formattedTime = start.toLocaleTimeString('fr-FR'); // Formattage de l'heure

        // Insertion des détails de l'événement dans la division créée
        eventDiv.innerHTML = `
            <h3>Événement ${event.pk}</h3>
            <p>Stade : ${event.fields.stadium}</p>
            <p>Début : ${formattedDate} - ${formattedTime}</p>
            <p>Équipes : ${event.fields.team_home || 'À déterminer'} vs ${event.fields.team_away || 'À déterminer'}</p>
        `;

        eventsSection.appendChild(eventDiv); // Ajout de la division dans la section des événements
    });
}
