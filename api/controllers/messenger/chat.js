module.exports = {


  friendlyName: 'Chat',


  description: 'Chat something.',


  inputs: {

  },


  exits: {
    success: {
      viewTemplatePath: 'pages/messenger'
    }
  },


  fn: async function (inputs) {
    let result = await sails.sendNativeQuery(`
    SELECT m.createdAt, m.text, m.user1, m.user2, user1.first_name as user1FirstName, user1.last_name as user1LastName,user1.photo as user1Photo , user2.first_name as user2FirstName, user2.last_name as user2LastName, user2.photo as user2Photo
    FROM chatmessages m
    INNER JOIN
      (
        SELECT MAX(id) as lastId
        FROM  chatmessages
        WHERE
          (
            chatmessages.user2 = $1
            OR
            chatmessages.user1 = $1
          )
        GROUP BY
        CONCAT(
          LEAST(chatmessages.user2, chatmessages.user1),
          '.',
          GREATEST(chatmessages.user2, chatmessages.user1)
        )
      ) conversations 
    ON conversations.lastId = m.id
    INNER JOIN test_user as user1 ON user1.id = m.user1
    INNER JOIN test_user as user2 ON user2.id = m.user2
    ORDER BY m.createdAt DESC`, [this.req.session.userId]);
    let isAdmin = this.req.session.isAdmin;
    let photo = this.req.session.photo;
    let requestUser = await TestUser.findOne({ id: this.req.session.userId });
    let activeChatUser;
    let activeChatUserPhoto;

    if (this.req.param('userId')) {
      activeChatUser = (await TestUser.findOne({ id: this.req.param('userId') })).id;
      activeChatUserPhoto = (await TestUser.findOne({ id: this.req.param('userId') })).photo;
    }

    const userFullName = `${requestUser.firstName} ${requestUser.lastName}`;
    const chats = result.rows.map(value => {
      if (value.user1 === this.req.session.userId) {
        return {text: value.text, createdAt : value.createdAt, userId: value.user2, firstName: value.user2FirstName, lastName: value.user2LastName , photo:value.user2Photo}
      } else {
        return {text: value.text, createdAt: value.createdAt, userId : value.user1, firstName: value.user1FirstName, lastName: value.user1LastName , photo:value.user1Photo}
      }
    });


    return { chats, userFullName, activeChatUser , activeChatUserPhoto, isAdmin, photo };
  }


};
