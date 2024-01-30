var urlAuth = 'http://kevin-chapron.fr:8080/login';
var urlGet = 'http://kevin-chapron.fr:8080/messages';
var data = {"Code": "RENV20110300"};

var enTetesAuth = {
    'Content-Type': 'application/json'
};

function requeteAjax(methode, url, data, enTetes, fonctionDeRetour) {
    var xhr = new XMLHttpRequest();
    xhr.open(methode, url, true);

    for (var nomEnTete in enTetes) {
        xhr.setRequestHeader(nomEnTete, enTetes[nomEnTete]);
    }

    xhr.onload = function () {
        if (xhr.status === 200) {

            var response = JSON.parse(xhr.responseText);
            console.log('Requête AJAX réussie')

            if (fonctionDeRetour) {
                // Appeler la fonction de rappel avec la réponse
                fonctionDeRetour(response);
            }
        } else {
            console.error('Erreur lors de la requête : ' + xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Erreur lors de la requête.');
    };

    xhr.send(data ? JSON.stringify(data) : null);
}