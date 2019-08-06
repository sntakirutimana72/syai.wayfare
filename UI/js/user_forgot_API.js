//Validate User Account Information Updates
//And Commit Changes

const gatherAccountInfo = () => {
  let retrieve = {
    email: $('#email').val(),
    last: $('#lastname').val(),
    first: $('#firstname').val(),
    npassword: $('#n-password').val(),
    gender: $("input[name='gender']:checked").val(),
    DofB: $("[dOfb-value][c-val] input[type='date']").val(),
    is_admin: $(
      "input[name='acc-group']:checked").val() == 'normal' ? false : true,
  };

  if (retrieve.is_admin)
    retrieve.g_auth = $('input#g-auth').val();
  return retrieve;
};
const powerUIs = () => {
  $('div.button[restore]').on('click', restoreAccount);
  $("[show-pass]").hover(showPassword, hidePassword);
  $("input[name='acc-group']").on('change', showStaffAuth);
};
const showPassword = function () {
  $(this).siblings().attr('type', 'text');
};
const hidePassword = function () {
  $(this).siblings().attr('type', 'password');
};
const showStaffAuth = function () {
  const g_auth = $("[g-auth]");

  if ($(this).val() == 'normal') {
    $(g_auth.children()[0]).focus();
    $(g_auth.children()[0]).val('');
  }
  g_auth.slideToggle();
};
const restoreAccount = () => {
  const retrieve = gatherAccountInfo();
  $.ajax({
    type: 'POST',
    data: { retrieve },
    url: '/auth/forgot'
  }).done(
    (res) => alert(res)
  ).fail(
    ({ responseText: error }) => alert(error)
  );
};

$(document).ready(powerUIs);
