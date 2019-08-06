$(document).ready(() => {
    $(`INPUT[class=field]`).on(`blur`, function() {
        if (!$(this).val()) {
            $(`LABEL[for=${$(this).attr('id')}]`).css(`display`, `none`);
        } else {
            $(this).toggleClass(`unfoc-inp-data`);
        }
    });

    $(`INPUT[class=field]`).on(`focus`, function() {
        $(this).removeClass(`unfoc-inp-data`);
        $(`LABEL[for=${$(this).attr('id')}]`).css(`display`, `initial`);
    });

    $(`[exp-colps-logo]`).on('click', () => {
        $(`[m-menu-bar-options]`).slideToggle(`hide`);
    })
});