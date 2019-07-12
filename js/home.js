const powerUI = () => {
    $(`.user-acc`).on(`click`, function() {
        $(`.acc`).toggleClass(`acc-show`);
    });

    $(`.op-it`).on(`click`, function() {
        if ($(this).attr(`class`).search(`fcs`) < 0) {
            let [foc, names] = [$(`.fcs`), [`MY BOOKINGS`, `ALL TRIPS`, `ALL BOOKED`]];

            if (names.includes(foc.text())) {
                if (!names.includes($(this).text())) {
                    $(`.search-menu`).toggleClass(`none`);
                }
            } else if (names.includes($(this).text())) $(`.search-menu`).toggleClass(`none`);

            $(`.${foc.text().replace(/\s/g, '-').toLowerCase()}`).toggleClass(`none`);
            foc.toggleClass(`fcs`);
            $(this).toggleClass(`fcs`);
            foc = names = undefined;

            $(`.${$(this).text().replace(/\s/g, '-').toLowerCase()}`).toggleClass(`none`);
        }
    });
};

const prepSessionView = () => {
    user_session.status = 'success';
    user_session.data.is_admin = !true;

    if (user_session.status == 'success') {
        if (user_session.data.is_admin) {
            $(`#a-t`).toggleClass(`fcs`);
            $(`#m-b, #b-a-s`).css('display', 'none');
        } else {
            $(`#m-b`).toggleClass(`fcs`);
            $(`#c-a-t, #a-b`).css('display', 'none');
        }
        $(`.all-trips`).toggleClass(`none`);
    }
};

const user_session = {
    status: null, 
    data: {
        id: null,
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        is_admin: null
    }
};

const main = () => {
    prepSessionView();
    powerUI();
};

$(document).ready(main);