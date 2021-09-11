const countDownDate = new Date("Sep 10, 2021 12:00:00").getTime();

const countdown = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("api-countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("api-countdown").innerHTML = "OFFICIALLY LAUNCHED!";
    }
}, 1000);