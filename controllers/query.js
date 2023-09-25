const connection = require('../controllers/db');

const query = async (req, res) => {

//paginador
const page = req.query.page || 1; // Página actual (por defecto: 1)
const itemsPerPage = 100000; // Número de elementos por página
const offset = (page - 1) * itemsPerPage; // Calcular el índice de inicio

//inicio de los filtros de contactos
const selectedArea = req.query.area ? req.query.area.split(',') : []; // Convertir las opciones seleccionadas en un array
const selectedPuesto = req.query.puesto ? req.query.puesto.split(',') : []; // Convertir las opciones seleccionadas en un array
const selectedEstadoC = req.query.estado_c ? req.query.estado_c.split(',') : []; // Convertir las opciones seleccionadas en un array

//inicio de los filtros de empresa
const s = req.query.sector ? req.query.sector.split(',') : []; // Convertir las opciones seleccionadas en un array
const ramo_industrial = req.query.ramo_i ? req.query.ramo_i.split(',') : []; // Convertir las opciones seleccionadas en un array
const seg_mkt = req.query.segmento ? req.query.segmento.split(',') : []; // Convertir las opciones seleccionadas en un array
const estatus_c = req.query.estatus_cod ? req.query.estatus_cod.split(',') : []; // Convertir las opciones seleccionadas en un array
const estatus_m = req.query.estatus_men ? req.query.estatus_men.split(',') : []; // Convertir las opciones seleccionadas en un array
const selectedGiros = req.query.giro ? req.query.giro.split(',') : []; // Convertir las opciones seleccionadas en un array
const ent_fed = req.query.entidad_f ? req.query.entidad_f.split(',') : []; // Convertir las opciones seleccionadas en un array
const tam = req.query.tamano ? req.query.tamano.split(',') : []; // Convertir las opciones seleccionadas en un array
const est_g = req.query.estatus_g ? req.query.estatus_g.split(',') : []; // Convertir las opciones seleccionadas en un array
const estatus_cat = req.query.estatus_cat ? req.query.estatus_cat.split(',') : []; // Convertir las opciones seleccionadas en un array
const region_N = req.query.region ? req.query.region.split(',') : []; // Convertir las opciones seleccionadas en un array
// const indus = req.query.industria ? req.query.industria.split(',') : []; // Convertir las opciones seleccionadas en un array
const lei = req.query.estatus_l ? req.query.estatus_l.split(',') : []; // Convertir las opciones seleccionadas en un array
// const nivel = req.query.nivel ? req.query.nivel.split(',') : []; // Convertir las opciones seleccionadas en un array

const queryParams = [];

//consulta
let sqlQuery = "SELECT * FROM base_maestra";

//Continuación de los filtros de contactos
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
//Continuación de los filtros de empresas
if (s.length > 0) {
    const sectorFilter = s.map(sector => `sector = '${sector}'`).join(' OR ');
    queryParams.push(` (${sectorFilter})`);
}
if (ramo_industrial.length > 0) {
    const ramoFilter = ramo_industrial.map(ramo_i => `ramo_industrial = '${ramo_i}'`).join(' OR ');
    queryParams.push(` (${ramoFilter})`);
}
if (seg_mkt.length > 0) {
    const segFilter = seg_mkt.map(segmento => `segmento = '${segmento}'`).join(' OR ');
    queryParams.push(` (${segFilter})`);
}
if (estatus_c.length > 0) {
    const estatus_cFilter = estatus_c.map(estatus_cod => `estandar = '${estatus_cod}'`).join(' OR ');
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
    const tamFilter = tam.map(tamano => `tamanio = '${tamano}'`).join(' OR ');
    queryParams.push(` (${tamFilter})`);
}
if (est_g.length > 0) {
    const est_gFilter = est_g.map(estatus_g => `bk_contactostatus = '${estatus_g}'`).join(' OR ');
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
// if (indus.length > 0) {
//     const indusFilter = indus.map(industria => `catalogo = '${estatus_cat}'`).join(' OR ');
//     queryParams.push(` (${estatus_catFilter})`);
// }
if (lei.length > 0) {
    const leiFilter = lei.map(estatus_l => `lei = '${estatus_l}'`).join(' OR ');
    queryParams.push(` (${leiFilter})`);
}
// if (nivel.length > 0) {
//     const nivelFilter = nivel.map(nivel => `catalogo = '${nivel}'`).join(' OR ');
//     queryParams.push(` (${nivelFilter})`);
// }

if (queryParams.length > 0) {
    sqlQuery += ` WHERE ${queryParams.join('AND')}`;
}

sqlQuery += ` LIMIT ${offset}, ${itemsPerPage}`;

console.log(sqlQuery);

const ds = []
const [row] = await connection.query(sqlQuery)

// Mapeo de códigos de área a descripciones
const areaMapping = {
    'A000': 'Sin Area',
    'A010': 'Administración',
    'A020': 'Comercialización / ventas /Serv. A clientes',
    'A030': 'Compras',
    'A040': 'Distribución / Logística',
    'A050': 'Finanzas',
    'A060': 'Fiscal',
    'A070': 'General',
    'A080': 'Informatica Sistemas it/dp/ims',
    'A090': 'Legal',
    'A100': 'Mercadotecnia',
    'A110': 'Operaciones / Producción',
    'A120': 'Recursos Humanos / Capacitación'
};

// Mapeo de códigos de puestos a descripciones
const puestoMapping = {
    'P000': 'Sin puesto',
    'P010': 'Presidencia / Dueño',
    'P020': 'Director',
    'P030': 'Gerente',
    'P040': 'Jefe',
    'P050': 'Empleado',
    'P060': 'Consultor',
    'P070': 'Catedrático',
    'P080': 'Empleado',
    'P090': 'Consejero',						
};

for (const i in row){
    
    ds.push([
        row[i].numero_asociado = row[i].asociado ? row[i].asociado:"-",
        row[i].Nombre = row[i].Nombre ? row[i].Nombre:"-",
        row[i].A_Paterno = row[i].A_Paterno ? row[i].A_Paterno:"-",
        row[i].A_Materno = row[i].A_Materno ? row[i].A_Materno:"-",
        row[i].num_contacto = row[i].num_contacto ? row[i].num_contacto:"-",
        row[i].correo_contacto = row[i].correo_contacto ? row[i].correo_contacto:"-",
        puestoMapping[row[i].puesto] = puestoMapping[row[i].puesto] ? puestoMapping[row[i].puesto]:"-",
        areaMapping[row[i].area] = areaMapping[row[i].area] ? areaMapping[row[i].area]:"-",
        row[i].estado = row[i].estado ? row[i].estado:"-",
        row[i].num_telefono = row[i].num_telefono ? row[i].num_telefono:"-",
        row[i].titulo = row[i].titulo ? row[i].titulo:"-",
        row[i].region_nielsen = row[i].region_nielsen ? row[i].region_nielsen:"-",
        row[i].entidad_federativa = row[i].entidad_federativa ? row[i].entidad_federativa:"-",
        row[i].colonia = row[i].colonia ? row[i].colonia:"-",
        row[i].municipio = row[i].municipio ? row[i].municipio:"-",
        row[i].direccion = row[i].direccion ? row[i].direccion:"-",
        row[i].sector = row[i].sector ? row[i].sector:"-",
        row[i].giro = row[i].giro ? row[i].giro:"-",
        row[i].razon_social = row[i].razon_social ? row[i].razon_social:"-",
        row[i].ramo_industrial = row[i].ramo_industrial ? row[i].ramo_industrial:"-",
        row[i].nivel = row[i].nivel ? row[i].nivel:"-",
        row[i].moda = row[i].moda ? row[i].moda:"-",
        row[i].salud = row[i].salud ? row[i].salud:"-",
        row[i].alimentos = row[i].alimentos ? row[i].alimentos:"-",
        row[i].financiero = row[i].financiero ? row[i].financiero:"-",
        row[i].retail = row[i].retail ? row[i].retail:"-",
        row[i].fabricante = row[i].fabricante ? row[i].fabricante:"-",
        row[i].cadena = row[i].cadena ? row[i].cadena:"-",
        row[i].catalogo = row[i].catalogo ? row[i].catalogo:"-",
        row[i].estandar = row[i].estandar ? row[i].estandar:"-",
        row[i].lei = row[i].lei ? row[i].lei:"-",
        row[i].bk_contactostatus = row[i].bk_contactostatus  ? row[i].bk_contactostatus:"-",
        row[i].segmento = row[i].segmento ? row[i].segmento:"-",
        row[i].tamanio = row[i].tamanio ? row[i].tamanio:"-",
        row[i].estatus_mes = row[i].estatus_mes ? row[i].estatus_mes:"-"
    ]);
}
res.send(ds)
console.log(ds)

}
module.exports = { query };