var socket = io('http://localhost:3000/');

socket.on('receivedMessage', function (message) {
    message = encryptDecrypt(message);
    renderMessage('received', message);
});

socket.on('previousMessages', function (messages) {
    for (message of messages) {
        message = encryptDecrypt(message);
        if (message.author == $('input[name=username]').val()) {
            renderMessage('sended', message);
        } else {
            renderMessage('received', message);
        }
    }
});

socket.on('newUser', function (message) {
    renderMessage('newUser', message);
});

function newUser() {
    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if (author.length && message.length) {
        $('input[name=username]').prop('disabled', true);
        var messageObject = {
            author: author,
            message: message,
        };
        renderMessage('sended', messageObject);
        messageObject = encryptDecrypt(messageObject);
        socket.emit('sendMessage', messageObject);
    }
}
