//Dashboard - Main View - for Admins
//Decompresser of view data and assigner

const unpackTripsRate = () => {
  let count = { total: 0, bus: 0, boat: 0, flight: 0, train: 0, cancel: 0 }, global = 0,
    myCreation = { total: 0, bus: 0, boat: 0, flight: 0, train: 0, cancel: 0 };

  Object.keys(data.trips).forEach((trip_id) => {
    if (data.trips[trip_id].status == 'Cancelled') {
      count.cancel++;
      if (data.trips[trip_id].user_id == data.me.id) myCreation.cancel++;
    } else {
      count[data.trips[trip_id].mode.toLowerCase()]++;
      count.total++;
      if (data.trips[trip_id].user_id == data.me.id) {
        myCreation[data.trips[trip_id].mode.toLowerCase()]++;
        myCreation.total++;
      }
    }
    global++;
  });
  $('[all-tri-info] o[num]').text(count.total);
  $('[all-tri-info] i[b-data-struct-perc]').text(perc(count.total, global) + '%');

  $('[bus-tri-info] o[num]').text(count.bus);
  $('[bus-tri-info] i[b-data-struct-perc]').text(perc(count.bus, global) + '%');

  $('[bo-tri-info] o[num]').text(count.boat);
  $('[bo-tri-info] i[b-data-struct-perc]').text(perc(count.boat, global) + '%');

  $('[tra-tri-info] o[num]').text(count.train);
  $('[tra-tri-info] i[b-data-struct-perc]').text(perc(count.train, global) + '%');

  $('[fli-tri-info] o[num]').text(count.flight);
  $('[fli-tri-info] i[b-data-struct-perc]').text(perc(count.flight, global) + '%');

  $('[ca-tri-info] o[num]').text(count.cancel);
  $('[ca-tri-info] i[b-data-struct-perc]').text(perc(count.cancel, global) + '%');

  //My creation view data
  $('[my-total] o[num]').text(myCreation.total);
  $('[my-total] i').text(perc(myCreation.total, global) + '%');

  $('[my-bus] o[num]').text(myCreation.bus);
  $('[my-bus] i').text(perc(myCreation.bus, global) + '%');

  $('[my-boat] o[num]').text(myCreation.boat);
  $('[my-boat] i').text(perc(myCreation.boat, global) + '%');

  $('[my-train] o[num]').text(myCreation.train);
  $('[my-train] i').text(perc(myCreation.train, global) + '%');

  $('[my-flight] o[num]').text(myCreation.flight);
  $('[my-flight] i').text(perc(myCreation.flight, global) + '%');
};

const perc = (val_1, val_2) => {
  let percent = val_1 * 100 / val_2;
  return percent >= 0 ? percent.toFixed(1) : (0).toFixed(1);
};

const unpackUsersRate = () => {
  let count = { total: 0, male: 0, female: 0, custom: 0 }, global = 1;
  Object.keys(data.users).forEach((user_email) => {
    if (data.users[user_email].is_admin == 'false') {
      count[data.users[user_email].gender]++;
      count.total++;
    }
    global++;
  });
  $('[all-u-info] o[num]').text(count.total);
  $('[all-u-info] i[b-data-struct-perc]').text(perc(count.total, global) + '%');

  $('[ma-u-info] o[num]').text(count.male);
  $('[ma-u-info] i[b-data-struct-perc]').text(perc(count.male, global) + '%');

  $('[fe-u-info] o[num]').text(count.female);
  $('[fe-u-info] i[b-data-struct-perc]').text(perc(count.female, global) + '%');

  $('[cu-u-info] o[num]').text(count.custom);
  $('[cu-u-info] i[b-data-struct-perc]').text(perc(count.custom, global) + '%');
};

const unpackBookingsRate = () => {
  let count = { total: 0, bus: 0, boat: 0, flight: 0, train: 0, cancel: 0 }, global = 0;
  Object.keys(data.bookings).forEach((b_id) => {
    if (data.bookings[b_id].status == 'Cancelled') count.cancel++;
    else {
      count[data.bookings[b_id].mode.toLowerCase()]++;
      count.total++;
    }
    global++;
  });
  $('[all-booki-info] o[num]').text(count.total);
  $('[all-booki-info] i[b-data-struct-perc]').text(perc(count.total, global) + '%');

  $('[bu-booki-info] o[num]').text(count.bus);
  $('[bu-booki-info] i[b-data-struct-perc]').text(perc(count.bus, global) + '%');

  $('[bo-booki-info] o[num]').text(count.boat);
  $('[bo-booki-info] i[b-data-struct-perc]').text(perc(count.boat, global) + '%');

  $('[tra-booki-info] o[num]').text(count.train);
  $('[tra-booki-info] i[b-data-struct-perc]').text(perc(count.train, global) + '%');

  $('[fli-booki-info] o[num]').text(count.flight);
  $('[fli-booki-info] i[b-data-struct-perc]').text(perc(count.flight, global) + '%');

  $('[ca-booki-info] o[num]').text(count.cancel);
  $('[ca-booki-info] i[b-data-struct-perc]').text(perc(count.cancel, global) + '%');
};

const mainApp = () => {
  unpackTripsRate();
  unpackUsersRate();
  unpackBookingsRate();
};

$(document).ready(mainApp);
