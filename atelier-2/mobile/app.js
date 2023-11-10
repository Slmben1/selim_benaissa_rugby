// Attend que la page soit complètement chargée avant d'exécuter du code
document.addEventListener('DOMContentLoaded', () => {
    // Requête pour obtenir les détails des événements
    fetch('http://127.0.0.1:8000/api/events')
        .then(response => response.json())  // Convertit la réponse en données JSON
        .then(data => {
            /* Effectue des requêtes parallèles pour obtenir les stades et les équipes avec des noms plutôt que des numéros (c'était galèèèère, 
            merci au forum dev mozilla pour l'astuce !!)*/
            Promise.all([
                fetch('http://127.0.0.1:8000/api/stadiums').then(response => response.json()),
                fetch('http://127.0.0.1:8000/api/teams').then(response => response.json())
            ])
            // Une fois les détails récupérés, affiche les événements
            .then(([stades, equipes]) => afficherEvenements(data, stades, equipes))
            .catch(erreur => console.error('Erreur de récupération :', erreur));
        })
        .catch(erreur => console.error('Erreur de récupération :', erreur));
});

// Fonction pour afficher les détails des événements
function afficherEvenements(evenements, stades, equipes) {
    const sectionEvenements = document.getElementById('events'); // Sélectionne la section des événements dans le HTML

    // Parcourt chaque événement pour les afficher individuellement
    evenements.forEach(evenement => {
        const divEvenement = document.createElement('div'); // Crée une division pour chaque événement
        divEvenement.classList.add('event-item'); // Ajoute des styles à la division

        // Récupère la date et l'heure pour chaque événement
        const debut = new Date(evenement.fields.start);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateFormatee = debut.toLocaleDateString('fr-FR', options);
        const heureFormatee = debut.toLocaleTimeString('fr-FR');

        // Récupère les noms des stades et des équipes pour les événements
        const nomStade = stades.find(stade => stade.pk === evenement.fields.stadium)?.fields.name || 'Inconnu';
        const nomEquipeDomicile = equipes.find(equipe => equipe.pk === evenement.fields.team_home)?.fields.nickname || ' ?? ';
        const nomEquipeExterieur = equipes.find(equipe => equipe.pk === evenement.fields.team_away)?.fields.nickname || ' ?? ';

        // Crée la structure HTML pour afficher les détails des événements
        divEvenement.innerHTML = `
            <h3>Match ${evenement.pk}</h3>
            <p>Stade : ${nomStade}</p>
            <p>Début : ${dateFormatee} - ${heureFormatee}</p>
            <p>Équipes : ${nomEquipeDomicile} vs ${nomEquipeExterieur}</p>
        `;

        sectionEvenements.appendChild(divEvenement); // Ajoute les détails des événements à la section spécifique
    });
}
