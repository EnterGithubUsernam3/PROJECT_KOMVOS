//initialize currentTab (index of tab in display) to 0, which means that we display the first tab
var currentTab = 0;

// initialize constants for each tab
// (just for facilitating the readability of the code)
const firstTab = 0;
const secondTab = 1;
const thirdTab = 2;
const fourthTab = 3;

// when the page is loaded we call the function showTab
document.addEventListener("DOMContentLoaded", function (event) {
  showTab(currentTab);
});

/************************************
 * function fixStepIndicator(tabIndex)
 * Inputs:
 *    - tabIndex : (int) Index of the tab to be processed
 * Outputs:
 *    - none
 * Description: - ensures that the proper step according to each tab is indicated 
 *                (steps are the small dots on the top of the form)
 */

function fixStepIndicator(tabIndex) {
  var stepIndicators = document.getElementsByClassName("step");

  for (var i = 0; i < stepIndicators.length; i++) {
    stepIndicators[i].className = stepIndicators[i].className.replace(" active", "");
  }
  stepIndicators[tabIndex].className += " active";
}

/*********************************
 * function showTab(tabIndex)
 * Inputs : 
 *    - tabIndex : (int) Index of the tab to be processed
 *    
 * Outputs:
 *    - none
 * 
 * Description : - Displays the current tab (by changing display none to display block)
 *               On registration.css the tabs are initialized to display:none
 *               - Depending on the number of the current tab,
 *               the function displays or hides the button previous 
 *               and changes the button next to submit in the last tab
 *               - Calls fixStepIndicator()
*/
function showTab(tabIndex) {
  var tabs = document.getElementsByClassName("tab");

  tabs[tabIndex].style.display = "block";

  if (tabIndex == 0) {
    document.getElementById("prevBtn").style.display = "none";
  }
  else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (tabIndex == (tabs.length - 1)) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("submitBtn").style.display = "inline";

  }
  else {
    document.getElementById("nextBtn").innerHTML = "Επόμενο";
  }

  fixStepIndicator(tabIndex)
}

/********************************
 * function nextPrev(nextOrPrevious)
 * Inputs: 
 *     -nextOrPrevious: (int) either -1 or 1. -1 corresponds to previous and 1 corresponds to next
 * Outputs:
 *     - (boolean) returns false if the input equals to 1 and the form is not valid so we can't proceed to the next tab
 *     else returns true
 * 
 * Description:  -hides the current tab and displays the previous or the next tab depending on the input 
 *                and whether the inputs are validated or not (calls validateForm())
 *               -changes the value of the global var currentTab depending on the input            
 *               -calls showTab()
 */

function nextPrev(nextOrPrevious) {
  var tabs = document.getElementsByClassName("tab");

  if (nextOrPrevious == 1 && !validateForm()) {
    return false;
  }

  tabs[currentTab].style.display = "none";
  currentTab = currentTab + nextOrPrevious;

  showTab(currentTab);
}

/*************************************
 * function ValidateEmail(emailString)
 * Inputs: 
 *    - emailString: (string) the email string to be checked
 * Outputs:
 *    - (boolean) returns true if emailString is of a valid type and false if it's not
 * 
 * Description:  -returns true if emailString is of a valid type and false if it's not
 *               -if false displays the error message
 *    
 */

function validateEmail(emailString) {

  let validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailString.match(validRegex)) {
    return true;
  } else {
    document.getElementById("emailValidation").style.display = 'block';
    return false;
  }
}

/***************************************
 * function checkDateOfBirth(dateValue)
 * Inputs:
 *    -dateValue: (string) the date to be checked
 * Outputs:
 *    -(boolean) returns true if the calculated user's age is between 18 and 80 and false if it's not
 * 
 *  Description: -calculates the user's age
 *               -returns true if the calculated user's age is between 18 and 80 and false if it's not
 */
function checkDateOfBirth(dateValue) {

  if (dateValue) {
    const msPerYearNormal = 31557600000;
    const msPerYearLarge = 31622400000;
    const msPerYear = (3 * msPerYearNormal + msPerYearLarge) / 4;

    let properDateValue = +new Date(dateValue);

    let age = Math.floor((Date.now() - properDateValue) / (msPerYear));

    if (age < 18 || age > 80) {
      document.getElementById("ageValidation").style.display = 'block';
      return false;
    }

    return true;
  }
  else {
    return false;
  }

}
/*************************************
 * function checkPassword(passwordValue) 
 * Inputs:
 *    -passwordValue: (string) the password to be checked
 * Outputs:
 *    -(boolean) returns true if the password is at least 8 characters long without whitespaces and false if it's not
 * 
 *  Description:  - returns true if the password is at least 8 characters long without whitespaces and false if it's not
 */

function checkPassword(passwordValue) {

  const expression = /^\S+$/g;

  if (passwordValue.length >= 8) {
    if (expression.test(passwordValue) || passwordValue === '') {
      return true;
    }
  }
  else {
    return false;
  }
}

/**************************
 * function validateForm()
 * Inputs:
 *      -none
 * Outputs:
 *      -(boolean) returns true if the fields of each tab are valid and false if they're not
 * 
 * Description: - in a switch statement the inputs of each tab are checked, 
 *              - if they are not valid a class "invalid" (css: background-color: pink) is added on input elements and text area
 *              - calls validateEmail() for email inputs
 *              - calls checkDateOfBirth() for date inputs
 *              - displays validation messages
 *              - adds class "finish" to color the steps that mark each tab
 */

function validateForm() {

  let valid = true;

  switch (currentTab) {
    case firstTab:

      let tabs = document.getElementsByClassName("tab");
      let inputsOfTab = tabs[firstTab].getElementsByTagName("input");

      for (let i = 0; i < inputsOfTab.length; i++) {

        if (inputsOfTab[i].type == "email") {

          if (!validateEmail(inputsOfTab[i].value)) {
            inputsOfTab[i].className += " invalid";
            valid = false;
          }
          else if (inputsOfTab[i].style.backgroundColor !== "rgb(205, 245, 175)") {
            console.log(inputsOfTab[i].style.backgroundColor);
            inputsOfTab[i].className += " invalid";
            let checkingValidation = document.getElementById("emailChecking");
            checkingValidation.style.display = "block";
            valid = false;
          }
        } else if (inputsOfTab[i].type == "password") {

          if (!checkPassword(inputsOfTab[i].value)) {
            document.getElementById("passwordCheck").style.display = "block";
            inputsOfTab[i].className += " invalid";
            valid = false;
          }

        }
        else if (inputsOfTab[i].value == "") {
          inputsOfTab[i].className += " invalid";
          valid = false;
        }
      }
      break;

    case secondTab:

      // validation for gender selection radio buttons
      let radioGenderValue = document.querySelector('input[name="gender"]:checked');

      if (radioGenderValue == null) {
        valid = false;
        document.getElementById("genderValidation").style.display = "block";
      }

      // validation for users age between 18 and 80
      let date = document.getElementById("regDateOfBirth");

      if (!checkDateOfBirth(date.value)) {
        valid = false;
        date.className += " invalid";
      }

      // validation for address
      let radioAddressValue = document.querySelector('input[name="radioAddress"]:checked');

      if (radioAddressValue == null) {
        valid = false;

      }
      else if (document.getElementById('addressYes').checked) {
        if (document.getElementById("regAddress").value == "") {
          valid = false;
          document.getElementById("regAddress").className += " invalid";
        }
      }

      break;

    case thirdTab:

      //validation for textarea
      let textarea = document.getElementById("regSmallbio");

      if (textarea.value == "") {
        valid = false;
        textarea.className += " invalid";
      }

      break;

    default:
      break;
  }

  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }

  return valid;

}

/**********************************
 * function emailInputEventHandler()
 * Inputs:
 *    -none
 * Outputs:
 *    -none
 * 
 * Description: -is an event called when the input is changed (use in ejs:  oninput="emailInputEventHandler()")
 *              -removes the class invalid (css: background-color: sth like pink)
 *              -hides the validation message for the email
 * 
 */

function emailInputEventHandler() {
  document.getElementById("regEmail").className = "";
  document.getElementById("emailValidation").style.display = 'none';
  document.getElementById("emailExists").style.display = 'none';
}

/**********************************
 * function hideGenderValidation()
 * Inputs:
 *    -none
 * Outputs:
 *    -none
 * 
 * Description: -hides the validation message below the radio buttons
 */
function hideGenderValidation() {
  document.getElementById("genderValidation").style.display = 'none';
}

function hideAgeValidation() {
  document.getElementById("regDateOfBirth").className = "";
  document.getElementById("ageValidation").style.display = 'none';
}

function hidePassValidation() {
  document.getElementById("password").className = "";
  document.getElementById("passwordCheck").style.display = 'none';
}
/****************************
 * function displayAddress()
 * Inputs: 
 *      -none
 * Outputs:
 *      -none
 * 
 * Description: -displays or hides the div containing the input for the address
 */

function displayAddress() {
  if (document.getElementById('addressYes').checked) {
    document.getElementById('divAddress').style.display = 'block';
  }
  else document.getElementById('divAddress').style.display = 'none';
}
/********************
 * 
 */

function getEmail() {
  let emailInput = document.getElementById("regEmail");
  let emailInputValue = emailInput.value;

  if (!validateEmail(emailInputValue)) {
    emailInput.className += " invalid";
    return "false";
  }
  else if (emailInputValue == "") {
    emailInput.className += " invalid";
    return "false";
  }
  return emailInputValue;
}

document.getElementById("checkIfUnique").addEventListener('click', (e) => {
  // prevent form from being submitted
  // e.preventDefault();
  document.getElementById("emailChecking").style.display = 'none';
  let emailInput = document.getElementById("regEmail");

  let emailValue = getEmail();

  if (emailValue == "false") {
    emailInput.className += " invalid";
  }
  else {
    checkEmail(emailValue);
  }

});

document.addEventListener('keypress', function (e) {
  if (e.keyCode === 13 || e.which === 13) {
    e.preventDefault();
    return false;
  }
});

