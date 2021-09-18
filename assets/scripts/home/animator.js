function showMissionContainer() {
    $("#ponjo-mission-container").css("display", "inherit").addClass("animated slideInLeft");
    setTimeout(function() {
        $("#about_container").removeClass("animated slideInLeft");
    },1000);
}

function closeMissionContainer() {
    $("#ponjo-mission-container").addClass("animated slideOutLeft");
    setTimeout(function() {
        $("#ponjo-mission-container").removeClass("animated slideOutLeft").css("display", "none");
    },1000);
}

function showProjectsContainer() {
    $("#ponjo-projects-container").css("display", "inherit").addClass("animated slideInRight");
    setTimeout(function() {
        $("#ponjo-projects-container").removeClass("animated slideInRight");
    },1000);
}

function closeProjectsContainer() {
    $("#ponjo-projects-container").addClass("animated slideOutRight");
    setTimeout(function() {
        $("#ponjo-projects-container").removeClass("animated slideOutRight").css("display", "none");
    },1000);
}

setTimeout(function() {
    $("#ponjo-loading").addClass("animated fadeOut");
    setTimeout(function() {
        $("#ponjo-loading").removeClass("animated fadeOut").css("display","none");
        $("#box").css("display","none");
        $("#about").removeClass("animated fadeIn");
        $("#contact").removeClass("animated fadeIn");
        $("#work").removeClass("animated fadeIn");
    },1000);
},1500);