const listingsReceived = io.socket
let globalDto = []

listingsReceived.post('/all-listings-received', function (result, jwres) {
    console.log('received');
    console.log(result);
    console.log(result[1]);
    globalDto = result[0]
    divListingReceived(globalDto,result[1])
})

listingsReceived.post('/listing-categories', function(result, jwres){
    console.log(result);
    listingCategories(result)    
})

listingsReceived.on('newAdminCategorie', function(result, jwres){
    console.log(result);
    listingsReceived.post('/listing-categories', function(result, jwres){
        console.log(result);
        updateListingCategories(result)    
    })
})
