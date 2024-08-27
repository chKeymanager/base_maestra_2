const query_c = (req, res) => {

    // Inicio de los filtros de contactos
    const selectedArea = req.query.area ? req.query.area.split(',') : []; // Convertir las opciones seleccionadas en un array
    const selectedPuesto = req.query.puesto ? req.query.puesto.split(',') : []; // Convertir las opciones seleccionadas en un array
    const selectedEstadoC = req.query.estado_c ? req.query.estado_c.split(',') : []; // Convertir las opciones seleccionadas en un array

    // Inicio de los filtros de empresa
    const s = req.query.sector ? req.query.sector.split(',') : []; // Convertir las opciones seleccionadas en un array
    const ramo_industrial = req.query.ramo_i ? req.query.ramo_i.split(',') : []; // Convertir las opciones seleccionadas en un array
    const estatus_c = req.query.estatus_cod ? req.query.estatus_cod.split(',') : []; // Convertir las opciones seleccionadas en un array
    const estatus_m = req.query.estatus_men ? req.query.estatus_men.split(',') : []; // Convertir las opciones seleccionadas en un array
    const selectedGiros = req.query.giro ? req.query.giro.split(',') : []; // Convertir las opciones seleccionadas en un array
    const ent_fed = req.query.entidad_f ? req.query.entidad_f.split(',') : []; // Convertir las opciones seleccionadas en un array
    const tam = req.query.tamano ? req.query.tamano.split(',') : []; // Convertir las opciones seleccionadas en un array
    const est_g = req.query.estatus_g ? req.query.estatus_g.split(',') : []; // Convertir las opciones seleccionadas en un array
    const estatus_cat = req.query.estatus_cat ? req.query.estatus_cat.split(',') : []; // Convertir las opciones seleccionadas en un array
    const region_N = req.query.region ? req.query.region.split(',') : []; // Convertir las opciones seleccionadas en un array
    const indus = req.query.industria ? req.query.industria.split(',') : []; // Convertir las opciones seleccionadas en un array
    const lei = req.query.estatus_l ? req.query.estatus_l.split(',') : []; // Convertir las opciones seleccionadas en un array
    const nivel = req.query.nivel ? req.query.nivel.split(',') : []; // Convertir las opciones seleccionadas en un array

    const queryParams = [];

    // Consulta base
    let sqlQuery = "SELECT count(numero_asociado) as total FROM bm";

    // Filtros de contactos
    if (selectedArea.length > 0) {
        const areaFilter = selectedArea.map(area => `area = '${area}'`).join(' OR ');
        queryParams.push(` (${areaFilter})`);
    }
    if (selectedPuesto.length > 0) {
        const puestoFilter = selectedPuesto.map(puesto => `puesto = '${puesto}'`).join(' OR ');
        queryParams.push(` (${puestoFilter})`);
    }
    if (selectedEstadoC.length > 0) {
        const estdocFilter = selectedEstadoC.map(estado_c => `estado = '${estado_c}'`).join(' OR ');
        queryParams.push(` (${estdocFilter})`);
    }

    // Filtros de empresas
    if (s.length > 0) {
        const sectorFilter = s.map(sector => `sector = '${sector}'`).join(' OR ');
        queryParams.push(` (${sectorFilter})`);
    }
    if (ramo_industrial.length > 0) {
        const ramoFilter = ramo_industrial.map(ramo_i => `ramo_industrial = '${ramo_i}'`).join(' OR ');
        queryParams.push(` (${ramoFilter})`);
    }
    if (estatus_c.length > 0) {
        const estatus_cFilter = estatus_c.map(estatus_cod => `codigo = '${estatus_cod}'`).join(' OR ');
        queryParams.push(` (${estatus_cFilter})`);
    }
    if (estatus_m.length > 0) {
        const estatus_mFilter = estatus_m.map(estatus_men => `estatus_mes = '${estatus_m}'`).join(' OR ');
        queryParams.push(` (${estatus_mFilter})`);
    }
    if (selectedGiros.length > 0) {
        const giroFilter = selectedGiros.map(giro => `giro = '${giro}'`).join(' OR ');
        queryParams.push(` (${giroFilter})`);
    }
    if (ent_fed.length > 0) {
        const entidadFilter = ent_fed.map(entidad_f => `entidad_federativa = '${entidad_f}'`).join(' OR ');
        queryParams.push(` (${entidadFilter})`);
    }
    if (tam.length > 0) {
        const tamFilter = tam.map(tamano => `tamano = '${tamano}'`).join(' OR ');
        queryParams.push(` (${tamFilter})`);
    }
    if (est_g.length > 0) {
        const est_gFilter = est_g.map(estatus_g => `bk_contactoestatus = '${estatus_g}'`).join(' OR ');
        queryParams.push(` (${est_gFilter})`);
    }
    if (estatus_cat.length > 0) {
        const estatus_catFilter = estatus_cat.map(estatus_cat => `catalogo = '${estatus_cat}'`).join(' OR ');
        queryParams.push(` (${estatus_catFilter})`);
    }
    if (region_N.length > 0) {
        const regionFilter = region_N.map(region => `region_nielsen = '${region}'`).join(' OR ');
        queryParams.push(` (${regionFilter})`);
    }
    if (indus.length > 0) {
        const indusFilter = indus.map(industria => `industria = '${industria}'`).join(' OR ');
        queryParams.push(` (${indusFilter})`);
    }
    if (lei.length > 0) {
        const leiFilter = lei.map(estatus_l => `lei = '${estatus_l}'`).join(' OR ');
        queryParams.push(` (${leiFilter})`);
    }
    if (nivel.length > 0) {
        const nivelFilter = nivel.map(nivel => nivel === 'Otros' ? `nivel != '0' AND nivel != '1' AND nivel != '2' AND nivel != '3' AND nivel != '4' AND nivel != '5' AND nivel != '6' AND nivel != '7' AND nivel != '8' AND nivel != '9' AND nivel != '10' AND nivel != '11'` :  `nivel = '${nivel}'`).join(' OR ');
        queryParams.push(` (${nivelFilter})`);
    }

    // Aplicar filtros a la consulta SQL
    if (queryParams.length > 0) {
        sqlQuery += ` WHERE ${queryParams.join(' AND ')}`;
    }

    console.log("Total de registros:", sqlQuery);

    return sqlQuery ;
}

module.exports = { query_c };
