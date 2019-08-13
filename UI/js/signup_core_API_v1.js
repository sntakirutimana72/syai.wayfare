let is_admin = false;

const switchUserGroup = function () {
  /*
  Switching between Normal and Admin Users
  And assigning the current-tab value to is_admin variable
  the is_admin variable will be user later to register a specific user
  */

  const clie_admin = $(this).attr("class").split(" ");

  if (!clie_admin.includes("active")) {
    is_admin = clie_admin.includes("admin");

    const $ad_auth = $(`#admin-auth`);
    if (!is_admin && $ad_auth.val()) {
      $ad_auth.focus();
      $ad_auth.val('');
    }

    $(this).siblings().removeClass(`active`);
    $(`[admin-auth]`).slideToggle(`hide`);
    $(this).toggleClass(`active`);
  }
};

const validateFirstLastName = () => {
  const [first, regex] = [$('#firstname').val(), /^([a-zA-Z]{2,})\s?([a-zA-Z]{2,})$/];
  let response = { status: null, data: null };

  if (first.search(regex) > -1) {
    const last = $('#lastname').val();
    if (last.search(regex) > -1) {
      response = validateGender({ first, last });
    } else response.data = "<i>Lastname</i> must be well provided";
  } else response.data = "<i>Firstname</i> must be well provided";

  return response;
};

const validatEmail = (json_valid) => {
  const email = $('#email').val();
  let response = { status: null, data: null };

  if (email.search(/^([a-zA-Z0-9_]{2,}@wayfarer.it)$/i) > -1) {
    //validate it to the server side to check if it does not exist already
    const [passw, re_passw] = [$('#password').val(), $('#Re-password').val()];

    if (passw && passw === re_passw) {
      json_valid.email = email;
      json_valid.password = passw;
      response = { status: true, data: json_valid };
    } else response.data = "<i>Please Verify again Password</i>";
  } else response.data = "<i>Invalid Email</i>";

  return response;
};

const validateGender = (json_valid) => {
  const gender = $('input:checked').val();
  let response = { status: null, data: null };

  if (!gender)
    response.data = "Select your <i>GENDER</i>";
  else {
    json_valid.gender = gender;
    response = validateBofDate(json_valid);
  }

  return response;
};

const validatePassword = function () { };

const confirmPassword = function () { };

const validateBofDate = (json_valid) => {
  const dateOfB = $('#birth-date').val();
  let response = { status: null, data: null };

  if (dateOfB) {
    json_valid.DofB = dateOfB;
    response = validatEmail(json_valid);
  } else response.data = "Fill in your <i>Birth Date</i>";

  return response;
};

const proceedWithRegistration = () => {
  let { status, data: signup } = validateFirstLastName();
  if (status) {
    // check if the submitting user is either admin or client
    if (is_admin) {
      if (auth = $('#admin-auth').val()) {
        signup.admin_auth = auth;
      } else return alert('Disable Admin Group or Enter Authentication');
    }
    signup.is_admin = is_admin;

    $.ajax({
      type: 'POST',
      data: { signup },
      url: '/auth/signup'
    }).done(
      (res) => document.write(res)
    ).fail(
      ({ responseText: error }) => alert(error)
    );
  } else alert(signup);
};

const powerUpUI = () => {
  $("DIV.user").on(`click`, switchUserGroup);

  $(`#password`).on(`blur`, validatePassword);

  $(`#re-password`).on(`blur`, confirmPassword);

  $(`.continue`).on(`click`, proceedWithRegistration);
};

$(document).ready(powerUpUI)

