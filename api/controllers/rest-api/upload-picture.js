
module.exports = {


  friendlyName: 'Upload picture',


  description: '',


  inputs: {

  },


  exits: {
    // success: {
    //   viewTemplatePath: 'pages/userprofile'
    // }

  },


  fn: async function (req, res) {
    var userId = this.req.session.userId;
    

    //   //   console.log(this.req.body.photo);
    //   //   console.log("Έχουμε controller");
    //   //   console.log(this.req.body.photo.value);
    this.req.file('photo').upload({
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, `assets/images/users/user${this.req.session.userId}`),
      saveAs: 'image.jpg'
    },
      // dirname: require('path').resolve(sails.config.appPath,'/assets/images')
      async function whenDone(err, uploadedFiles) {
        if (err) {
          return this.res.send(500, err)
        }
        else {
          if (uploadedFiles.length === 0) {

            console.log("No files for you sir");
          }
          await TestUser.updateOne({ id: userId }).set({ photo:`/images/users/user${userId}/image.jpg` });
          
        }
        
      })
    // }
  
    
    
    this.req.session.photo = `/images/users/user${userId}/image.jpg`;
    this.res.redirect('/successfully-uploaded')
   
   
   
   
    
    
  }
}
