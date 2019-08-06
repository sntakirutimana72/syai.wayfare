//Unload Bookings either for Admins or Clients
const sideNavDirs = 'ul[bo-se]';

const bookingReady = () => {
        unloadBookings();
        $('span[delete-book]').on('click', cancelBooking);
};

const fDate = (stime) => {
        let arrTime = stime.split(' ');
        arrTime.splice(5);
        return arrTime.join(' ');
};

const unloadBookings = () => {
        if (boks = data.bookings) {
                Object.keys(boks).forEach( (book_id) => {
                        let hide = boks[book_id].status == 'Cancelled' ? 'hide' : '';
                        $('[book-trip-cli-msg-nav]').append(
                                `<div a-book-item for="${book_id}">
                                        <div item-col b-da>
                                                <span item-col-header>Seat Number</span>
                                                <span book-origin-destiny>${boks[book_id].seat_number}</span>
                                        </div>
                                        <div item-col b-da>
                                                <span item-col-header>Booked On</span>
                                                <span book-due-date>${fDate(boks[book_id].createdOn)}</span>
                                        </div>
                                        <div item-col b-da>
                                                <span item-col-header>Transport Means</span>
                                                <span book-travel-mode>${boks[book_id].mode}</span>
                                        </div>
                                        <div item-col controls class='${hide}'>
                                                <span delete-book>x</span>
                                        </div>
                                </div>`
                        );
                });
        } else $('[book-trip-cli-msg-nav]').append(
                `<div a-book-item style="text-align:center;margin:10%;padding:5px;"><i>0 Found</i></div>`);
};

const cancelBooking = function() {
        const book_id = $(this).parents('[a-book-item]').attr('for');
        console.log(book_id);

        $.ajax({
                type: 'DELETE',
                url: '/bookings/' + book_id
        }).done(
                ({status}) => {
                        if (status == 'success') {
                                $(`[a-book-item][for='${book_id}']`).remove();
                                alert('Cancelled');
                        }
                }
        ).fail(
                ({responseText: error}) => alert(error)
        );
};

$(document).ready(bookingReady);
