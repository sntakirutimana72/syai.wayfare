const powerUIAbout = () => {
  //about.htm
};

const powerUIHelp = () => {
  //help.htm
};

const powerUIServices = () => {
  $('[s-col][col-2] [s-item]').on('click', function () {
    const s_data = $(`[${$(this).attr('for')}]`);
    s_data.siblings().addClass('hide');
    s_data.toggleClass('hide', false);
  });
};


$(document).ready(() => {
  powerUIAbout();
  powerUIHelp();
  powerUIServices()
});
