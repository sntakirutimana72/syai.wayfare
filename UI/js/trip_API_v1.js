//Unload Bookings either for Admins or Clients
const sideNavDirs = 'ul[tri-av]';

const tripReady = () => {
  unloadTrips();
  $('span[delete-book]').on('click', cancelTrip);
};

const unloadTrips = () => {
  if (tris = data.trips) {
    Object.keys(tris).forEach((trip_id) => {
      let hide = tris[trip_id].status == 'Cancelled' ? 'hide' : '';
      $('[book-trip-cli-msg-nav]').append(
        `<div a-book-item for="${trip_id}">
                                        <div item-col b-da>
                                                <span item-col-header>From - To</span>
                                                <span book-origin-destiny>${tris[trip_id].origin} - ${tris[trip_id].destination}</span>
                                        </div>
                                        <div item-col b-da>
                                                <span item-col-header>Trip Date</span>
                                                <span book-due-date>${tris[trip_id].trip_date}</span>
                                        </div>
                                        <div item-col b-da>
                                                <span item-col-header>Transport Means</span>
                                                <span book-travel-mode>${tris[trip_id].mode}</span>
                                        </div>
                                        <div item-col controls class='${hide}'>
                                                <span delete-book>x</span>
                                        </div>
                                </div>`
      );
    });
  } else $('[book-trip-cli-msg-nav]').append(
    `<div a-book-item style="text-align: center;"><i>0 Found</i></div>`);
};

const cancelTrip = function () {
  const trip_id = $(this).parents('[a-book-item]').attr('for');

  $.ajax({
    type: 'DELETE',
    url: '/trips/' + trip_id
  }).done(
    ({ status }) => {
      if (status == 'success') {
        $(`[a-book-item][for='${trip_id}'] [controls]`).addClass('hide');
        alert('Cancelled');
      }
    }
  ).fail(
    ({ responseText: error }) => alert(error)
  );
};

$(document).ready(tripReady);
