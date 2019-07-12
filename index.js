let slideshow;

const init_slideshow = () => {
    slideshow = setInterval( () => {
        matchSlideElts()
    }, 8000);
};

const matchSlideElts = (dot) => {
    const slide = $(`.slide-on`);
    let forAttr = slide.attr("for");
    $(`.dot-on`).toggleClass(`dot-on`);

    if (!dot) $(`#${forAttr}`).toggleClass(`dot-on`);
    else {
        forAttr = dot.attr(`id`);
        dot.toggleClass(`dot-on`);
    }

    slide.toggleClass(`slide-on`);
    $(`.${forAttr}`).toggleClass(`slide-on`);
}; 

$(document).ready(() => {
    init_slideshow();

    $(`.dot`).on(`click`, function() {
        if ($(this).attr("class").search(`dot-on`) < 0) {
            clearInterval(slideshow);
            slideshow = null;
            matchSlideElts($(this))
            init_slideshow();
        } else console.log($(this).attr("class").search(`dot-on`));
    });
});