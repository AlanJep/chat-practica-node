$(function () {
    
    const socket = io();

    //obtaining DOM elements from the interface(obtener elementos DOM de la interfaz)
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    //obtaining DOM elements from the nicknameForm(obtener elementos DOM del apodo)
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');

    const $users = $('#usernames');


    $nickForm.submit(e => {
        e.preventDefault();
        socket.emit('nuevo usuario', $nickname.val(), data => {
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            } else {
                $nickError.html(`
                    <div class ="alert alert-primary">
                        Ese nombre de Usuario ya existe.
                    </div>
                `);
            }
            $nickname.val('');
        });
    });

    //events(eventos)
    $messageForm.submit(e => {
        e.preventDefault();
        socket.emit('send message', $messageBox.val(), data => {
            $chat.append(`<p class="error">${data}</p>`)
        });
        $messageBox.val('');
    });

    socket.on('new message', function (data) {
        $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>');
    });

    socket.on('nombres de usuario', data => {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`
        }
        $users.html(html);
    });

    socket.on('whisper', data => {
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`);
    });

    socket.on('cargar mensajes antiguos', msgs =>{
        for (let i = 0; i < msgs.length; i++) {
            displayMsg(msgs[i])
        }
    })

    function displayMsg(data) {
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`);
    }

})