
$(".hamburger").click(function() {
    $(this).toggleClass("is-active");
    $(".mobile-menu").toggle();
    $(".menu-background").toggleClass("change-background");
    $(".animation").toggleClass("hidecontainer");
});
