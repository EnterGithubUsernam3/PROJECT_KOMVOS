/*Globa Dto variable is an array of objects which contains all the necessary information we need
to populate dynamically the history of the user's arrangaments and his active listings UI where
he can edit and delete data
 */
const socket2 = io.socket
let globalDto = []

/*When the server launches the socket2 socket initializes with it and makes 3 ajax calls to two
rest-api controllers and pushes in specific places the returned data. The globalDto variable should look
like this [[{offered Arrangements with Listings}],[{offered Arrangements with Listings}].[{all active listings}]]
*/
socket2.post('/all-listings-for-a-user',  function (result, jwres) {
    console.log('listings');
    console.log(result);
    globalDto[2] = result
})

socket2.post('/receive-or-offer-listings-with-arrangements', { userType: 'offer' }, function (result, jwres) {
    console.log(result);
    console.log('offer');
    globalDto[0] = result
})

socket2.post('/receive-or-offer-listings-with-arrangements', { userType: 'receive'} , function (result, jwres) {
    console.log(result);
    console.log('receive');
    globalDto[1] = result
})

socket2.post('/listing-categories', function(result, jwres){
    console.log(result);
    listingCategories(result)    
})

/*When a user updates or deletes an active listing of his at the same time the globalDto is getting updated.
In the case of the receive and offer option at the history tab the pre-existing div is getting emptied 
and being reconstructed with the new data
*/

socket2.on('updateDto', function (msg) {

    socket2.post('/all-listings-for-a-user',  function (result, jwres) {
        console.log('update');
        console.log(result);
        globalDto[2] = result
    })
    socket2.post('/receive-or-offer-listings-with-arrangements', { userType: 'receive'}, function (result, jwres) {
        console.log(result);
        globalDto[1] = result
        $('#receiving').empty()
        let unfilteredListingWithArrangementsReceiving = sortingByStatus(globalDto[1])
        div(unfilteredListingWithArrangementsReceiving, 'receiving')
        // console.log('CHANGED AFTER UPDATE');
    })
    socket2.post('/receive-or-offer-listings-with-arrangements', { userType: 'offer' }, function (result, jwres) {
        console.log(result);
        globalDto[0] = result
        $('#offering').empty()
        let unfilteredListingWithArrangementsOffering = sortingByStatus(globalDto[0])
        div(unfilteredListingWithArrangementsOffering, 'offering')
        // console.log('CHANGED AFTER UPDATE');
    })

})

// If a user creates a new listing with his id the userprofile socket gets updated with the new data

socket2.on('newListing', function(result,jwres){
    console.log(result);
    let newListings = newListing(result)
    $('#listings').append(newListings)
    jQueryInitialize()
})

socket2.on('newAdminCategorie', function(result, jwres){
    console.log(result);
    socket2.post('/listing-categories', function(result, jwres){
        console.log(result);
        updateListingCategories(result)    
    })
})