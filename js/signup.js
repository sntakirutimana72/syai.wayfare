let is_admin = false;

const powerUpUI = () => {
    $("DIV.user").on(`click`, function() {
        /*
        Switching between Normal and Admin Users
        And assigning the current-tab value to is_admin variable
        the is_admin variable will be user later to register a specific user
        */

        const clie_admin = $(this).attr("class").split(" ");
        if (!clie_admin.includes("active")) {
            is_admin = clie_admin.includes("admin");

            $(this).siblings().removeClass(`active`);
            $(this).toggleClass(`active`);
        }
    });

    $(`INPUT[class=field]`).on(`blur`, function() {
        if (!$(this).val()) $(`LABEL[for=${$(this).attr('id')}]`).css(`display`, `none`);
    });

    $(`INPUT[class=field]`).on(`focus`, function() {
        $(`LABEL[for=${$(this).attr('id')}]`).css(`display`, `initial`);
    });

    $(`.continue`).on(`click`, function() {
        const firstname = $(`#firstname`).val();
        if (!firstname) var err = `Please enter your Firstname`;
        else {
            const lastname = $(`#lastname`).val();
            if (!lastname) var err = `Please enter your Lastname`;
            else {
                const email = $(`#email`).val();
                if (!email) var err = `Please enter your Email adress`;
                else {
                    const password = $(`#password`).val();
                    if (!password) var err = `Please create a Password`;
                    else {
                        require(["fs"], function(fs) {
                            let json_data = fs.readFileSync(`../data.json`, `utf-8`);
                            console.log(JSON.parse(json_data));
                        });
                    }
                }
            }
        }
        console.log(err);
    });
};

$(document).ready(powerUpUI)