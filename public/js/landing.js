$(function () {
    var slider = $('#myRange');
    var output = $("#demo");

    output.html(slider.val());

    slider.change(function () {
        output.html(slider.val());
    });
});