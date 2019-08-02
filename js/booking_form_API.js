let foundTrips;
//Submit && manage  changes in Booking Form

const initBookingForm = () => {
        //Show and Hide Trip-booking-form

        const bookingForm = $('[booking-form]');
        if ($(bookingForm).css('display') != 'none') {
                clearFormData();
                clearTheRest();
                $(bookingForm).css('display', 'none');
        } else {
                $(bookingForm).css('display', 'block');
        }
};

const clearFormData = () => {
        // ToDo:   here block events on submit button
        foundTrips = undefined;

        $('span[ok]').off('click');
        $('[seat-num][c-val] select, [tri-list][c-val] select').prop('disabled', true);

        $('[booking-form] [for-booking] [tri-list][c-val] select').html(
                '<option selected disabled>Select Trip</option>'
        );
        $('[booking-form] [for-booking] [seat-num][c-val] select').html(
                '<option selected disabled>Select seat number</option>'
        );
        $('[booking-form] [for-booking] [trip-detail]').empty();
};

const clearTheRest = () => {
        $('[booking-form] [for-booking] [w-mode][c-val] select').val(
                'Select transportation mode'
        );
};

const getAvailableTrips = (mode) => {
        $.ajax({
                type: 'GET',
                url: '/trips/fe-' + mode,
                async: false
        }).done(
                function({data}) {
                        foundTrips = data;
                }
        ).fail(
                ({responseText: error}) => console.log(error) 
        );
};

const reloadAvailableTrips = () => {
        const selecTrip = $('[for-booking] [tri-list][c-val] select');
        Object.keys(foundTrips).forEach( (trip_id) => {
                $(selecTrip).append($(`<option>${trip_id}</option>`));
        });
        $(selecTrip).prop('disabled', false);
};

const activateSeatNum = function() {
        const seatNum = $('[seat-num][c-val] select');
        foundTrips[$(this).val()].seat_nums.forEach( (seat) => {
                $(seatNum).append($(`<option>${seat}</option>`));
        });
        $(seatNum).prop('disabled', false);
};

const switchWayMode = function() {
        clearFormData();
        getAvailableTrips($(this).val());

        if (foundTrips) reloadAvailableTrips();
        else {
                clearTheRest();
                alert(`No ${$(this).val()} trips available`);
        }
};

const loadTripSeatNums = function() {
        if (foundTrips) {
                const selectSeatNum = $('[booking-form] [for-booking] [seat-num][c-val] select'), 
                { seat_nums } = foundTrips[$(this).val()];

                if (seat_nums.length) {
                        seat_nums.forEach( (num) => {
                                $(selectSeatNum).append($(`<option>${num}</option>`));
                        });
                } else alert('Sorrry, all seats are occupied');
        }
};

const doneValidating = () => {
        //Undisable submit button
        $('span[ok]').on('click', doSubmission);
};

const booking_form_api_ready = () => {
        $('[m-i][m-booking], span[x]').on('click', initBookingForm);
        $('[for-booking] [w-mode][c-val] select').on('change', switchWayMode);
        $('[for-booking] [tri-list][c-val] select').on('change', activateSeatNum);
        $('[for-booking] [seat-num][c-val] select').on('change', doneValidating);
};

const doSubmission = function() {
        const mode = $('[w-mode][c-val] select').val(), 
        trip_id =  $('[tri-list][c-val] select').val(), 
        seat_number = $('[seat-num] select').val();

        $.ajax({
                type: 'POST',
                url: '/bookings',
                data: {book_info: {mode, trip_id, seat_number}}
        }) .done(
                ({status}) => {
                        if (status == 'change') 
                                alert('Your seat is not longer available, please choose another one');
                        else {
                                clearTheRest();
                                alert('Booking successful!.');
                        }
                }
        ) .fail(({responseText: error}) => {
                clearTheRest();
                alert(error);
        }) .always(
                () => clearFormData());
};

$(document).ready(booking_form_api_ready);