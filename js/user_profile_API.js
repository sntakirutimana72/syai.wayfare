//Validate User Account Information Updates
//And Commit Changes

const main = () => {
        prepAccountInformation();
        powerUIs();
};

const validateName = (value, regex='name') => {
        if (regex == 'name') {
                if (value.search(/^([a-zA-Z]{2,})\s?([a-zA-Z]{2,})$/) > -1) return true;
        } else if (regex == 'passw') {
                if (value.search(/^([a-zA-Z0-9_.-@\s]{4,})$/) > -1) return true;
        }
};
const prepAccountInformation = () => {
        try {
                $('input#lastname').val(data.info.last);
                $('input#firstname').val(data.info.first);
                $('input#password').val(data.info.password);
                $('[u-id] [userId-value][c-val]').text(data.info.id);

                $('[gender] [gender-value][c-val]').text(data.info.gender);
                $('[date-of-birth] [dOfb-value][c-val]').text(data.info.DofB);
                $('[email-ad] [email-ad-value][c-val]').text(data.info.email);
                $('[createdOn] [creatOn-value][c-val]').text(
                        data.info.createdOn.replace(/\s?\([a-zA-Z0-9_\s.]+\)/g, ''));
        } catch(error) {
                console.error(error);
        }
};
const powerUIs = () => {
        $('div.button[commit]').on('click', commitChanges);
};
const checkIfAnyChange = () => {
        const first = $('input#firstname').val();

        if (validateName(first)) {
                let allowUpdate;
                const last = $('input#lastname').val();
                if (first !== data.info.first) allowUpdate = true;

                if (validateName(last)) {
                        if (last !== data.info.last) allowUpdate = true;
                        const password = $('input#password').val();

                        if (validateName(password, 'passw')) {
                                if (password !== data.info.password) 
                                        return {first, last, password};
                                else if (allowUpdate) return {first, last};
                        } else alert('passw');
                } else alert('last');
        } else alert('first');
};
const commitChanges = () => {
        if (info = checkIfAnyChange()) {
                $.ajax({
                        type: 'PUT',
                        url: '/session/profile',
                        data: {info}
                }).done(
                        (res) => $(location).attr('href', res.redirect)
                ).fail(
                        ({responseText: error}) => console.log(error)
                );
        }
};

$(document).ready(main);