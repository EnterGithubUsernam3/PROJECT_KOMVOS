const listingsOffered = io.socket
let globalDto = []

listingsOffered.post('/all-listings-offered', function (result, jwres) {
    console.log(result);
    console.log(result[1]);
    globalDto = result[0]
    divListing(globalDto,result[1])
})

listingsOffered.post('/listing-categories', function(result, jwres){
    console.log(result);
    listingCategories(result)    
})

listingsOffered.on('newAdminCategorie', function(result, jwres){
    console.log(result);
    listingsOffered.post('/listing-categories', function(result, jwres){
        console.log(result);
        updateListingCategories(result)    
    })
})
