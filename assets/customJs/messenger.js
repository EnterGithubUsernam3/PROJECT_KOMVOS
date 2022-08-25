let activeChatUserId;
let activeChatUserFullName;

function sendMessage() {
  // Create a new chat message via the API.
  const userText = document.getElementById("userMessage").value ;

  io.socket.post('/message', { user2: activeChatUserId, text: userText }, function(createdMessage) {
    updateConversation(activeChatUserId, userText, createdMessage.createdAt);
  });

  // clear the text area 
  document.getElementById("userMessage").value ='';

  renderMessage(true, userText)
}

//  brinks conversation on top of the side bar and updates text and time
function updateConversation(userId, text, createdAt) {
  // Find user's exisitng conversation and update last message and sent time
  let chatElement = document.getElementById(userId);

  if (chatElement) {
    chatElement.children[0].children[2].innerHTML = new Date(createdAt).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
    chatElement.children[0].children[1].children[1].innerHTML = text;
  
    // Remove existing conversation
    document.getElementById(userId).remove();
  } else {
    chatElement = document.createElement('div');
    chatElement.id = userId;
    chatElement.className = 'conversations';
    chatElement.innerHTML = `
        <div class="friend-drawer friend-drawer--onhover">
          <img class="profile-image" src="http://localhost:1337/${activeChatUserPhoto}" alt="">
          <div class="text">
            <h6>${activeChatUserFullName}</h6>
            <p class="text-muted">
              ${text}
            </p>
          </div>
          <span class="time text-muted small">
            ${new Date(createdAt).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit' , minute:'2-digit', hour12: false})}
          </span>
        </div>
        <hr>
    `;
    chatElement.addEventListener("click", () => openChat(userId));
  }

  // Add conversation to the top of the list
  document.getElementById('chats').prepend(chatElement);
}

// send the messesage & with enter from keybord
const input = document.getElementById("userMessage");
input.addEventListener('keypress', function (event) {



  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();
  }

})

// chat bubbles 
function renderMessage(isSender, message) {
  const element = `
    <div class="row chatLines">
      <div class="col-md-6 ${isSender ?  'offset-md-6' : ''}">
        <div class="chat-bubble chat-bubble--${isSender ? 'right' : 'left'}">
          ${message}
        </div>
      </div>
    </div>
  `;

  document.getElementById('messages').innerHTML += element;

  scrollToBottom();

}

// makes the chat scroll to the bottom automatically
const scrollToBottom = () => {
  const element = document.getElementById('messages');
  element.scrollTop = element.scrollHeight;
}

window.onload = function () {
  const params = new URLSearchParams(window.location.search);

  if (activeChatUser) openChat(activeChatUser)

  io.socket.post('/joinroom');
  io.socket.on('message', (message) => {
    if(activeChatUserId == message.user) {
      renderMessage(false, message.text)
    } 

    updateConversation(message.user, message.text, message.createdAt);

  });
}

// function that hide and show the chat bettween the users 
function openChat(userId) {
  activeChatUserId = userId;

  const messenger = document.getElementById('rightSide');

  if (messenger.style.display === 'none') {
    messenger.style.display = 'block';
  }

  io.socket.get(`/messages/${userId}`, function (resData) {
    const { user, messages } = resData;
    document.getElementById('messages').innerHTML = '';

    activeChatUserFullName = user.firstName + ' ' + user.lastName;

    document.getElementById('userName').innerHTML = activeChatUserFullName;

    // renders each fetched chat message
    messages?.forEach(message => {
      renderMessage(!(message.user1 == userId), message.text)
    })
  });
}



