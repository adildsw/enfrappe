$(document).ready(function() {
    $(window).on('resize', function() {
        resizeDevice();
    });

    $('#root').on('change', function() {
        resizeDevice();
    });
});

function resizeDevice() {
    containerHeight = $('#root').parent().height();
    containerWidth = $('#root').parent().width();
    if (containerWidth/containerHeight < 9/16)
        $('#root').width(0.75 * containerWidth).height(0.75 * containerWidth * 16/9);
    else
        $('#root').width(0.75 * containerHeight * 9/16).height(0.75 * containerHeight);
    
}