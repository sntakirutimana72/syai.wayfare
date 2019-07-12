let is_admin = false;

const powerUpUI = () => {

    document.querySelectorAll("DIV.user").forEach((userSwitch) => {
        /*
        Switching between Normal and Admin Users
        And assigning the current-tab value to is_admin variable
        the is_admin variable will be user later to register a specific user
        */
        userSwitch.addEventListener("click", () => {
            const clie_admin = userSwitch.getAttribute("class").split(" ");
            if (!clie_admin.includes("active")) {
                is_admin = clie_admin.includes("admin");

                document.querySelector("DIV.active").setAttribute(
                    "class", `user ${{"client": "admin", "admin": "client"}[clie_admin[1]]}`);
                userSwitch.setAttribute("class", `${clie_admin.join(" ")} active`);
            }
        });
    });
};

const startApp = () => {
    powerUpUI();
};

const ready = setInterval(() => {
    if (document.readyState) {
        clearInterval(ready);
        startApp();
    }
}, 200);