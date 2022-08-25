const form = document.querySelector('#createForm');

form.addEventListener('submit', e => {

  if (!checkdate()) {
    e.preventDefault();
  }
});

function checkdate() {
  var startingDate = document.getElementById("startingDate").value;
  var endingDate = document.getElementById("endingDate").value;

  if (endingDate < startingDate) {
    let date = document.getElementById("validationDate");
    date.style.display = 'block';
    return false;
  }

  return true;
}


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("startingDate").setAttribute("min", today);
document.getElementById("endingDate").setAttribute("min", today);

var monthMax = new Date();
var day = monthMax.getDate();
var month = monthMax.getMonth() + 3; 
var year = monthMax.getFullYear();
if (day < 10) {
  day = '0' + day;
}
if (month < 10) {
  month = '0' + month;
}

monthMax = year + '-' + month + '-' + day;
document.getElementById("startingDate").setAttribute("max", monthMax);
document.getElementById("endingDate").setAttribute("max", monthMax);

document.getElementById("navbarDropdownMenuLink1").addEventListener('click', () => {
  getListingCategories()
});

document.getElementById("createListing").addEventListener('click', () => {
  getListingCategories()
});