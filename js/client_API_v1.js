//Unload Bookings either for Admins or Clients
const sideNavDirs = 'ul[bo-se]';

const clientReady = () => {
        if ({clients} = data) {
                Object.keys(clients).forEach( (email) => {
                        $('[book-trip-cli-msg-nav]').append(
                                `<div a-book-item for="${email}">
                                        <div item-col b-da>
                                                <span item-col-header>Firstname</span>
                                                <span book-origin-destiny>${clients[email].first}</span>
                                        </div>
                                        <div item-col b-da>
                                                <span item-col-header>Lastname</span>
                                                <span book-due-date>${clients[email].last}</span>
                                        </div>
                                        <div item-col b-da>
                                                <span item-col-header>Gender</span>
                                                <span book-travel-mode>${clients[email].gender}</span>
                                        </div>
                                        <div item-col controls class='hide'>
                                                <span delete-book>x</span>
                                        </div>
                                </div>`
                        );
                });
        } else $('[book-trip-cli-msg-nav]').append(
                `<div a-book-item style="text-align: center;"><i>0 Found</i></div>`);
};

$(document).ready(clientReady);
