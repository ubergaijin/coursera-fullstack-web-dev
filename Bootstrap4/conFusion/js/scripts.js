$(document).ready(function () {
    $("#mycarousel").carousel({interval: 1000});
    $("#carouselButton").click(function () {
        isPlaying = $("#carouselButton").children("span").hasClass('fa-pause');
        $("#mycarousel").carousel(isPlaying ? 'pause' : 'cycle');
        $("#carouselButton").children("span").removeClass(isPlaying ? 'fa-pause' : 'fa-play');
        $("#carouselButton").children("span").addClass(isPlaying ? 'fa-play' : 'fa-pause');
    });
    $("#loginButton").click(function () {
        $("#loginModal").modal('show');
    });
    $("#reserveButton").click(function () {
        $("#reserveModal").modal('show');
    });
});
