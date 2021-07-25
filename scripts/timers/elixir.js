const countDownDate = new Date("Sep 30, 2021 12:00:00").getTime();

const countdown = setInterval(function () {

    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("elixir-countdown").innerHTML = "2.0.0 Release: " + days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("elixir-countdown").innerHTML = "OFFICIALLY LAUNCHED!";
    }

}, 1000);