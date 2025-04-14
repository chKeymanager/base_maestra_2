$(document).ready(function() {
    function showLoader() {
        $('#preloader').show();
    }

    function hideLoader() {
        $('#preloader').hide();
    }

    $('#generar-btn').click(function() {
        generarArchivoExcel();
    });

    $('#descargar-btn').click(function() {
        descargarArchivoExcel();
    });

    function generarArchivoExcel() {
        showLoader();

        const selectedFilters = {
            area: Array.from($('#area option:checked')).map(option => option.value),
            puesto: Array.from($('#puesto option:checked')).map(option => option.value),
            estado_c: Array.from($('#estado_c option:checked')).map(option => option.value),
            sector: Array.from($('#sector option:checked')).map(option => option.value),
            ramo_i: Array.from($('#ramo_i option:checked')).map(option => option.value),
            estatus_cod: Array.from($('#estatus_cod option:checked')).map(option => option.value),
            estatus_men: Array.from($('#estatus_men option:checked')).map(option => option.value),
            giro: Array.from($('#giro option:checked')).map(option => option.value),
            entidad_f: Array.from($('#entidad_f option:checked')).map(option => option.value),
            tamano: Array.from($('#tamano option:checked')).map(option => option.value),
            estatus_g: Array.from($('#estatus_g option:checked')).map(option => option.value),
            estatus_cat: Array.from($('#estatus_cat option:checked')).map(option => option.value),
            region: Array.from($('#region option:checked')).map(option => option.value),
            estatus_l: Array.from($('#estatus_l option:checked')).map(option => option.value),
            nivel: Array.from($('#nivel option:checked')).map(option => option.value),
            industria: Array.from($('#industria option:checked')).map(option => option.value),
        };

        let uri = `/file`;
        const queryParams = Object.keys(selectedFilters).filter(key => selectedFilters[key].length > 0)
            .map(key => `${key}=${selectedFilters[key].join(',')}`);

        if (queryParams.length > 0) uri += `?${queryParams.join('&')}`;

        // Cambiar el botón para mostrar "Cargando..."
        const btn = $('#generar-btn');
        btn.prop('disabled', true); // Desactivar el botón
        btn.html('<div class="loading"><span></span><span></span><span></span><span></span><span></span></div> Generando Reporte...');

        $.ajax({
            url: uri,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                hideLoader();
                if (response && response.data && response.data.length > 0) {
                    var wb = XLSX.utils.book_new();

                    // Definir los nombres de las columnas
                    const headerNames = [
                        'Número Asociado', 'Nombre', 'Apellido Paterno', 'Apellido Materno',
                        'Correo de Contacto', 'Número de Contacto', 'Puesto', 'Área', 'Estado Contacto',
                        'Número de Teléfono', 'Título', 'Entidad Federativa', 'Colonia', 'Municipio',
                        'Dirección', 'Giro', 'Sector', 'Razón Social', 'Región Nielsen',
                        'Ramo Industrial', 'Nivel', 'Industria', 'Catálogo', 'Código', 'LEI',
                        'Estatus General', 'Tamaño', 'Estatus del Mes'
                    ];

                    // Transformar los datos de filas a objetos con propiedades según los encabezados
                    const data = response.data.map(row => {
                        return headerNames.reduce((acc, header, index) => {
                            acc[header] = row[index] || '';
                            return acc;
                        }, {});
                    });

                    // Crear la hoja con los datos transformados
                    const ws = XLSX.utils.json_to_sheet(data, { header: headerNames });

                    // Añadir la hoja al libro
                    XLSX.utils.book_append_sheet(wb, ws, "Base Maestra");

                    // Escribir el archivo
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                    var blob = new Blob([wbout], { type: 'application/octet-stream' });
                    window.excelBlob = blob;
                    $('#descargar-btn-container').show();
                    alert('Archivo Excel generado correctamente. Puedes descargarlo ahora.');
                } else {
                    alert('No se encontraron datos para generar el archivo Excel o la respuesta no es válida.');
                }
            },
            error: function(xhr, status, error) {
                hideLoader();
                alert('Error al generar el archivo');
                console.error(xhr.responseText);
            },
            complete: function() {
                // Restaurar el botón cuando se termine el proceso
                btn.prop('disabled', false); // Habilitar el botón
                btn.html('GENERAR REPORTE'); // Restaurar texto del botón
            }
        });
    }

    function descargarArchivoExcel() {
        if (window.excelBlob) {
            var url = URL.createObjectURL(window.excelBlob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'Base Maestra.xlsx';
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
        } else {
            alert('Primero genera el archivo Excel antes de descargarlo.');
        }
    }
});
