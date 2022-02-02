$(document).ready(function() {
    $(document).on('change', '#root-bg-color-value', function() {
        $('#root').css('background-color', $(this).val());
    })
});