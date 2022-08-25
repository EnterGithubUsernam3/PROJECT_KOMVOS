function getPointBalance() {
    var mySocket = io.sails.connect();
    mySocket.on('connect', function onConnect() {
        mySocket.request(
            {
                method: 'POST',
                url: '/point-balance',
                data: {}
            },
            function (result, response) {
                console.log(result);
                document.getElementById('availablePoints').innerHTML = result ;
            }
        )
    })
}


window.onload = getPointBalance;