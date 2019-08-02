let is_admin = false;

const switchUserGroup = function() {
        /*
        Switching between Normal and Admin Users
        And assigning the current-tab value to is_admin variable
        the is_admin variable will be user later to register a specific user
        */

        const clie_admin = $(this).attr("class").split(" ");

        if (!clie_admin.includes("active")) {
                is_admin = clie_admin.includes("admin");

                $(this).siblings().removeClass(`active`);
                $(`[admin-auth]`).slideToggle(`hide`);
                $(this).toggleClass(`active`);
        }
};

const validateLogIn_info = () => {
        const email = $('#email').val();
        if (email.search(/^([aZ-zA0-9_]{2,}@wayfarer.it)$/i) > -1) {
                if (password = $('#password').val()) return {email, password, is_admin};
        }
};

const proceedWithSignin = () => {
        if (signin = validateLogIn_info()) {
                $.ajax({
                        type: 'POST',
                        url: '/auth/signin',
                        data: {signin}
                }).done(
                        (res) => {
                                $(location).attr('href', res.redirect);
                        }
                ).fail(
                        ({responseJSON: err}) => alert(err.reason)
                );
        } else alert('Please, provide valid information');
};

const powerUpUI = () => {
        $("DIV.user").on(`click`, switchUserGroup);
        $('[next]').on('click', proceedWithSignin);
};

const startApp = () => {
        powerUpUI();
};

$(document).ready(startApp);