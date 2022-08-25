dateOfBirth = new Date(dateOfBirth);

const msPerYearNormal = 31557600000;
const msPerYearLarge = 31622400000;
const msPerYear = (3 * msPerYearNormal + msPerYearLarge) / 4;
let usersAge = Math.floor((Date.now() - dateOfBirth) / (msPerYear));

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

let genderStr = printGender(gender);

let ageDiv = document.getElementById("cardAge");
let usersGender = document.getElementById("cardGender");




//on window load display the proper format of gender and age
window.onload = () => {
  usersGender.innerHTML = genderStr;
  ageDiv.innerHTML = usersAge;
}

function toggleCard() {
  const card = document.getElementById("profileCard");
  if (card.style.display === "none") {
    card.style.display = "block";
  } else {
    card.style.display = "none";
  }
}