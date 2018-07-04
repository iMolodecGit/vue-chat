function YHelperChatVue(data) {
    var div = document.createElement('div');
    div.id = "main-chat-app";

    var attrString = '';

    for (var prop in data) {
        var value = data[prop];
        if (typeof value === 'object') {
            continue;
        }
        attrString += prop + '="' + value + '" ';
    }

    div.innerHTML = "<div id=\"chat-app\" " + attrString + "></div>";
     document.body.appendChild(div);

     var script = document.createElement('script');
     script.src = "http://localhost:8080/dist/main.js";
     document.body.appendChild(script);
}