//  validation event


// set to js date objects
startingDate = new Date(startingDate);
endingDate = new Date(endingDate);

// create a format yyyy-mm-dd 
let startingDateDay = ("0" + startingDate.getDate()).slice(-2)
let endingDateDay = ("0" + endingDate.getDate()).slice(-2)

let startingDateMonth = ("0" + (startingDate.getMonth() + 1)).slice(-2);
let endingDateMonth = ("0" + (endingDate.getMonth() + 1)).slice(-2);

let startingDateYear = startingDate.getFullYear();
let endingDateYear = endingDate.getFullYear();

// save it in value
let inputStartingDate = `${startingDateYear}-${startingDateMonth}-${startingDateDay}`;
let inputEndingDate = `${endingDateYear}-${endingDateMonth}-${endingDateDay}`;

// on window load set the value of the input type date to the listing starting-ending date
let dateStartingDate = document.getElementById("startingDate");
let dateEndingDate = document.getElementById("endingDate");
window.onload = (event) => {
    dateStartingDate.value = inputStartingDate;
    dateEndingDate.value = inputEndingDate;
}

// validation starting date < ending date

const form = document.querySelector('form');
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

// validation to start the selection from today

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