// Fonction pour formater la réponse reçue
function FormatMessage(reponse) {
    var div = document.createElement('div');
    div.innerHTML = `[<strong>${formattedDate(new Date(reponse.Date))}</strong>] (<em>${reponse.From}</em>) ${reponse.Text}`;
    return div;
}

// Fonction pour ajouter un message à la liste et donc l'afficher
function displayMessage(message){
    document.getElementById('messagebox').appendChild(message);
}

// Fonction pour faire défiler la boîte de dialogue vers le bas
function scrollToBottom() {
    var container = document.getElementById('messagebox');
    container.scrollTop = container.scrollHeight;
}

function formattedDate(date) {
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second

    return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
}