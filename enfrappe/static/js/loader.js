$(document).ready(function() {
    loadPanel('toolbar');
    loadPanel('properties');
    loadPanel('prototype', undefined, function() { resizeDevice(); });
    loadPanel('main', undefined, function() { 
        $("#banner").attr('draggable', false); 
        initQRCode();
    });
});

function loadPanel(panel, data, callback) {
    if (data == undefined)
        data = defaultPanelData(panel);
    $.ajax({
        type: 'POST',
        url: '/' + panel + '_panel',
        data: data,
        success: function(responseText) {
            $('#panel-' + panel).html(responseText);
            $('#panel-' + panel).change();
            if (callback != undefined)
                callback();
        }
    });
}

function defaultPanelData(panel) {
    if (panel == 'toolbar' || panel == 'properties')
        return {'selected': ''};
    else if (panel == 'prototype')
        return undefined;
}

