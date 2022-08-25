module.exports = {


  friendlyName: 'Test user',


  description: '',


  inputs: {

  },


  exits: {
    
  },


  fn: async function (inputs) {
    await TestUser.create( { firstName: "Δήμος", lastName: "Μωραίτης", email: "dimitrismor@gmail.com", password:"123456789", gender:"Male", dateOfBirth: "1984-08-02", radioAddress: 'true', address: "Μπιζανίου 37", photo:'images/users/userDefault/image.jpg', description:'Εργάζομαι ως πυροσβέστης και πάντα υπήρχε στη ζωή μου ο εθελοντισμός. Έχω διαθέσιμα τα σαββατοκύριακα και μπορώ να βοηθήσω σε διάφορες τεχνικές εργασίες όπου χρειαστεί.',  points: 20, employeed: 'true', disabled: 'false', volunteer: 'true', freeTime: 'freeTimeWeekend', admin: false}).fetch();

    await TestUser.create( { firstName: "Πάνος", lastName: "Παναγιώτου", email: "panospan@gmail.com", password:"123456789", gender:"Male", dateOfBirth: "1965-04-28", radioAddress: 'false', photo: 'images/users/userDefault/image.jpg', description:'Είμαι ιδιωτικός υπάλληλος και με ενδιαφέρει ιδιαίτερα η προστασία των ζώων αλλά και η φροντίδα τους. Στον ελέυθερό μου χρόνο μπορώ να αναλάβω τη φύλαξη ή τη βόλτα του κατοικιδίου σας.',  points: 20, employeed: 'true', disabled: 'false', volunteer: 'false', freeTime: 'freeTimeSome',admin: false}).fetch();
   
    await TestUser.create( { firstName: "Έλενα", lastName: "Μήτσιου", email: "elenakiMit@gmail.com", password:"123456789", gender:"Female", dateOfBirth: "2000-07-02", radioAddress: 'true', address: "Ναυαρίνου 50", photo:'images/users/userDefault/image.jpg', description:'Είμαι φοιτήτρια του Μαθηματικού τμήματος και ενδιαφέρομαι να παραδώσω εθελοντικά μαθήματα σε παιδιά δημοτικού και γυμνασίου πάνω στις θετικές επιστήμες.',  points: 20, employeed: 'false', disabled: 'false',volunteer: 'false',freeTime: 'freeTimeMinimum',admin: false}).fetch();
   
    await TestUser.create( { firstName: "Θανάσης", lastName: "Χρονάτος", email: "thanoschron@gmail.com", password:"123456789", gender:"Male", dateOfBirth: "1976-05-15", radioAddress: 'true', address: "Αναξαγόρα 5", photo:'images/users/userDefault/image.jpg', description:'Ασχολούμαι εδώ και χρόνια με τον εθελοντισμό. Αυτή την περίοδο δεν έχω σταθερή εργασία οπότε έχω άπλετο ελεύθερο χρόνο για την κοινότητα του Κόμβου.',  points: 2, employeed: 'false', disabled: 'false', volunteer: 'true',freeTime: 'freeTimeSome', admin: false}).fetch();

    await TestUser.create( { firstName: "Ευτέρπη", lastName: "Νικολάου", email: "eutnikolaou@gmail.com", password:"123456789", gender:"Female", dateOfBirth: "1990-02-17", radioAddress: 'true',  address: "'Οθωνος 6", photo: 'images/users/userDefault/image.jpg', description:'Εργάζομαι στον τομέα της πληροφορικής και μου αρέσει να αξιοποιώ τον ελεύθερο χρόνο μου, ιδιαίτερα ορισμένα απογέυματα της εβδομάδας, στο να παρέχω εθελοντικά τις υπηρεσίες μου σε όποιον το έχει ανάγκη.',  points: 20, employeed: 'true', disabled: 'false', volunteer: 'true', freeTime: 'freeTimeSome', admin: true}).fetch();

    // σίτιση
   await ListingCategories.create({ name: "Σίτιση", description: "Υπηρεσία σχετική με την προμήθεια έτοιμου φαγητού ή βρώσιμων προϊόντων" }).fetch();
   // στέγαση
   await ListingCategories.create({ name: "Στέγαση", description: "Υπηρεσία σχετική με την παροχή προσωρινής στέγης" }).fetch();
   // προσφορά μαθημάτων
   await ListingCategories.create({ name: "Προσφορά μαθημάτων", description: "Υπηρεσία σχετική με την προσφορά μαθημάτων" }).fetch();
   // μεταφορικές υπηρεσίες
   await ListingCategories.create({ name: "Μεταφορικές υπηρεσίες", description: "Υπηρεσία σχετική με την μεταφορά ατόμων" }).fetch();
   // τεχνικές εργασίες
   await ListingCategories.create({ name: "Τεχνικές εργασίες", description: "Υπηρεσία σχετική με την προσφορά τεχνικών εργασιών" }).fetch();
   // οικιακές εργασίες
   await ListingCategories.create({ name: "Οικιακές εργασίες", description: "Υπηρεσία σχετική με την προσφορά οικιακών εργασιών" }).fetch();
   // υπηρεσίες φύλαξης
   await ListingCategories.create({ name: "Υπηρεσίες φύλαξης", description: "Υπηρεσίες σχετικές με την φύλαξη/φροντίδα/συντροφιά ατόμων" }).fetch();
   //άλλο
   await ListingCategories.create({ name: "Άλλο", description: "Υπηρεσίες που δεν υπάγονται σε κάποια άλλη κατηγορία" }).fetch();



   // listings offered

   await Listing.create( { user_id: 4, category_id: 1, name: 'Υπηρεσία σχετική με την προμήθεια έτοιμου φαγητού', description:'Προσφέρεται δωρεάν φαγητό καθημερινά 3:00 μμ - 8:00 μμ στην παρακάτω διεύθυνση "Μενελαου 10, Κάτω Πετράλωνα" ', startingDate: "2022-05-01", endingDate: "2022-07-25", isOffered: true }).fetch();
  
   await Listing.create( { user_id: 2, category_id: 2, name: 'Υπηρεσία σχετική με την παροχή προσωρινής στέγης', description:' Προσφέρεται δωρεάν στέγαση στην παρακάτω διεύθυνση "Ηρακλέους 64, Νέος Κόσμος" ', startingDate: "2022-04-28", endingDate: "2022-05-28", isOffered: true }).fetch();
 
   await Listing.create( { user_id: 3, category_id: 3, name: 'Υπηρεσία σχετική με την προσφορά μαθημάτων', description:' Προσφέρονται μαθήματα θετικών επιστημών σε παιδιά γυμνασίου', startingDate: "2022-05-01", endingDate: "2022-06-15", isOffered: true }).fetch();
  
   await Listing.create( { user_id: 3, category_id: 3, name: 'Υπηρεσία σχετική με την προσφορά μαθημάτων', description:' Προσφέρονται μαθήματα Γαλλικών', startingDate: "2022-05-01", endingDate: "2022-10-15", isOffered: true }).fetch();
  
   await Listing.create( { user_id: 1, category_id: 4, name: 'Υπηρεσία σχετική με την μεταφορά ατόμων', description:' Προσφέρεται μεταφορικό μέσο για τη διαδρομή Κουκάκι - Νέα Μάκρη, καθημερινά, πρωινές ώρες ', startingDate: "2022-01-02", endingDate: "2022-04-01", isOffered: true }).fetch();

   await Listing.create( { user_id: 4, category_id: 5, name: 'Υπηρεσία σχετική με την προσφορά τεχνικών εργασιών', description:' Αναλαμβάνω στον χώρο σας παντός τύπου επισκευές και επιδιορθώσεις. ', startingDate: "2022-01-10", endingDate: "2022-12-20", isOffered: true }).fetch();

   await Listing.create( { user_id: 3, category_id: 6, name: 'Υπηρεσία σχετική με την προσφορά οικιακών εργασιών', description:' Αναλαμβάνω καθαρισμό σπιτιών πρωινές και απογευματινές ώρες, περιοχές Βριλήσσια, Μελίσσια, Χαλάνδρι ', startingDate: "2022-01-01", endingDate: "2022-01-12", isOffered: true }).fetch();
  await Listing.create( { user_id: 4, category_id: 7, name: 'Υπηρεσίες σχετικές με την φύλαξη/φροντίδα/συντροφιά ατόμων', description:' Προσφέρεται βοήθεια σε παιδιά με νοητική υστέρηση ', startingDate: "2022-02-01", endingDate: "2022-08-01", isOffered: true }).fetch();

  // listings received

   await Listing.create( { user_id: 3, category_id: 4, name: 'Υπηρεσία σχετική με την μεταφορά ατόμων', description:' Ζητείται μεταφορικό μέσο καθημερινά 7:00 - 8:00 για τη διαδρομή Πατήσια - Χολαργό ', startingDate: "2022-04-21", endingDate: "2022-05-30", isOffered: false }).fetch();
   await Listing.create( { user_id: 1, category_id: 5, name: 'Υπηρεσία σχετική με την προσφορά τεχνικών εργασιών', description:' Ζητείται κηπουρός ', startingDate: "2022-04-10", endingDate: "2022-04-20", isOffered: false }).fetch();
  await Listing.create( { user_id: 4, category_id: 6, name: 'Υπηρεσία σχετική με την προσφορά οικιακών εργασιών', description:' Ζητείται βοήθεια για καθαρισμό κτιρίου στο κέντρο της Αθήνας ', startingDate: "2022-07-01", endingDate: "2022-07-02", isOffered: false }).fetch();
   await Listing.create( { user_id: 4, category_id: 7, name: 'Υπηρεσίες σχετικές με την φύλαξη/φροντίδα/συντροφιά ατόμων', description:' Ζητείται βοήθεια σε ηλικιωμένο στο κέντρο της Αθήνας ', startingDate: "2022-01-01", endingDate: "2022-12-25", isOffered: false }).fetch();
   await Listing.create( { user_id: 4, category_id: 7, name: 'Υπηρεσίες σχετικές με την φύλαξη/φροντίδα/συντροφιά ατόμων', description:' Ζητείται βοήθεια σε άνθρωπο με κινητικά προβλήματα ', startingDate: "2022-05-01", endingDate: "2022-11-25", isOffered: false }).fetch();
 

    await Arrangement.create ( {offering_user_id: 4, receiving_user_id:2, listing_id: 1, status:'finished'}).fetch();
    await Arrangement.create ( {offering_user_id: 4, receiving_user_id:3, listing_id: 1, status:'finished'}).fetch();

    await Arrangement.create ( {offering_user_id: 4, receiving_user_id:1, listing_id: 6, status:'finished'}).fetch();
    await Arrangement.create ( {offering_user_id: 4, receiving_user_id:5, listing_id: 6, status:'finished'}).fetch();

    await Arrangement.create ( {offering_user_id: 3, receiving_user_id:4, listing_id: 4, status:'finished'}).fetch();    
    await Arrangement.create ( {offering_user_id: 1, receiving_user_id:4, listing_id: 5, status:'finished'}).fetch();

    await Arrangement.create ( {offering_user_id: 2, receiving_user_id:4, listing_id: 11, status:'finished'}).fetch();    
    await Arrangement.create ( {offering_user_id: 1, receiving_user_id:4, listing_id: 12, status:'finished'}).fetch();

    //events

    await Event.create( { user_id: 1, title: 'Καθαρισμός Παραλίας Βούλας', description:'Καθαρίζουμε όλοι μαζί εν όψη καλοκαιριού την παραλία της Βούλας την Κυριακή 01/05/2022 και ώρα 8:00 π.μ.', startingDate: "2022-05-01", endingDate: "2022-05-01" }).fetch();
  
    await Event.create( { user_id: 2, title: 'Αναδάσωση Τατοΐου', description:'Ξαναφτιάχνουμε το δάσος των βασιλικών κτημάτων  το Σάββατο 07/05/2022 και ώρα 8:00 π.μ.', startingDate: "2022-05-07", endingDate: "2022-05-07" }).fetch();

    await Event.create( { user_id: 3, title: 'Καθαρισμός νεοκλασικού σπιτιού', description:'Καθαρίζουμε το εγκαταλελειμμένο νεοκλασικό  σπίτι στην οδό πατησιών 98 και διαμόρφωση του χώρου με σκοπό τη χρήση του για πολιτιστικό κέντρο το Σάββατο 10/05/2022 και ώρα 8:00 π.μ.', startingDate: "2022-05-10", endingDate: "2022-05-11" }).fetch();

    await Event.create( { user_id: 4, title: 'Συγκέντρωση ρούχων', description:'Συγκεντρώνουμε ρούχα για να τα δωρίσουμε στους άπορους της πόλης μας στη πλατεία Αμερικής  την Κυριακή 22/05/2022 και ώρα 8:00 π.μ.', startingDate: "2022-05-22", endingDate: "2022-05-22" }).fetch();
  
    return;

  }


};
