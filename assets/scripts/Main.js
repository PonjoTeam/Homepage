// Dynamically loads the page.

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

// Animates the navbar upon scrolling.

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-75px";
    }
    prevScrollpos = currentScrollPos;
}