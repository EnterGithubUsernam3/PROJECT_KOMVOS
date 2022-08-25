
function checkCredentials(emailValue,passwordValue)
{
    var mySocket = io.sails.connect();
        mySocket.on('connect',function onConnect(){
            mySocket.request(
                {
                    method:'post',
                    url:'/loginForm/checkCredentials',
                    data: {email:emailValue , password: passwordValue}
                },
                function (result , response)

                {
                    //   console.log(result);
                    //   console.log("ΓΑΜΩ ΤΟΝ MCNEIL");
                    
                    if(result == "OK")

                    {

                        // console.log(response.headers);
                        // console.log(`'Έχουμε response ${response.headers} `);
                        document.getElementById("userNotFound").style.display = "block";
                    }
                    else{
                        // console.log(response.admin);
                        document.getElementById("userNotFound").style.display = "none";
                        if(result.admin)
                        {
                            window.location.replace("http://localhost:1337/admin")
                        }
                        // let output = document.getElementById('invisibleDivForUserData');
                        // output.innerHTML = response.body.email;
                        else{

                            window.location.replace("http://localhost:1337");
                        }
                        
                            
                        }
                    }
                
                
            )
        })
}