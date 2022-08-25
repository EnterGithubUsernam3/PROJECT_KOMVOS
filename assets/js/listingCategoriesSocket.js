// function getListingCategories() {

//     var mySocket = io.sails.connect();
//     mySocket.on('connect', function onConnect() {
//         console.log("Socket categories connected!");
//         mySocket.request(
//             {
//                 method: 'post',
//                 url: '/listing-categories',
//                 data: {}

//             },
//             function (result, response) {
//                 let root = document.getElementById("category_id");

//                 let options = '';
//                 for (let i = 0; i < result.length; i++) {
//                     options += `
//                     <option id="${result[i].id}" value="${result[i].id}">
//                         ${result[i].name} 
//                     </option>
//                     `
//                 }

//                 root.innerHTML = options;

//                 let dropdown = document.getElementById("sortCategories");
//                 let listItems = '';
//                 for (let i = 0; i < result.length; i++) {
//                     listItems += `
//                     <li><a class="dropdown-item" href="#">${result[i].name}</a></li>
//                     `
//                 }

//                 dropdown.innerHTML = listItems;

//             })
//     })
// }
