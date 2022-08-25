
function inputsValidator(event){
    event.preventDefault();
    let validRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    let emailValue = document.getElementById("emailInput").value;
    let passwordValue = document.getElementById("passwordInput").value;
    let invalidPassword = document.getElementById("invalidPassword");
    let invalidEmail = document.getElementById("invalidEmail");

    if(passwordValue.length < 8)
    {
        
        invalidPassword.style.display="block";
       
    }
    else{
        
        invalidPassword.style.display="none";
    }
    if(emailValue.match(validRegex))
        {
            invalidEmail.style.display = "none"
        
            // return true;
        }
        else{
            invalidEmail.style.display = "block";
           
        }
        // console.log(invalidEmail.style.display);
        // console.log(invalidPassword.style.display);
        // console.log(emailValue.match(validRegex));
        // console.log(passwordValue);
    if(emailValue.match(validRegex) && passwordValue.length >= 8)
    {
        //Here goes the function that verifies that this user exists in 
        //the database
        let correctEmailValue = emailValue.toLowerCase();
        // console.log(correctEmailValue);
        checkCredentials(correctEmailValue,passwordValue);
        // console.log(checkCredentials(correctEmailValue,passwordValue));
       
        
        
    }

}
