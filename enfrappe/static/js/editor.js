$(document).ready(function() {
    $(document).on('click', '#panel-prototype', function(event) {
        var selected_id = $(event.target).attr('id');
        var selected_class = $(event.target).attr('class');
        selectComponent(selected_id, selected_class);
    });
});

function selectComponent(selected_id, selected_class) {
    if (!$('#' + selected_id).hasClass('selected')) {
        $('#panel-prototype').find('.selected').removeClass('selected');
        if (selected_id == "panel-prototype") {
            deselectComponent();
        }
        else {
            $('#' + selected_id).addClass('selected');
            loadPanel('toolbar', {'selected': selected_id, 'class': selected_class});
            loadPanel('properties', {'selected': selected_id, 'class': selected_class});
        }
    }
}

function deselectComponent() {
    loadPanel('toolbar');
    loadPanel('properties');
    $('.pcr-app ').remove();
}

function initColorPicker(id) {
    Pickr.create({
        el: '#' + id,
        theme: 'monolith',
        default: '#FFFFFF',
        lockOpacity: true,
        components: {
            preview: true,
            hue: true,
            interaction: {
                input: true,
                save: true
            }
        },
        i18n: {
            'btn:save': 'Select'
        }
    }).on('save', (color, instance) => {
        $('#' + id + '-value').val(color.toHEXA().toString()).trigger('change');
        instance.hide();
    });
}

