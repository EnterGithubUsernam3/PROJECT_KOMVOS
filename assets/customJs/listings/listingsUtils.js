

function sortingByListingsStatus(array) {
    let copyOfOriginalArray = JSON.parse(JSON.stringify(array))
    for (let currentListing = 0; currentListing < copyOfOriginalArray.length; currentListing++) {
        let listing = copyOfOriginalArray[currentListing]
        if (listing.status != 'active') {
            copyOfOriginalArray.splice(currentListing, 1);
            currentListing--;
        }
    }


    return copyOfOriginalArray;
};



function sortingByTypeOfListing(array, typeOfListing) {
    let copyOfOriginalArray = JSON.parse(JSON.stringify(array))
    if (typeOfListing == 'undefined') {
        return copyOfOriginalArray;
    }
    if (typeOfListing == 'true') {
        typeOfListing = true
    } else { typeOfListing = false }
    for (let currentListing = 0; currentListing < copyOfOriginalArray.length; currentListing++) {
        let listing = copyOfOriginalArray[currentListing]
        if (listing.listingIsOffered != typeOfListing) {
            copyOfOriginalArray.splice(currentListing, 1)
            currentListing--;
        }



    };
    return copyOfOriginalArray;
}

function sortingByListingCategory(array, listingCategoryName) {
    let copyOfOriginalArray = JSON.parse(JSON.stringify(array))
    if (listingCategoryName == 'undefined') {
        return copyOfOriginalArray;
    }
    for (let currentListing = 0; currentListing < copyOfOriginalArray.length; currentListing++) {
        let listing = copyOfOriginalArray[currentListing]
        if (listing.category != listingCategoryName) {
            copyOfOriginalArray.splice(currentListing, 1)
            currentListing--;
        }

    };
    return copyOfOriginalArray;


}



function sortingListingsByDate(array, date) {
    let copyOfOriginalArray = JSON.parse(JSON.stringify(array))
    if (date == 'undefined') {
        return copyOfOriginalArray;
    }

    if (date == 'Πρόσφατα') {
        copyOfOriginalArray.sort(function (a, b) {
            return new Date(b.startingDate) - new Date(a.startingDate);
        });
    } else if (date == 'Μακριά') {
        copyOfOriginalArray.sort(function (a, b) {
            return new Date(a.startingDate) - new Date(b.startingDate);
        });

    } else { console.log('error'); }


    return copyOfOriginalArray;


}

function sortedListingsArray(array, typeOfListing, listingCategoryName, date) {
    let sortedByStatus = sortingByListingsStatus(array)
    let sortedByTypeOfListing = sortingByTypeOfListing(sortedByStatus, typeOfListing)
    let sortedByListingCategory = sortingByListingCategory(sortedByTypeOfListing, listingCategoryName)
    let sortedByDate = sortingListingsByDate(sortedByListingCategory, date)
    return sortedByDate;

}

function divListing(dto, user) {
    let root = $('.listing')[0]
    let typeUser = user
    let listings = ``;


    for (let i = 0; i < dto.length; i++) {
        listings += `
            <div class="card mb-4">
                

                <div class="card-header">
                    <div>
                        <p class="h5">
                             ${dto[i].name}
                        </p>
                    </div>
                </div>

                <!-- card body regular -->
                <div class="card-body big">
                    <br>

                    <div class="row">
                        <div class="col-sm-2"><img src="${dto[i].photo}" alt=""></div>

                        <div class="col-sm-5 personsInfo">
                        <div>`
                        if (typeUser != 150000){

                            listings +=`<form action="/view-profile/${dto[i].userId}" method="GET">
                            <button type="submit" class = "view-profileBtn">${dto[i].fullname} </button>
                            </form>`;
                        }
                        else{

                            listings += `${dto[i].fullname}`;
                        }

                                        
                       listings+= `</div>
                            <div>
                                 ${dto[i].age }
                            </div>
                            <div>
                                ${ dto[i].email }
                            </div>
                            <br>
                        </div>

                        <div class="col-sm-5">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                    <path
                                        d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                    <path
                                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                    <path
                                        d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                </svg>
                                &nbsp;
                                ${new Date(dto[i].startingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit"})}
                                
                                

                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                    <path
                                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                </svg>
                                &nbsp;
                                ${new Date(dto[i].endingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit"})}
                                
                            </div>
                        </div>

                    </div>

                    <br>
                    <div>
                        <span class="badge bg-secondary">
                             ${dto[i].category }
                        </span>
                    </div>
                    <div class="description">
                         ${dto[i].description }
                    </div>

                </div>

                <!-- card body for under 576px -->
                <div class="card-body small">
                    <br>

                    <div class="row">
                        <div class="col-3"><img src="${dto[i].photo}" alt=""></div>

                        <div class="col-9 personsInfo">
                            
                        <div>`
                        if (typeUser != 150000){

                            listings +=`<form action="/view-profile/${dto[i].userId}" method="GET">
                            <button type="submit" class = "view-profileBtn">${dto[i].fullname} </button>
                            </form>`;
                        }
                        else{

                            listings += `${dto[i].fullname}`;
                        }

                                        
                       listings+= `</div>
                            <div>
                                 ${dto[i].age }
                            </div>
                            <div>
                                 ${dto[i].email }
                            </div>
                            <br>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                <path
                                    d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                <path
                                    d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                            </svg>
                            &nbsp;
                            ${new Date(dto[i].startingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit"})}
                            

                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                <path
                                    d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                            </svg>
                            &nbsp;
                            ${new Date(dto[i].endingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit"})}
                            
                        </div>
                    </div>



                    <br>
                    <div>
                        <span class="badge bg-secondary">
                            ${ dto[i].category }
                        </span>
                    </div>
                    <div class="description">
                         ${dto[i].description }
                    </div>

                </div>`

                if (typeUser != 150000){
                listings +=     
                `<div class="card-footer">
                    <button type="button" class="btn btn-danger float-end" data-bs-toggle="modal"
                        data-bs-target="#createArrangement${dto[i].id}">
                        Ενδιαφέρομαι
                    </button>
                </div>`
                }
                listings += 
                `<!-- Modal for creating arrangement -->
                <div class="modal fade" id="createArrangement${dto[i].id}" data-bs-backdrop="static"
                    data-bs-keyboard="false" tabindex="-1" aria-labelledby="createArrangementLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id=createArrangementLabel ><b>Επιθυμείτε να συνεχίσετε;</b>
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body warning">
                                Πατώντας επιβεβαίωση θα αποσταλλεί ενημέρωση στο/η δημιουργό της αγγελίας ότι
                                ενδιαφέρεστε για την προσφορά του/της. Μη διστάσετε να επικοινωνήσετε μαζί του/της
                                για περισσότερες διευκρινήσεις και λεπτομέρειες.
                                <br>

                            </div>
                            <div class="modal-footer">

                                <form action="/create-arrangement-offered" method="POST">
                                    
                                    <input type="text" name="offering_user_id"
                                        value=${dto[i].userId} hidden>
                                    <input type="text" name="listing_id" value=${dto[i].id} hidden>
                                    <input type="text" name="category_id" value=${dto[i].category_id} hidden>
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Ακύρωση</button>
                                    <button type="submit" class="btn btn-danger">Επιβεβαίωση</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>





            </div>
    </div>`
    
    
}
root.innerHTML = listings
}


function divListingReceived(dto,user){
    let root = $('.listing')[0]
    let typeUser = user
    let listings = '';


        for (let i=0; i < dto.length; i++) { 
            listings += `
            <div class="card mb-4">


                <div class="card-header">
                    <div>
                        <p class="h5">
                            ${dto[i].name}
                        </p>
                    </div>
                </div>

                <!-- card body regular -->
                <div class="card-body big">
                    <br>

                    <div class="row">
                        <div class="col-sm-2"><img src="${dto[i].photo}" alt=""></div>
                        <div class="col-sm-5 personsInfo">
                            <div>`
                            if (typeUser != 150000){

                                listings +=`<form action="/view-profile/${dto[i].userId}" method="GET">
                                <button type="submit" class = "view-profileBtn">${dto[i].fullname} </button>
                                </form>`;
                            }
                            else{

                                listings += `${dto[i].fullname}`;
                            }

                                            
                           listings+= `</div>
                           
                            <div>
                            ${dto[i].age}
                            </div>
                            <div>
                            ${dto[i].email}
                            </div>
                        </div>

                        <div class="col-sm-5">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                    <path
                                        d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                    <path
                                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                    <path
                                        d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                </svg>
                                &nbsp;
                                ${new Date(dto[i].startingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit"})}

                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                    <path
                                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                </svg>
                                &nbsp;
                                ${new Date(dto[i].endingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit"})}
                            </div>
                        </div>

                    </div>

                    <br>
                    <div>
                        <span class="badge bg-secondary">${dto[i].category}</span>
                    </div>
                    <div class="description">
                    ${dto[i].description}
                    </div>

                </div>

                <!-- card body for under 576px -->
                <div class="card-body small">
                    <br>

                    <div class="row">
                        <div class="col-3"><img src="${dto[i].photo}" alt=""></div>

                        <div class="col-9 personsInfo">
                            <div>`
                            if (typeUser != 150000){

                                listings +=`<form action="/view-profile/${dto[i].userId}" method="GET">
                                <button type="submit" class = "view-profileBtn">${dto[i].fullname} </button>
                                </form>`;
                            }
                            else{

                                listings += `${dto[i].fullname}`;
                            }

                                            
                           listings+= `</div>
                            <div>
                            ${dto[i].age}
                            </div>
                            <div>
                            ${dto[i].email}
                            </div>
                            <br>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                <path
                                    d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                <path
                                    d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                            </svg>
                            &nbsp;
                            ${new Date(dto[i].startingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit"})}


                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                <path
                                    d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                            </svg>
                            &nbsp;
                            ${new Date(dto[i].endingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit"})}
                        </div>
                    </div>



                    <br>
                    <div>
                        <span class="badge bg-secondary">
                        ${dto[i].category}
                        </span>
                    </div>
                    <div class="description">
                    ${dto[i].description}
                    </div>

                </div>`

                if (typeUser != 150000){
                    listings +=     
                    `<div class="card-footer">
                    <button type="button" class="btn btn-danger float-end" data-bs-toggle="modal" data-bs-target="#createArrangement${dto[i].id}" >
                        Ενδιαφέρομαι
                      </button>
                    
                </div>`
                    }
                



            listings += `
            </div>

            <!-- Modal for creating arrangement -->
            <div class="modal fade" id="createArrangement${dto[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createArrangementLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="createArrangementLabel"><b>Επιθυμείτε να συνεχίσετε;</b></h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body warning">
                        
                        Πατώντας επιβεβαίωση θα αποσταλλεί ενημέρωση στο/η δημιουργό της αγγελίας ότι προσφέρεστε να τον εξυπηρετήσετε. Μη διστάσετε να επικοινωνήσετε μαζί του/της για περισσότερες διευκρινήσεις και λεπτομέρειες.
                        <br>
                            
                    </div>
                    <div class="modal-footer">
                      
                      <form action="/create-arrangement-received" method="POST">
                        <input type="text" name="receiving_user_id" value=${dto[i].userId}  hidden>
                        <input type="text" name="listing_id" value=${dto[i].id}  hidden>
                        <input type="text" name="category_id" value=${dto[i].category_id} hidden>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ακύρωση</button>
                      <button type="submit" class="btn btn-danger">Επιβεβαίωση</button>
                    </form>
                    </div>
                
                  </div>
                </div>
              </div>
                `

                
            }
            root.innerHTML = listings
}

function listingCategories(categories) {
    let options = ``;
    let modalOptions = ``;
    categories.forEach(categorie => {
        options += `
      <option id="${categorie.id}" value="${categorie.name}">
      ${categorie.name} 
      </option>`
      modalOptions += `
      <option id="${categorie.id}" value="${categorie.id}">
      ${categorie.name} 
      </option>`
    })
    $('#listingsfilterCategory').append(options)
    $('#category_id').append(modalOptions)
}

function updateListingCategories(categories){
    let options = `<option value='undefined' hidden>Κατηγορίες</option>`
    let modalOptions = ''
    categories.forEach(categorie => {
      options += `
      <option id="${categorie.id}" value="${categorie.name}">
      ${categorie.name} 
      </option>`
      modalOptions += `
      <option id="${categorie.id}" value="${categorie.id}">
      ${categorie.name} 
      </option>`
    })
    $('#listingsfilterCategory').empty()
    $('#category_id').empty()
  
    $('#listingsfilterCategory').append(options)
    $('#category_id').append(modalOptions)
  }
