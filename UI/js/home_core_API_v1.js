let autoSlideShow;

const automateSlideShow = () => {
  autoSlideShow = setInterval(() => {
    organizeSlideShowElements()
  }, 8000);
};

const organizeSlideShowElements = (dot) => {
  const slide = $(`.slide-on`);
  let forAttr = slide.attr("for");
  $(`[dot-on]`).toggleAttr(`[dot-on]`);

  if (!dot) $(`#${forAttr}`).toggleAttr(`[dot-on]`);
  else {
    forAttr = dot.attr(`id`);
    dot.toggleAttr(`[dot-on]`);
  }

  slide.toggleClass(`slide-on`);
  $(`.${forAttr}`).toggleClass(`slide-on`);
};

const allowClickOnSlider = () => {
  $(`[dot]`).on(`click`, function () {
    if (!$(this).is(`[dot-on]`)) {
      clearInterval(autoSlideShow);
      autoSlideShow = null;
      organizeSlideShowElements($(this))
      automateSlideShow();
    }
  });
};

$.fn.toggleAttr = function (attr, val = "") {
  $(this).is(attr) ? $(
    this).removeAttr(attr.replace(/\[|\]/g, "")) : $(
      this).attr(attr.replace(/\[|\]/g, ""), val);
};

const powerOtherUI = () => {
  $(`[sign-up]`).on(`click`, redirToSignUp);
  $(`[sign-in]`).on(`click`, redirToSignIn);
};

const redirToSignUp = function () { };

const redirToSignIn = function () { };

$(document).ready(() => {
  automateSlideShow();
  allowClickOnSlider()
  powerOtherUI()
});
