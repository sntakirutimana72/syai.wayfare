//Retrieving Trips & Bookings user-api

const initCreateForm = () => {
        //Show and Hide Trip-create-form

        const createForm = $('[create-form]');
        if ($(createForm).css('display') != 'none') {
                clearFormData();
                $(createForm).css('display', 'none');
        } else {
                $(createForm).css('display', 'block');
        }
};

const clearFormData = () => {
        $('[create-form] [for-create] [c-val] input').val('');
        $('[create-form] [for-create] [c-val] select').val('Select transportation mode');
};

const validateFormData = () => {
        let status, data = {};

        const regex = /^([a-zA-Z]+\s?[a-zA-Z0-9]+)$/, origin = $('[orig][c-val] input').val();
        if (regex.test(origin)) {
                data.origin = origin;
                const destination = $('[destin][c-val] input').val();

                if (regex.test(destination)) {
                        data.destination = destination;
                        const mode = $('[trans-mode][c-val] select').val();

                        if (/^(bus|boat|train|flight)$/i.test(mode))  {
                                data.mode = mode;
                                const licence_plate = $('[li-pla-num][c-val] input').val();

                                if (/^([a-zA-Z0-9]+\s?[a-zA-Z0-9]+)$/.test(licence_plate)) {
                                        data.licence_plate = licence_plate;
                                        const seat_capacity = parseInt($('[seat-cap][c-val] input').val());

                                        if (seat_capacity) {
                                                data.seat_capacity = seat_capacity;
                                                const trip_date = $('[trip_d][c-val] input').val();

                                                if (trip_date) {
                                                        data.trip_date = trip_date;
                                                        const fare = parseFloat($('[faree][c-val] input').val());

                                                        if (fare) {
                                                                data.fare = fare;
                                                                return ({status: true, data});
                                                        } else return ({status, data: 'Fare must be a number greater than 0'});
                                                } else return ({status, data: 'Trip date must be provided'});
                                        } else return ({status, data: 'Seat capacity must be a real number greater than 0'});
                                } else return ({status, data: 'Plate number must be provided'});
                        } else return ({status, data: 'Select transportation mode'});
                } else return ({status, data: 'please fill in destination'});
        } else return ({status, data: 'please fill in origin'});
};

const restrictLetters = function(e) {
        const key = e.charCode || e.keyCode || 0;
         // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
        // home, end, period, and numpad decimal
        return (
                key == 8 ||
                key == 9 || //Return key or Enter
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||  //Period character
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105)
        );
};

const enableEventsOn = () => {
        $('#seat-capacity, #faree').keydown(restrictLetters);
        $('[m-i][m-create], span[x]').on('click', initCreateForm);
        $('span[ok]').on('click', prepSubmission);
};

const doSubmission = (trip_info) => {
        $.ajax({
                type: 'POST',
                url: '/trips',
                data: {trip_info}
        }) .done(
                ({data}) => {
                        clearFormData();
                        alert(`Trip created successfully!.`);
                }
        ) .fail(({responseText: error}) => console.error(error));
};

const prepSubmission = function() {
        const {status, data} = validateFormData();
        if (status) {
                doSubmission(data);
        } else alert(data);
};

$(document).ready(enableEventsOn);