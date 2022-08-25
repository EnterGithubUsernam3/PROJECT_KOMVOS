function checkEmail(emailValue) {
  
    var mySocket = io.sails.connect();
    mySocket.on('connect', function onConnect() {
        console.log("Socket connected!");
        mySocket.request(
            {
                method: 'post',
                url: '/register/check-email',
                data: {email: emailValue}
            },
            function (result, response) {
                // let socketResult = result.email;
                // console.log(result.email);
                let emailInput = document.getElementById("regEmail");
                if(result == "OK"){
                   
                    emailInput.style.backgroundColor = "rgb(205, 245, 175)";
                }
                else{
                    
                    emailInput.style.backgroundColor = "#ffdddd";
                    document.getElementById("emailExists").style.display = 'block';
                }
                
            })
        })
    }