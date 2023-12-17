document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:8000/api/events')
        .then(response => response.json())
        .then(data => {
            /* faire deux requêtes simultanées vers deux endpoints différents pour obtenir les stades et les équipes avec des noms plutôt que des numéros (c'était galèèèère, 
            merci au forum dev mozilla pour l'astuce !!)*/
            Promise.all([
                fetch('http://127.0.0.1:8000/api/stadiums').then(response => response.json()),
                fetch('http://127.0.0.1:8000/api/teams').then(response => response.json())
            ])
            .then(([stades, equipes]) => afficherEvenements(data, stades, equipes))
            .catch(erreur => console.error('Erreur de récupération :', erreur));
        })
        .catch(erreur => console.error('Erreur de récupération :', erreur));
});

function afficherEvenements(evenements, stades, equipes) {
    const sectionEvenements = document.getElementById('events');

    evenements.forEach(evenement => {
        const divEvenement = document.createElement('div');
        divEvenement.classList.add('event-item');

        const debut = new Date(evenement.fields.start);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateFormatee = debut.toLocaleDateString('fr-FR', options);
        const heureFormatee = debut.toLocaleTimeString('fr-FR');

        const nomStade = stades.find(stade => stade.pk === evenement.fields.stadium)?.fields.name || 'Inconnu';
        const nomEquipeDomicile = equipes.find(equipe => equipe.pk === evenement.fields.team_home)?.fields.nickname || ' ?? ';
        const nomEquipeExterieur = equipes.find(equipe => equipe.pk === evenement.fields.team_away)?.fields.nickname || ' ?? ';

        const imgBallon = document.createElement('img');
        imgBallon.src = 'ballon-rugby.png';
        imgBallon.alt = 'Ballon de Rugby';
        imgBallon.classList.add('ballon-image'); 

        divEvenement.appendChild(imgBallon);

        divEvenement.innerHTML += `
            <h3>Match ${evenement.pk}</h3>
            <p>Stade : ${nomStade}</p>
            <p>Début : ${dateFormatee} - ${heureFormatee}</p>
            <p>Équipes : ${nomEquipeDomicile} vs ${nomEquipeExterieur}</p>
        `;

        sectionEvenements.appendChild(divEvenement);
    });
}

