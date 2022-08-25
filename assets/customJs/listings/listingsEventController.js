function getDateValue() {
    let filters = getFilters()
    console.log(filters);
    console.log(globalDto);
    let haveOffered = sortedListingsArray(globalDto, filters[0], filters[1], filters[2])
    console.log(haveOffered);
    divListing(haveOffered)
}

function getCategoryValue() {
    let filters = getFilters()
    console.log(filters);
    let haveOffered = sortedListingsArray(globalDto, filters[0], filters[1], filters[2])
    console.log(haveOffered);
    divListing(haveOffered)
}

function getIsOffered() {
    let filters = getFilters()
    console.log(filters);
    console.log(globalDto);
    let haveOffered = sortedListingsArray(globalDto, filters[0], filters[1], filters[2])
    console.log(haveOffered);
    divListing(haveOffered)
}


// Filter function gets all of user's current choice from the filter options provided at the UI while using the divRoot 
// variable as its guide to pinpoint from where it needs to take the values from

function getFilters() {
    return [document.getElementById('listingsfilterType').value, document.getElementById("listingsfilterCategory").value, document.getElementById("listingsfilterDate").value]
}

