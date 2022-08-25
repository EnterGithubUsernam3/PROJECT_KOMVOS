
document.getElementById("displayArrangements").addEventListener('click', () => {

    getFirstCase();
    getSecondCase();
    getThirdCase();
    getFourthCase();

});

document.getElementById("nav-notifications-tab").addEventListener('click', () => {

    let cases = document.getElementsByClassName("cases");

    let fullcases = [];
    for (let i = 0; i < cases.length; i++) {
        if (cases[i].style.display !== "none") {

            fullcases.push(cases[i])
        }
    }
    if (fullcases.length == 0) {
        document.getElementById("alternative").style.display = "block";
    }
});


function getFirstCase() {

    var mySocket = io.sails.connect();

    mySocket.on('connect', function onConnect() {

        mySocket.request(
            {
                method: 'post',
                url: '/first-case',
                data: {}

            },
            function (result, response) {
                
                let root = document.getElementById("firstcase");

                let offered = result[0];
                let received = result[1];

                let resultOffered = '';
                for (let i = 0; i < offered.length; i++) {
                    resultOffered +=

                        `<div class="card mb-4 regCard">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-lg-3">
                            
                            ${new Date(offered[i].createdAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })} 
                            <br>    
                            </div>
                            <div class="col-lg-9">
                                <p class="h5">Ο/H ${offered[i].receiver} εκδήλωσε ενδιαφέρον για την αγγελία σου:
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <br>
                        <div class="row">
                            <div class="col-lg-2 col-md-3 col-sm-3 "><img src="${offered[i].receiverPhoto}" alt="" class="personsImg"
                                   ></div>
                            <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                                <form action="/view-profile/${offered[i].receiverId}" method="GET">
                                    <button type="submit" class = "view-profileBtn">${offered[i].receiver} </button>
                                </form>
                                <div>${offered[i].receiverMail}</div>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-8 col-sm-8">
                                <span class="badge bg-secondary">${offered[i].category}</span>
                                <div class="text-center"> <b>${offered[i].listingName}</b></div>
                                <div class="description">${offered[i].listingDescription}</div>
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                    <path
                                    d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                    <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                    <path
                                    d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                    </svg>
                                    &nbsp;
                                    ${new Date(offered[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                    <path
                                    d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                    <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                    </svg>
                                    &nbsp;
                                    ${new Date(offered[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="text-end">                        
                            <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#cancelArrangement${offered[i].id}">Απόρριψη</button>
                            <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#confirmArrangement${offered[i].id}">Επιβεβαίωση</button>
                        </div>
                    </div>
                </div>

                <!-- version for less than 576 px -->
                <div class="card mb-4 smCard">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-lg-3">
                            
                            ${new Date(offered[i].createdAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })} 
                            <br>    
                            </div>
                            <div class="col-lg-9">
                                <p class="h5">Ο/H ${offered[i].receiver} εκδήλωσε ενδιαφέρον για την αγγελία σου:
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <br>
                        <div class="row">
                            <div class="col-lg-2 col-md-3 col-sm-3 "><img src="${offered[i].receiverPhoto}" alt="" class="personsImg"></div>
                            <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                                <form action="/view-profile/${offered[i].receiverId}" method="GET">
                                    <button type="submit" class = "view-profileBtn">${offered[i].receiver} </button>
                                </form>
                                <div>${offered[i].receiverMail}</div>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                           
                            <div class="col-md-4 col-sm-4">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                    <path
                                    d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                    <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                    <path
                                    d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                    </svg>
                                    &nbsp;
                                    ${new Date(offered[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                    <path
                                    d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                    <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                    </svg>
                                    &nbsp;
                                    ${new Date(offered[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                </div>
                            </div>

                            <div class="col-md-8 col-sm-8">
                                <span class="badge bg-secondary">${offered[i].category}</span>
                                <div class="text-center"> <b>${offered[i].listingName}</b></div>
                                <div class="description">${offered[i].listingDescription}</div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="text-end">
                            <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#confirmArrangement${offered[i].id}">Επιβεβαίωση</button>                      
                            <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#cancelArrangement${offered[i].id}">Απόρριψη</button>
                        </div>
                    </div>
                </div>

                <!-- Modal for canceling the arrangement -->
                        <div class="modal fade" id="cancelArrangement${offered[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createArrangementLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="createArrangementLabel"><b>Επιθυμείς να συνεχίσεις;</b></h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body warning">
                                    Πατώντας Απόρριψη ακυρώνεις τη συγκεκριμένη συμφωνία.
                                    <br>              
                                    </div>
                                    <div class="modal-footer">
                                        <form action="/update-canceled" method="POST">
                                            <input type="text" name="id" value="${offered[i].id}" hidden>
                                            <button type="submit" class="btn btn-danger float-end">Απόρριψη</button>
                                        </form>
                                    </div>
                                </div>              
                            </div>
                        </div>
                
                        <!-- Modal for accepting the arrangement -->
                        <div class="modal fade" id="confirmArrangement${offered[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createArrangementLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="createArrangementLabel"><b>Επιθυμείς να συνεχίσεις;</b></h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div class="modal-body warning">
                                        Πατώντας επιβεβαίωση θα αποσταλλεί ενημέρωση στον ενδιαφερόμενο χρήστη ότι επιβεβαιώνεις τη συμφωνία. Μη διστάσεις να επικοινωνήσεις μαζί του/της για περισσότερες διευκρινήσεις και λεπτομέρειες.
                                        <br>   
                                    </div>

                                    <div class="modal-footer">
                                        <form action="/update-accepted" method="POST">
                                            <input type="text" name="id" value="${offered[i].id}"  hidden>
                                            <div class="text-end">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ακύρωση</button>
                                                <button type="submit" class="btn btn-danger">Επιβεβαίωση</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

            `;
                }

                let resultReceived = '';
                for (let i = 0; i < received.length; i++) {
                    resultReceived +=

                        `<div class="card mb-4 regCard">
                <div class="card-header">
                    <div class="row">
                        <div class="col-lg-3">                   
                        ${new Date(received[i].createdAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })} 
                        <br>    
                        </div>
                        <div class="col-lg-9">
                            <p class="h5">Ο/H ${received[i].offerer} εκδήλωσε ενδιαφέρον για την αγγελία σου:
                            </p>
                        </div>
                    </div>
                </div>

           <div class="card-body">
               <br>

               <div class="row">
                   <div class="col-lg-2 col-md-3 col-sm-3 "><img src="${received[i].offererPhoto}" alt=""
                   class="personsImg"></div>
                   <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                        <form action="/view-profile/${received[i].offererId}" method="GET">
                            <button type="submit" class = "view-profileBtn">${received[i].offerer} </button>
                        </form>
                       <div>${received[i].offererMail}</div>
                   </div>
               </div>
               <br>
               <div class="row">
                   <div class="col-md-8 col-sm-8">
                       <div>
                           <span class="badge bg-secondary">${received[i].category}</span>
                       </div>
                       <div class="text-center"> <b>${received[i].listingName}</b></div>
                       <div class="description">
                       ${received[i].listingDescription}
                       </div>

                   </div>
                   <div class="col-md-4 col-sm-4">
                       <div>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               class="bi bi-calendar2-date" viewBox="0 0 16 16">
                               <path
                                   d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                               <path
                                   d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                               <path
                                   d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                           </svg>
                           &nbsp;
                           ${new Date(received[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                         
                       </div>
                       <div>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                               <path
                                   d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                               <path
                                   d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                           </svg>
                           &nbsp;
                           ${new Date(received[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                       </div>
                   </div>
               </div>
              

           </div>
           <div class="card-footer">
                <div class="text-end">
                    <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#cancelArrangement${received[i].id}">Απόρριψη</button>
                    <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#confirmArrangement${received[i].id}">Επιβεβαίωση</button> 
                </div>
           </div>
        </div>



        <!-- version for less than 576 px -->
        <div class="card mb-4 smCard">
                <div class="card-header">
                    <div class="row">
                        <div class="col-lg-3">                   
                        ${new Date(received[i].createdAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })} 
                        <br>    
                        </div>
                        <div class="col-lg-9">
                            <p class="h5">Ο/H ${received[i].offerer} εκδήλωσε ενδιαφέρον για την αγγελία σου:
                            </p>
                        </div>
                    </div>
                </div>

           <div class="card-body">
               <br>

               <div class="row">
                   <div class="col-lg-2 col-md-3 col-sm-3 "><img src="${received[i].offererPhoto}" alt=""
                   class="personsImg"></div>
                   <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                        <form action="/view-profile/${received[i].offererId}" method="GET">
                            <button type="submit" class = "view-profileBtn">${received[i].offerer} </button>
                        </form>
                       <div>${received[i].offererMail}</div>
                   </div>
               </div>
                <br>
                <div class="row">

                    <div class="col-md-4 col-sm-4">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                <path
                                    d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                <path
                                    d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                            </svg>
                            &nbsp;
                            ${new Date(received[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                            
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                <path
                                    d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                            </svg>
                            &nbsp;
                            ${new Date(received[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                        </div>
                    </div>


                   <div class="col-md-8 col-sm-8">
                       <div>
                           <span class="badge bg-secondary">${received[i].category}</span>
                       </div>
                       <div class="text-center"> <b>${received[i].listingName}</b></div>
                       <div class="description">
                       ${received[i].listingDescription}
                       </div>

                    </div>
                   
                </div>
              

            </div>
           <div class="card-footer">
                <div class="text-end">
                    <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#cancelArrangement${received[i].id}">Απόρριψη</button>
                    <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#confirmArrangement${received[i].id}">Επιβεβαίωση</button>
                </div>
           </div>
        </div>




           <!-- Modal for canceling the arrangement -->
                        <div class="modal fade" id="cancelArrangement${received[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createArrangementLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="createArrangementLabel"><b>Επιθυμείς να συνεχίσεις;</b></h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body warning">
                                    Πατώντας Απόρριψη ακυρώνεις τη συγκεκριμένη συμφωνία.
                                    <br>              
                                    </div>
                                    <div class="modal-footer">
                                        <form action="/update-canceled" method="POST">
                                            <input type="text" name="id" value="${received[i].id}" hidden>
                                            <button type="submit" class="btn btn-danger float-end">Απόρριψη</button>
                                        </form>
                                    </div>
                                </div>              
                            </div>
                        </div>
                
                        <!-- Modal for accepting the arrangement -->
                        <div class="modal fade" id="confirmArrangement${received[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createArrangementLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="createArrangementLabel"><b>Επιθυμείς να συνεχίσεις;</b></h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div class="modal-body warning">
                                        Πατώντας επιβεβαίωση θα αποσταλλεί ενημέρωση στον ενδιαφερόμενο χρήστη ότι επιβεβαιώνεις τη συμφωνία. Μη διστάσεις να επικοινωνήσεις μαζί του/της για περισσότερες διευκρινήσεις και λεπτομέρειες.
                                        <br>   
                                    </div>

                                    <div class="modal-footer">
                                        <form action="/update-accepted" method="POST">
                                            <input type="text" name="id" value="${received[i].id}" hidden>
                                            <div class="text-end">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ακύρωση</button>
                                                <button type="submit" class="btn btn-danger">Επιβεβαίωση</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                }



                root.innerHTML = resultOffered + resultReceived;


                if (result[0].length == 0 && result[1].length == 0) {
                    root.style.display = "none";

                }

            })

    })

}

function getSecondCase() {

    var mySocket = io.sails.connect();

    mySocket.on('connect', function onConnect() {

        mySocket.request(
            {
                method: 'post',
                url: '/second-case',
                data: {}

            },
            function (result, response) {

                let root = document.getElementById("secondcase");

                let offered = result[0];

                let received = result[1];

                let resultOffered = '';
                for (let i = 0; i < offered.length; i++) {
                    resultOffered +=
                        `<div class="card mb-4 regCard">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-lg-3">                                   
                                        ${new Date(offered[i].createdAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })} 
                                        <br>
                                    </div>
                                    <div class="col-lg-9">
                                        <p class="h5">Έχεις εκδηλώσει ενδιαφέρον για την αγγελία του/της χρήστη:</p>
                                    </div>
                                </div>
                            </div>

                            <div class="card-body">
                                <br>
                                <div class="row">
                                    <div class="col-lg-2 col-md-3 col-sm-3">
                                    <img src="${offered[i].receiverPhoto}" alt="" class="personsImg">
                                    </div>
                                    <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                                        <form action="/view-profile/${offered[i].receiverId}" method="GET">
                                            <button type="submit" class = "view-profileBtn">${offered[i].receiver} </button>
                                        </form>
                                        <div>${offered[i].receiverMail}</div>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-8 col-sm-8">
                                        <div>
                                            <span class="badge bg-secondary">${offered[i].category}</span>
                                        </div>
                                        <div class="text-center"> <b>${offered[i].listingName}</b></div>
                                        <div class="description">
                                        ${offered[i].listingDescription}
                                        </div>
                                    </div>

                                    <div class="col-md-4 col-sm-4">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                                <path
                                                    d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                                <path
                                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                                <path
                                                    d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                            </svg>
                                            &nbsp;
                                            ${new Date(offered[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                            
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                                <path
                                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                            </svg>
                                            &nbsp;
                                            ${new Date(offered[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        <div class="card-footer">
                        
                        <button type="button" class="btn btn-danger btnNotification float-end" data-bs-toggle="modal" data-bs-target="#cancelArrangement${offered[i].id}">Ακύρωση</button>                            
                        </div>

                        </div>
                        
                        <!-- version for less than 576 px -->

                        <div class="card mb-4 smCard">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-lg-3">
                                        ${new Date(offered[i].createdAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                        <br>
                                    </div>
                                    <div class="col-lg-9">
                                        <p class="h5">Έχεις εκδηλώσει ενδιαφέρον για την αγγελία του/της χρήστη:</p>
                                    </div>
                                </div>
                        
                            </div>
                        
                            <div class="card-body">
                                <br>
                        
                                <div class="row ">
                                    <div class="col-lg-2 col-md-3 col-sm-3"><img src="${offered[i].receiverPhoto}" alt=""
                                            class="personsImg"></div>
                                    <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                                    <form action="/view-profile/${offered[i].receiverId}" method="GET">
                                        <button type="submit" class = "view-profileBtn">${offered[i].receiver} </button>
                                    </form>
                                        <div>${offered[i].receiverMail}</div>
                                    </div>
                                </div>
                        
                                <br>
                                <div class="row">
                        
                                    <div class="col-md-4 col-sm-4">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                                <path
                                                    d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                                <path
                                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                            </svg>
                                            &nbsp;
                                            ${new Date(offered[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                        
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                                <path
                                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                            </svg>
                                            &nbsp;
                                            ${new Date(offered[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                        </div>
                                        <br>
                                    </div>
                                   
                                    <div class="col-md-8 col-sm-8">
                                        <div>
                                            <span class="badge bg-secondary">${offered[i].category}</span>
                                        </div>
                                        <div class="text-center"> <b>${offered[i].listingName}</b></div>
                                        <div class="description">
                                            ${offered[i].listingDescription}
                                        </div>
                                    </div>
                                </div>
                        
                            </div>
                            <div class="card-footer">
                                <div class="text-end">
                                    <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal"
                                    data-bs-target="#cancelArrangement${offered[i].id}">Ακύρωση</button>
                                </div>
                            </div>
                        
                        </div>
                        
                        
                        <!-- Modal for canceling arrangement -->
                        <div class="modal fade" id="cancelArrangement${offered[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="cancelArrangementLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="cancelArrangementLabel"><b>Επιθυμείς να συνεχίσεις;</b></h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body warning">
                                    Πατώντας Ακύρωση η συμφωνία παύει πλέον να ισχύει.
                                    <br>              
                                    </div>
                                    <div class="modal-footer">
                                        <form action="/update-canceled" method="POST">
                                            <input type="text" name="id" value="${offered[i].id}" hidden>
                                            <button type="submit" class="btn btn-danger float-end">Ακύρωση</button>
                                        </form>
                                    </div>
                                </div>              
                            </div>
                        </div>
                        `
                }

                let resultReceived = '';
                for (let i = 0; i < received.length; i++) {
                    resultReceived +=

                        `<div class="card mb-4 regCard">


                                        <div class="card-header">
                                            <div class="row">
                                                <div class="col-lg-3">
                                                    ${new Date(received[i].createdAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })} 
                                                    <br>
                                                </div>
                                                <div class="col-lg-9">
                                                    <p class="h5">Έχεις εκδηλώσει ενδιαφέρον για την αγγελία του/της χρήστη:</p>
                                                </div>
                                            </div>
                
                                        </div>
                
                                        <div class="card-body">
                                            <br>
                
                                            <div class="row">
                                                <div class="col-lg-2 col-md-3 col-sm-3 "><img src="${received[i].offererPhoto}" alt="" class="personsImg"></div>
                                                <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                                                 <form action="/view-profile/${received[i].offererId}" method="GET">
                                                    <button type="submit" class = "view-profileBtn">${received[i].offerer} </button>
                                                </form>
                                                    <div>${received[i].offererMail}</div>
                                                </div>
                                            </div>
                                            <br>

                                            <div class="row">

                                                <div class="col-md-8 col-sm-8">
                                                    <div>
                                                    <span class="badge bg-secondary">${received[i].category}</span>
                                                    </div>
                                                    <div class="text-center"> <b>${received[i].listingName}</b></div>
                                                    <div class="description">
                                                    ${received[i].listingDescription}
                                                    </div>
                                                </div>
                
                                                <div class="col-md-4 col-sm-4">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                                            <path
                                                                d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                                            <path
                                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                                            <path
                                                                d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                                        </svg>
                                                        &nbsp;
                                                        ${new Date(received[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                         
                                                    </div>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                                            <path
                                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                                        </svg>
                                                        &nbsp;
                                                        ${new Date(received[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                                    </div>
                                                </div>
                
                                            </div>                                            
                
                                        </div>
                                                        
                                        <div class="card-footer">
                                            <button type="button" class="btn btn-danger btnNotification float-end" data-bs-toggle="modal" data-bs-target="#cancelArrangement${received[i].id}">Ακύρωση</button>         
                                        </div>
                
                                        </div>

                                        <!-- version for less than 576 px -->
                                        <div class="card mb-4 smCard">


                                        <div class="card-header">
                                            <div class="row">
                                                <div class="col-lg-3">
                                                    ${new Date(received[i].createdAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })} 
                                                    <br>
                                                </div>
                                                <div class="col-lg-9">
                                                    <p class="h5">Έχεις εκδηλώσει ενδιαφέρον για την αγγελία του/της χρήστη:</p>
                                                </div>
                                            </div>
                
                                        </div>
                
                                        <div class="card-body">
                                            <br>
                
                                            <div class="row">
                                                <div class="col-lg-2 col-md-3 col-sm-3 "><img src="${received[i].offererPhoto}" alt="" class="personsImg"></div>
                                                <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                                                    <form action="/view-profile/${received[i].offererId}" method="GET">
                                                        <button type="submit" class = "view-profileBtn">${received[i].offerer} </button>
                                                    </form>
                                                    <div>${received[i].offererMail}</div>
                                                </div>
                                            </div>
                                            <br>

                                            <div class="row">

                                                <div class="col-md-4 col-sm-4">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                                            <path
                                                                d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                                            <path
                                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                                            <path
                                                                d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                                        </svg>
                                                        &nbsp;
                                                        ${new Date(received[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                        
                                                    </div>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                                            <path
                                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                                        </svg>
                                                        &nbsp;
                                                        ${new Date(received[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                                    </div>
                                                    <br>
                                                </div>
                                                
                                                <div class="col-md-8 col-sm-8">
                                                    <div>
                                                    <span class="badge bg-secondary">${received[i].category}</span>
                                                    </div>
                                                    <div class="text-center"> <b>${received[i].listingName}</b></div>
                                                    <div class="description">
                                                    ${received[i].listingDescription}
                                                    </div>
                                                </div>
                
                                            </div>                
                                        </div>
                                                        
                                        <div class="card-footer">
                                            <div class="text-end">
                                                <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#cancelArrangement${received[i].id}">Ακύρωση</button>   
                                            </div>      
                                        </div>
                
                                        </div>
                                        
                                        
                                        <!-- Modal for canceling arrangement -->
                                        <div class="modal fade" id="cancelArrangement${received[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="cancelArrangementLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                    <h5 class="modal-title" id="cancelArrangementLabel"><b>Επιθυμείς να συνεχίσεις;</b></h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body warning">
                                                    Πατώντας Ακύρωση η συμφωνία παύει πλέον να ισχύει.
                                                    <br>              
                                                    </div>
                                                    <div class="modal-footer">
                                                        <form action="/update-canceled" method="POST">
                                                            <input type="text" name="id" value="${received[i].id}" hidden>
                                                            <button type="submit" class="btn btn-danger float-end">Ακύρωση</button>
                                                        </form>
                                                    </div>
                                                </div>              
                                            </div>
                                        </div>
                                        `;
                }



                root.innerHTML = resultOffered + resultReceived;


                if (result[0].length == 0 && result[1].length == 0) {
                    root.style.display = "none";

                }

            })
    })
}

function getThirdCase() {

    var mySocket = io.sails.connect();

    mySocket.on('connect', function onConnect() {

        mySocket.request(
            {
                method: 'post',
                url: '/third-case',
                data: {}

            },
            function (result, response) {

                let root = document.getElementById("thirdcase");

                let confirmedArrangements = '';
                for (let i = 0; i < result.length; i++) {
                    confirmedArrangements +=
                        `<div class="card mb-4 regCard">


                        <div class="card-header">
                            <div class="row">
                                <div class="col-lg-3">
                               
                                ${new Date(result[i].updatedAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })} 
                                <br>
                                </div>
                                <div class="col-lg-9">
                                    <p class="h5">Έχεις επιβεβαιώσει μία συμφωνία με το/τη χρήστη ${result[i].receiver} για την αγγελία:</p>
                                </div>
                            </div>
    
                        </div>
    
                        <div class="card-body">
                            <br>
    
                            <div class="row">
                                <div class="col-lg-2 col-md-3 col-sm-3 "><img src="${result[i].receiverPhoto}" alt="" class="personsImg" ></div>
                                <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                                    <form action="/view-profile/${result[i].receiverId}" method="GET">
                                        <button type="submit" class = "view-profileBtn">${result[i].receiver} </button>
                                    </form>
                                    <div>${result[i].receiverMail}</div>
                                </div>
                            </div>
    
                            <br>
                            <div class="row">
                                <div class="col-md-8 col-sm-8">
                                    <div>
                                        <span class="badge bg-secondary">${result[i].category}</span>
                                    </div>
                                    <div class="text-center"> <b>${result[i].listingName}</b></div>
                                    <div class="description">
                                    ${result[i].listingDescription}
                                    </div>
    
                                </div>
                                <div class="col-md-4 col-sm-4">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                            <path
                                                d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                            <path
                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                            <path
                                                d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                        </svg>
                                        &nbsp;
                                        ${new Date(result[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                            <path
                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                        </svg>
                                        &nbsp;
                                        ${new Date(result[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                    </div>
                                </div>
                            </div>
    
                        </div>
                        <div class="card-footer">
                        <button type="button" class="btn btn-danger btnNotification float-end" data-bs-toggle="modal" data-bs-target="#cancelArrangement${result[i].id}">Ακύρωση</button>  
                        </div>
    
                    </div>
                    
                    <!-- version for less than 576 px -->

                    <div class="card mb-4 smCard">


                        <div class="card-header">
                            <div class="row">
                                <div class="col-lg-3">
                               
                                ${new Date(result[i].updatedAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })} 
                                <br>
                                </div>
                                <div class="col-lg-9">
                                    <p class="h5">Έχεις επιβεβαιώσει μία συμφωνία με το/τη χρήστη ${result[i].receiver} για την αγγελία:</p>
                                </div>
                            </div>
    
                        </div>
    
                        <div class="card-body">
                            <br>
    
                            <div class="row">
                                <div class="col-lg-2 col-md-3 col-sm-3 "><img src="${result[i].receiverPhoto}" alt="" class="personsImg" ></div>
                                <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                                    <form action="/view-profile/${result[i].receiverId}" method="GET">
                                        <button type="submit" class = "view-profileBtn">${result[i].receiver} </button>
                                    </form>
                                    <div>${result[i].receiverMail}</div>
                                </div>
                            </div>
    
                            <br>
                            <div class="row">

                                <div class="col-md-4 col-sm-4">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                            <path
                                                d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                            <path
                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                            <path
                                                d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                        </svg>
                                        &nbsp;
                                        ${new Date(result[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                            <path
                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                        </svg>
                                        &nbsp;
                                        ${new Date(result[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                    </div>
                                    <br>
                                </div>

                                <div class="col-md-8 col-sm-8">
                                    <div>
                                        <span class="badge bg-secondary">${result[i].category}</span>
                                    </div>
                                    <div class="text-center"> <b>${result[i].listingName}</b></div>
                                    <div class="description">
                                    ${result[i].listingDescription}
                                    </div>
    
                                </div>
                                
                            </div>
    
                        </div>
                        <div class="card-footer">
                            <div class="text-end">
                                <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#cancelArrangement${result[i].id}">Ακύρωση</button>  
                            </div>
                        </div>
    
                    </div>
                    
                   
                                        
                                        
                                        <!-- Modal for canceling arrangement -->
                                        <div class="modal fade" id="cancelArrangement${result[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createArrangementLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                    <h5 class="modal-title" id="createArrangementLabel"><b>Επιθυμείς να συνεχίσεις;</b></h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body warning">
                                                    Πατώντας Ακύρωση η συμφωνία παύει πλέον να ισχύει.
                                                    <br>              
                                                    </div>
                                                    <div class="modal-footer">
                                                        <form action="/update-canceled" method="POST">
                                                            <input type="text" name="id" value="${result[i].id}" hidden>
                                                            <button type="submit" class="btn btn-danger float-end">Ακύρωση</button>
                                                        </form>
                                                    </div>
                                                </div>              
                                            </div>
                                        </div>`
                }




                root.innerHTML = confirmedArrangements;

                if (result.length == 0) {
                    root.style.display = "none";

                }


            })
    })
}

function getFourthCase() {

    var mySocket = io.sails.connect();

    mySocket.on('connect', function onConnect() {

        mySocket.request(
            {
                method: 'post',
                url: '/fourth-case',
                data: {}
            },
            function (result, response) {
               
                let root = document.getElementById("fourthcase");

                let confirmedArrangements = '';
                for (let i = 0; i < result.length; i++) {
                    confirmedArrangements +=
                        `<div class="card mb-4 regCard">


                        <div class="card-header">
                            <div class="row">
                                <div class="col-lg-3">
                                
                                ${new Date(result[i].updatedAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })} 
                                <br>
                                </div>
                                <div class="col-lg-9">
                                    <p class="h5">Ο/H ${result[i].offerer} έχει επιβεβαιώσει τη συμφωνία για την αγγελία:</p>                                    
                                </div>
                            </div>    
                        </div>
    
                        <div class="card-body">
                            <br>
    
                            <div class="row">
                                <div class="col-lg-2 col-md-3 col-sm-3"><img src="${result[i].offererPhoto}" alt="" class="personsImg"></div>
                                <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                                    <form action="/view-profile/${result[i].offererId}" method="GET">
                                        <button type="submit" class = "view-profileBtn">${result[i].offerer} </button>
                                    </form>
                                    <div>${result[i].offererMail}</div>
                                </div>
                            </div>
    
                            <br>
                            <div class="row">
                                <div class="col-md-8 col-sm-8">
                                    <div>
                                        <span class="badge bg-secondary">${result[i].category}</span>
                                    </div>
                                    <div class="text-center"> <b>${result[i].listingName}</b></div>
                                    <div class="description">
                                    ${result[i].listingDescription}
                                    </div>
    
                                </div>
                                <div class="col-md-4 col-sm-4">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                            <path
                                                d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                            <path
                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                            <path
                                                d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                        </svg>
                                        &nbsp;
                                        ${new Date(result[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                            <path
                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                        </svg>
                                        &nbsp;
                                        ${new Date(result[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                    </div>
                                </div>
                            </div>
    
                        </div>
                        <div class="card-footer">
                            <div class="text-end">
                                <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#cancelArrangement${result[i].id}">Απόρριψη</button>
                                <button type="button" class="btn btn-danger " data-bs-toggle="modal" data-bs-target="#finishArrangement${result[i].id}">Ολοκληρώθηκε</button>                      
                            </div>
                            
                        </div>
    
                    </div>

                    <!-- version for less than 576 px -->

                    <div class="card mb-4 smCard">


                        <div class="card-header">
                            <div class="row">
                                <div class="col-lg-3">
                                
                                ${new Date(result[i].updatedAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })} 
                                <br>
                                </div>
                                <div class="col-lg-9">
                                    <p class="h5">Ο/H ${result[i].offerer} έχει επιβεβαιώσει τη συμφωνία για την αγγελία:</p>                                    
                                </div>
                            </div>    
                        </div>
    
                        <div class="card-body">
                            <br>
    
                            <div class="row">
                                <div class="col-lg-2 col-md-3 col-sm-3"><img src="${result[i].offererPhoto}" alt="" class="personsImg"></div>
                                <div class="col-lg-10 col-md-9 col-sm-9 personsInfo">
                                    <form action="/view-profile/${result[i].offererId}" method="GET">
                                        <button type="submit" class = "view-profileBtn">${result[i].offerer} </button>
                                    </form>
                                    <div>${result[i].offererMail}</div>
                                </div>
                            </div>
    
                            <br>
                            <div class="row">
                                <div class="col-md-4 col-sm-4">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-calendar2-date" viewBox="0 0 16 16">
                                        <path
                                            d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                        <path
                                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                        <path
                                            d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                    </svg>
                                    &nbsp;
                                    ${new Date(result[i].startingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                        <path
                                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                    </svg>
                                    &nbsp;
                                    ${new Date(result[i].endingDate).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit", day: "2-digit"
                        })}
                                </div>
                                <br>
                            </div>

                                <div class="col-md-8 col-sm-8">
                                    <div>
                                        <span class="badge bg-secondary">${result[i].category}</span>
                                    </div>
                                    <div class="text-center"> <b>${result[i].listingName}</b></div>
                                    <div class="description">
                                    ${result[i].listingDescription}
                                    </div>
    
                                </div>
                                
                            </div>
    
                        </div>
                        <div class="card-footer">
                            <div class="text-end">
                                <button type="button" class="btn btn-danger " data-bs-toggle="modal" data-bs-target="#finishArrangement${result[i].id}">Ολοκληρώθηκε</button>                      
         
                                <button type="button" class="btn btn-danger btnNotification" data-bs-toggle="modal" data-bs-target="#cancelArrangement${result[i].id}">Απόρριψη</button>
                            </div>
                            
                        </div>
    
                    </div>

                <!-- Modal for canceling the arrangement -->
                        <div class="modal fade" id="cancelArrangement${result[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createArrangementLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="createArrangementLabel"><b>Επιθυμείς να συνεχίσεις;</b></h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body warning">
                                    Πατώντας Απόρριψη ακυρώνεται η συγκεκριμένη συμφωνία.
                                    <br>              
                                    </div>
                                    <div class="modal-footer">
                                        <form action="/update-canceled" method="POST">
                                            <input type="text" name="id" value="${result[i].id}" hidden>
                                            <button type="submit" class="btn btn-danger float-end">Απόρριψη</button>
                                        </form>
                                    </div>
                                </div>              
                            </div>
                        </div>
                
                        <!-- Modal for finishing the arrangement -->
                        <div class="modal fade" id="finishArrangement${result[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createArrangementLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="createArrangementLabel"><b>Επιθυμείς να συνεχίσεις;</b></h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div class="modal-body warning">
                                        Πατώντας επιβεβαίωση ολοκληρώνεται η συμφωνία! Ένας πόντος φεύγει από σένα και πηγαίνει στο χρήστη που προσφέρθηκε να συνδράμει! (αυτό δεν ισχύει στην περίπτωση υπηρεσιών σίτισης ή στέγασης)
                                        <br>   
                                    </div>

                                    <div class="modal-footer">
                                        <form action="/update-finished" method="POST">
                                            
                                            <input type="text" name="id" value="${result[i].id}"  hidden>
                                            <input type="text" name="offererId" value="${result[i].offererId}"  hidden>
                                            <input type="text" name="receiverId" value="${result[i].receiverId}"  hidden>
                                            <input type="text" name="categoryrId" value="${result[i].categoryrId}"  hidden>
                                            <div class="text-end">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ακύρωση</button>
                                            <button type="submit" class="btn btn-danger ">Επιβεβαίωση</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    `
                }




                root.innerHTML = confirmedArrangements;

                if (result.length == 0) {
                    root.style.display = "none";

                }


            })
    })
}

