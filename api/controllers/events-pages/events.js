module.exports = {


  friendlyName: 'Events',


  description: 'Events something.',


  inputs: {

  },


  exits: {
    success: {
      viewTemplatePath: 'pages/events'
    }
  },


  fn: async function (inputs) {
  let interimUser;
  let isAdmin;
  let photo = this.req.session.photo;
    if(this.req.session.userId)
    {
      interimUser = this.req.session.userId;
      isAdmin = this.req.session.isAdmin;
    }
    else{
      interimUser = 150000;
    }
    let events = await Event.find( {select: ['user_id']});

    let userIds = events.map(element => element.user_id);

    let usersEvents = await TestUser.find({
      where: { id: { in: userIds } }
    }).populate('events');

    let eventsWithUsers = [];

    const msPerYearNormal = 31557600000;
    const msPerYearLarge = 31622400000;
    const msPerYear = (3 * msPerYearNormal + msPerYearLarge) / 4;

    for (let i = 0; i < usersEvents.length; i++) {
      for (let j = 0; j < usersEvents[i].events.length; j++) {
        let currentEvent = {};
        currentEvent.fullname = usersEvents[i].firstName + " " + usersEvents[i].lastName;
        currentEvent.email = usersEvents[i].email;
        let dateOfBirth = usersEvents[i].dateOfBirth;
        dateOfBirth = new Date(dateOfBirth);
        currentEvent.age = Math.floor((Date.now() - dateOfBirth) / (msPerYear));

        currentEvent.id = usersEvents[i].events[j].id;
        currentEvent.title = usersEvents[i].events[j].title;
        currentEvent.startingDate = usersEvents[i].events[j].startingDate;
        currentEvent.endingDate = usersEvents[i].events[j].endingDate;
        currentEvent.description = usersEvents[i].events[j].description;

        eventsWithUsers.push(currentEvent);
      }
    }


    // All done.
    return { eventsWithUsers: eventsWithUsers,interimUser:interimUser, isAdmin:isAdmin, photo:photo };

  }


};
