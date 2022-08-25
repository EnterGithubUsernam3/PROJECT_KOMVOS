module.exports = {


  friendlyName: 'Homepage',


  description: 'Homepage something.',


  inputs: {

  },


  exits: {
    success:{

      viewTemplatePath:'pages/homepage'
    }

  },


  fn: async function (inputs) {
  let infoForFront;
  let isAdmin;
  let photo = this.req.session.photo;
    if(this.req.session.userId)
    {
      if(this.req.session.userId == 0)
      {
        infoForFront = false;
      }
      else{
        isAdmin = this.req.session.isAdmin;
        infoForFront = true;
      }
    }
    else{
      
      infoForFront = false
    }
    //  console.log(this.req.session)

    return {infoForFront:infoForFront , isAdmin:isAdmin , photo:photo};
  }


};
