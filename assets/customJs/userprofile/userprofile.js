document.getElementById("alternative").style.display = "none";

// Hide the cards/tabs 
document.getElementById("editCard").style.display = "none";
document.getElementById("historyCard").style.display = "none";
document.getElementById("arrangements").style.display = "none";
document.getElementById("listingsCard").style.display = "none";
document.getElementById("addPhoto").style.display = "none";

// For the profile edit page: 

// set dateOfBirth to js date object
dateOfBirth = new Date(dateOfBirth);


// create a format yyyy-mm-dd 
let day = ("0" + dateOfBirth.getDate()).slice(-2)

let month = ("0" + (dateOfBirth.getMonth() + 1)).slice(-2);

let year = dateOfBirth.getFullYear();

// save the proper format
let inputValue = `${year}-${month}-${day}`;


/****************************
 * function displayContent(id)
 * Inputs:
 *     -id of the div to be displayed
 * Outputs:
 *     -none
 * 
 * Description: -displays the divs editCard or profileCard
 *              -hides other content by calling hideOtherContent();
 *              -on editCard displays the user's date of birth
 */
function displayContent(id) {

  let content = id;
  if (content.style.display !== "none") {
    content.style.display = "none";
  }
  else {

    hideOtherContent();
    content.style.display = "block";

    if (id == editCard) {
      let inputDateOfBirth = document.getElementById("regDateOfBirth");
      // on div display set the value of the input type date to the user's birth date
      inputDateOfBirth.value = inputValue;
    }


  }
}

function hideOtherContent() {
  let tabs = document.getElementsByClassName("content");

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none"
  }
}

// calculate user's age
const msPerYearNormal = 31557600000;
const msPerYearLarge = 31622400000;
const msPerYear = (3 * msPerYearNormal + msPerYearLarge) / 4;
let usersAge = Math.floor((Date.now() - dateOfBirth) / (msPerYear));



/***************************
 * function printGender(gender)
 * Inputs:
 *      - (str) from ejs script let gender = '<%= user.gender %>'
 *         "Male" or "Female" or "Non-Binary"
 * Outputs:
 *      - (str) "Άνδρας" or "Γυναίκα" or "Άλλο"
 * 
 * Description: -depending on the input returns "Άνδρας" or "Γυναίκα" or "Άλλο" 
 */

function printGender(gender) {
  if (gender == "Male") {
    return "Άνδρας";
  }
  else if (gender == "Female") {
    return "Γυναίκα";
  }
  else {
    return "Άλλο";
  }
}

// initialize genderStr and store printGender(gender) result
let genderStr = printGender(gender);

let ageDiv = document.getElementById("cardAge");
let usersGender = document.getElementById("cardGender");

//on window load display the proper format of gender and age
window.onload = () => {
  usersGender.innerHTML = genderStr;
  ageDiv.innerHTML = usersAge;
 
}

// validations 

// email validation
function validateEmail() {
  const emailString = document.getElementById('regEmail').value;

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (emailString.match(validRegex)) {
    document.getElementById("emailValidation").style.display = 'none';
    return true;
  } else {
    document.getElementById("emailValidation").style.display = 'block';
    return false;
  }
}

// validation for address
let radioAddressValue = document.querySelector('input[name="radioAddress"]:checked');

if (radioAddressValue == null) {
  valid = false;

}
// else if (document.getElementById('addressYes').checked) {
//   if (document.getElementById("regAddress").value == "") {
//     valid = false;
//     document.getElementById("regAddress").className += " invalid";
//   }
// }

// display address input 
function displayAddress() {
  if (document.getElementById('addressYes').checked) {
    document.getElementById('addressInput').style.display = 'block';
  }
  else document.getElementById('addressInput').style.display = 'none';
}


// validation for users age between 18 and 80

function checkDateOfBirth(dateValue) {

  if (dateValue) {
    const msPerYearNormal = 31557600000;
    const msPerYearLarge = 31622400000;
    const msPerYear = (3 * msPerYearNormal + msPerYearLarge) / 4;
    console.log(msPerYear);

    let properDateValue = +new Date(dateValue);
    // let age = Math.floor((Date.now() - properDateValue) / (msPerYear));
    let age = Math.floor((Date.now() - properDateValue) / (msPerYear));
    console.log(age);

    if (age < 18 || age > 80) {
      return false;
    }

    return true;
  }
  else {
    return false;
  }

}

function validateDate() {

  let date = document.getElementById("regDateOfBirth");

  if (checkDateOfBirth(date.value)) {
    document.getElementById("dateOfBirthValidation").style.display = 'none';
    return true;
  } else {
    document.getElementById("dateOfBirthValidation").style.display = 'block';
    return false;
  }
}

//validation for textarea
function descriptionValidation() {

  let textarea = document.getElementById("regSmallBio");

  if (!textarea.value?.length) {
    document.getElementById("bioValidation").style.display = 'block';
    return false;
  } else {
    document.getElementById("bioValidation").style.display = 'none';
    return true;
  }
}
// displayAddress();


