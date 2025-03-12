$(document).ready(function() {
    const preloader = $('#preloader');
    preloader.show();

    const table = $('#datatable1').DataTable({
        info: false,
        serverSide: true,
        pageLength: 10,
        ajax: {
            url: "/data",
            dataSrc: ""
        },
        initComplete: function() {
            preloader.hide();
        },
        paging: true
    });
    
    $('.submit_btn').on('click', function(e) {
        e.preventDefault();

        let currentPage = 1;
        let pageSize = 100;

        const selectedarea = Array.from($('#area option:checked')).map(option => option.value);
        const selectedpuesto = Array.from($('#puesto option:checked')).map(option => option.value);
        const selectedEstado = Array.from($('#estado_c option:checked')).map(option => option.value);
        const selectedSector = Array.from(jQuery('#sector option:checked')).map(option => option.value);
        const selectedRamos = Array.from(jQuery('#ramo_i option:checked')).map(option => option.value);
        const selectedEstatusC = Array.from(jQuery('#estatus_cod option:checked')).map(option => option.value);
        const selectedEstatusM = Array.from(jQuery('#estatus_men option:checked')).map(option => option.value);
        const selectedGiros = Array.from(jQuery('#giro option:checked')).map(option => option.value);
        const selectedEntidad = Array.from(jQuery('#entidad_f option:checked')).map(option => option.value);
        const selectedTamanio = Array.from(jQuery('#tamano option:checked')).map(option => option.value);
        const selectedEstatusG = Array.from(jQuery('#estatus_g option:checked')).map(option => option.value);
        const selectedEstatusCat = Array.from(jQuery('#estatus_cat option:checked')).map(option => option.value);
        const selectedregionN = Array.from(jQuery('#region option:checked')).map(option => option.value);
        const selectedEstatusLei = Array.from(jQuery('#estatus_l option:checked')).map(option => option.value);
        const selectedNivel = Array.from(jQuery('#nivel option:checked')).map(option => option.value);
        const selectedIndustria = Array.from(jQuery('#industria option:checked')).map(option => option.value);

        let uri = `/data?page=${currentPage}&size=${pageSize}`;
        const queryParams = [];

        if (selectedarea.length > 0) {
            queryParams.push(`area=${selectedarea.join(',')}`);
        }
        if (selectedpuesto.length > 0) {
            queryParams.push(`puesto=${selectedpuesto.join(',')}`);
        }
        if (selectedEstado.length > 0) {
            queryParams.push(`estado_c=${selectedEstado.join(',')}`);
        }
        if (selectedSector.length > 0) {
            queryParams.push(`sector=${selectedSector.join(',')}`);
        }
        if (selectedRamos.length > 0) {
            queryParams.push(`ramo_i=${selectedRamos.join(',')}`);
        }
        if (selectedEstatusC.length > 0) {
            queryParams.push(`estatus_cod=${selectedEstatusC.join(',')}`);
        }
        if (selectedEstatusM.length > 0) {
            queryParams.push(`estatus_men=${selectedEstatusM.join(',')}`);
        }
        if (selectedGiros.length > 0) {
            queryParams.push(`giro=${selectedGiros.join(',')}`);
        }
        if (selectedEntidad.length > 0) {
            queryParams.push(`entidad_f=${selectedEntidad.join(',')}`);
        }
        if (selectedTamanio.length > 0) {
            queryParams.push(`tamano=${selectedTamanio.join(',')}`);
        }
        if (selectedEstatusG.length > 0) {
            queryParams.push(`estatus_g=${selectedEstatusG.join(',')}`);
        }
        if (selectedEstatusCat.length > 0) {
            queryParams.push(`estatus_cat=${selectedEstatusCat.join(',')}`);
        }
        if (selectedregionN.length > 0) {
            queryParams.push(`region=${selectedregionN.join(',')}`);
        }
        if (selectedEstatusLei.length > 0) {
            queryParams.push(`estatus_l=${selectedEstatusLei.join(',')}`);
        }
        if (selectedNivel.length > 0){
            queryParams.push(`nivel=${selectedNivel.join(',')}`);
        }
        if (selectedIndustria.length > 0){
            queryParams.push(`industria=${selectedIndustria.join(',')}`);
        }
        if (queryParams.length > 0) {
            uri += `&${queryParams.join('&')}`;
        }

        console.log(uri);
        const preloader = $('#preloader');
        preloader.show();
        table.ajax.url(uri).load();
    });

     // Ocultar los botones de paginación al cargar la tabla
     hidePaginationButtons();

     // Evento draw de DataTables, se ejecuta cada vez que se redibuja la tabla (cambio de página)
     table.on('draw', function() {
         hidePaginationButtons();
     });

      // Función para ocultar los botones de paginación
function hidePaginationButtons() {
    // Ocultar el botón "First" con data-dt-idx="first"
    $('[data-dt-idx="first"]').css('display', 'none');

    // Ocultar el botón "Previous" con data-dt-idx="previous"
    $('[data-dt-idx="previous"]').css('display', 'none');

    // Ocultar el botón "Next" con data-dt-idx="next"
    $('[data-dt-idx="next"]').css('display', 'none');

    // Ocultar el botón "Last" con data-dt-idx="last"
    $('[data-dt-idx="last"]').css('display', 'none');

    // Ocultar el "ellipsis" con data-dt-idx="ellipsis"
    $('[data-dt-idx="NaN"]').css('display', 'none');
}
});   


// Esperar a que el contenido de la tabla se haya cargado
setTimeout(function() {
    // Ocultar el botón "First" con data-dt-idx="first"
    const firstButton = document.querySelector('[data-dt-idx="first"]');
    if (firstButton) firstButton.style.display = 'none';

    // Ocultar el botón "Previous" con data-dt-idx="previous"
    const prevButton = document.querySelector('[data-dt-idx="previous"]');
    if (prevButton) prevButton.style.display = 'none';

    // Ocultar el botón "Next" con data-dt-idx="next"
    const nextButton = document.querySelector('[data-dt-idx="next"]');
    if (nextButton) nextButton.style.display = 'none';

    // Ocultar el botón "Last" con data-dt-idx="last"
    const lastButton = document.querySelector('[data-dt-idx="last"]');
    if (lastButton) lastButton.style.display = 'none';

    // Ocultar el "ellipsis" con data-dt-idx="ellipsis"
    const ellipsis = document.querySelector('[data-dt-idx="NaN"]');
    if (ellipsis) ellipsis.style.display = 'none';
}, 500);  // Ajusta el tiempo si es necesario
