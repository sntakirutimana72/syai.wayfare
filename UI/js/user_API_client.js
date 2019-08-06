const perc = (val_1, val_2) => {
  let percent = val_1 * 100 / val_2;
  return percent >= 0 ? percent.toFixed(1) : (0).toFixed(1);
};

const unpackBookingsRate = () => {
  const { total, bus, boat, flight, train, global } = data.bookings;
  console.log(data.bookings);

  $('[all-booki-info] o[num]').text(total);
  $('[all-booki-info] i[b-data-struct-perc]').text(perc(total, global) + '%');

  $('[bu-booki-info] o[num]').text(bus);
  $('[bu-booki-info] i[b-data-struct-perc]').text(perc(bus, global) + '%');

  $('[bo-booki-info] o[num]').text(boat);
  $('[bo-booki-info] i[b-data-struct-perc]').text(perc(boat, global) + '%');

  $('[tra-booki-info] o[num]').text(train);
  $('[tra-booki-info] i[b-data-struct-perc]').text(perc(train, global) + '%');

  $('[fli-booki-info] o[num]').text(flight);
  $('[fli-booki-info] i[b-data-struct-perc]').text(perc(flight, global) + '%');
};

$(document).ready(unpackBookingsRate);
