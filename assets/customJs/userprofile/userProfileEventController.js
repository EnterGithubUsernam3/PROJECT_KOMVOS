/* divRoot and positionOfDto variables are being used to hold the value of the current tab that the user is looking
at where we will need afterwards for some of the utilities function.
*/
let divRoot = ''
let positionOfDto = ''

/* All functions starting with the /get/ word are needed to populate the needed div elements with html code.
One condition is common in all of them if the user is looking at his active listings tab we need to call a slightly 
different function to handle the different data from the listings object. 
*/
/* Jquery usage: 
!Note: Every div created has somewhere in its html elements the listing's true database Id.
!Note: Also jquery code needs to be initialized after every time the active listing's div is being constructed or reconstructed.
1) If the delete button is clicked a socket like ajax call is posting the information with the listing ID to the controller
where the listing status is changed from "active" to "inactive".
2) If the edit button is clicked a hidden div with the listings exact information is being showed to the user and the current 
div is being hidden.
3)If the save button is clicked we collect the input information through jquery serializeArray method and then an object with
the correct form created, to be sent with the post call to the controller, before that happens the user's input's is getting 
checked through a mini series of js validation code. After the update was successfull in order not to reload the listing tab
with the new data from the update event, the (original) div which was being hidden gets unhidden and now it shows the updated
data aswell.
4)Lastly if the cancel button is clicked the hidden attribute div gets unhidden and the current div gets hidden instead.
*/
function getDateValue() {
    let filters = getFilters(divRoot)
    console.log(filters);
    if (divRoot != 'listings') {
        let haveOffered = sortedListingsWithArrangementsArray(globalDto[positionOfDto], filters[0], filters[1], filters[2])
        console.log(haveOffered);
        div(haveOffered, divRoot)
    } else {
        let haveOffered = sortedListingsArray(globalDto[positionOfDto], filters[0], filters[1], filters[2])
        console.log(haveOffered);
        divListing(haveOffered, divRoot)
        jQueryInitialize()
    }
}

function getCategoryValue() {
    let filters = getFilters(divRoot)
    console.log(filters);
    if (divRoot != 'listings') {
        let haveOffered = sortedListingsWithArrangementsArray(globalDto[positionOfDto], filters[0], filters[1], filters[2])
        console.log(haveOffered);
        div(haveOffered, divRoot)
    } else {
        let haveOffered = sortedListingsArray(globalDto[positionOfDto], filters[0], filters[1], filters[2])
        console.log(haveOffered);
        divListing(haveOffered, divRoot)
        jQueryInitialize()
    }
}

function getIsOffered() {
    let filters = getFilters(divRoot)
    console.log(filters);
    if (divRoot != 'listings') {
        let haveOffered = sortedListingsWithArrangementsArray(globalDto[positionOfDto], filters[0], filters[1], filters[2])
        console.log(haveOffered);
        div(haveOffered, divRoot)
    } else {
        let haveOffered = sortedListingsArray(globalDto[positionOfDto], filters[0], filters[1], filters[2])
        console.log(haveOffered);
        divListing(haveOffered, divRoot)
        jQueryInitialize()
    }
}


// Filter function gets all of user's current choice from the filter options provided at the UI while using the divRoot 
// variable as its guide to pinpoint from where it needs to take the values from

function getFilters(root) {
    return [document.getElementById(`${root}filterType`).value, document.getElementById(`${root}filterCategory`).value, document.getElementById(`${root}filterDate`).value]
}

// When any of the following buttons is getting clicked it updates the two guide variables and filters an array from
// the globalDto variable while also appending html code at the desired div location.

document.getElementById("nav-offer-tab").addEventListener('click', () => {
    divRoot = 'offering'
    positionOfDto = 0
    let unfilteredListingWithArrangementsOffering = sortingByStatus(globalDto[0])
    div(unfilteredListingWithArrangementsOffering, 'offering')
});

document.getElementById("nav-receive-tab").addEventListener('click', () => {
    divRoot = 'receiving'
    positionOfDto = 1
    let unfilteredListingWithArrangementsReceiving = sortingByStatus(globalDto[1])
    div(unfilteredListingWithArrangementsReceiving, 'receiving')
});

document.getElementById("nav-allListings-tab").addEventListener('click', () => {
    divRoot = 'listings'
    positionOfDto = 2
    let unfilteredListings = sortingByListingsStatus(globalDto[2])
    console.log(unfilteredListings);
    divListing(unfilteredListings, 'listings')
    jQueryInitialize()
});


