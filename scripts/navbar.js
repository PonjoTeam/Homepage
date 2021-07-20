hideNavbar = function() {
    $("#navbar").addClass("w3-hide");
}

showNavbar = function() {
    $("#navbar").removeClass("w3-hide");
}

let lastScrollTop = 0;

window.addEventListener("scroll", function() {

    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
        hideNavbar();
    } else {
        showNavbar();
    }

    lastScrollTop = st <= 0 ? 0 : st;

}, false);