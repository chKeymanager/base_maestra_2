jQuery(document).on('click', '.modal-id-act-u', function (e) {
    jQuery("#idux").val(jQuery(this).attr('idux'));
});
jQuery(document).on('click', '.modal-id-act-u', function (e) {
    jQuery("#nombreE").val(jQuery(this).attr('actax'));
});
jQuery(document).on('click', '.modal-id-act-u', function (e) {
    jQuery("#usuarioE").val(jQuery(this).attr('idusx'));
});
jQuery(document).on('click', '.modal-id-act-u', function (e) {
    jQuery("#rolE").val(jQuery(this).attr('llux'));
});
jQuery(document).on('click', '.modal-id-act-u', function (e) {
    jQuery("#passE").val(jQuery(this).attr('coux'));
});
/* Traer Campos y se muestre en el modal */
/* Registrar */
jQuery("#form-registrar").submit(function (e) {
    e.preventDefault();
    data = {
        'nombre': jQuery("#nombre").val(),
        'usuario': jQuery("#usuario").val(),
        'rol': jQuery("#rol").val(),
        'pass': jQuery("#pass").val()
    }
    let decide = confirm("¿Esta seguro de que desea Registrar?")
    if (decide) {
        jQuery.post('/registrarU', data, function (rs, res) {
            if (rs.status) {
                alert("Datos Registrados Correctamente!");
                location.reload();
            }
            else alert("Ocurrio un error al Registrar los datos!");
        });
    }
});
/* Registrar */
/* Actualizar */
jQuery("#form-actualizar").submit(function (e) {
    e.preventDefault();
    data = {
        'id':jQuery("#idux").val(),
        'nombre': jQuery("#nombreE").val(),
        'usuario': jQuery("#usuarioE").val(),
        'rol': jQuery("#rolE").val(),
        'pass': jQuery("#passE").val()
    }
    console.log(data)
    let decide = confirm("¿Esta seguro de que desea actualizar?")
    if (decide) {
        jQuery.post('/actualizarU', data, function (rs, res) {
            if (rs.status) {
                alert("Datos Actualizados Correctamente!");
                location.reload();
            }
            else alert("Ocurrio un error al actualizar los datos!");
        });
    }
});
/* Actualizar */
/* Eliminar */
jQuery(document).on('click', '.delete', (e) => {
    const id = e.target.attributes[1]['nodeValue'];
    if (confirm("Estas seguro de eliminar este usuario?")) {
        jQuery.ajax({
            url: '/eliminarU',
            method: "POST",
            data: { action: 'delete', idux: id },
            dataType: "JSON",
            success: function (data) {
                jQuery('#message').html('<div class="alert icon-thumbs-up alert-success">' + data.mensaje + '</div>');
                setTimeout(function () {
                    jQuery('#message').html('');
                    location.reload();
                }, 2500);
            }
        });
    }
});
/*Eliminar */