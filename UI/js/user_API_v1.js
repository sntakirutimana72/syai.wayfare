const expandAndCollapse = (self, force) => {
        //Expand and Shortern Side-Navigation-Menu-Bar
        const l_m_name = $(`[left-nav-menu-i] span[l-m-name]`);
        if (!(!self && !force) && l_m_name.css('display') !== 'none') 
                collapseOrExpandSubMenu(self, force);
        l_m_name.toggle('hide');
};
const handleClickOnMenuItem = function() {
        if ($(this).is(`[m-m]`)) expandAndCollapse(null, true);
        else collapseOrExpandSubMenu($(this).siblings());
};
const collapseOrExpandSubMenu = (self, force) => {
        //Closes Every Expanded SubMenu before Shortening Side Navigation Bar
        if (self) {
                if ($(`[left-nav-menu-i] span[l-m-name]`).css('display') == 'none') 
                        expandAndCollapse();
                $(self).slideToggle();
                $(self).siblings().toggleClass('focused');
        } else if (!self && force) {
                $('[left-nav-m001]').css('display', 'none');
                $('[m-i]').removeClass('focused');
        }
};
const enableClickOnMenuItem = () => {
        //Allow Side Navigation Bar Item to react when clicked (Motion Events)
        $(`[m-m], [m-i]`).on(`click`, handleClickOnMenuItem);
};
const sideNavDirective = () => {
        /*
        These are directives from other scripts directing the course on sideNav
        If error apply defaults else respect directives.
        */
       try {
               collapseOrExpandSubMenu($(sideNavDirs));
       } catch(error) {
               expandAndCollapse();
       }
       
};
const main = () => {
        sideNavDirective();
        enableClickOnMenuItem();
};
$(document).ready(main);