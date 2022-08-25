function sortingByStatus(array) {
  let copyOfOriginalArray = JSON.parse(JSON.stringify(array))
  for (let currentListing = 0; currentListing < copyOfOriginalArray.length; currentListing++) {
    let listing = copyOfOriginalArray[currentListing]

    for (let i = 0; i < listing.arrangements.length; i++) {
      if (listing.arrangements[i].status != 'finished' && listing.arrangements[i].status != 'canceled') {
        listing.arrangements.splice(i, 1);
        i--;
      }
    }
    if (listing.arrangements.length == 0) {
      copyOfOriginalArray.splice(currentListing, 1)
      currentListing--;
    }

  };
  return copyOfOriginalArray;


}

function sortingByListingsStatus(array) {
  let copyOfOriginalArray = JSON.parse(JSON.stringify(array))
  for (let currentListing = 0; currentListing < copyOfOriginalArray.length; currentListing++) {
    let listing = copyOfOriginalArray[currentListing]
    // console.log(listing);
    if (listing.listingStatus != 'active') {
      copyOfOriginalArray.splice(currentListing, 1);
      currentListing--;
    }
  }


  return copyOfOriginalArray;
};



// typeOfListing is true or false
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

    if (listing.listingCategoryName != listingCategoryName) {
      copyOfOriginalArray.splice(currentListing, 1)
      currentListing--;
    }

  };
  return copyOfOriginalArray;


}

function sortingListingsWithArrangementsByDate(array, date) {
  let copyOfOriginalArray = JSON.parse(JSON.stringify(array))
  if (date == 'undefined') {
    return copyOfOriginalArray;
  }
  let deconstructedArray = []


  for (let currentListing = 0; currentListing < copyOfOriginalArray.length; currentListing++) {
    let listing = copyOfOriginalArray[currentListing]

    for (let i = 0; i < listing.arrangements.length; i++) {
      let object = JSON.parse(JSON.stringify(listing))
      delete (object.arrangements)
      // console.log(object);
      object.arrangements = [listing.arrangements[i]]
      deconstructedArray.push(object)
    }

  };

  if (date == 'Πρόσφατα') {
    deconstructedArray.sort(function (a, b) {
      return new Date(b.arrangements[0].updated) - new Date(a.arrangements[0].updated);
    });
  } else if (date == 'Μακριά') {
    deconstructedArray.sort(function (a, b) {
      return new Date(a.arrangements[0].updated) - new Date(b.arrangements[0].updated);
    });
  } else { console.log('error'); }

  return deconstructedArray;


}

function sortingListingsByDate(array, date) {
  let copyOfOriginalArray = JSON.parse(JSON.stringify(array))
  if (date == 'undefined') {
    return copyOfOriginalArray;
  }

  if (date == 'Πρόσφατα') {
    copyOfOriginalArray.sort(function (a, b) {
      return new Date(b.listingStartingDate) - new Date(a.listingStartingDate);
    });
  } else if (date == 'Μακριά') {
    copyOfOriginalArray.sort(function (a, b) {
      return new Date(a.listingStartingDate) - new Date(b.listingStartingDate);
    });

  } else { console.log('error'); }


  return copyOfOriginalArray;


}

function sortedListingsWithArrangementsArray(array, typeOfListing, listingCategoryName, date) {
  let sortedByStatus = sortingByStatus(array)
  let sortedByTypeOfListing = sortingByTypeOfListing(sortedByStatus, typeOfListing)
  let sortedByListingCategory = sortingByListingCategory(sortedByTypeOfListing, listingCategoryName)
  let sortedByDate = sortingListingsWithArrangementsByDate(sortedByListingCategory, date)
  return sortedByDate;

}

function sortedListingsArray(array, typeOfListing, listingCategoryName, date) {
  let sortedByStatus = sortingByListingsStatus(array)
  let sortedByTypeOfListing = sortingByTypeOfListing(sortedByStatus, typeOfListing)
  let sortedByListingCategory = sortingByListingCategory(sortedByTypeOfListing, listingCategoryName)
  let sortedByDate = sortingListingsByDate(sortedByListingCategory, date)
  return sortedByDate;

}

function jQueryInitialize() {
  $('.deleteListing').on('click', function () {
    let value = $(this).val();
    socket2.post('/listing-delete-or-update', { event: 'delete', listingId: value }, function (result, jwres) {
      console.log(result);
      $(`#notHidden${value}`).detach()
    })
  })

  $('.editListing').on('click', function () {
    let value = $(this).val();
    // console.log(value);
    $(`#notHidden${value}`).attr('hidden', true)
    $(`#hidden${value}`).attr('hidden', false)
  })

  $('.saveListing').on('click', function () {
    let value = $(this).val();
    let fields = $(`#editForm${value}`).serializeArray();
    let formToObject = fields.reduce(
      (obj, item) => ((obj[item.name] = item.value), obj),
      {}
    );
    // console.log(fields);
    // console.log(formToObject);
    // console.log('WORKED');

    if (formToObject.startingDate >= formToObject.endingDate) {
      alert('endingdate must be at least one day apart from starting date')
      return;
    }

    if (formToObject.startingDate != '' && formToObject.endingDate != '') {
      console.log('passed');
      socket2.post('/listing-delete-or-update', { event: 'edit', listingId: value, updatedListing: formToObject }, function (result, jwres) {
        console.log(result);
        $(`#name${value}`).html(`${formToObject.name}`)
        $(`#description${value}`).html(`${formToObject.description}`)
        $(`#startingDate${value}`).html(`${formToObject.startingDate}`)
        $(`#endingDate${value}`).html(`${formToObject.endingDate}`)
        $(`#notHidden${value}`).attr('hidden', false)
        $(`#hidden${value}`).attr('hidden', true)
        // alert('Success')
      })
    } else (alert("fill in the dates"))


  })

  $('.cancelListing').on('click', function () {
    let value = $(this).val();

    $(`#notHidden${value}`).attr('hidden', false)
    $(`#hidden${value}`).attr('hidden', true)


  })
}


function div(dto, div) {
  let root = document.getElementById(div);
  let listingsOffered = ``;
  for (let i = 0; i < dto.length; i++) {

    for (let j = 0; j < dto[i].arrangements.length; j++) {
      listingsOffered += `
                        <div class="card demo-card">
                            <div class="card-header">
                                <a data-bs-toggle="collapse" href="#collapse${dto[i].arrangements[j].id}" role="button" aria-expanded="false" aria-controls="collapseExample" style="text-decoration: none; color: black;">
                                <div class="row"> 
                                
                                    <div class="col-11">
                                        <p> ${dto[i].listingName} </p> 
                                    </div>  
                                    <div class="col-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                        </svg>
                                    </div> 
                                                                   
                                </div>
                                </a>  
                            </div>
                            <div class="collapse" id="collapse${dto[i].arrangements[j].id}">
                            
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <span class="badge bg-secondary">${dto[i].listingCategoryName}</span>
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
                                                ${new Date(dto[i].listingStartingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" })} - ${new Date(dto[i].listingStartingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" })}
                                                
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
                                                ${new Date(dto[i].arrangements[j].updated).getDate()}/${new Date(dto[i].arrangements[j].updated).getMonth() + 1}/${new Date(dto[i].arrangements[j].updated).getFullYear()}
                                            </div>

                                            
                                            <div class="mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                class="bi bi-person-heart" viewBox="0 0 16 16">
                                                <path
                                                 d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
                                                </svg>
                                                &nbsp;
                                                <a href="#">${dto[i].arrangements[j].receiving}</a>
                                            </div>
                                        </div>
                                    

                                        <div class="col-md-6">
                                             ${dto[i].listingDescription}
                                        </div> 

                                    </div>
                                    
                                </div>
                            </div>
                        </div>`


    }
  }

  //listingsReceived
  let listingsReceived = ``;
  for (let i = 0; i < dto.length; i++) {

    for (let j = 0; j < dto[i].arrangements.length; j++) {
      listingsReceived += `
                        <div class="card demo-card">
                            <div class="card-header">
                                <a data-bs-toggle="collapse" href="#collapse${dto[i].arrangements[j].id}" role="button" aria-expanded="false" aria-controls="collapseExample" style="text-decoration: none; color: black;">
                                    <div class="row"> 
                        
                                        <div class="col-11">
                                            <p> ${dto[i].listingName} </p> 
                                        </div>  
                                        <div class="col-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                             </svg>
                                        </div> 
                                                           
                                    </div>
                                </a>  
                             </div>
                        
                            
                            <div class="collapse" id="collapse${dto[i].arrangements[j].id}">
                            
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <span class="badge bg-secondary">${dto[i].listingCategoryName}</span>
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
                                                ${new Date(dto[i].listingStartingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" })} - ${new Date(dto[i].listingStartingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" })}
                                               
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
                                                ${new Date(dto[i].arrangements[j].updated).getDate()}/${new Date(dto[i].arrangements[j].updated).getMonth() + 1}/${new Date(dto[i].arrangements[j].updated).getFullYear()}
                                            </div>

                                           

                                            <div class="mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                class="bi bi-person-heart" viewBox="0 0 16 16">
                                                <path
                                                 d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
                                                </svg>
                                                &nbsp;
                                                <a href="#">${dto[i].arrangements[j].offering}</a>
                                            </div>
                                        </div>
                                    

                                        <div class="col-md-6">
                                             ${dto[i].listingDescription}
                                        </div> 

                                    </div>
                                    
                                </div>
                            </div>
                        </div>`


    }
  }

  if (div == "offering") {
    root.innerHTML = listingsOffered;
  }
  else {
    root.innerHTML = listingsReceived;
  }
}


function divListing(dto, div) {

  let root = document.getElementById(div);
  let listings = ``;

  dto.forEach(listing => {
    listings +=

      `<div class="card mb-4" style="width: 80%; margin: 0 auto;" id=notHidden${listing.id}>
                
                <div class="card-header">
                  <div>
                    <p class="h5" id="name${listing.id}">
                    
                      ${listing.listingName}
                    </p>
                  </div>
                </div>
                <div class="card-body">
                  <br>
                  <div class="row">
                    <div class="col-xl-9">
                      <div>
                        <span class="badge bg-secondary" id="categoryID">
                          ${listing.listingCategoryName}
                        </span>
                      </div>
                      <div class="description" id="description${listing.id}">
                        ${listing.listingDescription}
                      </div>

                    </div>
                   
                    <div class="col-xl-3">
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
                        <span id="startingDate${listing.id}">${new Date(listing.listingStartingDate).toLocaleDateString("en-GB", { year: "numeric" ,
                        month: "2-digit" , day: "2-digit"})}</span>
                        
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
                        <span id="endingDate${listing.id}">${new Date(listing.listingEndingDate).toLocaleDateString("en-GB", { year: "numeric" ,
                        month: "2-digit" , day: "2-digit" , })}</span>
                      </div>

                    </div>
                  </div>
                  <br>
                  
                </div>
                <div class="card-footer">
                  <div class="text-end">
                    <button type="button" class="btn btn-danger editListing" value=${listing.id}>
                    Επεξεργασία
                    </button>
                    <button class="btn btn-danger deleteListing" value=${listing.id}>
                    Διαγραφή
                    </button>
                  </div>
                
                </div>
              </div> 


              <div hidden class="card mb-4" style="width: 80%; margin: 0 auto;" id=hidden${listing.id}>
                <form class=editForm id="editForm${listing.id}" value="${listing.id}">
                <div class="card-header">
                  <div>
                    <input name="name" type="text" value="${listing.listingName}" class="form-control-plaintext" placeholder="${listing.listingName}">
                  </div>
                </div>
                <div class="card-body">
                  <br>
                  <div class="row">
                    <div class="col-xl-9">
                      <div>
                      <span class="badge bg-secondary" id="categoryID">
                      ${listing.listingCategoryName}
                        </span>
                    
                      </div>
                      <div class="description" id="descriptionID">
                      Description
                        <textarea
                        name="description"
                        class="form-control form-control-sm"
                        placeholder=${listing.listingDescription}
                        rows="4"
                      >${listing.listingDescription}</textarea>
                      </div>

                    </div>
                   
                    <div class="col-xl-3">
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
                        <input name="startingDate" type="date" min="${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}" value="${new Date(listing.listingStartingDate).getFullYear()}-${('0' + (new Date(listing.listingStartingDate).getMonth() + 1)).slice(-2)}-${('0' + new Date(listing.listingStartingDate).getDate()).slice(-2)}">
                        
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
                        <input name="endingDate" type="date" min="${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}" value="${new Date(listing.listingEndingDate).getFullYear()}-${('0' + (new Date(listing.listingEndingDate).getMonth() + 1)).slice(-2)}-${('0' + new Date(listing.listingEndingDate).getDate()).slice(-2)}">
                        
                      </div>

                    </div>
                  </div>
                  <br>
                  
                  </div>
                  </form>
                  <div class="card-footer">
                  <div class="text-end">
                  <button type="submit" class="btn btn-danger  saveListing" value=${listing.id}>
                  Αποθηκευση
                  </button>
                  <button class="btn btn-danger cancelListing" value=${listing.id}>
                  Ακυρωση
                </button>
                </div>
                
                </div>
              </div> `



  })
  root.innerHTML = listings

}


function newListing(dto, div) {
  // let root = document.getElementById(div);
  let listings = `<div class="card mb-4" style="width: 80%; margin: 0 auto;" id=notHidden${dto.id}>
                
  <div class="card-header">
    <div>
      <p class="h5" id="name${dto.id}">
      
        ${dto.name}
      </p>
    </div>
  </div>
  <div class="card-body">
    <br>
    <div class="row">
      <div class="col-xl-9">
        <div>
          <span class="badge bg-secondary" id="categoryID">
            ${dto.categoryName}
          </span>
        </div>
        <div class="description" id="description${dto.id}">
          ${dto.description}
        </div>

      </div>
     
      <div class="col-xl-3">
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
          <span id="startingDate${dto.id}">${new Date(dto.startingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" })}</span>
          
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
          <span id="endingDate${dto.id}">${new Date(dto.endingDate).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit", })}</span>
        </div>

      </div>
    </div>
    <br>
    
  </div>
  <div class="card-footer">
    <div class="text-end">
      <button type="button" class="btn btn-danger editListing" value=${dto.id}>
      Επεξεργασία
      </button>
      <button class="btn btn-danger deleteListing" value=${dto.id}>
      Διαγραφή
      </button>
    </div>
  
  </div>
</div> 


<div hidden class="card mb-4" style="width: 80%; margin: 0 auto;" id=hidden${dto.id}>
  <form class=editForm id="editForm${dto.id}" value="${dto.id}">
  <div class="card-header">
    <div>
      <input name="name" type="text" value="${dto.name}" class="form-control-plaintext" placeholder="${dto.name}">
    </div>
  </div>
  <div class="card-body">
    <br>
    <div class="row">
      <div class="col-xl-9">
        <div>
        <span class="badge bg-secondary" id="categoryID">
        ${dto.categoryName}
          </span>
      
        </div>
        <div class="description" id="descriptionID">
        Description
          <textarea
          name="description"
          class="form-control form-control-sm"
          placeholder=${dto.description}
          rows="4"
        >${dto.description}</textarea>
        </div>

      </div>
     
      <div class="col-xl-3">
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
          <input name="startingDate" type="date" min="${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}" value="${new Date(dto.startingDate).getFullYear()}-${('0' + (new Date(dto.startingDate).getMonth() + 1)).slice(-2)}-${('0' + new Date(dto.startingDate).getDate()).slice(-2)}">
          
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
          <input name="endingDate" type="date" min="${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}" value="${new Date(dto.endingDate).getFullYear()}-${('0' + (new Date(dto.endingDate).getMonth() + 1)).slice(-2)}-${('0' + new Date(dto.endingDate).getDate()).slice(-2)}">
          
        </div>

      </div>
    </div>
    <br>
    
    </div>
    </form>
    <div class="card-footer">
    <div class="text-end">
    <button type="submit" class="btn btn-danger  saveListing" value=${dto.id}>
    Αποθηκευση
    </button>
    <button class="btn btn-danger cancelListing" value=${dto.id}>
    Ακυρωση
  </button>
  </div>
  
  </div>
</div> `;
  return listings;


}

function listingCategories(categories) {
  let options = ``;
  categories.forEach(categorie => {
    options += `
    <option id="${categorie.id}" value="${categorie.name}">
    ${categorie.name} 
    </option>`
  })
  $('#offeringfilterCategory').append(options)
  $('#receivingfilterCategory').append(options)
  $('#listingsfilterCategory').append(options)
}

function updateListingCategories(categories){
  let options = `<option value='undefined' hidden>Κατηγορίες</option>`
  categories.forEach(categorie => {
    options += `
    <option id="${categorie.id}" value="${categorie.name}">
    ${categorie.name} 
    </option>`
  })
  $('#offeringfilterCategory').empty()
  $('#receivingfilterCategory').empty()
  $('#listingsfilterCategory').empty()

  $('#offeringfilterCategory').append(options)
  $('#receivingfilterCategory').append(options)
  $('#listingsfilterCategory').append(options)
}
