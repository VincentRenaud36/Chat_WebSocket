let token;
//LOGIN
requeteAjax('POST', urlAuth, data, enTetesAuth, function (reponse) {
    // console.log('Réponse depuis urlAuth :', reponse);

    var name = reponse.Name;
    var token = reponse.Token;

    document.getElementById('namePlaceholder').textContent = name;

    effectuerRequeteAvecToken(token);
    initWebSocket(token);
});

//MESSAGES
function effectuerRequeteAvecToken(token) {
    var enTetesGet = {
        'Authorization': 'Basic ' + token
    };

    requeteAjax('GET', urlGet, null, enTetesGet, function (reponse) {
        // console.log('Réponse depuis urlGet :', reponse)
        reponse.forEach(message => {
            displayMessage(FormatMessage(message))
        });
        scrollToBottom();
    });
}

//WEBSOCKET
let ws = new WebSocket('ws://kevin-chapron.fr:8080/ws');

function initWebSocket(token){
    if(token){
        ws.send(JSON.stringify({ "auth": token }));
    }else{
        return "token undefined";
    }
}

ws.onopen = function () {
    console.log('Connexion WebSocket établie');
    initWebSocket(token);
};
    
ws.onmessage = function (event) {
    var message = JSON.parse(event.data);
    displayMessage(FormatMessage(message));
    scrollToBottom();
};
    
ws.onerror = function (event) {
    console.error('Erreur WebSocket : ' + event.data);
};
    
ws.onclose = function (event) {
    if (event.wasClean) {
        console.log('Connexion WebSocket fermée proprement, code : ' + event.code + ', raison : ' + event.reason);
    } else {
        console.error('Connexion WebSocket interrompue de manière inattendue');
    }
};

function envoyerMessage() {
    const textInput = document.querySelector('#messageInput')
    const value = textInput.value

    if (value === '') {
        alert('Impossible d\'envoyer un message vide')
        return
    }
    ws.send(JSON.stringify({
        message: value
    }))

    // console.log("Message envoyé au server", value)
    textInput.value = ''
    scrollToBottom()
}