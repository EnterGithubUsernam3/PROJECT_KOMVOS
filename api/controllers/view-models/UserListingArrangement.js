// εδω προκειται να κανουμε κλασση που θα δεχεται λιστικγς με τa arrangements του και θα επιστρεφει ενα ολοκληρωμενο αντικειμενο στο φροντ

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

class User {
    constructor(userListingArrangements,userName,isOffered) {
        this.dto = []
        this.userListingArrangements = userListingArrangements
        this.userName = userName
        this.isOffered = isOffered
        
    }
    async user(id) {
        return await TestUser.findOne({
            where: { id: id },
            select: ['firstName', 'lastName']
        })
    }
    async listingCategory(id) {
        return await ListingCategories.findOne({
            where: { id: id },
            select: ['name']
        })
    }
    
    async listingsQueryWithArrangementsToDto() {
        await this.userListingArrangements.reduce(async (memo, listing) => {
            await memo
            this.currentListing = {}
            this.currentListing.arrangements = []
            this.currentListing.id = listing.id
            this.currentListing.listingCategoryName = await this.listingCategory(listing.category_id).then((result, reject) => { return result.name })
            this.currentListing.listingName = listing.name
            this.currentListing.listingStartingDate = listing.startingDate
            this.currentListing.listingEndingDate = listing.endingDate
            this.currentListing.listingDescription = listing.description
            this.currentListing.listingIsOffered = listing.isOffered
            this.currentListing.listingStatus = listing.status
            this.currentListing.randomDate = randomDate(new Date(2012, 0, 1), new Date())
           
            await listing.arrangements.reduce(async (memo, arrangement) => {
                await memo
                this.currentArrangement = {}
        
                this.currentArrangement.id = arrangement.id
                this.currentArrangement.date = arrangement.createdAt
                this.currentArrangement.points = arrangement.pointsOfTransaction
                this.currentArrangement.status = arrangement.status
                this.currentArrangement.randomDate = randomDate(new Date(2012, 0, 1), new Date())
                this.currentArrangement.updated = arrangement.updatedAt

                if (this.isOffered == "offer"){
                    let receiver = await this.user(arrangement.receiving_user_id).then((result, reject) => { return result });
                this.currentArrangement.receiving = `${receiver.firstName} ${receiver.lastName}`;

                this.currentArrangement.offering = `${this.userName.firstName} ${this.userName.lastName}`;
                } else if (this.isOffered == 'receive'){
                this.currentArrangement.receiving = `${this.userName.firstName} ${this.userName.lastName}`;

                let offer = await this.user(arrangement.offering_user_id).then((result, reject) => { return result });
                this.currentArrangement.offering = `${offer.firstName} ${offer.lastName}`;
                }
                // let receiver = await this.user(arrangement.receiving_user_id).then((result, reject) => { return result });
                // this.currentArrangement.receiving = `${receiver.firstName} ${receiver.lastName}`;

                // let offer = await this.user(arrangement.offering_user_id).then((result, reject) => { return result });
                // this.currentArrangement.offering = `${offer.firstName} ${offer.lastName}`;

                this.currentListing.arrangements.push(this.currentArrangement)
            }, undefined);
            this.dto.push(this.currentListing);
        }, undefined);
    }

    async listingQueryToDto(){
        await this.userListingArrangements.reduce(async (memo, listing) => {
            await memo
            this.currentListing = {}
            this.currentListing.id = listing.id
            this.currentListing.listingCategoryName = await this.listingCategory(listing.category_id).then((result, reject) => { return result.name })
            this.currentListing.listingCategoryId = listing.category_id
            this.currentListing.listingName = listing.name
            this.currentListing.listingStartingDate = listing.startingDate
            this.currentListing.listingEndingDate = listing.endingDate
            this.currentListing.listingDescription = listing.description
            this.currentListing.listingIsOffered = listing.isOffered
            this.currentListing.listingStatus = listing.status
            this.currentListing.randomDate = randomDate(new Date(2012, 0, 1), new Date())
            this.dto.push(this.currentListing)
        }, undefined);
    }




}

module.exports = { User }