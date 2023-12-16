const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text"),
    homeSection = document.querySelector(".home"),
    loginregisterform = document.querySelector(".loginregisterform");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    homeSection.classList.toggle("open");
    loginregisterform.classList.toggle("open");

    if (sidebar.classList.contains("close")) {
        homeSection.style.pointerEvents = 'auto';
        loginregisterform.style.pointerEvents = 'auto';
        document.body.style.overflow = 'auto';
    } else {
        homeSection.style.pointerEvents = 'none';
        loginregisterform.style.pointerEvents = 'none';
        document.body.style.overflow = 'hidden';
    }
});

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
});

document.addEventListener('DOMContentLoaded', function () {
    const darkModeEnabled = localStorage.getItem("darkModeEnabled");

    if (darkModeEnabled && darkModeEnabled === "true") {
        body.classList.add("dark");
        modeText.innerText = "Light Mode";
    }
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    
    if (body.classList.contains("dark")) {
        modeText.innerText = "Light Mode";
        localStorage.setItem("darkModeEnabled", "true");
    } else {
        modeText.innerText = "Dark Mode";
        localStorage.setItem("darkModeEnabled", "false");
    }

    

});
