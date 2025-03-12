jQuery(document).ready(function () {
    jQuery('#datatableUsu').dataTable({
        ajax: {
            url: "/tableUsuarios",
            dataSrc: "",
        }
    });
});